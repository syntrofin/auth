
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
  /* 
    // *** ADD THESE LOGS ***
  console.log(`DEBUG: Request Method: ${req.method}`);
  console.log('DEBUG: Request Body:', req.body);
   */
  // 3. Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 4. Data check
  const { userId, password } = req.body || {};
  const VALID_USER = process.env.DB_USER;
  const VALID_PASS = process.env.DB_PASS;

/* 
// *** ADD THESE LOGS FOR DEBUGGING ***
  console.log(`DEBUG: User Input: ${userId}`);
  console.log(`DEBUG: Expected User from ENV: ${VALID_USER}`); // Check this in Vercel Logs
  // This is the secure way:
console.log(`DEBUG: User Input: ${password}`);
console.log(`DEBUG: Expected Pass from ENV: ${process.env.DB_PASS}`); // Log password ONLY IF absolutely necessary for immediate debugging, then remove immediately
 */
/*  if (userId && password && userId === VALID_USER && password === VALID_PASS) { */
    if (userId === "ravigo" && password === "potter") {
    console.log("success path hit, returning success.");
    /* res.setHeader('Set-Cookie', 'isAuthenticated=true; HttpOnly; Secure; SameSite=Strict; Path=/');*/
    return res.status(200).json({ auth: "yes" });
  } else {
    console.log("Failure path hit, returning false.");
    return res.status(401).json({ auth: "no" });
    
  }
}

