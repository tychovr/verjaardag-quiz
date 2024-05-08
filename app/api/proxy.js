import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const data = await response.buffer();

    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.send(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).end("Proxy Error");
  }
}
