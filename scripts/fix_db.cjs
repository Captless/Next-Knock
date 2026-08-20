const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(process.argv[2]);
db.exec("ALTER TABLE quotes RENAME COLUMN lost_reason TO closed_reason;");
db.exec(`CREATE TABLE IF NOT EXISTS quote_activity (
  id TEXT PRIMARY KEY,
  quote_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TEXT NOT NULL
);`);
const cols = db.prepare('SELECT name FROM pragma_table_info(?)').all('quotes').map((r) => r.name);
console.log('quotes cols:', cols.join(','));
const t = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='quote_activity'").get();
console.log('quote_activity exists:', !!t);
