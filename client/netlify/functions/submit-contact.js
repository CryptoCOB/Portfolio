// Netlify Function: submit-contact
// Stores contact form submissions in MongoDB using env vars
// Expected env vars: MONGODB_URI, MONGODB_DB, MONGODB_COLLECTION

import { MongoClient } from 'mongodb';

let cachedClient;

const getClient = async () => {
  if (cachedClient) return cachedClient;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI');
  const client = new MongoClient(uri, { maxPoolSize: 5 });
  cachedClient = await client.connect();
  return cachedClient;
};

const jsonResponse = (statusCode, body, extraHeaders = {}) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    ...extraHeaders,
  },
  body: JSON.stringify(body),
});

const resolveOrigin = (reqOrigin) => {
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) return allowed;
  return reqOrigin || '*';
};

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});

export const handler = async (event) => {
  const origin = resolveOrigin((event.headers && (event.headers.origin || event.headers.Origin)) || '*');

  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(204, {}, corsHeaders(origin));
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' }, corsHeaders(origin));
  }

  try {
    if (!event.body) {
      return jsonResponse(400, { error: 'Missing request body' }, corsHeaders(origin));
    }
    const data = JSON.parse(event.body);

    // Basic validation
    const required = ['firstName', 'lastName', 'email', 'message'];
    const missing = required.filter((k) => !data[k] || String(data[k]).trim().length === 0);
    if (missing.length) {
      return jsonResponse(400, { error: `Missing fields: ${missing.join(', ')}` }, corsHeaders(origin));
    }

    // Normalize & prepare document
    const doc = {
      firstName: String(data.firstName).trim(),
      lastName: String(data.lastName).trim(),
      email: String(data.email).trim().toLowerCase(),
      phone: data.phone ? String(data.phone).trim() : null,
      message: String(data.message).trim(),
      createdAt: new Date().toISOString(),
      userAgent: (event.headers && (event.headers['user-agent'] || event.headers['User-Agent'])) || null,
      ip:
        (event.headers &&
          (event.headers['x-nf-client-connection-ip'] ||
            event.headers['x-forwarded-for'] ||
            event.headers['client-ip'])) || null,
    };

    const dbName = process.env.MONGODB_DB;
    const collName = process.env.MONGODB_COLLECTION || 'contact_submissions';
    if (!dbName) throw new Error('Missing MONGODB_DB');

    const client = await getClient();
    const db = client.db(dbName);
    const result = await db.collection(collName).insertOne(doc);

    return jsonResponse(200, { ok: true, id: String(result.insertedId) }, corsHeaders(origin));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('submit-contact error:', err);
    return jsonResponse(500, { error: 'Internal Server Error' }, corsHeaders('*'));
  }
};
