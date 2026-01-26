export default function handler(req, res) {
  //CORS
  const allowedOrigins = ['https://syntrofin.com', 'https://www.syntrofin.com'];
  const origin = req.headers.origin;

  // If the requester is in our allowed list, permit them
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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
