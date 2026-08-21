# Next Knock — Desktop & Responsive UI Redesign

## 1. Objective

Add a professional desktop-responsive experience to Next Knock while preserving the existing mobile-first product experience.

The current product was intentionally designed around mobile usage, but the implementation must not treat desktop as an afterthought.

The goal is:

> Mobile-first, responsive everywhere.

Next Knock must provide one coherent product experience across:

- Mobile
- Tablet
- Desktop

Desktop must feel intentionally designed for larger screens rather than being a stretched version of the mobile interface.

This task is a responsive UI/layout enhancement only.

Do not add new product features, change business logic, change the database model, or redesign the product's core workflows.

---

# 2. Core Product Decision

The existing decision to prioritize mobile remains valid.

However:

> Mobile-first does NOT mean mobile-only.

The implementation must preserve:

### Mobile
- Compact layout.
- Touch-friendly controls.
- Bottom navigation where currently used.
- Single-column content.
- Fast primary actions.
- PWA-friendly interaction.

### Tablet
- More available horizontal space.
- Improved content width.
- Appropriate two-column layouts where useful.
- Preserve touch usability.

### Desktop
- Full-width application workspace.
- Persistent desktop navigation where appropriate.
- Wider content areas.
- Multi-column layouts where useful.
- Better use of horizontal space.
- Professional desktop information hierarchy.
- No unnecessary oversized mobile cards.

The desktop experience must still feel like Next Knock.

Do not create a separate desktop application.

---

# 3. Authoritative References

Before implementation, inspect:

- `project.md`
- Current approved hardening specifications.
- Current product specifications.
- Current repository.
- Existing routing.
- Existing layout components.
- Existing navigation.
- Existing responsive CSS/styles.
- Existing design tokens.
- Existing Home implementation.
- Existing Quotes implementation.
- Existing Quote Detail implementation.
- Existing Settings implementation.
- Existing forms/modals.
- Existing loading/empty/error states.
- Existing PWA configuration.
- Existing tests.
- Existing build configuration.

The current codebase is the source of truth for implementation details.

Do not invent:

- File paths.
- Components.
- Routes.
- APIs.
- Hooks.
- Services.
- Dependencies.
- Database structures.

If something cannot be verified from the repository, state:

> Not verified from the current codebase.

---

# 4. Mandatory Current-State Scan

Before changing any code, perform a complete responsive-layout inspection.

The implementation agent MUST NOT begin by immediately editing CSS.

Inspect first.

Determine:

1. Current application shell.
2. Current page container/max-width behavior.
3. Current navigation implementation.
4. Current mobile bottom navigation.
5. Whether desktop navigation already exists.
6. Current breakpoint definitions.
7. Existing media queries.
8. Existing responsive utility classes.
9. Existing CSS variables/design tokens.
10. Existing spacing system.
11. Existing typography system.
12. Existing card components.
13. Existing button components.
14. Existing form components.
15. Existing modal/dialog components.
16. Existing list/table components.
17. Existing Home layout.
18. Existing Quotes layout.
19. Existing Quote Detail layout.
20. Existing Settings layout.
21. Existing PWA/mobile-specific behavior.
22. Existing tests related to responsive behavior.

Search the codebase for hardcoded mobile assumptions such as:

- fixed widths
- fixed heights
- mobile-only containers
- excessive max-width restrictions
- absolute positioning dependent on mobile dimensions
- bottom-navigation assumptions
- viewport-specific spacing
- desktop-incompatible flex layouts
- desktop-incompatible overflow behavior

Do not remove existing responsive behavior until its purpose is understood.

---

# 5. Current-State Risk Assessment

Before implementation, identify whether the current UI architecture is:

### A. Already responsive
If so, extend the existing responsive system.

### B. Partially responsive
If so, repair/extend the existing system.

### C. Primarily mobile-specific
If so, introduce the smallest maintainable responsive layout structure necessary.

Do not replace the entire UI architecture simply because desktop support is being added.

Prefer incremental changes.

---

# 6. Implementation Principle

The implementation must follow:

> Reuse existing components and business logic; change presentation/layout only where necessary.

Do not duplicate:

- Quote components.
- Quote Detail components.
- Settings components.
- Navigation components.
- Hooks.
- API calls.
- State management.
- Validation.
- Business logic.

The same underlying components/data should support mobile and desktop unless a verified UX requirement makes a separate presentation necessary.

Prefer responsive CSS/layout changes over duplicated React trees.

---

# 7. Responsive Breakpoint Strategy

Inspect the existing breakpoint system first.

If the repository already has established breakpoints, reuse them.

Do not introduce a second competing breakpoint system.

If no usable breakpoint system exists, introduce the smallest reasonable responsive structure required by the existing stack.

The exact breakpoint values must be determined from the current implementation and design needs rather than blindly copying generic framework defaults.

At minimum, validate:

- Narrow mobile.
- Standard mobile.
- Tablet.
- Laptop desktop.
- Large desktop.

The layout must remain usable between breakpoints rather than only looking correct at a few exact widths.

---

# 8. Application Shell

The application shell should adapt significantly between mobile and desktop.

## Mobile

Preserve the existing mobile-first shell.

Do not remove or unnecessarily redesign:

- Mobile navigation.
- Bottom navigation.
- Existing mobile header.
- Existing mobile interaction patterns.

## Desktop

Introduce an intentional desktop application shell.

Preferred direction:

### Left navigation

A persistent desktop sidebar/navigation area containing the primary destinations:

- Home
- Quotes
- Settings

Use the existing navigation routes and labels.

Do not add new navigation destinations.

The sidebar should provide:

- Clear active route.
- Consistent spacing.
- Strong visual hierarchy.
- Appropriate width.
- Comfortable desktop interaction.

Do not simply enlarge the mobile bottom navigation.

---

# 9. Desktop Application Width

Desktop should use the available viewport more effectively.

Do not keep the entire application trapped inside a narrow phone-shaped container.

The desktop application should have:

- A meaningful maximum content width where appropriate.
- Comfortable horizontal margins.
- Consistent page gutters.
- Proper alignment between navigation and page content.

Avoid:

- Excessive whitespace caused by overly narrow max-widths.
- Content stretching edge-to-edge without hierarchy.
- A centered mobile phone frame on desktop.
- Fixed-width layouts that break at intermediate desktop sizes.

The final result should feel like a real web application.

---

# 10. Home — Desktop

Home should retain its current approved information architecture.

The existing hierarchy remains:

1. Needs Follow-up
2. Open Quotes
3. New Quote

Do not add dashboard features.

Do not reintroduce:

- Attention.
- Greeting.
- Active/Follow Up confusion.
- Analytics.
- Unapproved metrics.

Desktop should improve presentation, not expand product scope.

## Desktop Home Layout

Use the additional horizontal space intentionally.

Potential layout:

### Main workspace

Needs Follow-up occupies the primary content area.

### Supporting area

Open Quotes can occupy a secondary area when the viewport provides enough space.

The exact implementation must be based on the current Home component and verified content density.

Do not force a two-column layout if it makes the workflow harder to understand.

The most important follow-up actions must remain visually dominant.

---

# 11. Needs Follow-up Desktop Layout

The current follow-up cards should be adapted for desktop.

Avoid simply making mobile cards wider.

Desktop cards should use horizontal space more efficiently.

A follow-up item may use a structured row such as:

```text
Customer       Service          Amount       Follow-up       Actions
Sarah Miller   House cleaning   ₱2,800       2 days overdue  Call Message