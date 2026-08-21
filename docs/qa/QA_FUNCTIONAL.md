# Next Knock Functional QA

## Purpose

Verify that the core product actually works after implementation.

Do not exhaustively test every possible combination.

Prioritize the critical customer workflow.

## 1. Authentication

Verify:

- Login works.
- Invalid credentials are rejected.
- Protected areas require authentication.
- Logout works.
- Session behavior remains correct.

For authentication changes, also run QA_SECURITY.

## 2. Home

Verify:

- Home loads.
- Needs Follow-up displays correct data.
- Open Quotes displays correct data.
- New Quote navigation works.
- Empty states work.
- Loading states work.
- Error states are recoverable.

Do not introduce or expect unapproved dashboard features.

## 3. Quote Creation

Verify:

- New Quote opens.
- Required fields behave correctly.
- Valid quote can be submitted.
- Invalid input is rejected.
- Created quote appears correctly.
- User remains associated with the correct data.

## 4. Quote Detail

Verify:

- Quote opens from the appropriate list.
- Customer information is correct.
- Quote information is correct.
- Existing actions work.
- Navigation back works.
- Loading/error states work.

## 5. Quote Lifecycle

Verify the current approved lifecycle.

Check:

- Draft behavior.
- Sent behavior.
- Closed behavior.
- Won outcome.
- Lost outcome.
- Lost reason where applicable.

Do not reintroduce removed quote statuses.

## 6. Follow-ups

Verify:

- Follow-up information displays correctly.
- Follow-up can be created/scheduled where supported.
- Rescheduling works.
- Completion/update behavior works.
- Needs Follow-up state updates correctly.
- Dates are handled correctly.

Verify behavior rather than assuming a particular implementation.

## 7. Search and Filtering

Verify:

- Search returns appropriate results.
- Filters work.
- Combining supported filters works.
- Empty results display correctly.
- Clearing filters restores expected results.

## 8. Activity / History

Where supported by the current implementation:

- Activity/history loads.
- New relevant actions appear.
- Ordering is correct.
- Empty state works.

## 9. Settings

Verify:

- Settings loads.
- Existing account controls work.
- Password functionality works.
- Logout works.
- Account deletion flow works as currently specified.
- Confirmation dialogs behave correctly.

Do not weaken or bypass confirmation/security behavior.

## 10. Error Handling

For affected workflows verify:

- Loading state.
- Empty state.
- Failed request state.
- Retry/recovery where supported.
- No misleading success message after failure.
- No broken UI after an API error.

## 11. Navigation

Verify:

- Main navigation works.
- Direct route navigation works where supported.
- Back navigation works.
- Mobile navigation works.
- Desktop navigation works where implemented.
- No route leads to a blank/error page.

## PASS Criteria

PASS when affected workflows work end-to-end and no P0/P1 functional regression exists.

If a workflow cannot be tested, report it as unverified.

Do not assume functionality works because the UI renders.