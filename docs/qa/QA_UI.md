# Next Knock UI & Responsive QA

## Purpose

Catch visual and interaction regressions without turning QA into an exhaustive visual-testing project.

## Viewports

Check representative:

- Mobile: approximately 375px.
- Tablet: approximately 768px.
- Desktop: approximately 1024px.
- Large desktop: approximately 1440px.

Use the actual current responsive breakpoints from the repository when they differ.

## 1. Global Layout

Check:

- No horizontal overflow.
- No clipped content.
- No overlapping elements.
- No broken page containers.
- Consistent spacing.
- Content does not stretch unnecessarily on large screens.
- Navigation remains usable.
- Main content remains readable.

## 2. Mobile

Verify:

- Mobile navigation works.
- Bottom navigation, if currently implemented, remains usable.
- Touch targets are approximately 44px or larger where practical.
- Forms fit the viewport.
- Buttons are reachable.
- Text does not overflow.
- Cards do not clip.
- Dialogs fit the screen.

Do not allow desktop changes to damage the mobile layout.

## 3. Tablet

Check:

- Layout transitions cleanly.
- No awkward intermediate widths.
- No unnecessary desktop layout introduced too early.
- Search/filter controls remain usable.
- Cards and forms remain readable.

## 4. Desktop

Check:

- Sidebar/navigation works where currently implemented.
- Main content has intentional width constraints.
- Pages do not stretch across the entire viewport unnecessarily.
- Home hierarchy remains clear.
- Settings remains structured.
- Quotes remain readable.
- Quote Detail remains usable.
- Forms have reasonable maximum width.

Large screens should create breathing room, not giant components.

## 5. Components

For changed components verify:

- Buttons.
- Inputs.
- Forms.
- Cards.
- Dialogs.
- Toasts.
- Empty states.
- Error states.
- Loading states.

Check:

- Alignment.
- Spacing.
- Text wrapping.
- Focus states.
- Disabled states.
- Error states.
- Click/tap behavior.

## 6. Home

Verify:

- Needs Follow-up remains visually primary.
- Open Quotes remains secondary.
- New Quote remains obvious.
- Sections do not stretch excessively.
- Desktop whitespace is intentional.
- Mobile structure remains clean.

## 7. Settings

Verify:

- Sections are clearly grouped.
- Account controls are organized.
- Security controls are organized.
- Logout does not look like account deletion.
- Delete Account is clearly separated.
- Destructive action styling is professional.
- Desktop does not become a collection of oversized cards.
- Mobile remains clean.

## 8. Accessibility Basics

For affected UI verify:

- Buttons have understandable labels.
- Inputs have labels.
- Keyboard focus is visible where applicable.
- Dialogs can be closed using their supported controls.
- Text remains readable.
- Interactive controls are not too small.

Do not introduce accessibility regressions.

## PASS Criteria

PASS when:

- No blocking visual/interaction defect exists.
- No responsive overflow exists.
- Core navigation and controls remain usable.
- Mobile behavior remains intact.
- Desktop behavior is intentionally structured.

Cosmetic P3 issues should be reported but do not automatically block implementation.