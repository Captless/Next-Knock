# Next Knock — Product 1 Specification

Phase 0 deliverable. Implementation-ready spec for Phase 1+.

---

## 1. Exact Problem

Cleaning-business owners lose potential jobs. Quotes scattered across texts, notes, memory. No single place to track which prospects need follow-up and when. Forgotten quotes = missed revenue.

## 2. Product Promise

Primary: Know who to follow up with next.

Supporting: Next Knock helps cleaning-business owners keep track of quotes and follow up before good opportunities disappear.

No unsupported financial claims (no "+40% revenue", no "guaranteed bookings").

## 3. Primary User

- 30+ year-old cleaning-business owner/operator
- Primary device: smartphone
- Usage context: between jobs, on-site, in vehicle
- Needs: fast, low-cognitive-load interaction, minimal typing

## 4. Core User Workflow

```
Prospect → Create Quote → Set Status → Set Follow-up Date →
Home shows "Due Today" → Contact Prospect → Update Status →
Won / Lost / Still Pending
```

## 5. MVP Features

| Feature | Included |
|---------|----------|
| Create quote with required fields | yes |
| Quote status tracking (4 statuses) | yes |
| Follow-up date per quote | yes |
| Home dashboard: Due Today + Active + Recent | yes |
| Tap-to-call / tap-to-message prospect | yes |
| Update quote status inline | yes |
| Edit quote details | yes |
| Delete quote | yes |
| Settings: business name, notification toggle | yes (toggle = placeholder, no real notifications) |
| PWA installability | yes |
| Authentication (email/password) | yes |

## 6. Required Screens

1. Login / Signup — email + password
2. Home / Dashboard — primary screen
3. Quotes List — all quotes, filterable by status
4. Quote Detail — view all fields, actions
5. Create Quote — form
6. Edit Quote — prefilled form
7. Settings — business name, logout
8. Empty / Offline / Error states (inline within other screens)

## 7. Quote Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Customer Name | text | yes | |
| Phone | tel | yes | tel: link on detail |
| Email | email | no | mailto: link |
| Address | text | no | single line |
| Service Type | select | yes | House / Office / Move-in-out / Post-construction / Other |
| Quote Amount | number (currency) | yes | numeric keyboard, 2 decimals, stored as integer cents |
| Status | select | yes | 4 values, see section 8 |
| Follow-up Date | date | no | defaults to +3 days from creation |
| Notes | textarea | no | max 500 chars |
| Created At | timestamp | auto | |
| Updated At | timestamp | auto | |

## 8. Quote Statuses

Exactly 4 top-level statuses:

| Status | Meaning | Home Bucket |
|--------|---------|-------------|
| Draft | Created, not yet sent | Recent only |
| Sent | Quote delivered, awaiting response | Active + Due Today (if date due) |
| Follow Up | Contacted, needs another touch | Active + Due Today (if date due) |
| Closed | Final outcome set | Hidden from Home, filterable in Quotes |

Closed sub-outcome (required when status = Closed):
- Won — job booked
- Lost — declined or ghosted
- Archived — no longer pursuing

Transitions:
```
Draft → Sent
Draft → Closed (rare)
Sent → Follow Up
Sent → Closed
Follow Up → Closed
Closed → (terminal, except Admin override future)
```

## 9. Follow-up Behavior

- One follow-up date per quote (nullable)
- Default on create: creation date + 3 days
- User can change date anytime via edit
- Home "Due Today" = quotes where followUpDate <= today AND status in {Sent, Follow Up}
- Quote detail shows "Call" / "Message" actions (native tel: / sms: / mailto: intents)
- After contact: user updates status (Sent → Follow Up, or → Closed)
- No automated push notifications in Product 1

## 10. Home / Dashboard Behavior

Primary screen on app open. Three sections, fixed order:

1. Follow Up Today — quotes due today, most urgent first (oldest followUpDate first)
2. Active Quotes — status Sent or Follow Up, not due today, sorted by followUpDate ascending
3. Recent — last 5 created (any status), newest first

Each row: Customer name • Service type • Amount • Status badge • Follow-up date if set • Chevron to detail.

Empty states: helpful copy + "Create Quote" primary CTA.

No charts. No analytics tiles.

## 11. Data / Entities

```sql
User {
  id              TEXT PK
  email           TEXT UNIQUE NOT NULL
  passwordHash    TEXT NOT NULL
  businessName    TEXT
  createdAt       INTEGER (unix ms)
}

Quote {
  id              TEXT PK
  userId          TEXT FK → User.id NOT NULL
  customerName    TEXT NOT NULL
  phone           TEXT NOT NULL
  email           TEXT
  address         TEXT
  serviceType     TEXT NOT NULL
  amountCents     INTEGER NOT NULL
  status          TEXT NOT NULL  -- Draft | Sent | Follow Up | Closed
  outcome         TEXT           -- Won | Lost | Archived (required when status = Closed)
  followUpDate    INTEGER        -- unix ms, nullable
  notes           TEXT
  createdAt       INTEGER NOT NULL
  updatedAt       INTEGER NOT NULL
}

INDEX Quote(userId, status, followUpDate)
```

## 12. Authentication Requirements

- Email + password only (no social, no magic links in P1)
- JWT in HttpOnly cookie, Secure, SameSite=Lax
- Session lifetime: 30 days rolling
- Protected routes: /app/*
- Server-side auth check on every API call
- Password hashing: bcrypt (cost 10+), min 8 chars
- No password reset flow in P1 (documented limitation)
- Frontend never decides access — backend derives identity from session

## 13. Mobile / PWA Requirements (P1 scope)

- Web App Manifest: name, short_name, icons (192, 512), theme_color, display=standalone, start_url=/
- Service Worker: cache-first for static assets, network-first for API
- Responsive: 375px–1440px breakpoints
- Safe area insets (iOS notch, Android gesture bar)
- Viewport: width=device-width, initial-scale=1, viewport-fit=cover
- Touch targets: minimum 44px
- Install prompt: browser-native, no custom banner
- Online-first: no offline data mutation in P1
- App icon + splash via manifest

## 14. Explicit Non-Features (P1)

Not in Product 1:
- Multiple follow-up dates per quote
- Recurring follow-ups
- Push notifications
- Email / SMS templates
- Quote PDF generation
- Customer portal
- Team / multi-user accounts
- Export / import
- Search (small list; scroll sufficient)
- Tags beyond service type
- Photo attachments
- Calendar sync
- Analytics / dashboard charts
- Dark mode (single neutral light theme)
- Password reset flow
- Offline quote creation
- Recurring / subscription billing (one-time payment in later phase)
- AI assistant, chatbot
- Payroll, accounting, invoicing, employee management
- GPS, route optimization, advanced scheduling
- Full CRM features
- Multi-location management
- Complex reporting
- Team management
- Inventory, expense management
- QuickBooks, Google Calendar, Zapier integrations
- Automated marketing

## 15. Product 1 Definition of Done

- All 8 screens implemented and navigable
- Quote CRUD works end-to-end
- Home correctly buckets quotes per section 10 rules
- Status transitions work: Draft → Sent → Follow Up → Closed(Won|Lost|Archived)
- Follow-up date drives "Due Today" bucket
- Tap-to-call / tap-to-message works on device (tel: / sms: / mailto:)
- Auth flow: signup → login → protected app → logout
- PWA installs on Android Chrome and iOS Safari
- Responsive on mobile + desktop
- No console errors, no TypeScript errors
- Production build passes (npm run build)
- Cross-user data isolation verified
- All known non-features remain excluded

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| 4 statuses + Closed sub-outcome | Covers workflow without over-engineering |
| Default follow-up = +3 days | Industry standard for quote follow-up cadence |
| Single follow-up date | Simplicity; multiple = future phase |
| Amount stored as integer cents | Avoids floating-point errors |
| No password reset in P1 | Reduces scope; documented limitation |
| Online-first PWA | Offline sync adds significant complexity not justified by core workflow |
| Service type as fixed select | Faster than free-text; covers ~95% of cleaning jobs |
| Max 500 char notes | Prevents abuse; sufficient for context |
| Single light theme | Dark mode is non-essential for P1 validation |
| Notification toggle in settings = placeholder | UI present, no real notifications; prepares for later phase |
| 30-day rolling session | Balance between security and mobile re-auth friction |
| Index on (userId, status, followUpDate) | Optimizes Home dashboard query |

## Assumptions Made

1. Users will have <200 active quotes (no pagination / search needed in P1)
2. Single business owner per account (no team features)
3. Quotes created after verbal or on-site discussion (not in-prospect-facing)
4. Phone is primary contact method (tap-to-call prominent)
5. Email is secondary contact (mailto: link)
6. Cleaning-business owner has reliable mobile data (online-first acceptable)
7. Cloudflare D1 / Workers handle auth + data in later phases
8. $19–$29 USD one-time purchase validated after product works
9. English-language UI only in P1 (internationalization = future)
10. User uses one device type primarily; no multi-device sync expectations beyond standard auth

## Phase Boundaries

This file is the only output of Phase 0. No code, no scaffolding, no dependencies installed. Phase 1 begins project foundation setup per project.md.