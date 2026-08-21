# Next Knock Code QA

## Purpose

Verify that an implementation has not broken the application code, tests, imports, types, or production build.

Keep this suite fast.

## Before Testing

Inspect:

- `package.json`
- Changed files.
- Existing test structure.
- Relevant scripts.

Use the repository's current commands.

Do not invent commands.

## 1. TypeScript

Run the repository's TypeScript/typecheck command.

Expected:

- No TypeScript errors.
- No missing imports.
- No invalid types.
- No broken component props.
- No broken API types.

FAIL if TypeScript fails.

## 2. Tests

Run the existing test suite.

Check:

- Tests complete successfully.
- No unexpected failures.
- No skipped tests that were previously expected to run.

If only a focused change was made, run relevant focused tests first, then the full suite when practical.

Do not modify tests simply to make a failing implementation pass.

## 3. Lint

Run the repository's current lint command.

Check for:

- Errors.
- Broken imports.
- Invalid syntax.
- Suspicious unused code where enforced by the project.

Do not perform unrelated cleanup.

## 4. Build

Run the repository's current production build command after code changes.

Check:

- Build succeeds.
- No TypeScript/build errors.
- No broken asset generation.
- No obvious PWA build errors.

## 5. Runtime Regression

If the implementation affects runtime behavior, verify the affected route or workflow manually or through the existing test tooling.

Check for:

- Blank screens.
- Console/runtime errors.
- Failed imports.
- Components failing to render.
- Broken navigation.
- API calls failing unexpectedly.

## 6. Change Scope

Inspect the final diff.

Verify:

- Only required files changed.
- No accidental debug code.
- No secrets.
- No temporary files.
- No unrelated refactors.
- No unnecessary dependencies.
- No duplicated implementation.

## PASS Criteria

PASS only when:

- TypeScript passes.
- Relevant tests pass.
- Lint passes.
- Build passes.
- No blocking runtime issue is found.
- No accidental scope expansion is detected.

## Failure Report

For failures report:

- Command.
- Error.
- File/component.
- Likely cause.
- Severity.

Do not guess when evidence is unavailable.