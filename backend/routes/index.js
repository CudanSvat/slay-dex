var express = require('express');
var router = express.Router();
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../memecoins.db'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Create table if not exists
const createTable = `CREATE TABLE IF NOT EXISTS pairs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address TEXT NOT NULL,
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);`;
db.prepare(createTable).run();

// List all pairs
router.get('/api/pairs', function(req, res, next) {
  const pairs = db.prepare('SELECT * FROM pairs').all();
  res.json({ pairs });
});

// Submit a new pair
router.post('/api/pairs', function(req, res, next) {
  const { address, name, logo, description } = req.body;
  if (!address || !name) return res.status(400).json({ error: 'address and name required' });
  const stmt = db.prepare('INSERT INTO pairs (address, name, logo, description, status) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(address, name, logo || '', description || '', 'pending');
  const pair = db.prepare('SELECT * FROM pairs WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ pair });
});

// Admin approve/reject/edit a pair
router.patch('/api/pairs/:id', function(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const fields = ['address', 'name', 'logo', 'description', 'status'];
  const updates = [];
  const values = [];
  fields.forEach(f => {
    if (req.body[f] !== undefined) {
      updates.push(`${f} = ?`);
      values.push(req.body[f]);
    }
  });
  if (updates.length === 0) return res.status(400).json({ error: 'No valid fields to update' });
  values.push(id);
  const stmt = db.prepare(`UPDATE pairs SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
  const result = stmt.run(...values);
  if (result.changes === 0) return res.status(404).json({ error: 'Pair not found' });
  const pair = db.prepare('SELECT * FROM pairs WHERE id = ?').get(id);
  res.json({ pair });
});

module.exports = router;
