import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data/urls.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  const id = Math.random().toString(36).substring(2, 8);

  let urls = {};
  if (fs.existsSync(filePath)) {
    urls = JSON.parse(fs.readFileSync(filePath));
  }

  urls[id] = url;
  fs.writeFileSync(filePath, JSON.stringify(urls, null, 2));
  res.status(200).json({ id });
}
