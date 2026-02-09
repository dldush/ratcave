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

// Force older API version to access databases.query endpoint
const notion = new Client({ 
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2022-06-28" 
});
const databaseId = "2fd192f3-60b0-812e-82d2-fa6094bd9661";

(async () => {
  if (!process.env.NOTION_API_KEY) {
    console.error("Error: NOTION_API_KEY is not defined in .env");
    process.exit(1);
  }

  try {
    const response = await notion.request({
      path: `databases/${databaseId}/query`,
      method: "post",
      body: {
        filter: {
          property: "Status",
          select: { // Changed from status to select based on error message
            equals: "Ready to Publish",
          },
        },
      },
    });

    if (response.results.length > 0) {
      const page = response.results[0];
      const titleKey = Object.keys(page.properties).find(key => page.properties[key].type === "title");
      const title = titleKey ? page.properties[titleKey].title[0]?.plain_text : "Untitled";
      
      console.log(JSON.stringify({ status: "found", title: title || "Untitled", id: page.id }));
    } else {
      console.log(JSON.stringify({ status: "not_found" }));
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
