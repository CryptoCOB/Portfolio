const baseUrl = process.env.API_URL || 'http://localhost:5001';

async function post(path, body, token) {
  const res = await fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(json)}`);
  return json;
}

async function get(path, token) {
  const res = await fetch(baseUrl + path, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(json)}`);
  return json;
}

async function run() {
  console.log('Testing API at', baseUrl);

  // 1) Register (ignore conflict if user exists)
  const email = `test${Date.now()}@example.com`;
  const password = 'Passw0rd!';
  try {
    const reg = await post('/api/users/register', { name: 'Tester', email, password });
    console.log('Registered:', reg);
  } catch (e) {
    console.log('Register skipped:', e.message);
  }

  // 2) Login
  const login = await post('/api/users/login', { email, password });
  console.log('Login ok, token length:', login.token.length);
  const token = login.token;

  // 3) Create a project (protected)
  const proj = await post('/api/projects', {
    title: 'Sample Project',
    firstname: 'Alice',
    lastname: 'Smith',
    email: 'alice@example.com',
    completion: new Date().toISOString(),
    description: 'Demo assignment project',
  }, token);
  console.log('Created project id:', proj._id);

  // 4) List projects
  const projects = await get('/api/projects');
  console.log('Projects count:', projects.length);

  // 5) Create a public contact (unprotected)
  const contact = await post('/api/contacts', {
    firstname: 'Bob',
    lastname: 'Jones',
    email: 'bob@example.com',
  });
  console.log('Created contact id:', contact._id);

  // 6) List contacts
  const contacts = await get('/api/contacts');
  console.log('Contacts count:', contacts.length);

  console.log('All tests passed.');
}

run().catch((err) => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
