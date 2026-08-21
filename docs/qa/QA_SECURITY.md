# Next Knock Security QA

## Purpose

Perform a lightweight security regression check after security-sensitive or backend changes.

Do not perform unnecessary enterprise penetration testing.

Focus on the security boundaries that matter to Next Knock.

## 1. Authentication

Verify:

- Protected endpoints require authentication.
- Unauthenticated requests are rejected.
- Logout/session invalidation behaves correctly.
- Password handling continues to use the existing secure implementation.
- No authentication state is trusted solely from the client.

## 2. Authorization / User Isolation

This is mandatory for changes involving quotes, users, APIs, or database access.

Verify that a user cannot:

- Read another user's quotes.
- Modify another user's quotes.
- Delete another user's quotes.
- Access another user's account data.
- Perform another user's protected actions by manipulating IDs.

Ownership must be enforced server-side.

Never treat a client-supplied user ID as authorization.

## 3. Input Validation

For changed API/server/database paths verify:

- Required fields are validated server-side.
- Invalid types are rejected.
- Unexpected values are rejected.
- Malformed requests do not cause crashes.
- Frontend validation is not the only validation.

## 4. SQL Injection

Inspect changed database queries.

Verify:

- User input is parameterized/bound.
- No unsafe string concatenation is introduced.
- Existing query helpers are reused where appropriate.

## 5. XSS

For user-controlled data verify:

- It is rendered through the existing safe React rendering model.
- No unsafe HTML rendering is introduced without explicit sanitization.
- User input is not inserted directly into raw HTML.

## 6. CSRF / Session Security

Where applicable to the current authentication/session architecture:

- Protected state-changing requests have the required protections.
- Session cookies retain appropriate security attributes.
- Client code cannot arbitrarily impersonate another user.

Do not invent protections that conflict with the existing architecture. Inspect first.

## 7. Secrets

Verify:

- No secrets were added to frontend code.
- No private credentials are committed.
- Server-only secrets remain server-side.
- Client environment variables contain only values intended for client exposure.

## 8. Error Leakage

Verify that API errors do not expose:

- Stack traces.
- Secrets.
- Database credentials.
- Internal filesystem information.
- Sensitive implementation details.

Errors should remain useful without exposing sensitive internals.

## 9. Account Deletion

For changes involving account deletion verify:

- Authorization is required.
- The correct account is targeted.
- Confirmation behavior remains intact.
- Server-side deletion rules are enforced.
- Another user's account cannot be targeted through manipulated identifiers.

Do not alter deletion semantics without an approved product/data decision.

## 10. Payment / Webhooks

Only run this section when payment or webhook code is changed.

Verify:

- Client payment state is not trusted as proof of payment.
- Server-side verification remains authoritative.
- Webhook validation remains intact.
- Secrets remain server-side.
- Duplicate webhook handling remains safe where applicable.

## 11. Security Regression

Inspect the final diff for:

- Removed authorization checks.
- Removed validation.
- Exposed IDs or sensitive data.
- Debug logging.
- Secrets.
- Unsafe query changes.
- Unsafe HTML rendering.
- Client-side-only security decisions.

## PASS Criteria

PASS only when no P0/P1 security issue is found.

If security behavior cannot be verified, report it as unverified.

Never claim a security check passed without inspecting the relevant implementation.