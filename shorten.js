const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/urls.json");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const longUrl = body.url;

  if (!longUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No URL provided" }),
    };
  }

  const id = Math.random().toString(36).substring(2, 8);

  let urls = {};
  if (fs.existsSync(filePath)) {
    urls = JSON.parse(fs.readFileSync(filePath));
  }

  urls[id] = longUrl;
  fs.writeFileSync(filePath, JSON.stringify(urls));

  return {
    statusCode: 200,
    body: JSON.stringify({ id }),
  };
};
