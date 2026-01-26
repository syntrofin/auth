export default function handler(req, res) {
  // CORRECT way to add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://syntrofin.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. req.body might be undefined if not sent correctly
  const { userId, password } = req.body || {};

  // 3. Environment Variable check
  const VALID_USER = process.env.DB_USER;
  const VALID_PASS = process.env.DB_PASS;

  // 4. Comparison logic
  if (userId && password && userId === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ auth: "yes" });
  } else {
    return res.status(401).json({ auth: "no" });
  }
}
