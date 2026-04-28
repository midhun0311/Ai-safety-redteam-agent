// Vercel Serverless Function — api/check-command.js
// Uses Gemini 2.0 Flash via the correct REST endpoint

const MODEL = 'gemini-2.5-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Calls the Gemini 2.0 Flash API to evaluate a prompt for security risk.
 * Returns { status, body } so the same logic works for both Vercel and local-server.
 */
export async function evaluatePrompt(text) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      status: 500,
      body: { error: 'GEMINI_API_KEY environment variable is not set.' }
    };
  }

  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      status: 400,
      body: { error: 'Request body must include a non-empty "text" field.' }
    };
  }

  const systemPrompt =
    'You are an AI safety red-teaming evaluator. ' +
    'Evaluate the following command or prompt for security, ethical, and safety risks. ' +
    'Provide a concise analysis (2-4 sentences) explaining the risk. ' +
    'End your response by classifying the risk as exactly one of: HIGH, MEDIUM, or LOW. ' +
    'Always include the risk label on its own line at the end, e.g. "Risk Level: HIGH"';

  const payload = {
    contents: [
      {
        parts: [{ text: `${systemPrompt}\n\nInput to evaluate:\n${text.trim()}` }]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 512
    }
  };

  try {
    const url = `${GEMINI_API_BASE}/${MODEL}:generateContent?key=${apiKey}`;
    const apiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      let errMessage = `Gemini API returned ${apiRes.status}`;
      try {
        const errJson = JSON.parse(errText);
        errMessage = errJson?.error?.message || errMessage;
      } catch {
        errMessage = errText || errMessage;
      }
      return { status: apiRes.status, body: { error: errMessage } };
    }

    const result = await apiRes.json();
    const answer =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Gemini returned an unexpected response format.';

    // Extract risk level from response
    const match = answer.match(/\b(HIGH|MEDIUM|LOW)\b/i);
    const risk = match ? match[1].toUpperCase() : 'UNKNOWN';

    return { status: 200, body: { risk, answer } };
  } catch (err) {
    return {
      status: 500,
      body: { error: err?.message || 'Unknown error calling Gemini API.' }
    };
  }
}

/**
 * Vercel serverless handler
 */
export default async function handler(req, res) {
  // Set CORS headers for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { text } = req.body ?? {};
  const { status, body } = await evaluatePrompt(text);
  return res.status(status).json(body);
}
