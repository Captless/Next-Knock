# Next Knock — Home Dashboard Refinement

## Objective

Refine the Next Knock Home section into a compact operational dashboard that gives users an immediate understanding of:

1. Quotes currently requiring follow-up
2. Total Won quotes and their estimated quote value
3. Total Lost quotes and their potential lost quote value

The Home section must remain **simple, minimalist, and action-oriented**.

This is not intended to become an analytics dashboard.

---

# CHANGE FROM CURRENT PLAN

## Existing Decision

The current Home IA includes:

1. Needs Follow-up
2. Open Quotes
3. New Quote

## Proposed Change

Remove the **Open Quotes** section entirely.

Replace it with a compact summary-card row:

1. Won
2. Lost
3. Needs Follow-up

The resulting Home IA becomes:

1. Header
2. Summary Cards
3. Needs Follow-up
4. New Quote action

## Reason

The Open Quotes section duplicates functionality that already exists in the Quotes section.

The Home page should answer the user's most important operational questions without requiring them to interpret a dashboard:

* What have I won?
* What potential value have I lost?
* What needs my attention?

The Quotes page remains the primary place for browsing and managing the complete quote inventory.

---

# Product Principles

The Home dashboard must follow these principles:

* Minimal information density
* Strong visual hierarchy
* Action over analysis
* No unnecessary metrics
* No charts
* No financial/accounting terminology that implies actual revenue
* No duplicate quote-management functionality
* Mobile-first but intentionally designed for desktop
* Existing Next Knock visual language
* Use existing domain logic wherever possible

The user should be able to understand the Home page within a few seconds.

---

# Home Structure

## 1. Header

Keep the existing Home header and Next Knock branding.

Do not introduce:

* `Welcome back`
* Greeting copy
* Marketing statements
* Additional dashboard navigation

The header should remain compact.

---

# 2. Summary Cards

Display three compact summary cards.

Recommended priority:

1. Needs Follow-up
2. Won
3. Lost

However, the visual arrangement may place the cards in the most natural order for the existing design system.

The cards should feel like **quick status summaries**, not large KPI widgets.

---

## Card A — Won

### Primary Metric

Display:

`[count] Won`

Example:

`12 Won`

### Secondary Metric

Display:

`$8,450 estimated value`

The secondary value represents the accumulated value of quotes marked Won.

### Calculation

```text
Won Value =
SUM(quote price/value)
WHERE quote closedOutcome = won
```

Use the existing quote monetary/value field.

Do not create a new database field if the current quote model already contains the required value.

### Terminology

Use:

**Estimated value**

Do not use:

* Revenue
* Earnings
* Actual earnings
* Collected revenue
* Profit

A Won quote does not guarantee that the business has actually collected that amount.

### Interaction

If the existing Quotes filtering architecture supports outcome filtering, clicking/tapping the card may navigate to the existing Won-filtered Quotes view.

Do not create a new route solely for this card.

---

# Card B — Lost

### Primary Metric

Display:

`[count] Lost`

Example:

`5 Lost`

### Secondary Metric

Display:

`$3,200 potential value lost`

This represents the accumulated quote value of quotes marked Lost.

### Calculation

```text
Lost Value =
SUM(quote price/value)
WHERE quote closedOutcome = lost
```

Use the existing quote monetary/value field.

### Terminology

Use:

**Potential value lost**

Do not describe this as:

* Actual financial loss
* Revenue loss
* Profit loss
* Money lost

A Lost quote represents an opportunity that was not won, not a confirmed financial loss.

### Interaction

If the existing Quotes filtering architecture supports outcome filtering, clicking/tapping the card may navigate to the existing Lost-filtered Quotes view.

Do not create a new route.

---

# Card C — Needs Follow-up

### Primary Metric

Display:

`[count] Needs Follow-up`

Example:

`4 Needs Follow-up`

### Secondary Metric

Do not display a monetary value.

This card is intentionally action-oriented.

### Calculation

Use the existing canonical follow-up business logic.

A quote requires follow-up when:

```text
quote.status === sent
AND quote.followUpDate <= today
AND quote is not terminal
```

Do not create an alternative definition inside the Home component.

Reuse the existing domain selector/helper/query responsible for determining follow-up quotes.

### Interaction

Tapping/clicking the card should use the existing Quotes follow-up filtering/navigation behavior where available.

Do not create duplicate filtering logic.

---

# Card Visual Design

The cards should be visually compact.

Recommended hierarchy:

```text
Won
12
$8,450 estimated value
```

```text
Lost
5
$3,200 potential value lost
```

```text
Needs Follow-up
4
```

The count is the primary visual element.

The monetary figure is secondary.

The label should remain clear and readable.

Avoid turning the monetary values into large numbers that compete with the primary count.

---

# Visual Requirements

Follow the existing Next Knock design system.

The cards should use:

* Existing typography
* Existing spacing system
* Existing border/radius conventions
* Existing surface/background styles
* Existing interaction states
* Existing responsive breakpoints

Do not introduce a new design system.

Do not introduce:

* Large gradients
* Decorative illustrations
* Large icons
* Charts
* Progress bars
* Sparklines
* Percentage indicators
* Trend arrows
* Comparison badges
* Excessive shadows
* Excessive pill UI

The result should feel like a natural extension of the existing application.

---

# Responsive Behavior

The Home section must be intentionally designed for:

* Small mobile
* Standard mobile
* Tablet
* Desktop

## Mobile

Cards must remain:

* Touch-friendly
* Readable
* Compact
* Easy to scan

Avoid making the cards unnecessarily tall.

If three cards cannot fit naturally in one row, use the existing responsive layout system rather than forcing horizontal overflow.

## Desktop

Do not simply stretch the mobile layout.

Use the available horizontal space appropriately while keeping the dashboard visually restrained.

The cards should not dominate the entire viewport.

---

# 3. Needs Follow-up Section

Retain the existing Needs Follow-up section below the summary cards.

This remains the primary actionable content on Home.

It should:

* Show relevant quotes requiring follow-up
* Use existing follow-up business logic
* Provide an obvious way to access/manage the relevant quotes
* Avoid becoming a full Quotes-page duplicate

Do not introduce additional analytics into this section.

---

# 4. New Quote Action

Retain the existing New Quote action.

It should remain obvious and accessible on both mobile and desktop.

Do not create additional quote-creation actions.

---

# Data Requirements

The Home dashboard must use actual authenticated user data.

Required values:

| Metric          | Source                              |
| --------------- | ----------------------------------- |
| Won count       | Quotes with `closedOutcome = won`   |
| Won value       | Sum of quote values for Won quotes  |
| Lost count      | Quotes with `closedOutcome = lost`  |
| Lost value      | Sum of quote values for Lost quotes |
| Follow-up count | Existing canonical follow-up logic  |

Do not create duplicate data models.

Do not introduce a dashboard table.

Do not persist calculated totals unnecessarily.

Prefer deriving the values from existing quote data and existing services/query patterns.

---

# Currency

Inspect the existing implementation to determine how quote currency and monetary values are represented and formatted.

Reuse the existing currency/value formatter.

Do not introduce a separate currency system.

Do not hardcode PHP.

Do not assume USD if the existing application already supports another established currency configuration.

If the current product specification explicitly establishes USD as the product currency, follow that specification.

---

# Domain Invariants

Do not change existing quote lifecycle rules.

The existing lifecycle remains:

```text
draft → sent → closed
```

Closed outcomes remain:

```text
won
lost
archived
```

Do not introduce:

```text
follow_up
```

as a QuoteStatus.

Follow-up remains date-derived.

The Home dashboard must respect these existing domain invariants.

---

# Archived Quotes

Archived quotes must not be counted as Won or Lost unless the existing domain logic explicitly classifies them that way.

An archived quote should not be incorrectly interpreted as:

* Won
* Lost
* Active follow-up

Use existing domain behavior rather than implementing assumptions in the UI.

---

# Loading State

Do not display misleading zero values while dashboard data is loading.

Use the existing Home loading-state pattern.

If the application already has skeleton/loading components, reuse them.

Do not introduce a new loading framework.

---

# Empty / Zero State

Zero is valid data.

Examples:

```text
Won
0
$0 estimated value
```

```text
Lost
0
$0 potential value lost
```

```text
Needs Follow-up
0
```

Do not replace legitimate zero values with empty-state messages.

Do not hide cards because their value is zero.

---

# Error State

If the required Home data cannot be loaded:

* Use the existing application error-state pattern.
* Do not silently substitute incorrect zero values.
* Do not expose database, SQL, API, or implementation details to the user.
* Preserve the ability to retry if the existing architecture supports retry behavior.

---

# Security / Authorization

All Home metrics must respect the authenticated user's ownership boundary.

A user must never be able to retrieve or infer another user's:

* Quote count
* Won value
* Lost value
* Follow-up count
* Quote details

Frontend filtering must not be treated as the security boundary.

Server/API/database queries must continue enforcing user ownership.

Do not weaken:

* Authentication
* Authorization
* Session handling
* User isolation
* Existing API validation

---

# Codebase Inspection

Before implementation, inspect:

1. `project.md`
2. `AGENTS.md`
3. Current product hardening specification
4. Current Home page/component
5. Quote domain types
6. Quote status/outcome logic
7. Quote monetary/value field
8. Existing quote queries/services
9. Existing follow-up calculation logic
10. Existing Quotes filtering/navigation
11. Existing loading/error components
12. Existing responsive layout components

Do not invent file paths.

Do not assume an implementation exists without verifying it.

Reuse existing functionality.

---

# Explicit Non-Goals

This change must NOT introduce:

* Analytics dashboards
* Revenue tracking
* Accounting
* Profit calculations
* Payment tracking
* Conversion rates
* Win rates
* Loss rates
* Average quote value
* Revenue forecasting
* Charts
* Trends
* Date-range comparisons
* Customer analytics
* Team analytics
* AI features
* CRM features
* Open Quotes Home section
* New database tables
* New dependencies
* New authentication functionality

The Home page is not becoming an analytics product.

---

# Testing Requirements

Run in the established project order:

```bash
npx tsc --noEmit
npx vitest run
npm run build
```

Manually verify:

## Won

* Correct Won count
* Correct summed quote value
* Zero-state behavior
* Outcome changes update the value
* Currency formatting is correct

## Lost

* Correct Lost count
* Correct summed quote value
* Zero-state behavior
* Outcome changes update the value
* Currency formatting is correct

## Needs Follow-up

* Correct follow-up count
* Uses canonical follow-up logic
* Rescheduling changes the count appropriately
* Closing a quote removes it from follow-up
* Archived/terminal quotes are excluded appropriately

## Navigation

Verify existing filtering/navigation behavior for:

* Won
* Lost
* Needs Follow-up

Do not create duplicate routes.

## Security

Verify metrics are scoped to the authenticated user.

## Responsive

Verify:

* Small mobile
* Large mobile
* Tablet
* Desktop
* Large desktop

Check for:

* Overflow
* Clipping
* Excessive whitespace
* Incorrect card sizing
* Poor hierarchy
* Touch-target problems

---

# Acceptance Criteria

* [ ] Open Quotes section is completely removed from Home.
* [ ] Home contains three compact summary cards.
* [ ] Won card shows Won count.
* [ ] Won card shows estimated quote value.
* [ ] Lost card shows Lost count.
* [ ] Lost card shows potential lost quote value.
* [ ] Needs Follow-up card shows follow-up count.
* [ ] Needs Follow-up card does not contain unnecessary secondary metrics.
* [ ] Monetary values are visually secondary to counts.
* [ ] Terminology does not imply actual revenue or collected money.
* [ ] Existing quote value data is reused.
* [ ] Existing currency formatting is reused.
* [ ] Existing follow-up business logic is reused.
* [ ] No duplicate domain logic is introduced.
* [ ] No new dashboard database model is introduced.
* [ ] No unnecessary dependencies are added.
* [ ] Existing quote lifecycle invariants remain unchanged.
* [ ] Existing authorization boundaries remain intact.
* [ ] Home remains minimalist and easy to understand.
* [ ] Mobile layout remains usable.
* [ ] Desktop layout feels intentionally designed.
* [ ] Existing Quotes functionality remains unchanged.
* [ ] Typecheck passes.
* [ ] Tests pass.
* [ ] Production build passes.

---

# Definition of Done

Implementation is complete when:

1. The current Home implementation has been inspected.
2. The Open Quotes section has been removed.
3. The three summary cards have been implemented.
4. Won and Lost monetary values use existing quote-value data.
5. Follow-up count uses canonical domain logic.
6. Existing currency formatting is reused.
7. Existing navigation/filtering is reused.
8. User-data isolation has been verified.
9. Mobile and desktop layouts have been verified.
10. No unrelated product functionality has changed.
11. Typecheck passes.
12. Tests pass.
13. Production build passes.

Final implementation report must include:

* Files inspected
* Files changed
* Existing functionality reused
* Data/query logic used
* UI changes
* Security/authorization verification
* Responsive verification
* Typecheck result
* Test result
* Build result
* Remaining issues

---

# Product Decision

The final Home experience should communicate:

> **Won:** What did I win and what is its estimated quote value?
> **Lost:** What did I lose as an opportunity and what was its potential value?
> **Needs Follow-up:** What requires my attention right now?

Stop there.

Do not add metrics simply because they can be calculated.

The Home page should remain a **lightweight operational dashboard**, while the Quotes section remains the place for detailed quote management.
