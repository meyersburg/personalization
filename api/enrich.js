export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY    = process.env.FARADAY_API_KEY;
  const PROJECT_ID = process.env.FARADAY_PROJECT_ID;

  if (!API_KEY || !PROJECT_ID) {
    return res.status(500).json({ error: 'Faraday credentials not configured on server' });
  }

  try {
    const upstream = await fetch(
      `https://api.buy.faraday.ai/v1/projects/${PROJECT_ID}/append`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
