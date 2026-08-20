# Next Knock — Product 1 Specification (Phase 0)

## 1. Problem
Cleaning-business owners lose quotes. Prospects forgotten. Follow-up missed. Revenue lost.

## 2. Promise
**Primary:** Know who to follow up with next.
**Supporting:** Next Knock helps cleaning-business owners keep track of quotes and follow up before good opportunities disappear.

## 3. User
30+ cleaning-business owner/operator. Primary device: smartphone. Uses app between jobs.

## 4. Core Workflow
Prospect → Create Quote → Set Status → Set Follow-up Date → Home shows "Due Today" → Contact → Update Status → Won/Lost/Archived

## 5. MVP Features
- Create/Read/Update/Delete quote
- 4 statuses + Closed sub-outcome
- One follow-up date per quote
- Home dashboard (Due Today / Active / Recent)
- Tap-to-call / tap-to-message
- Auth (email + password)
- PWA install
- Settings (business name, notif toggle UI only)

## 6. Screens (8)
1. Login / Signup
2. Home (default on open)
3. Quotes List
4. Quote Detail
5. Create Quote
6. Edit Quote
7. Settings
8. Empty/Error states (inline, not separate screens)

## 7. Quote Fields
| Field | Type | Required |
|-------|------|----------|
| Customer Name | text | yes |
| Phone | tel | yes |
| Email | email | no |
| Address | text | no |
| Service Type | select | yes |
| Quote Amount | number (cents) | yes |
| Status | select | yes |
| Follow-up Date | date | no (default +3d) |
| Notes | textarea (500 char max) | no |

Service Type options: House / Office / Move-in-out / Post-construction / Other.

## 8. Statuses (4 + sub-outcome)
| Status | Home Bucket |
|--------|-------------|
| Draft | Recent only |
| Sent | Active + Due Today if date due |
| Follow Up | Active + Due Today if date due |
| Closed | Hidden from Home; filterable |

Closed sub-outcome: Won / Lost / Archived (required on close).

## 9. Follow-up Behavior
- One follow-up date per quote, nullable
- Default: creation + 3 days
- "Due Today" = followUpDate <= today AND status ∈ {Sent, Follow Up}
- Tap row → Call (tel:) / Message (sms:) native intents
- After contact → user updates status
- No push notifications in P1

## 10. Home Dashboard
Primary screen on app open. Three sections top-to-bottom:
1. **Follow Up Today** — due today, urgent first
2. **Active Quotes** — Sent/Follow Up not due, sorted by follow-up date asc
3. **Recent** — last 5 created, newest first

Row: Customer • Service • Amount • Status badge • Follow-up date • chevron.

No charts. No analytics widgets.

## 11. Entities
```
User { id, email, passwordHash, businessName, createdAt }
Quote { id, userId, customerName, phone, email, address,
        serviceType, amountCents, status, closedOutcome,
        followUpDate, notes, createdAt, updatedAt }
```

Amount stored as integer cents.

## 12. Auth
- Email + password only
- Min 8 chars, bcrypt
- JWT in HttpOnly cookie (SameSite=Lax, Secure in prod), 30d rolling
- Protected: `/app/*`
- No password reset in P1 (documented limitation)

## 13. PWA / Mobile
- Manifest: name, short_name, icons 192/512, theme_color, display=standalone
- Service worker: cache-first static, network-first API
- Viewport-fit=cover, safe-area insets
- Touch targets ≥44px
- Online-first (no offline mutation)
- Install on Android Chrome + iOS Safari

## 14. Non-Features (P1)
Multiple follow-up dates, recurring, push notifs, SMS/email templates, PDF quotes, customer portal, team/multi-user, export/import, search, tags, photo attachments, calendar sync, analytics charts, dark mode, password reset, offline create.

## 15. Definition of Done
- 8 screens built and navigable
- Quote CRUD end-to-end
- Status transitions: Draft→Sent→Follow Up→Closed(Won/Lost/Archived)
- Due Today bucket correct
- tap-to-call/tap-to-message work on device
- Auth: signup→login→protected app→logout
- PWA install on Android + iOS
- Responsive 375–1440px
- No TS errors, no console errors
- `npm run build` passes

---

## Decisions
| Decision | Rationale |
|----------|-----------|
| 4 statuses + Closed sub-outcome | Covers workflow w/o over-engineering |
| Default follow-up = +3d | Industry norm |
| Single follow-up date | Simplicity |
| Amount = integer cents | No float errors |
| No password reset P1 | Scope reduction; documented |
| Online-first PWA | Offline sync = big complexity |
| Fixed service type select | Faster than free-text |
| 500-char note cap | Abuse prevention |

## Assumptions
1. <200 active quotes per user (no pagination/search)
2. One user per business (no team)
3. Quotes made after verbal/site discussion
4. Phone is primary contact (tap-to-call prominent)
5. D1/Workers handle auth+data in later phases
6. $19-29 one-time validated post-launch