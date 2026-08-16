/**
 * A stand-in for the Supabase backend, used to test sync locally.
 *
 * It implements the same two RPC endpoints the real client calls, with the same
 * shapes, so the browser code under test is exactly the code that ships. It
 * stores blobs in memory and never inspects them — which it could not do anyway,
 * since the payloads are encrypted in the browser.
 *
 * Usage: node scripts/mock-sync-server.mjs [port]
 */
import { createServer } from 'node:http';

const PORT = Number(process.argv[2] ?? 4400);
const ANON_KEY = 'test-anon-key';

/** @type {Map<string, { payload: string, verifier: string, updated_at: string }>} */
const store = new Map();

const send = (res, status, body) => {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Length': Buffer.byteLength(json),
  });
  res.end(json);
};

const server = createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });
    return res.end();
  }

  // Mirror the real service: no key, no access.
  if (req.headers.apikey !== ANON_KEY) return send(res, 401, { message: 'bad api key' });

  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    let parsed = {};
    try { parsed = JSON.parse(body || '{}'); } catch { return send(res, 400, { message: 'bad json' }); }

    if (req.url === '/rest/v1/rpc/sync_pull') {
      const row = store.get(parsed.p_id);
      // PostgREST returns an array of rows for a set-returning function.
      return send(res, 200, row ? [row] : []);
    }

    if (req.url === '/rest/v1/rpc/sync_push') {
      const { p_id: id, p_verifier: verifier, p_payload: payload } = parsed;
      if (typeof id !== 'string' || typeof verifier !== 'string' || typeof payload !== 'string') {
        return send(res, 400, { message: 'p_id, p_verifier and p_payload are required' });
      }
      if (payload.length > 512 * 1024) {
        return send(res, 413, { message: 'payload too large' });
      }
      // Same rule as the production function: a wrong PIN must never overwrite
      // an existing record.
      const existing = store.get(id);
      if (existing && existing.verifier !== verifier) {
        return send(res, 403, { message: 'wrong verifier for this account' });
      }
      store.set(id, { payload, verifier, updated_at: new Date().toISOString() });
      return send(res, 200, { ok: true });
    }

    // The table itself must never be reachable, exactly as in production.
    if (req.url?.startsWith('/rest/v1/progress')) {
      return send(res, 401, { message: 'permission denied for table progress' });
    }

    send(res, 404, { message: 'not found' });
  });
});

server.listen(PORT, () => {
  console.log(`mock sync server on http://localhost:${PORT} (anon key: ${ANON_KEY})`);
  console.log('records:', store.size);
});

process.on('SIGTERM', () => server.close());
