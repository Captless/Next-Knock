# Next Knock QA Master

## Purpose

This is the mandatory lightweight QA entry point for Next Knock.

Run QA after every implementation unless the change is documentation-only.

The purpose is to catch:

- Broken code.
- Broken functionality.
- UI/layout regressions.
- Responsive problems.
- Security regressions.

Do not run unnecessary exhaustive testing. Select the QA suites relevant to the change.

## Source of Truth

Before testing:

1. Read `AGENTS.md`.
2. Inspect the current repository.
3. Inspect the files changed by the implementation.
4. Inspect relevant existing tests.
5. Inspect `package.json` before running commands.

Never assume the repository still matches older documentation.

Do not invent commands, routes, files, APIs, or expected behavior.

## QA Suites

### QA_CODE.md

Use for:

- Any code change.
- Component changes.
- Logic changes.
- API/server changes.
- Database changes.
- Dependency changes.

### QA_FUNCTIONAL.md

Use for:

- User-facing functionality.
- Quote workflow.
- Follow-up workflow.
- Authentication.
- Settings.
- Forms.
- Navigation.
- API behavior.

### QA_UI.md

Use for:

- UI changes.
- CSS/Tailwind changes.
- Layout changes.
- Responsive changes.
- Component visual changes.
- PWA/mobile presentation changes.

### QA_SECURITY.md

Use for:

- Authentication changes.
- Authorization changes.
- API/server changes.
- Database ownership changes.
- Account deletion/password changes.
- Session changes.
- Input validation changes.
- Payment/webhook changes.
- Any change that could expose user data.

## Minimum QA Selection

### Small UI-only change

Run:

- QA_CODE
- QA_UI

### Functional change

Run:

- QA_CODE
- QA_FUNCTIONAL
- QA_UI if the UI changed

### Backend/auth/database/security change

Run:

- QA_CODE
- QA_FUNCTIONAL
- QA_SECURITY

### Major/core workflow change

Run:

- QA_CODE
- QA_FUNCTIONAL
- QA_UI
- QA_SECURITY

## Mandatory Baseline

After implementation, always:

1. Inspect changed files.
2. Run relevant automated tests.
3. Run relevant QA suites.
4. Run the production build when code changed.
5. Verify there are no obvious regressions.

Do not declare success because the build passes.

## Failure Rules

### PASS

All required checks pass and no blocking defects are found.

### FAIL

Any of the following:

- TypeScript failure.
- Test failure.
- Build failure.
- Broken core workflow.
- Broken navigation.
- Security vulnerability.
- User-data isolation failure.
- Major responsive/layout break.
- Runtime error preventing normal use.

Do not hide or ignore failures.

## Severity

### P0 — Blocker

Security breach, data loss, application unusable, or critical workflow unavailable.

### P1 — Critical

Core functionality broken, authorization failure, major regression.

### P2 — Major

Important defect that does not completely block use.

### P3 — Minor

Non-blocking defect.

P0/P1 means QA FAIL.

P2/P3 may be reported as non-blocking issues, but must not be silently ignored.

## Final QA Report

Return:

### Status

PASS / FAIL

### Code

PASS / FAIL / NOT RUN

### Functional

PASS / FAIL / NOT RUN

### UI

PASS / FAIL / NOT RUN

### Security

PASS / FAIL / NOT RUN

### Build

PASS / FAIL / NOT RUN

### Issues

List only actual findings with:

- Severity.
- Route/component/file.
- Problem.
- Evidence.

### Unverified

List anything that could not be tested.

Never claim something was tested when it was not.