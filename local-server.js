import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { evaluatePrompt } from './api/check-command.js';

const app = express();
const port = process.env.LOCAL_API_PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/check-command', async (req, res) => {
  const { text } = req.body ?? {};
  const { status, body } = await evaluatePrompt(text);
  res.status(status).json(body);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Local API route not found.' });
});

app.listen(port, () => {
  console.log(`\n  Local API server → http://127.0.0.1:${port}/api/check-command\n`);
});
