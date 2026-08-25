# New Quote Action Refinement

## Objective

Refine the existing `+ New Quote` UI so it is visually consistent, correctly aligned, responsive, and professional on both mobile and desktop.

The current floating/anchored mobile implementation is not the desired design and the current desktop implementation has layout/alignment problems.

Replace the current treatment with a normal contextual page-header action on the appropriate pages.

This is a focused UI hardening task.

DO NOT redesign the surrounding application.

---

# 1. SOURCE OF TRUTH

Before making any changes:

1. Read the current authoritative project documentation.
2. Read the current product hardening specification.
3. Inspect the current repository implementation.
4. Inspect the actual rendered structure and existing responsive behavior.
5. Identify the existing components used for:
   - App shell
   - Page headers
   - Home
   - Quotes
   - Quote Detail
   - Settings
   - Mobile navigation
   - Desktop navigation
   - Buttons/actions
6. Search the entire repository for:
   - `New Quote`
   - `new quote`
   - the existing New Quote route/action
   - any floating/anchored implementation
   - any shared page-header/action component

The repository is the implementation source of truth.

Do NOT assume that previous plans, previous generated code, or assumed file paths match the current repository.

If the current implementation differs from this specification, inspect and adapt to the actual implementation.

---

# 2. CRITICAL CHANGE-CONTROL RULES

This task is ONLY about the New Quote action's:

- placement
- responsive behavior
- sizing
- alignment
- visual treatment
- existing navigation trigger

Do NOT perform unrelated cleanup.

Do NOT:

- Refactor unrelated components.
- Rename unrelated components.
- Reorganize folders.
- Rewrite the AppShell.
- Rewrite navigation.
- Rewrite page layouts.
- Replace the design system.
- Introduce a new UI framework.
- Introduce a new button library.
- Introduce a new dependency.
- Rewrite Tailwind configuration.
- Change responsive breakpoints.
- Change routing architecture.
- Change quote business logic.
- Change quote creation behavior.
- Change API behavior.
- Change database behavior.
- Change authentication.
- Change authorization.
- Change unrelated styling.

Use the smallest correct change.

If an existing shared component already solves the problem, reuse it.

Do not create a new abstraction unless the existing architecture genuinely has no suitable place for the behavior.

---

# 3. REQUIRED FINAL UX

The final design must use a contextual page-header action.

There must NOT be a floating or viewport-anchored New Quote button.

## Mobile

Remove the current:

- fixed New Quote button
- floating New Quote button
- bottom-right anchored New Quote button
- full-width New Quote button

The New Quote action should exist in the normal page layout/header.

### Home

Display:

- `Home` page title
- `+ New Quote` action

The title and action must share the same header row where the existing layout permits.

Conceptually:

Home                         + New Quote

Do not force this exact markup if the existing page-header architecture differs.

Preserve the existing header structure.

### Quotes

Display:

- `Quotes` page title
- `+ New Quote` action

Conceptually:

Quotes                       + New Quote

Home and Quotes should use the same button treatment and alignment pattern.

### Settings

Do NOT display a New Quote action.

### Quote Detail

Do NOT add a new prominent New Quote action.

Do not modify existing Quote Detail actions unless required to remove the previous floating implementation.

---

# 4. DESKTOP

Desktop must also use the normal page-header/action layout.

Do NOT use:

- fixed positioning
- absolute viewport positioning
- floating action buttons
- bottom-right actions
- global overlay buttons

### Home

New Quote should appear as the appropriate page-level action in the existing Home header.

### Quotes

New Quote should appear as the appropriate page-level action in the existing Quotes header.

### Settings

No New Quote action.

### Quote Detail

No new prominent New Quote action.

---

# 5. BUTTON DESIGN

Use the existing button component/design system if one exists.

Do NOT invent a completely new visual style.

The final button should be:

- Compact
- Clearly clickable
- Professionally styled
- Visually consistent with existing Next Knock controls
- Properly aligned with the page header
- Large enough to be comfortably tappable on mobile
- Not full width
- Not oversized
- Not visually dominant
- Not visually disabled

Text:

`+ New Quote`

Use the project's existing icon conventions if the existing design system uses an icon.

Do not introduce a new icon library.

## Button sizing

Use the existing button size variants if available.

If no appropriate variant exists, make the smallest local styling adjustment necessary.

The button must:

- Have balanced horizontal padding.
- Have consistent vertical padding.
- Have readable text.
- Have no clipped text.
- Have no unexpected line wrapping.
- Have a consistent height.
- Have consistent border radius.
- Have proper alignment with the page title.
- Have sufficient touch target on mobile.

Do not arbitrarily use large padding values.

Do not use `w-full`.

Do not use viewport positioning.

---

# 6. HEADER ALIGNMENT

This is a major acceptance requirement.

The page title and New Quote action must look intentionally aligned.

Verify:

- Same visual row.
- Correct vertical centering.
- No button appearing too high or too low.
- No uneven spacing.
- No excessive gap between title and button.
- No collision with the viewport edge.
- No collision with sidebar/content boundaries.
- No unexpected wrapping.
- No layout shift caused by the button.
- No horizontal overflow.

On narrow mobile screens, the header must still remain usable.

If the title and button cannot comfortably fit on one row at the smallest supported viewport, use the existing responsive header pattern rather than forcing overflow.

Do NOT solve this by making the button full width.

Do NOT solve this by introducing a floating button.

Do NOT hide the title.

---

# 7. RESPONSIVE BEHAVIOR

Use the existing project's responsive breakpoints.

Do NOT modify breakpoint definitions.

Verify at minimum:

- narrow mobile
- standard mobile
- large mobile
- tablet/intermediate width
- standard desktop
- large desktop

The button must transition naturally with the existing page header.

The surrounding page must not change width unexpectedly.

No horizontal scrollbar should appear because of the New Quote action.

No fixed positioning should be necessary.

---

# 8. EXISTING FUNCTIONALITY

The New Quote button must continue using the existing New Quote navigation/action.

Do not create another route.

Do not duplicate navigation logic.

Do not change:

- quote creation
- quote validation
- quote lifecycle
- follow-up logic
- database operations
- API calls
- authentication
- authorization

This task must not alter business behavior.

---

# 9. IMPLEMENTATION STRATEGY

Follow this exact order.

## Step 1 — Inspect

Find the actual current New Quote implementation and its parent layout.

Determine:

- where the button is currently rendered
- whether Home and Quotes already share a header
- whether there is a shared page-header component
- whether the current mobile anchored implementation was added globally
- whether desktop and mobile currently use different implementations

## Step 2 — Identify the smallest change

Prefer modifying the existing implementation rather than creating another implementation.

If the current New Quote component can be reused, reuse it.

If the current page-header component supports actions, use that mechanism.

If Home and Quotes already have separate headers, make only the minimal changes required to place the same existing New Quote action correctly.

## Step 3 — Remove obsolete positioning

Remove only the previous New Quote positioning logic that causes the unwanted:

- floating behavior
- fixed behavior
- anchored behavior
- full-width behavior

Do not remove unrelated positioning used by BottomNav, SidebarNav, or other application elements.

## Step 4 — Place the action in normal document flow

Place New Quote inside the existing page-header/action structure.

Do not use:

- `position: fixed`
- viewport-level absolute positioning
- floating containers
- portal-based UI
- global overlays

unless the existing architecture already requires such behavior for unrelated reasons.

## Step 5 — Validate layout

Check the actual rendered result at mobile and desktop widths.

Correct:

- alignment
- spacing
- button height
- text wrapping
- header height
- horizontal overflow
- content width
- interaction with navigation

Do not modify unrelated layout when correcting these issues.

---

# 10. ACCESSIBILITY

The New Quote action must:

- Use a semantic `<button>` or existing accessible link/navigation pattern appropriate to the current implementation.
- Have an accessible name.
- Be keyboard accessible on desktop.
- Have visible focus behavior.
- Have an appropriate mobile touch target.
- Maintain sufficient contrast.
- Not rely only on color to communicate interactivity.

Do not add accessibility libraries.

Use the existing accessibility patterns.

---

# 11. VISUAL QUALITY GATE

Before considering the task complete, explicitly inspect for:

### Button

- correct height
- correct width
- balanced padding
- readable text
- no clipping
- no wrapping
- correct radius
- correct border/background
- correct hover state
- correct focus state
- correct active state

### Header

- title vertically centered
- button vertically centered
- consistent gap
- no uneven margins
- no accidental extra padding
- no overlap
- no layout shift

### Mobile

- no full-width button
- no floating button
- no fixed button
- no horizontal overflow
- no content obstruction
- no BottomNav interference

### Desktop

- no floating button
- no viewport anchoring
- no sidebar overlap
- correct content alignment
- correct page-header spacing
- correct button sizing

If any of these are visibly wrong, continue correcting the implementation before reporting completion.

---

# 12. NON-GOALS

Do NOT:

- redesign Home
- redesign Quotes
- redesign Settings
- redesign Quote Detail
- redesign BottomNav
- redesign SidebarNav
- redesign the application shell
- change navigation architecture
- change page information architecture
- add features
- modify backend code unnecessarily
- modify database code
- modify authentication
- modify business rules
- add dependencies
- refactor unrelated code
- perform general UI cleanup

---

# 13. TESTING

Run the repository's standard validation commands.

At minimum, when available:

```bash
npx tsc --noEmit
npx vitest run
npm run lint
npm run build