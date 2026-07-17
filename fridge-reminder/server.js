import http from "http";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = Number(process.env.PORT) || 5000;
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "fridge-items.json");

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await access(dataFile);
  } catch {
    await writeFile(dataFile, JSON.stringify({ items: [] }, null, 2));
  }
}

async function readItems() {
  await ensureDataFile();
  const content = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(content);
  return parsed.items || [];
}

async function writeItems(items) {
  await ensureDataFile();
  await writeFile(dataFile, JSON.stringify({ items }, null, 2));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/items") {
    if (req.method === "GET") {
      try {
        const items = await readItems();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ items }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read items" }));
      }
      return;
    }

    if (req.method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const parsed = JSON.parse(body || "{}");
          const items = Array.isArray(parsed.items) ? parsed.items : [];
          await writeItems(items);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, items }));
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid payload" }));
        }
      });
      return;
    }

    if (req.method === "DELETE") {
      try {
        await writeItems([]);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, items: [] }));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to clear items" }));
      }
      return;
    }
  }

  if (req.url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
