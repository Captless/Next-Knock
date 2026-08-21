# Next Knock --- Home & Quotes Information Architecture Correction

## 1. Objective

Correct the current Home and Quotes information architecture so the
product has one clear mental model:

> **Open Next Knock → immediately see who needs a follow-up → contact
> them → update the quote → move on.**

This is a product-hardening correction, not a request for new product
features.

The work must specifically address the currently confusing overlap
between **Active** and **Follow Up**, remove redundant Home UI, correct
the business-name greeting, and simplify terminology.

Do not redesign unrelated parts of Next Knock.

## 2. Authoritative References

Use these as the source of truth before editing:

-   `project.md` and other current authoritative project documentation.
-   `specs/product-1-spec.md`
-   Current repository implementation.
-   This document for the approved Home/Quotes IA correction.

Important current implementation findings:

-   `src/routes/Home.tsx` currently renders `Attention`,
    `Follow up now`, and `Active quotes`, and greets the user using
    `businessName`.
-   `src/shared/dashboard.ts` currently defines `isActive()` as every
    quote that is not Won/Lost and separately defines actionable
    follow-up dates.
-   `src/routes/Quotes.tsx` currently exposes `All`, `Active`,
    `Follow Up`, `Won`, `Lost`, and `Overdue`.
-   `src/lib/select-options.ts` defines those quote filters.
-   `src/components/AppShell.tsx` already displays the business name in
    the app header.
-   `src/routes/Signup.tsx` collects `businessName` and describes it as
    being shown in the app header.

Do not invent replacement files or architecture. Inspect the current
repository before modifying anything.

## 3. Current-State Inspection

Before editing:

1.  Read the authoritative project documentation and hardening
    specification.
2.  Inspect:
    -   `src/routes/Home.tsx`
    -   `src/routes/Quotes.tsx`
    -   `src/shared/dashboard.ts`
    -   `src/lib/select-options.ts`
    -   `src/components/AppShell.tsx`
    -   `src/routes/Signup.tsx`
    -   related quote types/hooks/components/tests.
3.  Trace how quote status, follow-up dates, Home buckets, and Quotes
    filters currently work.
4.  Determine all references to `attention`, `active`, `follow_up`,
    `overdue`, `activeSummary`, and the Home greeting before changing
    them.
5.  Reuse the existing quote/status architecture. Do not create a
    parallel quote model.

If repository code differs from the assumptions in this document, stop
and report the conflict rather than guessing.

## 4. Required Changes

### 4.1 Remove the Home "Attention" section completely

Delete the **Attention** section from Home.

Do not repair it, rename it, or replace it with another metric section.

Remove its current: - Overdue metric - Due today metric - "You're all
caught up" card - Attention-specific presentation

The reason is that Attention duplicates the actionable follow-up
information shown below it.

The user should see the actual work rather than a metric describing the
work.

### 4.2 Remove the Home greeting completely

Delete the current:

> Good morning/afternoon/evening, \[Business Name\]

behavior.

Do not add another greeting.

Do not collect a user first name to replace it.

Do not invent personalized greeting logic.

The business name is business identity, not the person's name.

The business name should remain where it already makes sense as business
identity, particularly the existing app header.

### 4.3 Remove the Home "potential value" summary

Remove the current Home `activeSummary.value` / "potential value"
presentation.

Do not replace it with another analytics metric.

Do not add charts, revenue forecasting, conversion metrics, or pipeline
analytics.

The Home priority is action, not analytics.

### 4.4 Establish the Home mental model

Home should be organized around:

1.  **Needs Follow-up**
2.  **Open Quotes**

The primary question Home must answer is:

> **Who do I need to deal with right now?**

### 4.5 Rename "Follow up now" to "Needs Follow-up"

The actionable section should be named:

**Needs Follow-up**

It represents quotes that currently require the user to contact the
customer.

This includes: - Overdue follow-ups - Follow-ups due today

The existing call/message actions must continue to work.

Do not add new communication channels.

### 4.6 Rename "Active Quotes" to "Open Quotes"

Use:

**Open Quotes**

instead of:

**Active Quotes**

"Open Quotes" should communicate that these are opportunities that have
not reached a terminal Won/Lost outcome.

The terminology should be understandable without requiring the user to
learn internal CRM terminology.

### 4.7 Separate lifecycle status from action state

Do not treat **Active** and **Follow Up** as equivalent concepts.

The mental model must be:

**Lifecycle/status:** - Draft - Sent - Follow Up - Closed

**Action state:** - No immediate action - Needs Follow-up - Overdue

A quote can be an open quote and also require follow-up. That overlap is
logically valid, but the UI must not present the two concepts as
competing lifecycle buckets.

The user should understand:

> **Open Quote** = the opportunity is still open.

> **Needs Follow-up** = the user currently needs to contact the
> customer.

Do not create a second database status system merely to represent this
distinction.

Reuse the existing status and follow-up date data.

### 4.8 Correct Home quote grouping

The Home should present:

**Needs Follow-up** - Overdue first. - Due today after overdue. -
Existing actionable FollowUpItem behavior should be reused. - Preserve
existing tap-to-call/tap-to-message functionality.

**Open Quotes** - Open opportunities that are not currently requiring
immediate follow-up. - Do not present the same quote in the Home
actionable list and the Open Quotes list as two competing
representations of the same task.

The exact existing quote/status logic must be inspected before
implementation. Do not guess a new definition from this document alone.

Do not restore the removed Recent section.

Do not add additional dashboard sections.

### 4.9 Simplify Quotes filters

The current filter model mixes lifecycle concepts with action concepts:

-   All
-   Active
-   Follow Up
-   Won
-   Lost
-   Overdue

This must be corrected.

Replace **Active** with **Open**.

Replace **Follow Up** with **Needs Follow-up**.

The intended user-facing filter model is:

-   All
-   Open
-   Needs Follow-up
-   Won
-   Lost

Do not keep **Active** as an additional synonym.

Do not add a separate **Overdue** top-level filter.

"Overdue" is an action-state condition within Needs Follow-up, not a
separate lifecycle category.

Needs Follow-up must represent quotes currently requiring contact,
including due-today and overdue follow-ups, consistent with the existing
actionable follow-up behavior.

Won and Lost remain terminal outcome filters.

### 4.10 Update Quotes/Home navigation consistently

Any existing Home links that currently navigate to:

-   `filter=active`
-   `filter=follow_up`

must be updated to the new filter semantics.

Do not leave old filter names functioning invisibly behind the new
labels unless the existing routing architecture requires a compatibility
transition. If compatibility is required, inspect the code and implement
it without exposing duplicate concepts to users.

### 4.11 Correct business-name usage

Keep `businessName` as business identity.

It is already shown in the AppShell header and is collected during
signup for that purpose.

Do not use `businessName` as a person's name.

Do not change the account model to add personal-name fields.

Do not add profile personalization.

The only requested correction is removing its use in the Home greeting.

### 4.12 Terminology and UI consistency pass

After implementing the above, search the entire relevant frontend for
the old terminology and redundant concepts.

Remove or update user-facing references to:

-   Attention
-   Active quotes
-   Active filter
-   Follow up now
-   Potential value
-   Good morning/afternoon/evening greeting using business name

Use the approved terminology:

-   Needs Follow-up
-   Open Quotes
-   Open
-   Won
-   Lost

Do not make unrelated copy changes.

## 5. Explicit Non-Goals

Do NOT:

-   Add new quote features.
-   Add CRM features.
-   Add analytics.
-   Add charts.
-   Add revenue forecasting.
-   Add notifications.
-   Add new follow-up types.
-   Add multiple follow-up dates.
-   Add personal names/user profiles.
-   Add team functionality.
-   Add customer management.
-   Add messaging integrations.
-   Add calendar integration.
-   Add AI functionality.
-   Add new dashboard sections.
-   Restore Recent.
-   Redesign unrelated screens.
-   Change the database unless inspection proves it is required for the
    approved terminology/behavior correction.
-   Introduce new dependencies.
-   Change the established stack.
-   Turn this task into a visual redesign.

This task is specifically an information-architecture and behavior
correction.

## 6. UX Requirements

The resulting Home must make the primary job obvious without requiring
the user to understand CRM terminology.

The hierarchy must communicate:

1.  **Who needs my attention now?**
2.  **What quotes are still open?**
3.  **Create a new quote.**

Do not add decorative SaaS patterns merely to make the dashboard look
more complete.

The interface should feel purposeful rather than like a collection of
dashboard widgets.

Preserve existing mobile-first behavior and touch-friendly controls.

Do not change the established visual design system unless a small change
is necessary to support the corrected hierarchy.

## 7. Security / Data Requirements

This correction must not weaken existing security.

Preserve: - Existing authentication. - Existing authorization. -
Existing user/quote ownership boundaries. - Existing server-side
validation. - Existing database access patterns.

Do not move filtering/security logic into the client if the existing
architecture protects data server-side.

Do not expose additional quote data.

Do not change quote ownership semantics.

## 8. Edge Cases

Verify:

1.  No quotes.
    -   Existing empty state remains functional.
    -   No Attention section appears.
    -   No greeting appears.
2.  Quotes exist but none need follow-up.
    -   Needs Follow-up section should not imply urgent work.
    -   Open Quotes remains available when applicable.
3.  Overdue quotes exist.
    -   They appear in Needs Follow-up.
    -   They remain identifiable as overdue using the existing behavior.
4.  Due-today quotes exist.
    -   They appear in Needs Follow-up.
5.  A quote has a follow-up date but is already Won/Lost.
    -   It must not appear as an actionable follow-up.
6.  Draft quotes.
    -   Preserve the existing product status behavior.
    -   Do not incorrectly classify Draft as requiring follow-up merely
        because it is open.
7.  Multiple open quotes.
    -   Do not create duplicate conceptual sections for the same task.
8.  Quotes filters.
    -   All, Open, Needs Follow-up, Won, and Lost must return the
        expected sets.
    -   Old Active/Overdue user-facing concepts must not remain as
        duplicate choices.
9.  Business name.
    -   It remains visible in the appropriate app header.
    -   It must never be inserted into a personal greeting.

## 9. Testing Requirements

Before declaring complete:

### Static/code validation

-   TypeScript passes.
-   Existing lint/format checks pass.
-   Production build passes.
-   No new console errors.

### Home behavior

Test: - Empty state. - Open quotes. - Due-today follow-ups. - Overdue
follow-ups. - Mixed overdue + due-today. - Won/Lost quotes excluded from
actionable follow-up. - No Attention section. - No business-name
greeting. - No potential-value metric. - Correct Needs Follow-up/Open
Quotes hierarchy.

### Quotes behavior

Test: - All - Open - Needs Follow-up - Won - Lost - Search combined with
filters. - Home links into Quotes use the correct filter. - No Active
filter remains exposed. - No Overdue top-level filter remains exposed. -
No duplicate filter semantics.

### Regression

Verify: - Quote creation still works. - Quote detail still works. -
Quote editing still works. - Status transitions still work. - Follow-up
date behavior still works. - Call/message actions still work. - Existing
authentication/authorization remains intact. - Mobile layout remains
usable at the project's supported widths.

## 10. Acceptance Criteria

This task is accepted only when all are true:

-   [ ] Home no longer contains an Attention section.
-   [ ] Home no longer displays Good morning/afternoon/evening with
    business name.
-   [ ] Business name remains available as business identity in the
    existing app header.
-   [ ] Home no longer displays "potential value".
-   [ ] Home uses "Needs Follow-up" as the actionable section.
-   [ ] Home uses "Open Quotes" instead of "Active Quotes".
-   [ ] Active and Follow Up are no longer presented as
    equivalent/overlapping user concepts.
-   [ ] Needs Follow-up clearly means quotes requiring contact now.
-   [ ] Open Quotes clearly means quotes that remain open.
-   [ ] Overdue is represented within the follow-up/action concept, not
    as a separate lifecycle filter.
-   [ ] Quotes filters are All, Open, Needs Follow-up, Won, Lost.
-   [ ] Active is removed from user-facing quote filters.
-   [ ] Overdue is removed as a top-level user-facing quote filter.
-   [ ] Existing call/message actions remain functional.
-   [ ] Existing quote data/status model is reused.
-   [ ] No unrelated features are added.
-   [ ] No unrelated screens are redesigned.
-   [ ] No unnecessary database migration is introduced.
-   [ ] Existing tests/build/lint/type checks pass.
-   [ ] Mobile behavior remains correct.
-   [ ] No new security regression is introduced.

## 11. Definition of Done

The work is done when:

1.  The current repository has been inspected before modification.
2.  The Home information architecture matches this specification.
3.  The Quotes filter model matches this specification.
4.  Redundant Attention UI is completely removed.
5.  The business-name greeting is completely removed.
6.  Potential-value presentation is completely removed.
7.  Active/Follow-up terminology has been corrected consistently.
8.  Existing quote/status/follow-up functionality continues to work.
9.  Tests and production validation pass.
10. No unrelated scope has been introduced.
11. The final implementation can be explained entirely by this document
    and the existing project specifications.

## 12. Final Implementation Report

After implementation, report:

### Files Changed

List every modified file.

### Files Added

List every added file, or state "None."

### Database Changes

State exactly what changed, or "None."

### Behavior Changes

Summarize the Home and Quotes behavior changes.

### Tests Run

List commands/tests and their results.

### Verification

State whether the acceptance criteria passed.

### Remaining Issues

List any unresolved issue.

### Scope Check

Explicitly confirm whether any unrelated feature or architecture was
introduced.

If the agent encounters a conflict between this document, the
authoritative project specifications, and the existing code, do not
silently resolve it. Stop the affected work, explain the conflict, and
request a decision.
