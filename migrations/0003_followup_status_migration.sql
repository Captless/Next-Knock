-- Migrate persisted 'follow_up' lifecycle status to 'sent'.
-- Follow-up behavior is now derived from follow_up_date, so the separate
-- status is no longer needed. The follow-up date is preserved.
-- Safe: no columns dropped, no data lost; status text simply normalized.

UPDATE quotes SET status = 'sent' WHERE status = 'follow_up';
