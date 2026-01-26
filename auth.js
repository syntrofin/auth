export default function handler(req, res) {
  // 1. Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Get the data sent from your static page
  const { userId, password } = req.body;

  // 3. YOUR DATA (Hidden from the user)
  const VALID_USER = "ravigo";
  const VALID_PASS = "potter";

  // 4. The "Yes/No" check
  if (userId === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ auth: "yes" });
  } else {
    return res.status(401).json({ auth: "no" });
  }
}
