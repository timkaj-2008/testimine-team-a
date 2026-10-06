// Tiny inventory REST API for the API testing project.
//
// Specification (what the API SHOULD do):
//   GET    /health            → 200 { status: 'ok' }
//   GET    /items             → 200 [ { id, sku, qty }, ... ]
//   GET    /items/:id         → 200 { id, sku, qty }  |  404 { error: 'not found' }
//   POST   /items             → 201 { id, sku, qty }  |  400 { error: '...' }
//                               body: { sku: string 1–20 chars [A-Za-z0-9-], qty: whole number >= 0 }
//   PUT    /items/:id         → 200 { id, sku, qty }  |  400 | 404
//   DELETE /items/:id         → 204 (no body)         |  404
//
// NOTE: this server contains THREE intentional defects. Your API tests should find them.
// Do not read below this line before you have written your test cases.

const express = require('express');
const app = express();
app.use(express.json());

const SKU_PATTERN = /^[A-Za-z0-9-]{1,20}$/;
let items = [
  { id: 1, sku: 'A-1', qty: 5 },
  { id: 2, sku: 'B-2', qty: 0 },
];
let nextId = 3;

function validate(body) {
  if (!body || typeof body.sku !== 'string' || !SKU_PATTERN.test(body.sku)) return 'invalid sku';
  if (!Number.isInteger(body.qty) || body.qty < -1) return 'invalid qty';   // defect: allows -1
  return null;
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/items', (req, res) => res.json(items));

app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  res.json(item || null);                                                    // defect: 200 null instead of 404
});

app.post('/items', (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const item = { id: nextId++, sku: req.body.sku, qty: req.body.qty };
  items.push(item);
  res.status(201).json(item);
});

app.put('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'not found' });
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  item.sku = req.body.sku;
  item.qty = req.body.qty;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'not found' });
  items.splice(index, 1);
  res.status(200).json({ deleted: true });                                   // defect: 200 + body instead of 204
});

// test helper: reset data between test runs
app.post('/reset', (req, res) => {
  items = [{ id: 1, sku: 'A-1', qty: 5 }, { id: 2, sku: 'B-2', qty: 0 }];
  nextId = 3;
  res.status(204).end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`inventory API listening on http://localhost:${port}`));
