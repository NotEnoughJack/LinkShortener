const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/urls.json");

exports.handler = async (event) => {
  const id = event.path.split("/").pop();
  if (!fs.existsSync(filePath)) {
    return { statusCode: 404, body: "Not found" };
  }

  const urls = JSON.parse(fs.readFileSync(filePath));
  const destination = urls[id];

  if (!destination) {
    return { statusCode: 404, body: "URL not found" };
  }

  return {
    statusCode: 302,
    headers: {
      Location: destination,
    },
  };
};
