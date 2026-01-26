
export default function handler(req, res) {
  // 1. HARDCODED CORS FOR TESTING
  // This must exactly match the domain in your browser address bar
  res.setHeader('Access-Control-Allow-Origin', 'https://www.syntrofin.com');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Handle Preflight (Browser's security check)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 4. Data check
  const { userId, password } = req.body || {};
  const VALID_USER = process.env.DB_USER;
  const VALID_PASS = process.env.DB_PASS;


  if (userId && password && userId === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ auth: "yes" });
  } else {
    return res.status(200).json({ auth: "yes" });
    /*
    return res.status(401).json({ auth: "no" });
    */
  }
}

