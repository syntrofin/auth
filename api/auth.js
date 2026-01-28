export default function handler(req, res) {
  // 1. HARDCODED CORS FOR TESTING
  // This must exactly match the domain in your browser address bar
  res.setHeader('Access-Control-Allow-Origin', 'https://www.syntrofin.com');
  // ADD THIS LINE: Explicitly allow the browser to use credentials (cookies)
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Handle Preflight (Browser's security check)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Login Logic
  // Check if we are checking the session or logging in
  if (req.method === 'POST') {
    const { userId, password } = req.body || {};
    // NOTE: Make sure userId and password variables are defined somewhere in your actual code
    if (userId === "ravigo" && password === "potter") {
       //Create a pass. 
       // SameSite=None and Secure are required for cross-origin cookies.
      const cookieValue = `auth_status=yes; Max-Age=3600; Path=/; HttpOnly; Secure; SameSite=None`;
      res.setHeader('Set-Cookie', cookieValue);
      return res.status(200).json({ auth: "yes" });
    }
    return res.status(401).json({ auth: "no" });
  }

  // 4. Session Check Logic (for window.onload on your page)
  if (req.method === 'GET') {
    const cookies = req.headers.cookie || "";
    if (cookies.includes("auth_status=yes")) {
      return res.status(200).json({ auth: "yes" });
    }
    return res.status(401).json({ auth: "no" });
  }
}
