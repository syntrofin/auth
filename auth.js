export default function handler(req, res) {
  // 1. HARDCODED CORS and UPW FOR TESTING
  // This must exactly match the domain in your browser address bar
  res.setHeader('Access-Control-Allow-Origin', 'https://www.syntrofin.com'); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Handle Preflight (Browser's security check)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Login Logic
  if (req.method === 'POST') {
    const { userId, password } = req.body || {};
    if (userId === "ravigo" && password === "potter") {
      return res.status(200).json({ auth: "yes" });
    }
    else{
      return res.status(401).json({ auth: "no" });
  }
}

