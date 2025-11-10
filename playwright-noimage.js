import { start } from "@playwright/mcp";

process.env.MCP_DISABLE_SCREENSHOTS = "true";
process.env.DISABLE_SCREENSHOTS = "true";

start({
  browser: "msedge",
  disableScreenshots: true
});