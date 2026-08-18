# Next Knock — Master Implementation Plan

## Project Status

Current Phase: 0 — Product Definition

Project Type: New project built from scratch

Product Name:

Next Knock

Primary Tagline:

Know who to follow up with next.

Primary Goal:

Build and launch a focused, mobile-first PWA for cleaning businesses that helps owners track cleaning quotes and follow up on opportunities so potential jobs are not forgotten.

Commercial flow:

Meta Ads
→ Landing Page
→ Checkout
→ Payment Verification
→ Account Access
→ Next Knock PWA

IMPORTANT:

Build and validate the actual product BEFORE building the landing page, payment system, or advertising funnel.

---

# 1. LOCKED PRODUCT DIRECTION

## Product Name

Next Knock

## Brand Concept

"Next Knock" represents the next follow-up action a cleaning-business owner needs to make.

The product is not positioned as a generic CRM.

The core mental model is:

> Who do I need to follow up with next?

This concept should influence:

- product copy
- navigation
- dashboard language
- notifications/reminders
- landing page messaging
- advertising messaging

Do not overuse the phrase "knock" in every UI element. It is the brand concept, not a gimmick.

---

## Target Market

Cleaning businesses.

Primary user:

30+ year-old cleaning-business owners/operators.

The product is designed for practical business use, primarily from a smartphone.

---

## Subniche / Pain Point

Cleaning businesses can lose potential jobs because quotes are not properly tracked and prospects are forgotten or not followed up with at the right time.

Next Knock addresses this specific operational problem.

---

# 2. PRODUCT 1 CONCEPT

## Product

Next Knock is a focused mobile quote and follow-up tool for cleaning businesses.

Core purpose:

Help a cleaning-business owner:

1. Record a quote.
2. Track its current status.
3. Know which quotes need attention.
4. Follow up with prospects.
5. Update the quote outcome.

The product must remain focused on this problem.

It is NOT intended to become an all-in-one cleaning-business management platform.

---

# 3. CORE PRODUCT PROMISE

Working product promise:

> Know who to follow up with next.

Supporting positioning:

> Next Knock helps cleaning-business owners keep track of quotes and follow up before good opportunities disappear.

Do not make unsupported financial claims such as:

- "increase revenue by 40%"
- "double your bookings"
- "guaranteed more customers"

unless later supported by real evidence.

---

# 4. PRODUCT SCOPE RULE

Product 1 must have a narrow feature set.

Only implement features that directly support the core quote/follow-up workflow.

Do NOT automatically add:

- payroll
- accounting
- invoicing
- employee management
- GPS
- route optimization
- advanced scheduling
- full CRM functionality
- customer portals
- AI assistants
- chatbot
- automated marketing
- advanced analytics
- QuickBooks
- Google Calendar
- Zapier
- multi-location management
- complex reporting
- team management
- inventory
- expense management

Future functionality belongs in later products or versions.

Do not implement speculative functionality.

---

# 5. PRODUCT 1 CORE WORKFLOW

The fundamental workflow is:

Customer/Prospect
↓
Create Quote
↓
Record Quote Information
↓
Assign Quote Status
↓
Set Follow-up
↓
See Follow-up When Due
↓
Contact Prospect
↓
Update Quote Status
↓
Won / Lost / Still Pending

The exact fields and status options must be finalized during Phase 0.

Do not invent excessive fields.

Keep data entry fast on mobile.

---

# 6. CORE USER MENTAL MODEL

The application should answer one primary question:

> Who do I need to follow up with next?

The primary application experience should therefore prioritize:

1. Follow-ups that need attention today.
2. Active quotes.
3. Recently created quotes.
4. Quote status.
5. Easy follow-up action.
6. Easy status update.

Do not turn the home screen into a generic analytics dashboard.

Avoid unnecessary charts.

The owner should be able to open the application and immediately understand what needs attention.

---

# 7. USER EXPERIENCE PRINCIPLES

The product is mobile-first.

Primary device:

Smartphone.

Secondary device:

Desktop browser.

The application must not feel like a desktop dashboard squeezed into a phone.

Design the mobile experience first.

Priorities:

1. Fast
2. Simple
3. Clear
4. Low cognitive load
5. Minimal typing
6. Large touch targets
7. Obvious primary actions
8. Strong visual hierarchy
9. Minimal navigation
10. Immediate feedback

The interface should allow a cleaning-business owner to use it while moving between jobs.

---

# 8. UI / VISUAL DESIGN DIRECTION

## Overall Style

Professional, calm, modern productivity application.

Reference principles from:

- Linear
- Stripe
- Apple Human Interface Guidelines
- high-quality mobile productivity applications
- established mobile UX patterns

Use real product patterns as inspiration rather than inventing generic AI UI.

Research tools such as Mobbin may be used for studying established mobile interaction patterns.

Do not copy another company's branding or visual identity.

---

## Product UI Characteristics

Use:

- strong typography
- restrained color palette
- neutral backgrounds
- one primary accent
- subtle borders
- subtle shadows
- generous whitespace
- clear hierarchy
- consistent spacing
- simple iconography
- predictable interactions
- restrained animation

Avoid:

- excessive gradients
- neon colors
- glowing backgrounds
- excessive glassmorphism
- excessive rounded cards
- giant decorative icons
- unnecessary charts
- excessive badges
- excessive animations
- floating decorative blobs
- generic AI SaaS templates
- visual clutter
- fake complexity

The UI should look intentionally designed rather than AI-generated.

---

# 9. MOBILE UI RULES

Use mobile-native interaction conventions.

Primary interactive controls should be comfortable to tap.

Target approximately 44px minimum touch targets where practical.

Provide sufficient spacing between controls.

Avoid tiny icon-only controls for important actions.

Use familiar interactions.

Do not require complex gestures for essential functionality.

Every important action must have an obvious tap-based alternative.

Avoid forcing users through unnecessary screens.

Forms should minimize typing.

Use:

- sensible defaults
- appropriate input types
- date pickers where useful
- numeric keyboards for monetary values
- clear validation
- autofill-friendly fields

---

# 10. NAVIGATION

Keep navigation minimal.

Preferred pattern:

Mobile bottom navigation or another simple mobile-first navigation structure.

Potential sections:

- Home
- Quotes
- Follow-ups
- Settings

Only create navigation items corresponding to actual Product 1 functionality.

Do not create placeholder sections.

If Phase 0 determines that fewer navigation items are sufficient, use fewer.

---

# 11. PWA REQUIREMENTS

Next Knock is a Progressive Web App.

Requirements:

- Web App Manifest
- application icon
- appropriate theme metadata
- installability
- service worker
- responsive layout
- mobile-safe areas
- appropriate viewport handling
- application launch behavior
- appropriate caching strategy

Initial strategy:

ONLINE-FIRST.

Do not implement complicated offline synchronization unless the Product 1 workflow genuinely requires it.

---

# 12. TECHNOLOGY STACK

## Frontend

React

TypeScript

Use the simplest appropriate project structure.

---

## Backend

Cloudflare Workers.

Use Workers for:

- protected API operations
- authentication-related server logic
- database access
- payment webhooks
- other server-side operations

---

## Database

Cloudflare D1.

Use SQL migrations.

Keep schema minimal.

Only create tables/entities required by Product 1.

---

## Hosting

Cloudflare Pages / Cloudflare Workers architecture.

Avoid introducing:

- Vercel
- Render
- AWS
- VPS
- Supabase

unless a concrete technical requirement appears that cannot reasonably be handled by the selected Cloudflare stack.

---

## Payments

PayMongo.

Payment integration occurs AFTER the core product is working.

Never handle raw card information directly inside the application.

Payment verification must happen server-side.

---

# 13. PROJECT ARCHITECTURE

Prefer a single application and repository.

Conceptually:

/
Landing page

/login
Login

/signup
Account creation

/app
Authenticated application

/app/...
Application features

Do not create separate frontend applications unless technically necessary.

---

# 14. DEVELOPMENT PRINCIPLE

Build vertically and incrementally.

Do NOT attempt to build the entire SaaS in one OpenCode session.

Each phase must:

1. Inspect current project state.
2. Understand the existing implementation.
3. Implement only the current phase.
4. Run relevant tests.
5. Run the production build where applicable.
6. Fix failures.
7. Review the result.
8. Commit the completed phase.
9. Stop.

Do not silently proceed to future phases.

---

# 15. PROJECT-STATE-FIRST RULE

This is a new project being built from scratch.

At the beginning of each phase:

If the project folder is empty/new:

1. Confirm the current state.
2. Read this project.md.
3. Do not assume files already exist.
4. Create only what is required for the current phase.
5. Follow the locked stack.

If files already exist:

1. Inspect the existing structure.
2. Inspect package.json.
3. Inspect source files.
4. Inspect configuration.
5. Inspect tests.
6. Reuse existing functionality.
7. Do not create duplicate modules.
8. Do not rewrite working code without justification.

Never invent architecture without checking the actual project state.

---

# 16. PHASES

## PHASE 0 — PRODUCT DEFINITION

Goal:

Convert the already-established Next Knock product direction into a precise implementation specification.

This is NOT market research.

This is NOT niche discovery.

This is NOT another product ideation exercise.

The niche and problem direction are already established.

Phase 0 must define:

- exact Product 1 promise
- exact core workflow
- exact MVP features
- exact required screens
- quote fields
- quote statuses
- follow-up behavior
- dashboard requirements
- required data/entities
- authentication requirements
- mobile UX requirements
- explicit non-features
- Product 1 definition of done

If a minor implementation decision is necessary, choose the simplest reasonable option and document it.

Do not stop for unnecessary questions.

Only stop if a decision would materially change the product itself.

Output:

A concrete Next Knock Product 1 specification.

---

## PHASE 1 — PROJECT FOUNDATION

Goal:

Create the actual Next Knock application foundation.

Tasks:

- initialize React + TypeScript project
- establish build system
- establish development scripts
- establish linting/formatting
- establish testing
- establish basic application structure
- establish Cloudflare configuration
- establish environment variable strategy
- establish initial PWA foundation
- establish basic design system foundations

Do not implement full product features yet.

Output:

A clean runnable Next Knock project.

---

## PHASE 2 — PRODUCT UI / UX

Goal:

Build the complete Next Knock Product 1 interface using realistic mock data.

Tasks depend on Phase 0 specification.

Build:

- application shell
- mobile navigation
- dashboard/home
- quote workflow
- follow-up workflow
- required detail screens
- required forms
- settings if required
- loading states
- empty states
- error states
- success states
- confirmation states

The UI must be functional with mock/local data.

Focus heavily on mobile.

Output:

A visually complete, mobile-first Next Knock prototype.

---

## PHASE 3 — CORE PRODUCT FUNCTIONALITY

Replace mock behavior with actual application logic.

For every workflow:

User action
→ Validation
→ Business logic
→ State update
→ UI feedback
→ Error handling

Implement only functionality defined during Phase 0.

Output:

A locally functional Next Knock Product 1.

---

## PHASE 4 — DATABASE

Implement Cloudflare D1.

Tasks:

- schema
- migrations
- database access
- Workers API
- persistence
- validation
- error handling
- database tests

Every user-owned record must support ownership/authorization.

Do not create speculative tables.

Output:

Persistent application data.

---

## PHASE 5 — AUTHENTICATION + AUTHORIZATION

Implement:

- signup
- login
- logout
- sessions
- protected routes
- server-side authentication
- authorization
- user ownership

Critical rule:

The frontend must never be trusted to determine which user's data can be accessed.

The backend must derive identity from the authenticated session.

Output:

Secure multi-user application foundation.

---

## PHASE 6 — SECURITY VALIDATION

Test:

- authentication bypass
- authorization bypass
- cross-user data access
- malicious input
- SQL injection
- XSS
- CSRF where applicable
- session security
- secret exposure
- API abuse
- rate limiting where appropriate

Output:

Security-reviewed Next Knock Product 1.

---

## PHASE 7 — PWA + MOBILE QA

Implement/finalize:

- installability
- manifest
- icons
- service worker
- responsive layouts
- safe areas
- mobile navigation
- mobile forms
- touch interactions

Test:

- Android Chrome
- iOS Safari
- desktop browser

Output:

Installable mobile-first Next Knock PWA.

---

## PHASE 8 — PRODUCT QA

Perform full product testing.

Test:

- new account
- returning account
- complete core workflow
- editing
- validation
- empty states
- errors
- network failures
- session expiration
- logout/login
- cross-user isolation
- mobile usage
- PWA installation
- persistence

Major milestone:

NEXT KNOCK PRODUCT 1 READY.

Do not proceed to commercial implementation until the core product is genuinely usable.

---

## PHASE 9 — LANDING PAGE

Only after Product 1 is usable.

Landing page objective:

Convert cold traffic into buyers.

Structure:

- Hero
- Problem
- Solution
- Product demonstration
- Actual product screenshots
- Benefits
- How it works
- Pricing
- FAQ
- CTA

The marketing page may use a more editorial/Awwwards-inspired visual treatment than the application.

However:

Do not use visual effects merely for decoration.

The page must remain fast, readable, mobile-first, and conversion-focused.

Do not use fake testimonials or unsupported claims.

---

## PHASE 10 — PAYMONGO

Implement:

Landing page
→ PayMongo
→ Payment
→ Webhook
→ Server verification
→ D1 payment record
→ Customer entitlement
→ Account access

Handle:

- success
- failure
- cancellation
- duplicate webhook
- delayed webhook
- invalid webhook
- refresh after payment
- payment/access mismatch
- unauthorized access

Never trust frontend payment state.

---

## PHASE 11 — COMMERCIAL ACCESS

Initial pricing hypothesis:

$19–$29 USD one-time purchase.

Do not build recurring subscriptions initially.

The goal is to validate:

- willingness to pay
- product usefulness
- conversion
- usage

Subscription functionality can be considered later if justified by actual demand.

---

## PHASE 12 — PRODUCTION DEPLOYMENT

Deploy:

- frontend
- Workers
- D1
- production migrations
- environment variables
- secrets
- custom domain
- HTTPS
- PWA
- production API
- production payment webhook

Verify everything in production.

---

## PHASE 13 — COMPLETE CUSTOMER JOURNEY

Simulate a real customer.

Meta Ad
→ Landing Page
→ Understand Product
→ CTA
→ Checkout
→ Payment
→ Account
→ Next Knock PWA
→ Core Workflow
→ Close
→ Return
→ Data persists

No developer intervention should be required.

---

## PHASE 14 — META ADS

Only begin after Phase 13 passes.

Initial budget:

Within the total $90 project investment limit.

Track:

- impressions
- CPM
- CTR
- landing-page visits
- CTA clicks
- checkout starts
- purchases
- cost per purchase
- revenue
- conversion rate

Treat advertising as a validation experiment.

---

## PHASE 15 — FUNNEL OPTIMIZATION

Diagnose problems by stage.

High impressions + low CTR:

Ad problem.

Good CTR + low landing conversion:

Landing page/offer problem.

Good landing conversion + low checkout starts:

CTA/pricing/trust problem.

Checkout starts + low purchases:

Payment/price/trust problem.

Purchases + low product usage:

Product/onboarding problem.

Strong usage + repeated requests for missing functionality:

Candidate for next product/version.

Do not randomly change everything at once.

---

# 17. DESIGN SYSTEM RULES

Establish a small reusable design system.

Define:

- typography scale
- spacing scale
- radius scale
- button variants
- input styles
- card styles
- status indicators
- navigation
- modal/dialog behavior
- toast/feedback
- loading states
- empty states

Do not create dozens of variants.

Prefer a small number of consistent primitives.

---

# 18. ANIMATION RULES

Animation should communicate:

- navigation
- state changes
- confirmation
- hierarchy
- loading

Do not animate everything.

Avoid:

- excessive page transitions
- bouncing elements
- decorative floating objects
- constant motion
- attention-grabbing animations unrelated to user actions

The product should feel polished, not animated.

---

# 19. ACCESSIBILITY

Support:

- readable contrast
- keyboard navigation where applicable
- semantic HTML
- labels for inputs
- visible focus states
- appropriate touch targets
- meaningful error messages
- accessible dialogs
- accessible buttons
- screen-reader-friendly labels where appropriate

Accessibility is part of product quality.

---

# 20. PERFORMANCE

Prioritize:

- fast initial load
- minimal JavaScript
- optimized assets
- lazy loading where appropriate
- minimal dependencies
- efficient database queries
- responsive interactions

Do not add large libraries for simple functionality.

---

# 21. SECURITY RULES

Never:

- expose secrets
- trust client-side authorization
- trust client-side payment status
- accept arbitrary user IDs for authorization
- construct unsafe SQL
- store passwords insecurely
- log sensitive credentials
- put private API keys in frontend code

Security-sensitive logic belongs server-side.

---

# 22. BUDGET

Maximum initial investment:

$90 USD.

Target:

Minimal recurring infrastructure cost.

Preferred:

Cloudflare free allowances where sufficient.

Avoid unnecessary paid services.

Advertising is the primary initial variable expense.

---

# 23. GIT CHECKPOINTS

Create meaningful commits after major completed phases.

Suggested:

product-spec-complete
foundation-complete
ui-complete
core-product-complete
database-complete
auth-complete
security-complete
pwa-complete
product-qa-complete
landing-page-complete
payments-complete
production-ready

Do not commit known broken states as completed milestones.

---

# 24. DEFINITION OF DONE

Product 1 is launch-ready when:

PRODUCT

- [ ] Core problem is clearly defined
- [ ] Product promise is clear
- [ ] Core workflow works
- [ ] MVP features work
- [ ] Non-features remain excluded
- [ ] Product is understandable without developer explanation

MOBILE

- [ ] Mobile-first UI
- [ ] Android tested
- [ ] iPhone tested
- [ ] PWA install works
- [ ] Touch interactions work
- [ ] Forms work properly

BACKEND

- [ ] D1 works
- [ ] Workers work
- [ ] Migrations work
- [ ] Persistence works
- [ ] Errors are handled

SECURITY

- [ ] Authentication works
- [ ] Authorization works
- [ ] Cross-user access is blocked
- [ ] Secrets are protected
- [ ] Payment verification is server-side

COMMERCIAL

- [ ] Landing page works
- [ ] Pricing is clear
- [ ] PayMongo works
- [ ] Payment webhook works
- [ ] Paid access is granted correctly
- [ ] Payment bypass is blocked

PRODUCTION

- [ ] Cloudflare deployment works
- [ ] Domain works
- [ ] HTTPS works
- [ ] Production database works
- [ ] Production PWA works
- [ ] Complete customer journey works

MARKETING

- [ ] Meta Ads tracking works
- [ ] Landing conversion can be measured
- [ ] Purchases can be measured
- [ ] Initial creatives are ready

---

# 25. AUTHORITATIVE DEVELOPMENT ORDER

Do not change this order without a concrete technical/business reason.

0. Product Definition
1. Project Foundation
2. Product UI/UX
3. Core Product
4. Database
5. Authentication
6. Security
7. PWA + Mobile QA
8. Product QA
9. Landing Page
10. PayMongo
11. Commercial Access
12. Production Deployment
13. Complete Customer Journey
14. Meta Ads
15. Optimization

Fundamental strategy:

DEFINE
→ BUILD
→ TEST
→ SELL
→ MEASURE
→ IMPROVE

Not:

BUILD LANDING PAGE
→ RUN ADS
→ DISCOVER PRODUCT PROBLEMS LATER.

---

# 26. CURRENT STATE

Current Phase:

PHASE 0

Next action:

Finalize the Next Knock Product 1 specification.

After Phase 0:

User reviews the specification.

Then proceed to Phase 1.

Do not automatically implement Phase 1 immediately after Phase 0 without explicit instruction.

---

# 27. BRAND NOTE

Working brand:

Next Knock

Working tagline:

Know who to follow up with next.

The name should be treated as the chosen working product identity for development.

Before purchasing domains, registering trademarks, or spending significant money on branding, perform a final availability/trademark/domain clearance check.

Do not allow naming/branding work to block Product 1 development.