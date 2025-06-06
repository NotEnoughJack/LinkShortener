import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./data/urls.json');

export default async function handler(req, res) {
  const id = req.query.slug?.[0];
  if (!id || !fs.existsSync(filePath)) return res.status(404).send('Not found');

  const urls = JSON.parse(fs.readFileSync(filePath));
  const longUrl = urls[id];

  if (!longUrl) return res.status(404).send('URL not found');
  res.writeHead(302, { Location: longUrl });
  res.end();
}
