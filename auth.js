export default function handler(req, res) {
  // Add CORS headers to the response
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all domains for testing
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle the CORS preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, password } = req.body;
  const VALID_USER = "admin";
  const VALID_PASS = "secret123";

  if (userId === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ auth: "yes" });
  } else {
    return res.status(401).json({ auth: "no" });
  }
}

