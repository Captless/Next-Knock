# Next Knock — Home Precision Queue Redesign

## 1. Objective

Redesign the Next Knock Home screen around the approved **Precision Queue** direction.

The Home screen must function as the user's daily work queue, not as a generic dashboard.

The primary hierarchy is:

1. **Needs Follow-up** — customers requiring action now.
2. **Open Quotes** — remaining open opportunities that do not currently require follow-up today.
3. **New Quote** — primary creation action.

The redesign must make the Home screen feel purposeful without introducing new product features, new data, new APIs, or unrelated dashboard metrics.

Approved design direction:

**A — Precision Queue**

The Open Quotes section should be presented as a large, high-confidence navigation target rather than a small "View all" link.

## 2. Authoritative References

Before implementation, inspect and follow:

- `project.md`
- Current approved hardening specifications
- Existing Home/Quotes implementation
- Existing design system/components
- Existing quote/status/follow-up logic

The current approved Home information architecture is:

**Needs Follow-up → Open Quotes → New Quote**

The previously approved corrections remain in force:

- Remove Attention completely.
- Remove the business-name greeting completely.
- Remove the potential-value summary.
- Use "Needs Follow-up" instead of "Follow up now".
- Use "Open Quotes" instead of "Active Quotes".
- Do not restore Recent.
- Do not add dashboard analytics.
- Do not add unrelated features.

## 3. Current-State Inspection

Before editing, inspect the actual implementation of:

- Home route/component
- App shell/header
- Quote cards
- Follow-up item/card components
- Open Quotes navigation
- Quote filters
- Dashboard/quote bucket logic
- Existing buttons and shared UI components
- Existing responsive/mobile styles
- Existing tests

Determine which existing components can be reused.

Do not create duplicate components if an existing component can support the redesign.

Do not invent file paths. If the actual repository structure differs, use the verified paths from the repository.

## 4. Required Home Layout

The Home screen should follow this hierarchy.

### 4.1 App Header

Keep the existing Next Knock application header and business identity.

The business name remains business identity.

Do not use the business name as a personal greeting.

Do not add a new greeting.

### 4.2 Home Title

Display:

**Home**

Keep the existing page title unless the current implementation/specification requires an approved terminology change.

Do not add a decorative greeting or secondary marketing copy.

### 4.3 Needs Follow-up

Display the section heading:

**NEEDS FOLLOW-UP**

This is the primary actionable area of Home.

It represents quotes that currently require customer contact.

It includes:

- Overdue follow-ups
- Follow-ups due today

Use the existing follow-up/action logic.

Do not create a new follow-up data model.

Do not add new communication channels.

### 4.4 Follow-up Cards

Each actionable follow-up should retain the useful information already present:

- Customer name
- Quote amount
- Quote/service description where currently supported
- Follow-up urgency/status
- Call action
- Message action

The visual hierarchy should make the customer and amount immediately scannable.

Example structure:

**Sarah Miller**                         **₱2,800**

House cleaning

**2 days overdue**

[ Call ] [ Message ]

For due-today items:

**Marco Reyes**                          **₱4,500**

Move-out cleaning

**Due today**

[ Call ] [ Message ]

Preserve the existing working Call and Message behavior.

Do not add additional actions.

### 4.5 Follow-up Ordering

Use the existing verified follow-up ordering logic.

Overdue items should appear before items due today where the current product logic supports this distinction.

Do not invent a new priority algorithm.

## 5. Open Quotes — Precision Queue

The Open Quotes section is the key redesign.

Display:

**OPEN QUOTES**

Then use one large, visually prominent navigation card.

The card should communicate:

- Number of open quotes
- What the number represents
- That the user can open the quote list

Reference structure:

**8   Open quotes                                      >**

      Quotes that don't need follow-up today

The entire card should be the navigation target.

Do not use a small text-only "View all" link.

Do not add additional statistics to the card.

Do not display monetary potential value.

Do not add charts or analytics.

### 5.1 Open Quotes Count

The number must come from the existing verified Open Quotes query/bucket.

Do not create a new database query if the existing quote logic can provide the correct value.

The count must represent quotes that are currently open according to the approved Open Quotes definition.

Do not count Won or Lost quotes.

Do not invent a separate "active" definition.

### 5.2 Open Quotes Description

Use the approved supporting description:

**Quotes that don't need follow-up today**

This communicates why the user is not seeing those quotes in the Needs Follow-up section.

Do not replace it with generic text such as:

- Manage your pipeline
- Track your sales
- View opportunities
- Keep things organized

The copy must remain focused on the actual Next Knock workflow.

### 5.3 Open Quotes Navigation

Tapping anywhere on the Precision Queue card should navigate to the Quotes screen using the approved **Open** filter.

The destination must not use the deprecated Active filter.

The navigation must use the existing routing/filter architecture.

Do not create a new route.

## 6. New Quote Action

Place the primary New Quote action below the Open Quotes Precision Queue.

Display:

**+ New quote**

Use the existing New Quote navigation/action.

Do not create a new quote flow.

The button should remain visually prominent but subordinate to the Open Quotes work queue.

The user should be able to immediately create a quote from Home.

## 7. Overall Visual Hierarchy

The Home screen should communicate:

### First priority
**Who needs my attention now?**

Needs Follow-up cards should therefore receive the strongest content hierarchy.

### Second priority
**What other quotes are still open?**

The Precision Queue card provides the answer.

### Third priority
**Create another quote.**

The New Quote action provides the next workflow action.

Do not add decorative dashboard widgets to fill unused space.

Empty space is acceptable when it improves hierarchy and reduces cognitive load.

The objective is not to make Home visually dense.

The objective is to make every visible element purposeful.

## 8. Precision Queue Visual Requirements

Use the existing design system and styling primitives where possible.

The Precision Queue should have:

- Strong visual contrast
- Clear quote count
- Clear title
- Clear supporting description
- Obvious navigation affordance
- Large touch target
- Full-card interaction
- Consistent border radius and spacing with the existing application
- Mobile-first sizing

The reference image uses a strong black card with white text and a right-side arrow.

This visual treatment is the approved direction for the Precision Queue.

Do not introduce gradients, excessive shadows, decorative illustrations, or unrelated visual effects.

Do not redesign the entire application around this one card.

## 9. Responsive / Mobile Requirements

The Home screen must remain mobile-first.

Verify:

- Full-width usable cards within the application content area.
- No horizontal scrolling.
- Touch targets remain comfortable.
- Customer names and amounts do not collide.
- Buttons remain usable at narrow widths.
- The Precision Queue remains a single clear navigation target.
- Long customer names and service descriptions wrap safely.
- Large quote counts do not break layout.
- Empty and populated states remain coherent.

Do not optimize only for desktop.

## 10. Empty States

### No follow-ups

If there are no overdue or due-today follow-ups:

Do not display an empty Attention-style metric section.

The Needs Follow-up section should communicate that there is currently no follow-up work requiring action, using the existing approved empty-state pattern where applicable.

Do not invent additional motivational copy.

### No open quotes

If there are zero open quotes:

The Open Quotes Precision Queue must still communicate the zero state clearly.

Do not hide the section entirely if doing so would remove the user's understanding of where open quotes are managed.

Keep navigation behavior consistent with the existing Quotes screen.

### No quotes at all

The Home screen must still provide the New Quote action.

Do not add unrelated onboarding features.

## 11. Explicit Deletions

The redesign must completely remove:

- Attention section
- Overdue/Due Today metric summary cards previously used under Attention
- Business-name greeting
- "Good morning/afternoon/evening, [Business Name]"
- Potential value summary
- Active Quotes terminology
- Follow up now terminology
- Recent section if still present

Do not replace these with different dashboard widgets.

## 12. Terminology

Use only the approved terminology in the relevant Home UI:

- **Needs Follow-up**
- **Open Quotes**
- **Open**
- **Won**
- **Lost**
- **New quote**

Do not reintroduce:

- Active
- Active Quotes
- Follow Up Now
- Attention
- Potential Value
- Recent

unless an authoritative specification explicitly requires a specific internal identifier that is not exposed to users.

Internal variable/function names may remain temporarily if changing them would be unnecessary, but user-facing terminology must be corrected.

## 13. Interaction Requirements

### Needs Follow-up cards

Existing interactions must continue to work:

- Call
- Message
- Open quote/detail where currently supported

Do not change their underlying behavior unless required to support the redesign.

### Precision Queue

The entire Open Quotes card is clickable.

Click/tap must navigate to:

**Quotes → Open**

Do not navigate to All.

Do not navigate to Active.

Do not create a new page.

### New Quote

The existing New Quote action remains functional.

## 14. Security Requirements

No new security boundaries are required.

Preserve the existing:

- Authentication
- Authorization
- Quote ownership checks
- Server-side filtering
- Data isolation
- API behavior

The Open Quotes count must not expose another user's quote data.

Do not rely on client-side filtering as an authorization mechanism.

Do not modify security behavior simply to support the visual redesign.

## 15. Explicit Non-Goals

Do NOT:

- Add new dashboard features.
- Add analytics.
- Add revenue/pipeline metrics.
- Add charts.
- Add notifications.
- Add AI.
- Add customer management.
- Add team management.
- Add CRM functionality.
- Add calendar integration.
- Add messaging integrations.
- Add new quote statuses.
- Add new follow-up types.
- Add new database tables.
- Add new dependencies.
- Redesign Quotes, Settings, or unrelated screens as part of this task.
- Change the product's core workflow.
- Change pricing.
- Change authentication.
- Change the established stack.

This task is specifically the **Home Precision Queue UI redesign**.

## 16. Testing Requirements

Run the existing project validation commands after implementation.

At minimum verify:

### Home
- Home loads authenticated.
- Header/business name remains correct.
- No business-name greeting exists.
- No Attention section exists.
- No potential-value metric exists.
- Needs Follow-up displays correctly.
- Overdue items display correctly.
- Due-today items display correctly.
- Open Quotes count is correct.
- Open Quotes Precision Queue displays correctly.
- Precision Queue is fully clickable.
- Precision Queue navigates to Quotes → Open.
- New Quote still works.

### Quote states
Verify:

- Won quotes are not counted as Open.
- Lost quotes are not counted as Open.
- Open quotes are counted correctly.
- Quotes requiring follow-up are handled by the Needs Follow-up logic.
- The same quote is not presented as a duplicate actionable task merely because it is also an Open Quote.

### Mobile
Test the Home screen at narrow mobile widths.

Verify:

- No horizontal overflow.
- No text clipping.
- No overlapping amount/customer content.
- Buttons remain touch-friendly.
- Precision Queue remains readable and clickable.

### Regression
Verify:

- Quote creation.
- Quote detail.
- Follow-up behavior.
- Call.
- Message.
- Existing navigation.
- Authentication/authorization.
- Production build.
- TypeScript.
- Existing tests.

## 17. Acceptance Criteria

The redesign is accepted only when:

- [ ] Home uses the approved Needs Follow-up → Open Quotes → New Quote hierarchy.
- [ ] Attention is completely removed.
- [ ] The business-name greeting is completely removed.
- [ ] Potential value is completely removed.
- [ ] Needs Follow-up remains the primary actionable section.
- [ ] Follow-up cards preserve existing useful information and Call/Message behavior.
- [ ] Open Quotes is represented by a prominent Precision Queue card.
- [ ] Precision Queue displays the correct Open Quotes count.
- [ ] Precision Queue uses the supporting text "Quotes that don't need follow-up today".
- [ ] The entire Precision Queue card is clickable.
- [ ] Precision Queue navigates to Quotes filtered by Open.
- [ ] Active is not exposed as the user-facing Home terminology.
- [ ] New Quote remains available and functional.
- [ ] No unrelated dashboard widgets are introduced.
- [ ] No new product functionality is introduced.
- [ ] Existing data and quote logic are reused.
- [ ] Mobile layout remains correct.
- [ ] Existing security boundaries remain intact.
- [ ] Existing tests/build/type validation pass.

## 18. Definition of Done

The work is complete when:

1. The current Home implementation has been inspected.
2. Existing components and logic are reused where appropriate.
3. The Home follows the approved Precision Queue hierarchy.
4. Redundant dashboard content has been removed.
5. Open Quotes has become a clear navigation/work-queue target.
6. No unrelated features or architecture have been introduced.
7. Mobile behavior has been verified.
8. Existing quote/follow-up behavior has not regressed.
9. Tests and production validation pass.
10. The final implementation matches this plan and the authoritative project specifications.

## 19. Implementation Rule

This is a UI/UX and information-architecture correction.

Do not use this task as an opportunity to redesign the entire application.

Make the smallest correct implementation that produces the approved Home experience.

If the current codebase conflicts with this plan or an authoritative project specification, do not silently choose one. Report the conflict before making a material architectural or product change.