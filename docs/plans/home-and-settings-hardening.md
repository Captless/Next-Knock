# Next Knock — Home & Settings Hardening Implementation Plan

## 1. Objective

Implement a minimal Home and Settings UI hardening pass that:

- Preserves the approved Home/Quotes information-architecture correction.
- Makes Home a meaningful daily-work dashboard without adding dashboards, analytics, CRM features, or new product areas.
- Reorganizes Settings into a clean professional hierarchy.
- Makes Delete Account clearly destructive, accessible, and safe against accidental/repeated submission.
- Preserves existing quote, authentication, authorization, mobile/PWA, and data-deletion behavior.

This is a hardening task. It is not a feature-expansion or broad visual-redesign task.

## 2. Authoritative References

Read and compare before editing:

- `docs/plans/project.md`
- `specs/product-1-spec.md`
- `docs/plans/product-hardening.md`
- `docs/plans/next-knock-home-quotes-ia-correction.md`
- Current repository implementation and tests.

### Conflict requiring explicit handling

`docs/plans/product-hardening.md` still requires Attention, Active Quotes, potential value, and old filters.

`docs/plans/next-knock-home-quotes-ia-correction.md` is the later approved correction and requires:

- No Attention section.
- No business-name greeting.
- No potential value.
- Needs Follow-up and Open Quotes terminology.
- No duplicate conceptual presentation of quotes.
- No extra Home sections.

For Home and Quotes, the later approved IA correction governs. Do not restore behavior from the older hardening plan.

If another authoritative document conflicts with this plan or current code in a way not covered above, stop and report the conflict before implementing.

## 3. Verified Current State

### Home

Verified relevant files:

- `src/routes/Home.tsx`
- `src/shared/dashboard.ts`
- `src/routes/Quotes.tsx`
- `src/components/FollowUpItem.tsx`
- `src/components/AppShell.tsx`
- `src/components/Button.tsx`

Current Home behavior:

- Shows Needs Follow-up items using existing `FollowUpItem`.
- Limits displayed actionable follow-ups to three.
- Routes “View all” to `filter=needs_follow_up`.
- Shows Open Quotes as only a count.
- Uses `activeSummary.count`, which currently includes all non-terminal quotes.
- Therefore, an actionable quote can appear in Needs Follow-up and still be included in the Open Quotes count.
- Renders a route-level “Next Knock / Quotes” heading even though AppShell already displays product/business identity.
- Has a fixed New Quote action.

### Settings

Verified relevant files:

- `src/routes/Settings.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/components/Button.tsx`
- `src/components/Input.tsx`
- `src/hooks/AuthProvider.tsx`
- `src/server/auth.ts`
- `functions/api/auth/delete.ts`

Current Settings behavior:

- Business name is editable.
- Email is read-only.
- Change Password is available inline.
- Log Out is functional.
- Delete Account uses a generic confirmation dialog.
- Server-side account deletion derives the authenticated user from the session and does not accept a user ID from the client.
- Delete Account is currently styled as a weak ghost action inside a generic card.
- The confirmation dialog lacks verified dialog semantics, focus management, Escape handling, focus return, and pending-state disabling.

## 4. Required Changes

## 4.1 Home — Correct Open Quote Semantics

Update shared dashboard logic so Home’s Open Quotes summary means:

> Open quotes that do not currently need follow-up.

Rules:

- A quote is open when it is not terminal Won or Lost.
- A quote needs follow-up when it is overdue or due today.
- Quotes in Needs Follow-up must not be counted in Home’s Open Quotes summary.
- Do not alter quote statuses, database fields, API responses, or server-side ownership rules.
- Do not change the Quotes screen’s existing `Open` filter unless inspection proves it must match the Home summary semantics.

Add or reuse a clearly named derived bucket/value in `src/shared/dashboard.ts`. Do not preserve misleading names such as `activeSummary` if they no longer represent the displayed concept.

## 4.2 Home — Strengthen Existing Hierarchy

Keep Home limited to:

1. Page heading
2. Needs Follow-up
3. Open Quotes
4. New Quote action

Do not add sections, metrics, charts, recent items, activity, potential value, revenue information, customer information, or notifications.

### Page heading

- Remove the duplicate route-level “Next Knock” label.
- Replace the incorrect route-level “Quotes” heading with one correct Home page heading.
- Do not duplicate the business name; it remains AppShell business identity.
- Ensure only one meaningful page-level `h1` exists.

### Needs Follow-up

- Preserve the existing overdue-first, then due-today ordering.
- Preserve existing Call, Message, and quote-detail navigation behavior.
- Preserve the maximum display of three actionable items.
- Preserve View All behavior, but make it a touch-safe navigation control.
- Use the approved label: `Needs Follow-up`.
- Do not render an Attention card, “caught up” metric card, or duplicate no-follow-up summary.

### Open Quotes

Replace the passive count card with one clearly tappable Open Quotes summary/navigation card.

It must show:

- Open Quotes label.
- Accurate count of open quotes excluding currently actionable follow-ups.
- Plain supporting copy: `Quotes that don’t need follow-up today.`
- A clear navigation affordance, such as `View Open Quotes` or a chevron.
- Navigation to `/app/quotes?filter=open`.

Do not render individual open quote cards on Home.

### New Quote

- Retain the existing fixed mobile New Quote action.
- Preserve bottom-navigation clearance and safe-area behavior.
- Do not create another quote-creation flow.

## 4.3 Settings — Professional Information Architecture

Restructure Settings into exactly two visually distinct groups.

### Account

Place these in one coherent Account group:

1. Business Name

   - Editable current business name.
   - Existing Save behavior.
   - Keep existing server-side persistence.
   - On successful save, refresh/update authenticated user state so AppShell business identity updates immediately.

2. Email

   - Display the authenticated email as read-only account information.
   - Do not add email-change functionality.

3. Password

   - Keep existing Change Password functionality.
   - Keep Current Password, New Password, Confirm New Password, Cancel, and Change Password behavior.
   - Preserve existing validation and server-side password policy.
   - Do not expose or retain passwords after successful completion or cancellation.

Do not use separate equal-weight cards for every individual setting.

### Account Actions

Place these below Account.

1. Log Out

   - Use a normal secondary/outlined full-width action.
   - Keep current logout implementation and redirect behavior.
   - Do not add a separate logout mechanism.

2. Danger Zone

   - Visually separate from Account and Log Out using restrained danger treatment: red border/tint, clear label, and concise irreversible-action copy.
   - Include a solid red `Delete Account` button.
   - Do not present Delete Account as a neutral or ghost action.
   - Do not add other destructive actions.

## 4.4 Delete Account — Accessible, Pending-Safe Confirmation

Update `ConfirmDialog` or the existing reusable confirmation mechanism. Do not create a duplicate dialog component unless the existing component cannot be extended safely.

Required behavior:

- Uses semantic dialog behavior:
  - `role="dialog"`
  - `aria-modal="true"`
  - Accessible title and description association.
- Moves focus into the dialog when opened.
- Keeps keyboard focus within the dialog while open.
- Returns focus to Delete Account when closed.
- Escape closes the dialog only when deletion is not pending.
- Clicking Cancel closes the dialog only when deletion is not pending.
- Background content cannot be interacted with while open.
- Confirm button uses the existing danger button treatment.
- Confirm and Cancel controls are disabled while deletion is pending.
- Confirm label changes to `Deleting…` while pending.
- Only one deletion request may be in flight.
- On failure:
  - Keep the account intact.
  - Restore controls.
  - Provide actionable error feedback.
- On success:
  - Preserve current server-side deletion.
  - Clear client auth state.
  - Route to Login.
  - Ensure protected resources are unavailable.

Do not add typed-word confirmation. Explicit confirmation plus clear destructive styling and pending protection is the minimal approved solution.

## 4.5 Accessibility and Mobile Requirements

Apply these requirements to affected Home and Settings controls:

- All controls use semantic buttons or links.
- Navigation controls use links where appropriate; actions use buttons.
- Visible `:focus-visible` treatment remains available.
- Compact controls such as View All must meet the project’s approximately 44px touch-target standard.
- Dialog supports keyboard operation.
- Dialog focus is not obscured by the sticky header or fixed bottom navigation.
- Long business names and email addresses do not overflow the layout.
- Mobile layout remains usable at 375px width.
- Fixed New Quote action and bottom navigation do not overlap content or dialog controls.

## 5. Explicit Non-Goals

Do not:

- Restore Attention.
- Restore greetings using business name.
- Restore Active Quotes terminology or potential value.
- Add analytics, charts, revenue metrics, conversion metrics, or forecasts.
- Add Recent Quotes, activity feeds, customer lists, or new Home sections.
- Add notifications, reminders, messaging channels, calendar sync, CRM features, teams, or profile features.
- Add email change, password reset, new auth providers, or re-authentication flows.
- Change database schema unless inspection proves a bug cannot be resolved without it.
- Change quote lifecycle statuses.
- Change server-side authorization or ownership rules.
- Add dependencies.
- Redesign unrelated routes.

## 6. Expected Files

Modify only after inspection confirms necessity:

- `src/routes/Home.tsx`
- `src/shared/dashboard.ts`
- `src/routes/Settings.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/components/AppShell.tsx`
- `src/components/Button.tsx`
- `src/styles/index.css`
- Relevant existing tests under `src/test/`

Do not create replacement architecture or duplicate UI primitives.

## 7. Testing Requirements

### Automated

Update or add focused tests for:

- Open Quotes Home count excludes due-today and overdue quotes.
- Terminal Won/Lost quotes are excluded from Needs Follow-up and Open Quotes as appropriate.
- Overdue items remain ordered before due-today items.
- No duplicate Home conceptual presentation.
- Delete Account endpoint remains restricted to the authenticated user.
- Delete flow handles server failure without clearing local auth state.
- Existing authentication, quote, dashboard, and security tests continue to pass.

Run:

- Existing unit tests.
- TypeScript validation.
- Lint/format checks, if configured.
- Production build.

### Manual UI verification

Home:

- No quotes.
- Open quotes only.
- One overdue quote.
- One due-today quote.
- Mixed overdue and due-today quotes.
- More than three actionable follow-ups.
- Won/Lost quote with a historical follow-up date.
- Long customer names and large counts.
- Navigation to Open and Needs Follow-up filters.
- Mobile viewport and safe-area behavior.

Settings:

- Save business name and confirm header updates immediately.
- Read-only email display.
- Change password success, mismatch, missing fields, incorrect current password, and cancellation.
- Log out and protected-route behavior.
- Delete dialog keyboard flow, Escape, focus return, pending state, failure, and success.
- Confirm that deletion affects only the authenticated user and related user-owned data.

## 8. Acceptance Criteria

The work is accepted only when:

- [ ] Home retains only Needs Follow-up, Open Quotes, and New Quote as functional content areas.
- [ ] Home contains no Attention, greeting, potential value, Recent, analytics, or extra sections.
- [ ] The Home page heading is accurate and does not duplicate AppShell branding.
- [ ] Needs Follow-up preserves existing contact actions and urgency ordering.
- [ ] Home Open Quotes excludes items that currently need follow-up.
- [ ] The Open Quotes summary is clearly tappable and routes to `filter=open`.
- [ ] Home does not render individual open quote cards.
- [ ] Settings has coherent Account and Account Actions groups.
- [ ] Business Name, Email, and Password are visually grouped under Account.
- [ ] Log Out is clearly non-destructive.
- [ ] Delete Account is in a visually separated Danger Zone with a solid red action.
- [ ] Account deletion requires accessible explicit confirmation.
- [ ] Account deletion prevents duplicate requests while pending.
- [ ] Existing server-side deletion authorization remains intact.
- [ ] Business-name updates immediately reflect in AppShell.
- [ ] Existing tests, build, auth, quote flows, and mobile/PWA behavior pass.
- [ ] No new features, dependencies, schema changes, or unrelated redesigns are introduced.

## 9. Definition of Done

Complete only when:

1. The document conflict is recorded and the approved Home/Quotes IA correction is followed.
2. Home’s Open Quotes summary accurately represents non-actionable open work.
3. Settings has a clean Account / Account Actions hierarchy.
4. Delete Account is professional, clearly destructive, accessible, and pending-safe.
5. Existing security boundaries and deletion behavior remain server-enforced.
6. Relevant automated and manual verification passes.
7. The final report lists files changed, tests run, results, remaining issues, and confirms no scope expansion.
