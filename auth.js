export default function handler(req, res) {
  /*
  // Add CORS headers to the response (Crucial for your test page)
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows all domains for testing
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
*/
  // 2. Get the data sent from your static page
  const { userId, password } = req.body;

  // 3. YOUR DATA (Hidden via Environment Variables on Vercel)
  const VALID_USER = process.env.DB_USER;
  const VALID_PASS = process.env.DB_PASS;

  // 4. The "Yes/No" check
  if (userId === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ auth: "yes" });
  } else {
    return res.status(401).json({ auth: "no" });
  }
}
