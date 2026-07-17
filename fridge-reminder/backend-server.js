import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, 'data', 'fridge-items.json');

app.use(cors());
app.use(express.json());

function ensureDataFile() {
  const dir = path.dirname(dataFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ items: [] }, null, 2), 'utf8');
  }
}

function readItems() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed.items) ? parsed.items : [];
}

function writeItems(items) {
  ensureDataFile();
  fs.writeFileSync(dataFile, JSON.stringify({ items }, null, 2), 'utf8');
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/items', (req, res) => {
  try {
    const items = readItems();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read items' });
  }
});

app.post('/api/items', (req, res) => {
  try {
    const payload = req.body;
    const items = Array.isArray(payload) ? payload : payload.items || [];
    writeItems(items);
    res.json({ success: true, items });
  } catch (error) {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

app.delete('/api/items', (req, res) => {
  try {
    writeItems([]);
    res.json({ success: true, items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear items' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
