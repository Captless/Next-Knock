# Next Knock — Desktop Layout Cleanup & UI Structure Hardening

## 1. Objective

Fix the current desktop UI so it is visually structured, contained, and consistent with the existing mobile experience.

Current problems:

- Desktop content stretches too far horizontally.
- Home uses excessive width and visually fills the available workspace.
- Home sections lose the compact hierarchy that works on mobile.
- Settings feels like a collection of unrelated wide cards.
- Desktop spacing and content density are inconsistent.
- Large viewport space is being filled rather than intentionally structured.

The goal is NOT to redesign the product.

The goal is:

> Preserve the clean information hierarchy of the mobile UI and adapt that structure intelligently to desktop.

Desktop should feel spacious but controlled.

---

# 2. Mandatory Current-State Inspection

Before modifying anything, inspect the current repository.

Read:

- `project.md`
- Current hardening specifications
- Current responsive UI implementation

Inspect:

- `AppShell`
- Desktop sidebar
- Home route/component
- Settings route/component
- Existing page containers
- Existing card components
- Existing responsive Tailwind classes
- Existing max-width classes
- Existing spacing utilities
- Existing mobile layouts
- Existing desktop layouts

Determine:

1. Why the current Home content stretches.
2. Which parent container controls the available width.
3. Whether the desktop shell currently provides a max-width.
4. Which Home components inherit full width.
5. Which Settings components inherit full width.
6. Whether existing reusable containers already exist.
7. Whether mobile and desktop currently share the same components.
8. Whether any current layout relies on fixed widths.
9. Whether existing responsive classes can solve the issue without new abstractions.

Do not begin editing before this inspection.

Do not invent file paths.

---

# 3. Core Design Principle

The desktop application must NOT use the entire viewport simply because space exists.

Use:

```text
Desktop viewport
    ↓
Sidebar
    ↓
Main workspace
    ↓
Controlled content width
    ↓
Structured page sections