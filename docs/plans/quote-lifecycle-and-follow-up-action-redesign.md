# Next Knock — Quote Lifecycle & Follow-up Action Redesign

## 1. Objective

Redesign quote status handling so users interact with Next Knock through clear business actions rather than manually managing ambiguous status labels.

The core principle is:

> The user tells Next Knock what happened. Next Knock manages the resulting state.

The preferred product model is:

### Quote lifecycle
- Draft
- Sent
- Won
- Lost

### Follow-up state
- No follow-up
- Scheduled
- Due today
- Overdue

Follow-up must be treated independently from quote lifecycle.

A quote can therefore be:

> Sent + Follow-up scheduled

or:

> Sent + Follow-up overdue

without requiring a separate `Follow Up` quote lifecycle status.

The redesign must reduce cognitive load on Quote Detail and eliminate the confusion caused by the current generic `Update Status` interaction.

---

## 2. Authoritative References

Before implementation, inspect:

- `project.md`
- Current approved hardening specifications
- `specs/product-1-spec.md`
- Current Quote Detail implementation
- Quote status definitions
- Follow-up scheduling/rescheduling implementation
- Lost-reason implementation
- Activity/history implementation
- Database schema and migrations
- API/server quote mutation logic
- Existing quote hooks/services
- Existing tests

The repository is the source of truth for the actual implementation.

Do not assume the current architecture matches this plan.

If the current database or API uses `Follow Up` as a persisted quote status, determine exactly how deeply it is coupled before changing it.

---

## 3. Current-State Inspection

Before editing, inspect and document:

1. Current quote status enum/type/constants.
2. Current `Update Status` UI.
3. Every frontend location that changes quote status.
4. Every backend/API endpoint that changes quote status.
5. Database representation of quote status.
6. Existing transitions between:
   - Draft
   - Sent
   - Follow Up
   - Won
   - Lost
7. How follow-up dates are stored.
8. How follow-up scheduling and rescheduling work.
9. How overdue/due-today state is calculated.
10. How Won/Lost affect follow-up visibility.
11. How lost reasons are collected.
12. How activity/history records status changes.
13. Existing tests covering status transitions.

Do not modify anything until these dependencies are understood.

If `Follow Up` is deeply embedded in the current data model, do not blindly remove it.

---

## 4. Product Mental Model

The user should not have to think in terms of database states.

The user should think:

### Draft
"I am still preparing this quote."

### Sent
"I sent the quote to the customer."

### Follow-up
"I need to contact this customer again."

### Won
"The customer accepted."

### Lost
"The opportunity is no longer happening."

The system should represent follow-up separately because follow-up is an action/reminder condition, not necessarily a quote lifecycle stage.

---

## 5. Preferred Lifecycle Model

The preferred lifecycle is:

```text
Draft
  ↓
Sent
  ↓
Won
or
Lost

Follow-up is independent:
No follow-up
      ↓
Scheduled
      ↓
Due today
      ↓
Overdue
Examples:
Quote status	Follow-up	Meaning
Draft	None	Quote is being prepared
Sent	None	Quote was sent but no follow-up scheduled
Sent	Scheduled	Follow-up is scheduled
Sent	Due today	Customer needs contact today
Sent	Overdue	Follow-up was missed
Won	None	Quote accepted
Lost	None	Opportunity closed unsuccessfully


Do not require status = Follow Up to represent follow-up.
6. Quote Detail UX
Replace the generic primary interaction:
Update Status

with user-oriented actions.
The UI should communicate the current state and present the next meaningful actions.
Draft
Display the quote as:
Draft
Primary action:
Send quote
Available actions must preserve the existing quote workflow.
Do not make the user manually select Draft.
A newly created draft should naturally remain Draft.
7. Sent Quote UX
When a quote has been sent, the user should see:
Sent
and the existing follow-up information.
If no follow-up is scheduled:
No follow-up scheduled
Primary action:
Schedule follow-up
Additional terminal actions:
Mark as won
Mark as lost
The user should not need to select a Follow Up status manually.
8. Scheduled Follow-up UX
When a follow-up exists, display the existing scheduled date/time information.
Example:
Sent
Follow-up: Sep 5
Primary action:
Reschedule follow-up
Additional actions:
Mark as won
Mark as lost
Do not require:
Update status → Follow Up

The follow-up date itself communicates that follow-up has been scheduled.
Reuse the existing rescheduling behavior.
9. Due / Overdue UX
When a follow-up is due today:
Display:
Follow-up due today
Provide the existing customer-contact actions:
- Call
- Message
Allow the user to reschedule using the existing functionality.
Do not require changing the quote lifecycle status.
When overdue:
Display:
Follow-up overdue
Include the existing Call and Message actions.
Allow the user to reschedule.
Do not introduce a new quote status for overdue.
10. Won UX
Marking a quote as won should remain an explicit terminal action.
Use:
Mark as won
After confirmation/success:
- Quote becomes Won.
- Follow-up actions are no longer actionable.
- Existing activity/history behavior remains intact.
Do not allow a Won quote to appear in active follow-up queues.
Do not require an intermediate status.
11. Lost UX
Marking a quote as lost should remain an explicit terminal action.
Use:
Mark as lost
If the existing product requires a lost reason:
- Preserve the existing lost-reason workflow.
- Require the existing required fields.
- Preserve existing validation.
- Preserve existing activity/history behavior.
After completion:
- Quote becomes Lost.
- Follow-up actions are no longer actionable.
- Quote does not appear in Needs Follow-up.
Do not bypass the existing lost-reason requirement.
12. Remove Generic Status Management
Remove the user-facing generic:
Update Status
control if the current implementation exposes status as a manual dropdown.
Do not replace it with another dropdown containing the same lifecycle options.
The user should interact through contextual actions.
Examples:
Draft:
- Send quote
Sent:
- Schedule follow-up
- Mark as won
- Mark as lost
Sent + scheduled follow-up:
- Reschedule follow-up
- Mark as won
- Mark as lost
Due/overdue:
- Call
- Message
- Reschedule follow-up
- Mark as won
- Mark as lost
Terminal:
- Display Won/Lost state
- Preserve only appropriate existing actions
Do not invent additional actions.
13. Follow-up State Must Be Independent
Follow-up state must be derived from the existing follow-up data and date logic where possible.
Do not create a duplicate database field if the existing follow-up date already provides the required information.
The system should determine:
- No follow-up
- Scheduled
- Due today
- Overdue
from the existing follow-up information.
Do not introduce a second competing follow-up status model unless inspection proves it is required.
14. Existing Follow Up Status — Migration Decision
This is the most important implementation decision.
Before changing the database, determine whether Follow Up currently exists as a persisted quote status.
Preferred outcome
If Follow Up can be safely removed from the lifecycle model:
Convert the lifecycle to:
- Draft
- Sent
- Won
- Lost
Migrate any existing Follow Up records to the appropriate lifecycle state, most likely Sent, while preserving their follow-up date.
Example:
Before:
status = Follow Up
follow_up_at = 2026-08-25

After:
status = Sent
follow_up_at = 2026-08-25
Do not perform this migration based on assumption.
Verify the actual semantics and data first.
Fallback outcome
If removing Follow Up from the persisted model creates unacceptable migration or compatibility risk:
Keep the internal status temporarily.
However:
- Do not expose it as a primary user-facing status choice.
- Do not require the user to select it manually.
- Continue treating follow-up date as the source of follow-up behavior.
- Do not allow the UI to present Follow Up as a competing concept with follow-up scheduling.
The final implementation must document why the fallback is necessary.
15. Backend / API Requirements
Inspect all quote mutation endpoints/services before modifying them.
The backend must remain authoritative for:
- Quote ownership
- Valid lifecycle transitions
- Won/Lost transitions
- Lost-reason validation
- Follow-up updates
- Authorization
Do not move status authorization into the frontend.
Do not allow arbitrary client-provided status transitions if the existing API validates transitions server-side.
If the lifecycle model changes, update server validation consistently.
Do not leave the backend accepting invalid lifecycle states merely because the frontend no longer exposes them.
16. Database Requirements
Do not change the schema until the current schema and data are inspected.
If a migration is required:
1. Preserve existing quote records.
2. Preserve follow-up dates.
3. Preserve Won/Lost states.
4. Preserve lost reasons.
5. Preserve activity/history where applicable.
6. Avoid destructive operations.
7. Do not drop columns without proving they are unused and safe to remove.
8. Provide a reversible or data-safe migration strategy where practical.
No data-loss migration is acceptable.
17. Activity / History
Existing activity/history behavior must remain meaningful.
Status changes should continue to produce appropriate history entries if the current product already records them.
If the user performs:
Send quote
the system should preserve the existing equivalent activity/history behavior.
If the user performs:
Mark as won
or:
Mark as lost
the existing history behavior must remain intact.
Do not create duplicate activity entries merely because the UI changes from a status dropdown to contextual actions.
18. Home Integration
This redesign must remain consistent with the approved Home information architecture:
Needs Follow-up → Open Quotes → New Quote
The new model must support:
Needs Follow-up
Quotes that are:
- Due today
- Overdue
and are not Won/Lost.
Open Quotes
Quotes that remain open but do not currently require follow-up today.
Do not reintroduce:
- Active
- Follow Up as a separate competing bucket
- Overdue as a lifecycle status
The Quote Detail state must match what the Home screen communicates.
19. Quotes Filter Integration
The approved Quotes filters remain:
- All
- Open
- Needs Follow-up
- Won
- Lost
Needs Follow-up must be determined from follow-up state.
It must not depend on manually selecting a Follow Up lifecycle status.
Open must represent non-terminal quote opportunities according to the approved product definition.
Do not create a separate Follow Up lifecycle filter.
20. Explicit Non-Goals
Do NOT:
- Add new quote statuses.
- Add new follow-up types.
- Add AI.
- Add automated customer messaging.
- Add WhatsApp integration.
- Add email automation.
- Add calendar integration.
- Add CRM functionality.
- Add customer management.
- Add team functionality.
- Add analytics.
- Add pipeline forecasting.
- Redesign unrelated screens.
- Change pricing.
- Change authentication.
- Change the database without verified necessity.
- Introduce new dependencies.
- Replace the existing quote architecture.
This task is specifically about making quote state management clearer and separating lifecycle from follow-up behavior.
21. Security Requirements
Preserve:
- Authentication.
- Authorization.
- User/quote ownership checks.
- Server-side validation.
- Data isolation.
- Existing session/security architecture.
A user must not be able to:
- Change another user's quote.
- Mark another user's quote Won/Lost.
- Schedule another user's follow-up.
- Bypass lost-reason requirements.
- Manipulate lifecycle state through crafted client requests.
Do not assume hiding a status control is a security control.
22. Edge Cases
Test at minimum:
1. Draft with no follow-up.
2. Draft with an invalid/accidental follow-up date, if such data can currently exist.
3. Sent with no follow-up.
4. Sent with scheduled follow-up.
5. Sent with follow-up due today.
6. Sent with overdue follow-up.
7. Won quote with an old follow-up date.
8. Lost quote with an old follow-up date.
9. Existing quotes currently stored as Follow Up.
10. Rescheduling an overdue quote.
11. Marking a due/overdue quote Won.
12. Marking a due/overdue quote Lost.
13. Lost quote requiring a lost reason.
14. Refreshing Quote Detail after every transition.
15. Navigating Home → Quote Detail → action → Home.
16. Direct API requests attempting invalid status transitions.
Terminal quotes must not remain actionable as follow-ups.
23. Testing Requirements
Frontend
Verify:
- No generic Update Status dropdown remains where contextual actions should be used.
- Draft displays Send quote.
- Sent displays appropriate follow-up and terminal actions.
- Scheduled follow-up displays the existing schedule/reschedule behavior.
- Due today displays correct urgency.
- Overdue displays correct urgency.
- Won displays terminal state.
- Lost displays terminal state and preserves lost-reason flow.
Backend
Test:
- Valid lifecycle transitions.
- Invalid lifecycle transitions.
- Authorization.
- Ownership checks.
- Follow-up updates.
- Won/Lost behavior.
- Lost-reason validation.
Database
If migration occurs:
- Existing records remain intact.
- Existing follow-up dates remain intact.
- Existing Won/Lost records remain correct.
- Existing lost reasons remain correct.
- Existing history remains intact.
- No records are silently lost.
Regression
Verify:
- Quote creation.
- Quote editing.
- Quote detail.
- Follow-up scheduling.
- Follow-up rescheduling.
- Call.
- Message.
- Home Needs Follow-up.
- Home Open Quotes.
- Quotes filters.
- Lost reasons.
- Activity/history.
- Authentication.
- Mobile behavior.
- Production build.
- TypeScript.
- Existing automated tests.
24. Acceptance Criteria
- Quote lifecycle and follow-up state are conceptually separated.
- Draft, Sent, Won, and Lost are the preferred lifecycle states.
- Follow-up is represented independently through existing follow-up scheduling/date behavior.
- Generic Update Status is removed from the user-facing workflow where contextual actions can replace it.
- Users can perform clear contextual actions such as Send quote, Schedule follow-up, Mark as won, and Mark as lost.
- Follow-up due/overdue state does not require changing quote lifecycle status.
- Existing Call and Message behavior remains functional.
- Existing rescheduling behavior remains functional.
- Existing lost-reason behavior remains functional.
- Won/Lost remain terminal outcomes.
- Won/Lost quotes do not remain in actionable follow-up queues.
- Home Needs Follow-up behavior remains correct.
- Quotes Open/Needs Follow-up filters remain correct.
- No unnecessary database change is introduced.
- If Follow Up is persisted, its removal or retention is explicitly justified after code/data inspection.
- Existing user data is preserved.
- Existing authorization/security boundaries remain intact.
- Tests pass.
- Production build passes.
- Mobile behavior remains usable.
25. Definition of Done
The work is complete when:
1. The current status architecture has been inspected.
2. The current Quote Detail workflow has been inspected.
3. Existing follow-up logic has been understood and reused.
4. Lifecycle and follow-up concepts are clearly separated.
5. User-facing status management has been replaced by contextual actions.
6. Existing functionality has not regressed.
7. Any database migration is proven necessary and data-safe.
8. Security boundaries remain intact.
9. Home and Quotes remain consistent with the new model.
10. Tests and production validation pass.
11. No unrelated product features have been introduced.
26. Final Implementation Report
After implementation, report:
Current Status Model
Describe the final lifecycle and follow-up model.
Files Changed
List every modified file.
Files Added
List every added file, or None.
Database Changes
State exactly what changed, or None.
Migration
If Follow Up was previously persisted, explain:
- Whether it was removed.
- How existing records were handled.
- Why the migration is safe.
UX Changes
Describe the new Quote Detail actions.
Security
Describe authorization/validation verification.
Tests
List all tests, builds, type checks, and validation commands run.
Remaining Issues
List unresolved issues.
Scope Check
Explicitly confirm that no unrelated features or architecture were introduced.
If implementation conflicts with the authoritative project specification, current database model, or existing security boundaries, do not silently resolve the conflict. Stop and report it.