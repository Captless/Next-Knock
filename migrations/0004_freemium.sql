-- Freemium support (Phase: payment-funnel)
-- Adds plan tracking + atomic lifetime quote counter for free-tier limit.

ALTER TABLE users ADD COLUMN plan TEXT NOT NULL DEFAULT 'free';
ALTER TABLE users ADD COLUMN quotes_created INTEGER NOT NULL DEFAULT 0;
