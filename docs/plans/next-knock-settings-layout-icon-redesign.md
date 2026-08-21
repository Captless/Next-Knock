# Next Knock — Settings Layout & Navigation Icon Redesign

## Objective

Redesign the existing Settings screen into a clean, professional account-management layout without adding features, changing business logic, changing APIs, changing the database, or redesigning unrelated screens.

Also replace the current bottom-navigation Settings gear icon with a simpler, cleaner settings icon.

This is a visual hierarchy and usability hardening pass only.

## Authoritative References

Read before editing:

- `docs/plans/project.md`
- `docs/plans/product-hardening.md`
- `docs/plans/next-knock-home-quotes-ia-correction.md`
- `specs/product-1-spec.md`
- Current implementation and tests.

Preserve the existing approved account-management scope:

- Business Name
- Read-only Email
- Change Password
- Log Out
- Delete Account

Do not add account features.

## Verified Current State

Relevant existing files:

- `src/routes/Settings.tsx`
- `src/components/Icon.tsx`
- `src/components/BottomNav.tsx`
- `src/components/Button.tsx`
- `src/components/Card.tsx`
- `src/components/Input.tsx`
- `src/components/ConfirmDialog.tsx`
- `src/styles/index.css`
- `tailwind.config.js`

Current issues:

- Settings uses several isolated, equal-weight cards for Business Name, Email, Change Password, and Delete Account.
- Log Out sits outside those cards with no visible section hierarchy.
- The screen looks fragmented rather than intentionally structured.
- Email is displayed as a disabled input even though it is account information, not an editable control.
- Delete Account is a weak ghost action inside a neutral card despite being permanent.
- The current custom Settings gear icon is visually over-detailed and messy at bottom-navigation size compared with the simple Home and Quotes icons.

## Required Changes

## 1. Replace the Bottom-Navigation Settings Icon

Update `src/components/Icon.tsx`.

Replace the current detailed gear-shaped `SettingsIcon` with a simple, consistent sliders/preferences icon:

- Three horizontal lines.
- Each line has one small circular control at a different horizontal position.
- Use the existing SVG icon base:
  - `viewBox="0 0 24 24"`
  - `fill="none"`
  - `stroke="currentColor"`
  - Existing shared stroke width, line cap, and line join.
- The icon must remain visually clear at the current `h-6 w-6` bottom-navigation size.
- Preserve the existing `SettingsIcon` export name and `BottomNav` usage.
- Do not add an icon library or dependency.
- Do not change the navigation label from `Settings`.
- Do not change navigation routes or active-state behavior.

## 2. Settings Page Structure

Update `src/routes/Settings.tsx`.

Use this exact visual hierarchy:

```text
Settings

ACCOUNT
┌──────────────────────────────────┐
│ Business name                     │
│ [ Current business name         ] │
│ [ Save changes                  ] │
├──────────────────────────────────┤
│ Email                            │
│ account@example.com              │
├──────────────────────────────────┤
│ Password                    ›     │
│ Change your password             │
└──────────────────────────────────┘

ACCOUNT ACTIONS
[ Log out ]

┌──────────────────────────────────┐
│ DANGER ZONE                       │
│ Delete account                    │
│ Permanently deletes your account  │
│ and all associated quotes.        │
│ This cannot be undone.            │
│                                  │
│ [ Delete account ]                │
└──────────────────────────────────┘
```

Requirements:

- Retain the existing `Settings` page heading.
- Use sentence-case section labels: `Account`, `Account actions`, and `Danger zone`.
- Keep the approved semantic structure: `Account` contains Business Name, Email, Password; `Account actions` contains Log Out and Delete Account.
- `Danger zone` is a visual treatment nested inside `Account actions` for the Delete Account item. It is NOT a separate Settings category or top-level section.
- Use restrained small section labels above each group.
- Do not add decorative icons, dashboard metrics, help cards, profile cards, notifications, billing, themes, integrations, or other Settings categories.
- Do not create a new route.

## 3. Account Group

Replace the separate Business Name, Email, and Change Password cards with one grouped Account surface.

### Business Name

- Preserve the current editable input and save request.
- Change `Save` label to `Save changes`.
- Retain loading state: `Saving…`.
- Preserve existing server-side persistence.
- Do not change business-name validation or API behavior.
- Keep the save action within the Business Name portion of the Account group.

### Email

- Display the authenticated email as read-only account information.
- Do not render Email as a disabled form input.
- Render the email as plain, muted, selectable text beneath the `Email` label.
- Handle long email addresses without overflow.
- Do not add email-editing functionality.

### Password

- Present Password as a compact row within the Account group:
  - Primary text: `Password`
  - Secondary text: `Change your password`
  - Chevron-right affordance
- Preserve the current existing Change Password form and behavior.
- When selected, reveal the existing password form directly beneath the Password row inside the same Account surface, separated by a divider.
- Do not create a new password route, new API, new password workflow, or new modal.
- Preserve Current Password, New Password, Confirm New Password, Cancel, Change Password, validation, error handling, saving state, and success toast behavior.
- Clear password inputs when Cancel is selected, as well as after successful change.

## 4. Account Actions

Create an `Account actions` group below Account. This group contains both the Log Out and Delete Account actions, preserving the approved Product 1 semantic structure from `product-hardening.md` §50.

- Place the existing Log Out action in this group.
- Use the existing secondary button treatment.
- Make it full-width and touch-safe.
- Preserve existing logout request, auth-state clearing, redirect, and protected-route behavior.
- Do not add another logout mechanism.
- Place Delete Account within this same group, wrapped in the `Danger zone` visual treatment defined in §5.

## 5. Danger Zone (visual treatment only)

`Danger zone` is a nested visual treatment inside `Account actions` for the Delete Account item. It is NOT a separate top-level Settings section.

Visual requirements:

- Use a pale red background or restrained red-tinted surface.
- Use a subtle red border.
- Use dark-red heading/body text with accessible contrast.
- Include the `Danger zone` label as a restrained small heading.
- Include this exact copy:

  `Delete account`

  `Permanently deletes your account and all associated quotes. This cannot be undone.`

- Use the existing solid danger button variant for `Delete account`.
- Do not use a ghost or neutral button for the destructive action.
- Do not add more destructive actions.

Behavior requirements:

- Preserve the current confirmation step.
- Preserve existing server-side authenticated-user deletion behavior.
- Do not add typed-word confirmation.
- Do not alter account-deletion API behavior in this visual redesign pass.

## 6. Design Rules

- Use the existing Tailwind design system, color tokens, typography, button primitives, and spacing scale.
- Do not add dependencies.
- Do not introduce gradients, glass effects, decorative illustrations, bright accent colors, excessive shadows, oversized icons, or extra cards.
- Use one Account surface with internal dividers instead of multiple isolated cards.
- Use cards/surfaces only where they communicate grouping or destructive-risk hierarchy.
- Maintain the existing warm neutral background and restrained visual style.
- Keep the Settings page mobile-first and usable at 375px width.
- Keep all controls at approximately 44px minimum touch target.
- Preserve visible keyboard focus states.

## 7. Accessibility Requirements

- Use semantic `section` elements and heading hierarchy for Account and Account actions; Danger zone is a nested visual region inside Account actions.
- Keep form labels correctly associated with Business Name and password inputs.
- Ensure the Password row is a semantic button.
- Ensure the BottomNav Settings link remains labelled `Settings`; the icon is decorative.
- Preserve visible `:focus-visible` treatment.
- Long email addresses and business names must wrap or truncate safely without horizontal overflow.
- Preserve existing confirmation-dialog accessibility requirements from the account-hardening plan.

## 8. Explicit Non-Goals

Do not:

- Add profile photos, personal-name fields, account preferences, notifications, dark mode, billing, plans, support, integrations, export, teams, or account recovery.
- Add email editing.
- Add password reset.
- Add a new Settings route or password route.
- Change authentication, authorization, account deletion, session, API, database, or migration behavior.
- Change Home, Quotes, Quote Detail, or bottom-navigation structure beyond the Settings icon glyph.
- Add analytics, charts, dashboard widgets, or visual filler.
- Add dependencies or replace the existing design system.

## 9. Testing Requirements

### Automated

Run existing:

- Authentication tests.
- Security tests.
- TypeScript validation.
- Lint/format checks, if configured.
- Production build.

Update/add focused tests only if the current test architecture supports UI/component coverage for:

- Existing Business Name save behavior remains unchanged.
- Existing Change Password behavior remains unchanged.
- Existing Log Out behavior remains unchanged.
- Existing authenticated-user account deletion behavior remains unchanged.

### Manual Verification

Verify:

- Bottom-navigation Settings icon is visually clean, centered, and consistent with Home and Quotes icons.
- Settings page has Account and Account actions groups; Delete Account sits inside Account actions under the Danger zone visual treatment.
- No isolated Email, Password, or Delete Account cards remain.
- Business Name saves normally.
- Email is read-only information, not a disabled input.
- Password form opens and closes correctly within Account.
- Cancel clears entered password values.
- Log Out works and returns to Login.
- Delete Account remains visually distinct, red, and confirmation-gated.
- Keyboard focus remains visible.
- Layout works at mobile width with long business names and email addresses.
- No existing account behavior regresses.

## 10. Acceptance Criteria

- [ ] The Settings bottom-navigation icon is a simple sliders/preferences icon, not the detailed gear.
- [ ] The existing navigation route and `Settings` label remain unchanged.
- [ ] Settings has two semantic groups: Account, and Account actions.
- [ ] Account contains Business Name, Email, and Password inside one surface with internal dividers.
- [ ] Account actions contains Log Out and Delete Account.
- [ ] Danger zone is a visual treatment nested inside Account actions for Delete Account; not a separate top-level section.
- [ ] Email is plain read-only text, not a disabled input.
- [ ] Change Password retains all current behavior without a new route or new backend logic.
- [ ] Log Out remains a neutral action.
- [ ] Delete Account is visually distinct via the restrained red Danger zone treatment.
- [ ] Delete Account uses a solid red danger button and retains existing confirmation behavior.
- [ ] No new Settings functionality, API, schema, dependency, or unrelated redesign is introduced.
- [ ] Existing tests, type checks, and production build pass.
- [ ] Mobile and keyboard accessibility behavior remains correct.

## Definition of Done

The redesign is complete when the Settings page reads as a professional account-management screen rather than a collection of disconnected cards, the bottom-navigation Settings icon is visually clean, the approved semantic structure is preserved (Account: Business Name, Email, Password; Account actions: Log Out, Delete Account with Danger zone as nested visual treatment), all existing account behavior remains intact, and no unrelated functionality has been introduced.