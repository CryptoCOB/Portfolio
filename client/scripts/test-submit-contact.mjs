// Simple test runner to invoke the Netlify function locally without Netlify CLI
// Reads env vars from .env in this folder and calls the handler with a test payload

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { handler } from '../netlify/functions/submit-contact.js';

function loadDotEnv(dotenvPath) {
  if (!existsSync(dotenvPath)) return;
  const content = readFileSync(dotenvPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

async function main() {
  const dotenvPath = resolve(process.cwd(), '.env');
  loadDotEnv(dotenvPath);

  const payload = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '',
    message: 'hello from local script',
  };

  const event = {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  };

  const res = await handler(event);
  // Print response
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  console.log('Body:', res.body);
}

main().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
