# Next Knock — Product Hardening Specification

**Product:** Next Knock  
**Stage:** Product 1  
**Position:** After Phase 8, before Phase 9  
**Status:** Locked Product Specification  
**Purpose:** Finalize Product 1 before marketing, deployment, payments, and commercial launch.

---

# 1. DOCUMENT AUTHORITY

This document is the authoritative specification for the Next Knock Product Hardening pass.

The purpose of this document is to define exactly what Product 1 must contain after hardening.

This document defines:

- product behavior
- screen structure
- information hierarchy
- user interactions
- navigation behavior
- data behavior
- UI states
- validation requirements
- security requirements
- acceptance criteria
- explicit non-features

The existing Next Knock codebase determines HOW these requirements are technically implemented.

This document determines WHAT the product must do.

## Product decision rule

If a behavior is explicitly defined in this document, implement that behavior.

If a behavior is explicitly excluded in this document, do not implement it.

If a technical implementation detail is not specified, use the existing architecture and the simplest maintainable implementation.

Do not invent new product features, workflows, screens, business concepts, or navigation patterns.

Do not redesign the product beyond the requirements in this document.

---

# 2. EXISTING PRODUCT

Next Knock is an existing mobile-first PWA for cleaning-business owners.

Phase 8 has already been completed.

The core application already contains working functionality for:

- authentication
- quotes
- quote creation
- quote editing
- quote status
- follow-ups
- quote details
- notes
- dashboard/home
- application navigation

The hardening pass must preserve this working functionality.

Do not rewrite functioning systems without a direct requirement in this document.

---

# 3. PRODUCT DEFINITION

Next Knock exists to solve one primary problem:

> Cleaning-business owners lose potential jobs because they forget to follow up on quotes.

Next Knock helps the owner:

```text
Create quote
    ↓
Track quote
    ↓
Set follow-up
    ↓
Know when follow-up is due
    ↓
Contact customer
    ↓
Update outcome

The primary product question is:

Who should I follow up with next?

Next Knock is not intended to become a complete business-management platform.

4. HARDENING OBJECTIVES

This hardening pass has the following fixed objectives:

Redesign the Home information hierarchy.
Remove duplicate quote presentation from Home.
Remove the Recent section from Home.
Make Home an action-oriented dashboard.
Make Quotes the authoritative location for the complete quote inventory.
Add quote search.
Add quote filtering.
Improve follow-up visibility.
Improve overdue handling.
Improve due-today handling.
Improve Quote Detail actions.
Add follow-up rescheduling.
Add lightweight activity history.
Complete Account Settings.
Add Change Password.
Add Delete Account.
Remove non-functional notification UI.
Improve empty states.
Improve loading states.
Improve error states.
Improve first-time user clarity.
Preserve mobile-first behavior.
Preserve existing functionality.
Verify authorization and user-data isolation.
Regression-test the complete application.
Lock Product 1 after all requirements pass.

No additional product expansion is included in this pass.

5. EXISTING PRODUCT NAVIGATION

The existing application navigation must be preserved unless a change is explicitly required by this document.

The hardening pass does not introduce:

a separate Customers section
a separate Activity section
a separate Follow-Ups section
a separate Notifications section
a separate Analytics section

Home remains the command center.

Quotes remains the complete quote inventory.

Quote Detail remains the operational workspace for an individual quote.

Settings remains the account-management area.

6. HOME SCREEN — COMPLETE SPECIFICATION
6.1 Home's Purpose

Home is not the complete quote database.

Home exists to answer:

What requires my attention right now?

Home must prioritize actionable follow-ups.

Home must not show multiple versions of the same quote.

7. HOME SCREEN STRUCTURE

The Home screen must use this exact information hierarchy:

HOME
│
├── 1. Header
│
├── 2. Attention Summary
│
├── 3. Follow Up Now
│
├── 4. Active Quotes Summary
│
└── 5. New Quote Action

These are the only Home sections required by Product 1.

Do not add additional Home sections.

8. HOME — HEADER

The top of Home must identify Next Knock and the authenticated user's business/context.

The header may display:

Next Knock branding
business name
appropriate greeting

Example:

Next Knock


Good morning, Mike

The header must not contain:

quote lists
charts
recent activity
recent quotes
unrelated statistics
9. HOME — ATTENTION SUMMARY

Immediately below the header, display the user's current follow-up workload.

The summary must contain exactly these two metrics:

OVERDUE
[number]


DUE TODAY
[number]

The numbers must be calculated from the authenticated user's real quote data.

Do not use hardcoded values.

Do not display additional metrics in this section.

10. HOME — OVERDUE DEFINITION

A quote is considered overdue when:

followUpDate < currentDate

and the quote still requires follow-up.

Quotes that are already completed through a terminal outcome must not continue appearing as actionable overdue follow-ups.

Terminal outcomes are:

Won
Lost

The overdue count must therefore represent actionable overdue follow-ups, not every historical quote whose date happens to be in the past.

11. HOME — DUE TODAY DEFINITION

A quote is due today when:

followUpDate === currentDate

and the quote still requires follow-up.

Won and Lost quotes must not appear as actionable due-today follow-ups.

12. HOME — ATTENTION SUMMARY EMPTY STATE

If:

Overdue = 0
Due Today = 0

the summary must communicate that no follow-up currently requires attention.

Display:

You're all caught up.


No follow-ups need your attention.

Do not display an empty quote list underneath it.

13. HOME — FOLLOW UP NOW

The Follow Up Now section contains actionable quotes requiring immediate attention.

The section must contain:

Overdue quotes first.
Due Today quotes second.

The same quote must appear only once.

A quote must never appear simultaneously as:

overdue
due today
recent
active

on the Home screen.

Home must have one actionable representation of each quote.

14. HOME — FOLLOW-UP DISPLAY LIMIT

Home must not become a full quote database.

Display a maximum of 3 actionable follow-up items in the Follow Up Now section.

If more than 3 actionable follow-ups exist, display:

View all follow-ups

The action must open the Quotes screen with the Follow Up filter applied.

Do not create a separate Follow-Ups screen.

15. HOME — FOLLOW-UP ITEM

Each actionable follow-up item must display:

customer name
quote amount
service name when available
follow-up status
follow-up date/state

Examples:

Sarah Miller


$280 · House Cleaning


Due today


[ Call ] [ Message ]

or:

Mark Davis


$450 · Move-out Cleaning


2 days overdue


[ Call ] [ Message ]

Selecting the quote itself opens Quote Detail.

16. HOME — FOLLOW-UP ACTIONS

Each follow-up item must provide:

Call
Message

when a valid customer phone number exists.

Call uses the device's native telephone functionality.

Message uses the device's native messaging functionality where supported.

Home must not implement internal communications.

17. HOME — FOLLOW-UP ORDER

The exact ordering is:

1. Oldest actionable overdue follow-up
2. Next oldest actionable overdue follow-up
3. Remaining actionable overdue follow-ups
4. Due-today follow-ups

Within the same urgency group, older follow-up dates have higher priority.

Do not randomly reorder actionable follow-ups.

18. HOME — ACTIVE QUOTES SUMMARY

Below Follow Up Now, display an Active Quotes summary.

This section is a summary only.

It must display:

ACTIVE QUOTES


[number] active quotes


[total potential quote value]
potential value


[ View active quotes ]

Example:

ACTIVE QUOTES


8 active quotes


$3,240 potential value


[ View active quotes ]

The numbers must come from real data.

19. HOME — ACTIVE QUOTE DEFINITION

An active quote is a quote that is not in a terminal outcome.

Terminal outcomes:

Won
Lost

The exact existing quote status architecture must be preserved.

Do not create a new quote lifecycle solely for this summary.

20. HOME — ACTIVE QUOTE NAVIGATION

Selecting:

View active quotes

must open the existing Quotes screen with the Active filter selected.

Do not create a new Active Quotes screen.

21. HOME — ACTIVE QUOTE DUPLICATION RULE

Individual active quote cards must NOT be displayed underneath the Active Quotes summary.

For example, this is forbidden:

ACTIVE QUOTES


8 active quotes
$3,240 potential value


Sarah
$280


Mark
$450


John
$500

The Home screen only displays the summary.

The Quotes screen displays the individual quotes.

22. HOME — NEW QUOTE ACTION

Home must provide a clear:

+ New Quote

action.

Selecting it must open the existing New Quote flow.

Do not create another quote creation system.

The action must remain easy to access on mobile.

23. HOME — REMOVED SECTIONS

The following are permanently removed from Home:

Recent Quotes
Recent Activity
Recently Viewed
Recent Customers
Active Quote List
Full Quote List
Generic Activity Feed
duplicate Due Today lists
duplicate Overdue lists
duplicate quote summaries

Do not replace Recent with another section serving the same purpose.

24. HOME — MANY QUOTES

Home must remain clean when the user has:

0 quotes
1 quote
3 quotes
10 quotes
50+ quotes

Home must not expand into an uncontrolled list.

The full quote inventory belongs to Quotes.

25. HOME — NO QUOTES

If the user has no quotes:

Display:

No quotes yet.


Create your first quote to start
tracking your follow-ups.


[ + New Quote ]

Do not display:

empty Recent section
empty Active Quotes section
empty Follow Up list
26. QUOTES SCREEN — PURPOSE

Quotes is the authoritative location for the user's complete quote inventory.

Users go to Quotes when they need to:

find a quote
browse quotes
search quotes
filter quotes
open Quote Detail
27. QUOTES SCREEN STRUCTURE

The Quotes screen must contain:

QUOTES


[ Search quotes... ]


[ All ]
[ Active ]
[ Follow Up ]
[ Won ]
[ Lost ]
[ Overdue ]


Quote list

The existing Next Knock visual design system must be used.

28. QUOTES — SEARCH

Search must support:

customer name
customer phone number
customer email

Search must only search the authenticated user's own quote data.

Search must be case-insensitive for textual fields.

Search must update the displayed quote list based on the entered query.

29. QUOTES — SEARCH EMPTY STATE

If no quotes match the search:

Display:

No quotes found.


Try a different name or phone number.

Do not display unrelated recommendations.

30. QUOTES — FILTERS

The available filters are exactly:

All
Active
Follow Up
Won
Lost
Overdue

No additional quote filters are required.

31. QUOTES — FILTER DEFINITIONS
All

Displays all quotes belonging to the authenticated user.

Active

Displays quotes that are not Won or Lost.

Follow Up

Displays quotes that currently have a follow-up requiring action.

Won

Displays quotes with Won status.

Lost

Displays quotes with Lost status.

Overdue

Displays actionable follow-ups whose follow-up date is before today.

32. QUOTES — SEARCH + FILTER

Search and filters must work together.

Example:

Search: Sarah
Filter: Active

The result must contain only the authenticated user's active quotes matching Sarah.

Do not make search and filters mutually exclusive.

33. QUOTES — QUOTE LIST ITEM

Each quote list item must communicate:

customer name
quote amount
service
quote status
follow-up state/date where applicable

Selecting the quote opens Quote Detail.

34. QUOTES — DATA OWNERSHIP

Every quote returned by the Quotes screen must belong to the authenticated user.

The client must never be able to bypass this restriction through:

URL manipulation
request manipulation
ID manipulation
client-side state changes

Server-side authorization remains authoritative.

35. QUOTE DETAIL — PURPOSE

Quote Detail is the operational workspace for an individual quote.

It must answer:

What is this quote, what has happened, and what should I do next?

36. QUOTE DETAIL — REQUIRED INFORMATION

Quote Detail must display the existing quote information already supported by Product 1.

This includes the applicable:

customer information
service
quote amount
quote status
follow-up information
notes

Do not remove existing useful quote information.

37. QUOTE DETAIL — REQUIRED ACTIONS

The Quote Detail screen must provide these actions where applicable:

Call
Message
Edit
Follow Up
Reschedule Follow Up
Mark Won
Mark Lost

Do not create duplicate versions of these actions.

38. QUOTE DETAIL — CALL

If a valid phone number exists:

Call

must launch the device's native telephone action.

No internal calling system is required.

39. QUOTE DETAIL — MESSAGE

If a valid phone number exists:

Message

must launch the device's native messaging action where supported.

No internal messaging system is required.

40. QUOTE DETAIL — FOLLOW-UP

The quote must show whether a follow-up exists.

Possible states:

No follow-up scheduled
Follow-up scheduled
Due today
Overdue

The user must be able to schedule a follow-up.

41. QUOTE DETAIL — FOLLOW-UP RESCHEDULING

If a follow-up exists, the user must be able to reschedule it.

Quick options:

Tomorrow
In 3 days
Next week
Custom date

Custom date must allow selecting a specific future date.

No full calendar-management feature is required.

42. QUOTE DETAIL — FOLLOW-UP STATE TRANSITIONS

Follow-up behavior must follow:

No Follow-Up
      ↓
Scheduled
      ↓
Due Today
      ↓
Overdue

The user may reschedule a scheduled, due-today, or overdue follow-up.

Rescheduling updates the follow-up date.

Won and Lost quotes are no longer actionable follow-ups.

43. QUOTE DETAIL — WON

When the user marks a quote Won:

quote status becomes Won
quote no longer appears in Active
quote no longer appears in Follow Up
quote no longer appears in Overdue
quote no longer appears in Due Today
activity history records the change

Do not delete the quote.

44. QUOTE DETAIL — LOST

When the user marks a quote Lost:

quote status becomes Lost
quote no longer appears in Active
quote no longer appears in Follow Up
quote no longer appears in Overdue
quote no longer appears in Due Today
activity history records the change

Do not delete the quote.

45. LOST REASON

When marking a quote Lost, provide an optional reason.

The available reasons are exactly:

Too expensive
Chose another cleaner
No response
Cancelled
Other

The user must be able to continue without selecting a reason.

Do not add additional categories.

46. QUOTE NOTES

Existing quote notes must remain functional.

Notes are plain business notes associated with the quote.

Examples:

Customer wants Saturday.


Waiting for spouse to confirm.


3-bedroom house.

Do not convert Notes into:

a messaging system
a task system
a document system
a CRM module
47. ACTIVITY HISTORY

Quote Detail must contain a lightweight activity history.

Activity history records meaningful application events.

Required event types:

Quote created
Quote edited
Status changed
Follow-up scheduled
Follow-up rescheduled
Marked Won
Marked Lost

Follow-up state changes that are automatically caused by the passage of time do not require a new activity record.

48. ACTIVITY HISTORY — DISPLAY

Activity history must show:

event
date/time

Example:

ACTIVITY


Aug 21
Follow-up rescheduled


Aug 20
Status changed to Sent


Aug 18
Quote created

The history is read-only.

Do not add manual activity creation.

49. ACCOUNT SETTINGS — PURPOSE

Settings exists for basic account management.

It is not a business-management dashboard.

50. SETTINGS STRUCTURE

Settings must contain exactly these functional areas:

SETTINGS


ACCOUNT
├── Business Name
├── Email
└── Change Password


ACCOUNT ACTIONS
├── Log Out
└── Delete Account

Do not add additional settings categories.

51. SETTINGS — BUSINESS NAME

The authenticated user must be able to view and edit the business name.

Requirements:

current value is displayed
user can edit it
empty/invalid input is rejected according to existing validation rules
successful changes persist
updated value is reflected in the application

Do not create a separate Business Management section.

52. SETTINGS — EMAIL

Display the authenticated account email.

Email may remain read-only if the existing authentication architecture does not support safe email changes.

Do not implement email-change functionality during this pass.

53. SETTINGS — CHANGE PASSWORD

Change Password must contain:

Current Password
New Password
Confirm New Password

Actions:

Cancel
Change Password

Validation:

current password is required
new password is required
confirmation is required
new password and confirmation must match
existing password policy must be respected

On success:

password is changed
success feedback is shown
user returns to Settings

On failure:

user remains on the form
actionable error feedback is shown
authentication internals are not exposed

Passwords must never be:

logged
displayed
returned by APIs
stored in plaintext
54. SETTINGS — LOGOUT

Selecting Log Out must:

invalidate the authenticated session using the existing authentication architecture
clear appropriate client authentication state
prevent access to protected application resources
return the user to the unauthenticated screen

Do not create another logout mechanism.

55. SETTINGS — DELETE ACCOUNT

Delete Account must permanently remove the authenticated user's account according to the application's data model.

The action must require explicit confirmation.

The confirmation must clearly communicate that the action is destructive.

Example:

Delete account?


This permanently deletes your account
and associated data.


[ Cancel ]
[ Delete Account ]

The destructive action must not be triggered accidentally.

56. ACCOUNT DELETION — REQUIRED BEHAVIOR

When account deletion succeeds:

User account is deleted.
User-owned application data is deleted according to the existing data model and deletion policy.
Session is invalidated.
User is returned to the unauthenticated state.
Protected resources are no longer accessible.

The user must not be required to purchase the product again merely because they deleted their account.

Commercial entitlement behavior is handled in later commercial phases.

57. ACCOUNT DELETION — SECURITY

Account deletion must verify that the authenticated user is deleting their own account.

The client must not be able to specify another user's account ID to delete.

Authorization must be enforced server-side.

58. NOTIFICATIONS

Push notifications are NOT part of Product 1 hardening.

Any existing notification/reminder setting that is not actually functional must be removed from Settings.

The final product must not present a non-functional feature as if it exists.

Do not implement:

push notifications
browser notifications
SMS reminders
automated email reminders

Follow-up visibility is handled directly inside the application.

59. FIRST-TIME USER EXPERIENCE

A new user must understand the core workflow without reading documentation.

The application must communicate:

Create a quote
↓
Set a follow-up
↓
Return when it is due
↓
Contact customer
↓
Update the result

If there are no quotes, the Home empty state must guide the user toward:

+ New Quote

Do not add a long onboarding tutorial.

60. EMPTY STATES
Home — No Quotes
No quotes yet.


Create your first quote to start
tracking your follow-ups.


[ + New Quote ]
Home — No Follow-Ups
You're all caught up.


No follow-ups need your attention.
Quotes — No Quotes
No quotes yet.


Create your first quote to start
tracking your follow-ups.


[ + New Quote ]
Quotes — Search Result Empty
No quotes found.


Try a different name or phone number.

Empty states must not contain fake data.

61. LOADING STATES

Data-driven screens must show an appropriate loading state while waiting for data.

Loading states must:

clearly indicate loading
not look like an error
not display fake quote data
avoid unnecessary animation

Use the existing application loading patterns where available.

62. ERROR STATES

The following operations require understandable user-facing errors:

login
registration
quote creation
quote editing
follow-up scheduling
follow-up rescheduling
status updates
password change
account deletion
quote loading
search

Errors must not expose:

stack traces
SQL errors
database internals
API secrets
environment variables
authentication internals
63. MOBILE-FIRST REQUIREMENTS

Next Knock is primarily used from mobile devices.

All modified screens must prioritize mobile.

Requirements:

touch-friendly controls
readable text
clear hierarchy
large enough interactive targets
minimal typing
short interaction paths
mobile-friendly forms
no dense desktop tables
no tiny controls
no unnecessary modal chains
no excessive horizontal scrolling

Desktop support must remain functional.

64. ACCESSIBILITY

Modified functionality must maintain:

semantic buttons
labelled form fields
keyboard accessibility
visible focus states
accessible error messages
accessible modal behavior
accessible destructive confirmations
sufficient contrast

Accessibility must not be sacrificed for visual styling.

65. VISUAL DESIGN CONSTRAINT

The product must retain a professional, clean, intentional visual identity.

Do not introduce:

generic AI-dashboard styling
excessive pill-shaped UI
unnecessary gradients
excessive glassmorphism
excessive animations
decorative UI that does not communicate information
visually noisy dashboards

The UI should feel like a focused professional mobile business tool.

Use the existing Next Knock design system and visual language.

Do not redesign unrelated screens.

66. DATA REQUIREMENTS

The hardening pass may use existing application data structures.

New data is permitted only when required by an explicit requirement in this document.

Potentially required data includes:

business name
activity history
lost reason

Existing authentication data must be reused.

Existing quote data must be reused.

Do not create a generalized CRM data model.

Do not create unrelated entities.

67. CUSTOMER DATA MODEL

A separate customer-management system is NOT part of Product 1.

Do not introduce:

Customers section
Customer dashboard
Customer portal
Customer profiles
Customer loyalty
Customer segmentation

Quotes remain the primary business record.

Customer information remains associated with quotes according to the existing architecture.

68. REPEAT CUSTOMERS

Repeat-customer functionality is explicitly OUT OF SCOPE.

Do not implement:

repeat-customer badges
customer lifetime value
customer history dashboard
customer loyalty
customer segmentation

This may be evaluated separately in future product development.

69. DASHBOARD METRICS

Home may display only the explicitly defined Active Quotes summary and Attention Summary.

Do not add additional dashboard metrics.

Do not add:

revenue charts
revenue forecasts
conversion graphs
monthly analytics dashboard
employee statistics
business intelligence
financial reports

The Home screen must remain focused on action.

70. COMMERCIAL SYSTEM

Commercial functionality is outside this hardening pass.

Do not implement:

PayMongo
checkout
subscriptions
purchase validation
paid entitlements
billing
invoices
payment history

These belong to later phases.

The current account architecture must not be unnecessarily rewritten for future payments.

71. EXPLICITLY FORBIDDEN FEATURES

The following features must not be added during this hardening pass.

Business Management
invoicing
accounting
payroll
inventory
employee management
employee scheduling
route planning
GPS
fleet management
full calendar management
CRM
customer portal
customer accounts
customer management dashboard
customer segmentation
customer loyalty
Communication
internal messaging
SMS infrastructure
Twilio
automated SMS
email automation
email marketing
call recording
call tracking
AI
AI chatbot
AI quote generation
AI pricing
AI recommendations
AI-written messages
AI forecasting
Notifications
push notifications
browser notifications
automated reminders
SMS reminders
email reminders
Commercial
PayMongo
subscriptions
billing
payment processing
purchase management
entitlement management
Marketing
landing page
Meta Ads
ad tracking
marketing automation
marketing analytics
Analytics
advanced analytics
revenue forecasting
business intelligence
advanced charts

No feature outside this specification should be added during this hardening pass.

72. EXISTING FUNCTIONALITY PRESERVATION

The following workflow must continue working:

Register
    ↓
Login
    ↓
Home
    ↓
New Quote
    ↓
Create Quote
    ↓
Quote Detail
    ↓
Set Follow-Up
    ↓
Follow-Up Becomes Due
    ↓
Home Shows Follow-Up
    ↓
Call / Message
    ↓
Update Status
    ↓
Won / Lost
    ↓
Home Updates

Existing quote editing must remain functional.

Existing notes must remain functional.

Existing authentication must remain functional.

Existing navigation must remain functional.

73. SECURITY REQUIREMENTS

All authenticated data must remain isolated by user.

The server must verify ownership for:

quote retrieval
quote creation
quote editing
quote deletion where supported
follow-up updates
status updates
activity history
account settings
account deletion

Never trust:

client-provided user ID
client-provided account ID
client-provided quote ownership
client-side authorization

Do not expose:

passwords
password hashes
API secrets
private environment variables
database credentials
74. REGRESSION TESTING

The following must be tested after implementation.

Authentication
registration
login
invalid login
logout
protected routes
session persistence
Quotes
create quote
edit quote
view quote
quote status
quote notes
quote search
quote filters
Follow-Ups
create follow-up
due today
overdue
reschedule
Won removes follow-up
Lost removes follow-up
Home
zero quotes
one quote
multiple quotes
overdue quotes
due-today quotes
many quotes
no duplicate quote presentation
active summary
attention summary
Settings
business name update
email display
change password
logout
delete account
cancel account deletion
75. HOME ACCEPTANCE CRITERIA

Home is complete only when all of the following are true:

 Recent section is removed.
 Recent is not replaced with another equivalent section.
 Attention Summary exists.
 Overdue count is accurate.
 Due Today count is accurate.
 Follow Up Now exists.
 Overdue appears before Due Today.
 Maximum of 3 actionable follow-ups are displayed.
 More follow-ups provide View All.
 View All opens Quotes with Follow Up filtering.
 Each quote appears only once on Home.
 Active quote summary exists.
 Active quote count is accurate.
 Active potential value is accurate.
 Active quote summary does not display individual quote cards.
 View Active opens Quotes with Active filtering.
 New Quote action works.
 Zero-quote state works.
 Zero-follow-up state works.
 Home remains usable with large quote counts.
76. QUOTES ACCEPTANCE CRITERIA
 All quotes can be accessed.
 Search by customer name works.
 Search by phone works.
 Search by email works.
 All filter works.
 Active filter works.
 Follow Up filter works.
 Won filter works.
 Lost filter works.
 Overdue filter works.
 Search and filters work together.
 Empty search results work.
 Only the authenticated user's quotes are displayed.
77. QUOTE DETAIL ACCEPTANCE CRITERIA
 Customer information remains available.
 Quote amount remains available.
 Service remains available.
 Status remains available.
 Follow-up information remains available.
 Notes remain available.
 Call works.
 Message works.
 Edit works.
 Follow-up scheduling works.
 Follow-up rescheduling works.
 Tomorrow works.
 In 3 days works.
 Next week works.
 Custom date works.
 Won works.
 Lost works.
 Lost reason works.
 Activity history works.
78. SETTINGS ACCEPTANCE CRITERIA
 Business name can be viewed.
 Business name can be changed.
 Business name persists.
 Email is displayed.
 Change Password exists.
 Current password is required.
 New password is required.
 Confirmation is required.
 Password mismatch is rejected.
 Existing password policy is respected.
 Password changes securely.
 Logout works.
 Delete Account exists.
 Delete Account requires confirmation.
 Delete Account only affects the authenticated user.
 Deleted account cannot access protected resources.
 Non-functional notification settings are removed.
79. UX ACCEPTANCE CRITERIA
 Empty states are present.
 Loading states are present.
 Error states are present.
 First-time experience is understandable.
 Mobile interaction is comfortable.
 Touch targets are usable.
 Forms are understandable.
 Accessibility is maintained.
 No major screen contains unnecessary duplicate information.
 UI remains visually consistent with Next Knock.
80. SECURITY ACCEPTANCE CRITERIA
 Authentication remains functional.
 Protected routes remain protected.
 User data is isolated.
 Server-side ownership checks exist.
 Client manipulation cannot bypass ownership.
 Passwords are handled securely.
 Account deletion is authorized.
 Secrets are not exposed.
 No critical security regression exists.
81. ENGINEERING ACCEPTANCE CRITERIA

Before Product Lock:

 Existing tests pass.
 New tests for changed behavior pass.
 Type checking passes.
 Linting passes.
 Production build passes.
 No critical runtime errors remain.
 No critical security issues remain.
 No unrelated functionality is broken.
 No unnecessary dependencies were introduced.
 No unnecessary architecture rewrite was performed.

Use the existing repository's configured tooling and commands.

82. PRODUCT LOCK

Product 1 becomes PRODUCT LOCKED only after every acceptance criterion in this document passes.

Product Lock means:

Product 1 feature scope is frozen.
No additional feature ideas are added.
No random UI sections are added.
No CRM expansion is added.
No competitor features are copied.
No AI features are added.
No commercial features are added.
No major redesign occurs during marketing preparation.

New ideas discovered after Product Lock must be evaluated separately as:

Product 1.1
Product 2
or rejected.
83. PHASE TRANSITION

The product lifecycle is:

Phase 8
Product QA
    ↓
Product Hardening
    ↓
Product Lock
    ↓
Phase 9
Landing Page / Marketing

Phase 9 must not begin until Product Lock is achieved.

Commercial/payment work occurs only in its designated later phase.

Marketing work does not begin inside this hardening pass.

84. FINAL PRODUCT BEHAVIOR

The finished Product 1 experience must be centered around this workflow:

USER OPENS NEXT KNOCK
        ↓
HOME
        ↓
SEE WHO NEEDS ATTENTION
        ↓
OVERDUE / DUE TODAY
        ↓
OPEN QUOTE
        ↓
CALL / MESSAGE
        ↓
FOLLOW UP / RESCHEDULE
        ↓
MARK WON / LOST
        ↓
ACTIVITY HISTORY UPDATED
        ↓
HOME REFLECTS NEW STATE

For finding older quotes:

HOME
  ↓
QUOTES
  ↓
SEARCH / FILTER
  ↓
QUOTE
  ↓
QUOTE DETAIL

For account management:

SETTINGS
  ↓
ACCOUNT
  ├── Business Name
  ├── Email
  └── Change Password
  ↓
ACCOUNT ACTIONS
  ├── Log Out
  └── Delete Account
85. FINAL PRODUCT PRINCIPLE

Next Knock must remain focused.

It is:

A simple mobile-first quote follow-up system for cleaning businesses.

It is not:

An all-in-one cleaning-business management platform.

The product has four primary jobs:

Home

Who needs my attention right now?

Quotes

Where are all my quotes?

Quote Detail

What should I do with this quote?

Settings

How do I manage my account?

Every requirement in this document exists to strengthen these four jobs.

Anything outside these jobs is outside Product 1 unless explicitly added to a future product specification.