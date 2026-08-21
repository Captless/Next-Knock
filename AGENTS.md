# AGENTS.md — Next Knock

Next Knock is a mobile-first PWA for cleaning businesses to manage quotes and follow-ups. Core value: help businesses know who to follow up with next.

You are working on a real production product. Treat the repository as the implementation source of truth. Do not invent architecture, files, routes, APIs, dependencies, database structures, or completed functionality.

## 1. SOURCE OF TRUTH

Use this authority order:

1. Current repository/code — actual implementation.
2. `docs/plans/project.md` — locked product direction and scope.
3. `docs/plans/product-hardening.md` — hardening requirements.
4. `specs/product-1-spec.md` — product specification.
5. Task-specific plans under `docs/plans/`.
6. `docs/qa/` — verification requirements.

If sources conflict:

- Do not silently choose one.
- Identify the conflict.
- Inspect the repository.
- Stop and report if the conflict affects architecture, data, security, product scope, or destructive changes.

Never assume a previous implementation is still current. Verify it.

## 2. BEFORE EDITING

Always inspect the current implementation before changing code.

At minimum, inspect the relevant:

- Repository structure.
- Routes/pages.
- Components.
- Hooks/services.
- Shared logic/types.
- API/Workers.
- Database/migrations.
- Authentication/authorization.
- Styles/design system.
- PWA configuration.
- Tests.
- Dependencies.

For UI work, inspect the existing responsive implementation and reusable components before creating anything.

For database work, inspect existing tables, relationships, queries, migrations, and data compatibility first.

For security-sensitive work, trace the complete request path from client to server/database.

Do not edit based only on a task description.

## 3. CURRENT STATE VS INVARIANTS

Do not hardcode temporary implementation details into this file.

Repository details such as:

- exact component names,
- exact layout classes,
- current breakpoints,
- current file paths,
- current max-widths,
- current component composition

must be verified from the repository when needed.

This file defines principles and invariants, not a frozen copy of the codebase.

If the repository has evolved, follow the current implementation unless it conflicts with an authoritative product/security requirement.

## 4. STACK

Current stack:

- React
- TypeScript
- Vite
- Cloudflare Pages/Functions
- Cloudflare D1
- Tailwind CSS
- Vite PWA tooling
- Vitest
- Zod
- JWT sessions using `jose`
- `bcryptjs`

Auth implementation (verified in `src/server/auth.ts`, `functions/_helpers.ts`):

- `jose` (`SignJWT`/`jwtVerify`) issues and verifies the session token.
- `bcryptjs` hashes and verifies passwords server-side.
- Session is an HttpOnly cookie (`COOKIE_NAME = 'nk_session'`, `SameSite=Lax`) set via `Set-Cookie` in `functions/_helpers.ts` (`withCookie`). Never expose the token to client JS.
- `getSecret(env)` reads `JWT_SECRET` (falls back to an insecure dev secret). Set server-only secrets via `wrangler secret put`.

Do not introduce another framework, database, backend platform, authentication provider, payment provider, or major dependency without explicit justification and approval.

Reuse the existing stack.

## 5. ARCHITECTURE

Frontend:

- React/TypeScript application.
- Routes/pages live in the repository's existing route structure.
- Reusable UI lives in the existing component structure.
- Import path alias `@` → `src/` (configured in `vite.config.ts` and `vitest.config.ts`). Use `@/...` imports, not relative paths.

PWA (verified in `vite.config.ts`):

- `vite-plugin-pwa` generates the manifest and service worker.
- API routes (`/api/*`) are cached with Workbox `NetworkFirst` and an 8s network timeout (`api-cache`). Other assets use precache.
- `npm run build` runs `scripts/generate-icons.mjs` first to produce PWA icons; do not skip it.

Backend:

- Cloudflare Pages Functions under the existing API structure.
- Existing server helpers and shared logic must be reused.

Database:

- Cloudflare D1.
- Existing migrations are append-only.
- Never modify an already-applied migration to change production data.
- Add a new numbered migration when a schema change is genuinely required.

Shared code:

- `src/shared/` is the source of truth for domain types, Zod schemas, and business logic.
- `src/lib/*.ts` and `src/types/index.ts` are thin re-export shims (`export * from '../shared/...'`). Edit the files in `src/shared/`, not the re-export shims.
- Do not duplicate domain types, schemas, or business logic in route/components.

Before adding a new abstraction, search for an existing one.

## 6. PRODUCT SCOPE

Next Knock is focused on:

- Quotes.
- Quote lifecycle.
- Follow-ups.
- Rescheduling.
- Quote history/activity.
- Won/lost outcomes.
- Lost reasons.
- Search/filtering.
- Account/authentication/settings.
- PWA/mobile usability.

Do not turn Next Knock into a generic CRM.

Do not add unrelated:

- Invoicing.
- Team management.
- Advanced scheduling.
- Analytics dashboards.
- AI features.
- Marketing automation.
- Large CRM functionality.
- Unapproved integrations.

If a requested change expands product scope, explicitly label it:

`CHANGE FROM CURRENT PLAN`

and explain:

- Existing decision.
- Proposed change.
- Reason.
- Benefits.
- Risks.
- Migration impact.
- Recommendation.

Never expand scope silently.

## 7. DOMAIN INVARIANTS

Preserve the repository's current approved quote lifecycle and follow-up model.

Quote lifecycle (verified in `src/shared/types.ts`, `src/shared/quote-logic.ts`, `src/shared/dashboard.ts`):

- `QuoteStatus` is `draft | sent | closed`. There is **no** `follow_up` status.
- `ClosedOutcome` is `won | lost | archived`. Only `won`/`lost` are terminal.
- Follow-up is **date-derived**, not a status: a quote needs follow-up when `status === 'sent'` **and** `followUpDate <= today` and not terminal (`isFollowUp()` in `src/shared/dashboard.ts`). Follow-up dates are auto-assigned on sent via `normalizeNewQuote`/`normalizePatch` in `src/shared/quote-logic.ts`.

Do not reintroduce removed concepts simply because older code, documentation, or generated code contains them.

Before changing domain logic:

1. Inspect current schema.
2. Inspect shared types/schema.
3. Inspect server logic.
4. Inspect UI usage.
5. Inspect tests.
6. Inspect migrations.

Update all affected layers consistently.

Never fix a domain inconsistency only in the frontend.

## 8. UI / UX

Next Knock is mobile-first.

Mobile-first means:

- Mobile remains a first-class experience.
- Touch interactions remain comfortable.
- Primary actions remain obvious.
- Navigation remains usable.
- Content remains compact and focused.

It does NOT mean mobile-only.

Desktop must also be intentionally designed.

Responsive behavior must adapt the same product to available space rather than creating separate applications.

Current responsive implementation (verify from the repository before relying on it; values below are current, not permanent architecture):

- Desktop shell uses a fixed sidebar (`SidebarNav`) at the `lg` breakpoint and a bottom nav (`BottomNav`) below `lg`.
- App shell content is width-contained (centered max-width wrapper in `AppShell`). Do not reintroduce per-page full-width stretching.
- Tailwind default breakpoints are used; no custom breakpoints are defined. Confirm current classes in `tailwind.config.js` and the component before assuming.

Prefer:

- Existing responsive utilities.
- Existing design tokens.
- Shared components.
- CSS responsive behavior.
- Controlled containers.
- Grid/flex layouts.

Avoid:

- Duplicate mobile/desktop React trees.
- Arbitrary pixel positioning.
- Excessive full-width layouts.
- Unnecessary cards.
- UI added only to fill empty space.
- New design systems without need.

Before changing UI, inspect existing components and reuse them.

Do not create a new button/card/input/dialog variant if an existing primitive already supports the requirement.

## 9. DESIGN SYSTEM

Use the existing project design tokens and reusable primitives.

Do not hardcode colors, typography, spacing, shadows, or component styles when an existing token/primitive exists.

If a new design token is genuinely necessary:

- Verify that no existing token can satisfy the requirement.
- Add the smallest reusable token.
- Keep naming consistent with the current system.

Do not introduce a UI library just to solve a local layout problem.

## 10. SECURITY

Security is a server-side responsibility.

Always consider:

- Authentication.
- Authorization.
- User/data isolation.
- IDOR.
- Server-side validation.
- SQL injection.
- XSS.
- CSRF where applicable.
- Session handling.
- Password security.
- Secret exposure.
- Error leakage.
- Account deletion.
- API abuse/rate limiting where applicable.
- Payment/webhook security where applicable.

Never trust frontend validation as authorization.

Identity and ownership must be derived/verified server-side.

Never accept a client-supplied user ID as proof of ownership.

Never expose secrets to client code.

Do not weaken existing security checks to simplify UI or API implementation.

Security-sensitive changes require relevant security tests.

## 11. DATABASE

Before schema changes:

- Inspect existing migrations.
- Inspect current schema.
- Inspect relationships.
- Inspect queries.
- Check compatibility with existing data.
- Check deletion/ownership implications.

Do not:

- Drop data casually.
- Rename tables casually.
- Modify applied migrations.
- Duplicate existing data structures.
- Add tables without a verified product requirement.

Prefer the smallest compatible schema change.

## 12. API / SERVER

All important validation and authorization must occur server-side.

For API changes verify:

- Authentication.
- Authorization.
- Input validation.
- Ownership.
- Error handling.
- Database behavior.
- Response shape.
- Existing callers.

Do not rely on hidden frontend fields or disabled buttons for security.

Do not expose internal errors, stack traces, secrets, or sensitive database information.

Reuse existing server/shared logic.

## 13. CHANGE SIZE

Prefer the smallest correct change.

Before creating a new:

- Component.
- Hook.
- Service.
- Utility.
- API endpoint.
- Database structure.
- Dependency.

Search the repository for existing functionality.

If existing functionality can be extended safely, extend it.

Do not refactor unrelated code during a feature/fix unless necessary.

Do not perform broad cleanup while implementing a focused task.

## 14. CONFLICTS AND UNCERTAINTY

Stop and report when you encounter:

- Conflicting specifications.
- Conflicting product behavior.
- Unknown security boundaries.
- Potential data loss.
- Unclear ownership rules.
- Required dependency not present.
- Architecture that contradicts the task.
- Existing functionality that appears to conflict with the requested change.

Do not guess.

Use:

`Not verified from the current codebase.`

when something cannot be established.

## 15. TESTING

Testing is mandatory after implementation.

Use the repository's actual scripts and test setup.

At minimum, run the relevant:

1. TypeScript/type checking.
2. Existing tests.
3. Lint.
4. Production build.

Do not invent commands. Inspect `package.json` first.

For changes affecting UI, workflows, authentication, APIs, database, or security, run the relevant QA specifications under `docs/qa/`.

The QA system is intentionally lightweight. Do not run unnecessary exhaustive suites for unrelated changes.

## 16. QA GATE

After implementation:

1. Inspect what changed.
2. Determine affected QA areas.
3. Run the required QA checks.
4. Run regression checks.
5. Fix discovered issues.
6. Re-run failed checks.
7. Report final status.

Use:

`docs/qa/QA_MASTER.md`

as the QA entry point when it exists.

Never declare implementation complete solely because the project builds.

A successful build does not prove that the product works.

QA must consider:

- Code errors.
- Functional regressions.
- UI problems.
- Responsive problems.
- Security regressions.

P0/P1 failures block completion.

Do not silently ignore failed tests.

If a test cannot be run, report why.

## 17. UI QA

For UI changes, verify representative:

- Mobile.
- Tablet.
- Desktop.

Check:

- Overflow.
- Clipping.
- Broken alignment.
- Broken navigation.
- Buttons.
- Forms.
- Dialogs.
- Loading states.
- Empty states.
- Error states.
- Touch targets.
- Keyboard accessibility where applicable.

Do not consider visual polish a security issue, but do not ignore functional UI defects.

## 18. REGRESSION SAFETY

After changes, verify affected existing functionality.

For core product changes, prioritize:

- Authentication.
- Home.
- Quotes.
- Search/filtering.
- Quote creation/editing.
- Quote Detail.
- Follow-ups.
- Rescheduling.
- Won/lost.
- Activity/history.
- Settings.
- Password.
- Logout.
- Account deletion.

Do not test unrelated areas excessively when the change cannot affect them.

## 19. COMMANDS

Inspect `package.json` before running commands.

Known project commands currently include:

```bash
npx tsc --noEmit
npx vitest run
npx vitest run src/test/auth.test.ts
npm run dev
npm run lint
npm run build
```

Build command gotcha: `package.json` declares the `"build"` key **twice** (a JSON duplicate-key artifact). The effective one is the last definition:

```bash
node scripts/generate-icons.mjs && tsc -b && vite build
```

The earlier `"build"` entry is ignored by npm. Never edit the first one expecting it to take effect; deduplicate if you touch the scripts block.