# AI Safety Redteam Agent

This repository is now configured as a React frontend with a Vercel-compatible Node backend. The backend uses Gemini API credentials from `.env` to evaluate command safety.

## Local setup

1. Install dependencies:
   - `npm install`
2. Create a `.env` file from the example:
   - `copy .env.example .env`
   - Set `GEMINI_API_KEY` to your Gemini API key.
3. Run the React development server:
   - `npm run dev`
4. For local full-stack testing with Vercel CLI:
   - Install Vercel CLI if you do not have it: `npm install -g vercel`
   - Run: `vercel dev`

## Project structure

- `index.html` — Vite entry page
- `src/` — React app source
- `api/check-command.js` — Node serverless function for Gemini checks
- `vercel.json` — Vercel build routing configuration
- `.env.example` — example environment variables

## How it works

- Frontend sends `POST /api/check-command` with `{ text }`
- Backend calls Gemini using `GEMINI_API_KEY`
- Backend returns `{ risk, answer }`
- Frontend displays risk, analysis, and dashboard stats

## Vercel deployment

This repo is ready to deploy to Vercel using the existing `vercel.json` configuration.

- Static build is created by Vite
- Backend is served through `/api/check-command`

## Environment variables

Use `.env` for local development and Vercel Environment Variables in production.

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_URL=https://gemini.googleapis.com/v1/models/gemini-1.5:generate
```

## Notes

- The old Python backend and frontend folders remain in the repository for history but are no longer the active deployment path.
- The new stack is React + Node serverless on Vercel.
