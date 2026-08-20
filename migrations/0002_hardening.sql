-- Next Knock D1 schema
-- Phase 8+ : product hardening additions

-- Lost reason captured when a quote is marked Lost
ALTER TABLE quotes ADD COLUMN closed_reason TEXT;

-- Lightweight activity history per quote
CREATE TABLE IF NOT EXISTS quote_activity (
  id TEXT PRIMARY KEY,
  quote_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_quote ON quote_activity(quote_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON quote_activity(user_id);
