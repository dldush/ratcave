const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");

// Load environment variables manually
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8").split("\n");
  envConfig.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
console.log(Object.keys(notion));
console.log(Object.keys(notion.databases || {}));

(async () => {
  // ... rest of code
})();
