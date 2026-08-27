Next Knock — Freemium Access, Quote Limit & Upgrade Funnel

Version: 1.0.0
Status: Approved for implementation
Scope: Freemium access, quote usage limits, upgrade/payment infrastructure, entitlement enforcement, and landing-page funnel
Primary market: US-based and other premium-market cleaning businesses
Current product model: Free account → 5 lifetime quotes → paid upgrade → unlimited quotes

1. Executive Decision

Next Knock will not use a hard paywall.

Visitors will be allowed to create a free account and use the real product before purchasing.

The commercial model becomes:

Free

Full access to the existing core workflow
Maximum 5 lifetime-created quotes
Existing quotes remain accessible after the limit
New quote creation is blocked after the limit
Upgrade available at any time

Paid

Unlimited quote creation
Existing core product functionality remains available
Additional paid-only features may be introduced later only when explicitly approved

The free tier is intended to demonstrate the actual value of Next Knock rather than function as a permanently usable replacement for the paid product.

2. Core Commercial Funnel

The canonical funnel is:

Landing Page

↓

Try Next Knock Free

↓

Create Account

↓

Free Next Knock

↓

Use Core Workflow

↓

5-Quote Lifetime Limit

↓

Upgrade Prompt

↓

PayMongo Checkout

↓

Payment Verification

↓

Paid Entitlement

↓

Unlimited Quotes

The user must also be able to upgrade before reaching the limit:

Free Account → Upgrade → Checkout → Paid

The quote limit must never be the only path to purchasing.

3. Free Plan

The free plan must be a genuine product experience.

Free users can use the existing approved core functionality, including where implemented:

Quote creation
Quote editing
Quote search
Quote filtering
Follow-up management
Follow-up rescheduling
Won/Lost outcomes
Lost reasons
Quote history/activity
Home follow-up workflow
Mobile/PWA functionality
Settings and account functionality

Do not artificially disable core functionality merely to create a feature wall.

The primary free limitation is:

5 lifetime-created quotes.

4. Quote Limit Definition

The 5-quote limit means:

A free account may create a maximum of five quotes over the lifetime of that account.

It does not mean five currently active quotes.

It does not reset when a quote is deleted.

It does not reset when a quote is marked Won, Lost, or Archived.

Example:

User creates Quote 1.
User creates Quote 2.
User creates Quote 3.
User deletes Quote 1.
User has still consumed 3 of 5 quote creations.
User can create only two additional quotes.

This prevents users from bypassing the free limit through deletion.

5. Existing Quotes After Limit

Reaching the free limit must not lock the user out of their existing data.

A user at 5/5 may continue to:

View quotes
Edit quotes
Search
Filter
Follow up
Reschedule
Mark Won
Mark Lost
View history

The blocked operation is:

Creating another quote.

This provides a useful product experience while maintaining a clear upgrade boundary.

6. Quote Usage Must Be Server-Enforced

The frontend must never be the authority for the quote limit.

Do not rely on:

React state
localStorage
cookies
hidden UI fields
client-side counters
user.plan
disabled buttons

as the security boundary.

The server must determine whether a quote can be created.

Conceptually:

POST /api/quotes

→ authenticate user

→ load authoritative entitlement

→ determine plan

→ if Free:

→ calculate lifetime quote creation count

→ if count >= 5:

→ reject creation

→ otherwise create quote

→ if Paid:

→ allow creation

The response for a blocked free user should use a stable application error such as:

QUOTE_LIMIT_REACHED

The frontend may use this error to display the upgrade modal.

7. Concurrency / Race Condition Requirement

The implementation must account for simultaneous quote creation requests.

A naive implementation such as:

SELECT COUNT(*)

followed by:

INSERT

can potentially allow two simultaneous requests to both observe 4/5 and create quotes 5 and 6.

The implementation must use an appropriate D1 transaction/atomic strategy or another server-side mechanism that guarantees the free limit cannot be bypassed through concurrent requests.

This is a security/business-invariant requirement.

8. Usage Indicator

The application should communicate free-plan usage without becoming advertising-heavy.

Possible states:

1/5

3/5

4/5

5/5

The indicator may appear in appropriate existing UI surfaces such as:

Quotes
Account/settings
Upgrade surface

Do not introduce a large dashboard widget solely for quota display.

At 4/5, the UI may communicate:

1 free quote remaining

At 5/5:

You've reached your free quote limit.

9. Upgrade Access

Upgrade must always be accessible to free users.

The user should not have to reach 5/5 before being allowed to upgrade.

Possible existing navigation placement:

Upgrade

or:

Unlock Unlimited

The exact placement must be determined after inspecting the current navigation and responsive architecture.

Do not create a second navigation system unnecessarily.

10. Upgrade Modal

The upgrade modal should appear when a user attempts to create a sixth quote.

Recommended messaging:

You've reached your free quote limit.

You've created 5 free quotes. Upgrade to keep adding quotes and continue using Next Knock without the quote limit.

Primary action:

Upgrade

Secondary action:

Maybe later

The modal must not claim benefits that have not been implemented.

Do not invent:

AI features
analytics
automation
team management
invoicing
CRM functionality
11. Proactive Upgrade Messaging

The product may provide restrained upgrade messaging before the hard limit.

Recommended:

At 3/5:

You're getting value from Next Knock. Upgrade anytime for unlimited quotes.

At 4/5:

1 free quote remaining.

At 5/5:

You've reached your free quote limit.

Avoid intrusive recurring popups.

Upgrade prompts should be contextual and recoverable.

12. Paid Plan

The current intended paid offer is:

Unlimited quotes

The existing project pricing decision must be inspected before implementation.

If the approved commercial price remains $19.99 one-time, the paid model is:

Free

5 lifetime quotes

↓

$19.99 one-time

↓

Paid

Unlimited quotes

Do not silently convert this into a subscription.

Do not introduce multiple paid tiers.

Do not introduce discounts, countdown timers, or fake scarcity.

13. Paid-Only Features

Do not invent additional paid-only features merely to make the paid plan appear more valuable.

The current primary paid differentiator is:

Unlimited quotes.

If additional features are later introduced as paid capabilities, they require an explicit product decision and scope change.

14. Entitlement Architecture

The system must distinguish:

Authentication

from:

Commercial entitlement

A user having an account does not automatically mean they have paid access.

The authoritative model should conceptually be:

User

↓

Entitlement

↓

Plan

↓

Access rules

Possible plans:

free
paid

Possible entitlement states:

active
revoked

Additional states such as grace should only be introduced if a concrete payment lifecycle requires them.

15. Database Architecture

Do not add a simple:

users.is_paid

boolean as the primary commercial model.

Do not add:

users.quote_limit

as the source of truth.

The system should maintain a dedicated entitlement/payment model.

Conceptual structure:

users

id
email
password_hash
business_name
created_at
existing fields

entitlements

id
user_id
plan
status
payment_id
granted_at
revoked_at
created_at
updated_at

payments

id
provider
provider_payment_id
provider_event_id
product
amount
currency
status
customer_email
created_at
paid_at
refunded_at
disputed_at

Exact columns must be finalized after inspecting the current D1 schema and existing migrations.

Do not duplicate existing fields unnecessarily.

16. Quote Usage Representation

The implementation must determine the safest way to calculate lifetime quote usage from the existing database.

Do not introduce a redundant counter without first evaluating whether existing quote records already provide sufficient authoritative information.

If a counter is necessary for atomic enforcement/performance, it must be maintained server-side and protected against drift.

The quote-limit invariant must remain:

A free account cannot create more than five lifetime quotes.

17. Payment Architecture

PayMongo remains the preferred payment provider because it is already part of the approved project architecture.

Do not replace PayMongo with Stripe or another provider without a separate architecture/product decision.

The payment system should follow:

Upgrade

↓

Server creates checkout/payment intent

↓

Customer completes payment

↓

PayMongo webhook

↓

Webhook authenticity verification

↓

Payment verification

↓

Payment record

↓

Entitlement activation

↓

Paid account

18. USD Payment Requirement

The primary market is US-based cleaning businesses.

The desired checkout presentation is therefore:

USD

rather than presenting a PHP-denominated purchase to the target customer.

However:

The implementation must not blindly force PayMongo to use USD.

Before implementation, verify directly against the current PayMongo merchant account/API capabilities:

Whether USD-denominated payments are supported for this merchant account
Whether USD is supported by the intended Checkout API flow
Which payment methods support USD
Whether USD settlement/payout is supported
Whether US-issued cards can be accepted
Whether currency conversion occurs
Whether PayMongo requires merchant configuration or approval
Whether the merchant account's country/settlement configuration restricts USD
Fees and FX implications
Refund behavior for USD transactions

PayMongo documentation contains PHP-specific payment examples and currently documents PHP as the required currency for its WooCommerce integration, so USD capability must be explicitly verified rather than assumed.

Implementation rule:

If PayMongo confirms the required USD configuration:

→ implement server-side USD checkout.

If PayMongo does not support the required USD configuration:

→ stop payment implementation at that point and report the limitation.

Do not fake a USD checkout by merely changing frontend currency labels.

Do not display $19.99 while charging a different currency without clear disclosure.

19. Currency Security

The browser must never determine the payment amount or currency.

Never accept:

amount

or:

currency

from the client as authoritative payment information.

The server must define:

Product

Price

Currency

Allowed payment configuration

The client should only request:

Upgrade to paid plan.

The Worker determines the actual commercial parameters.

20. Payment Amount Verification

When a payment is received, the server must verify that the transaction corresponds to the expected Next Knock product.

Verification should include, where supported by the provider:

Payment ID
Checkout/session ID
Product/reference
Expected amount
Expected currency
Payment status
Live/test environment
Merchant/account context
Relevant metadata/reference number

Never grant paid entitlement solely because:

payment.status === paid

if the payment does not correspond to the expected product and amount.

21. Webhook Security

The webhook endpoint is a critical security boundary.

It must:

Verify PayMongo webhook authenticity/signature using the current official PayMongo mechanism
Reject invalid signatures
Validate request structure
Validate expected event type
Validate live/test environment
Validate payment identity
Validate payment status
Validate expected product
Validate expected amount/currency
Be idempotent
Avoid trusting frontend redirects
Avoid logging secrets or sensitive payment information
Return appropriate HTTP status codes

PayMongo documents webhook event delivery and notes that unsuccessful responses can result in retries, so the implementation must be idempotent.

22. Webhook Idempotency

Webhook events must be processed safely more than once.

Store a provider event identifier with a uniqueness constraint where appropriate.

If the same event arrives twice:

First request:

Process

Second request:

Recognize already processed

Do not duplicate entitlement

Do not duplicate payment record

Return successful response

23. Payment Redirect Security

The payment success URL must never grant access by itself.

Incorrect:

PayMongo redirects → /payment/success → activate account

Correct:

PayMongo redirects → /payment/success → display verification state

Actual entitlement activation occurs only after trusted server-side payment verification.

24. Free Signup

Free signup becomes a legitimate public acquisition mechanism.

The current signup flow can remain conceptually:

Landing

↓

Try Free

↓

Signup

↓

Free account

↓

Application

However, the signup endpoint must establish the user's free entitlement explicitly.

The server should create:

User

plus:

Free entitlement

as one coherent operation.

25. Authentication and Entitlement

Authentication answers:

Who is this user?

Entitlement answers:

What product access does this user currently have?

The application must not conflate these.

The authorization sequence should be:

Session

↓

User

↓

Entitlement

↓

Plan/status

↓

Allowed operation

26. Protected API Authorization

The existing authenticated APIs must be reviewed.

The current requireUserId() pattern is insufficient as the complete commercial authorization boundary.

Introduce/reuse an appropriate server-side authorization helper conceptually equivalent to:

requireEntitledUser()

or:

requireActiveAccess()

It must:

Validate the session.
Resolve the user.
Resolve the user's entitlement.
Determine plan/status.
Return access context to the API.

The exact helper name must follow existing repository architecture.

Do not create duplicate authentication services.

27. Quote Creation Authorization

Quote creation must perform the free-limit check server-side.

Paid:

Unlimited

Free:

Count < 5 → allow

Free:

Count >= 5 → reject

All other quote operations should remain available to free users unless explicitly restricted by an approved product decision.

28. Frontend Access Control

The frontend should know the current user's:

Plan
Entitlement status
Quote usage

for UI purposes.

But this information is not a security boundary.

The frontend may:

Show Upgrade
Show usage
Disable the New Quote button for UX
Display the upgrade modal

The server must still reject unauthorized requests.

29. Direct API Bypass

A user must not be able to bypass the quote limit through:

Browser developer tools
Direct HTTP requests
Custom scripts
Modified frontend JavaScript
Alternate API clients
Replay of old requests

Security testing must attempt these bypasses explicitly.

30. Refund Handling

A successful paid purchase creates:

Paid entitlement

If a payment is refunded:

Paid entitlement → revoked/free

Do not delete the user's account.

Do not delete their quotes.

Do not destroy historical data.

PayMongo documents payment.refunded webhook events for monitoring successful refunds.

31. Refund With More Than Five Quotes

Example:

User:

Paid

30 quotes

↓

Refund

↓

Free

The user retains all 30 quotes.

They may:

View them
Edit them
Search them
Manage existing records

They cannot create additional quotes while their lifetime free allowance has already been exceeded.

To create new quotes:

Upgrade again.

Never delete existing customer data to enforce the commercial limit.

32. Chargeback / Dispute Handling

Payment disputes must be represented separately from normal authentication.

Recommended lifecycle:

Paid

↓

Payment disputed

↓

Temporary access state if appropriate

↓

Resolution

Either:

Active

or:

Revoked

The exact grace period must be finalized based on the provider's dispute lifecycle and business risk.

Do not permanently grant access merely because the user paid once if the payment has subsequently been reversed or invalidated.

33. Failed Payments

Failed payment:

No paid entitlement

Existing free account remains:

Free

The user can retry checkout.

Do not create duplicate accounts.

Do not grant unlimited quotes while payment is pending.

34. Abandoned Checkout

Checkout created but not completed:

No paid entitlement

The user's account remains:

Free

No access change occurs.

Abandoned payment intents may be retained for operational purposes if supported by the payment architecture.

35. Account Sharing

Do not introduce invasive device fingerprinting.

Initial protections should include:

One account per email
Secure password hashing
Secure sessions
Session expiration
Authentication rate limiting
Account recovery
Server-side entitlement association
Ownership checks
No client-controlled plan state

Do not overengineer anti-sharing controls for the initial product.

36. Account Deletion

Account deletion must be reviewed against the new payment/entitlement model.

Deleting an account must not leave orphaned sensitive records without an intentional retention policy.

Payment records required for legitimate financial/audit purposes may need to remain according to applicable provider/legal requirements while personally identifying application data is handled according to the project's privacy policy.

The implementation must not casually delete payment records simply because a user deletes their application account.

37. Landing Page Funnel Changes

The landing page must communicate the freemium model clearly.

Primary CTA:

Try Next Knock Free

or an equivalent approved CTA.

Pricing should communicate:

Free

5 quotes

Try the complete workflow

Paid

Unlimited quotes

$19.99 one-time, only if this remains the verified approved price.

Do not use:

Fake discounts
Countdown timers
Artificial scarcity
"Limited spots"
Fake urgency
Unsupported savings claims
38. Existing Customer Login

Login remains available.

It should be positioned as:

Customer Login

rather than as a competing acquisition CTA.

Flow:

Landing

↓

Customer Login

↓

Authentication

↓

Entitlement

↓

Application

If the account is free:

Application → Free

If paid:

Application → Paid

39. Landing Page Does Not Become a Generic SaaS Pricing Page

The freemium model should not cause the landing page to become overloaded with pricing cards.

The page should continue following the approved landing-page direction:

Problem

↓

Solution

↓

Product demonstration

↓

Proof

↓

Free entry

↓

Paid upgrade

The actual product remains the primary proof.

40. Upgrade Page / Surface

The upgrade surface should clearly explain:

Current plan

Quote usage

Paid plan

Price

What changes after upgrade

Payment CTA

Example:

Free

5 / 5 quotes used

Upgrade for unlimited quotes.

Next Knock

$19.99 one-time

Unlimited quotes.

[ Upgrade ]

The exact UI must reuse the project's existing design system.

Do not create a separate visual language.

41. Security Requirements

The implementation must address:

Authentication
Password hashing
Session security
Secure cookies
Session expiration
Login rate limiting
Signup abuse protection
Password reset security
Authorization
User ownership checks
Entitlement checks
Plan checks
Quote-limit enforcement
Server-side enforcement
Payment
Secret API keys server-side only
Webhook authentication
Webhook idempotency
Amount validation
Currency validation
Product validation
Environment validation
Payment-state validation
Data security
SQL parameterization
Zod/server validation where already used
No sensitive data in client bundles
No secrets in frontend code
No payment secrets in logs
Safe error messages
Abuse prevention
Authentication rate limiting
Checkout abuse controls
Quote creation abuse controls
Webhook replay protection
Claim/recovery token expiration where applicable
42. Payment Secrets

PayMongo secret keys must remain exclusively server-side.

Never expose:

Secret API keys
Webhook secrets
Payment provider credentials
Internal signing secrets

through:

Vite environment variables exposed to the browser
React code
public API responses
HTML
localStorage

Only public client-safe identifiers may be exposed where PayMongo explicitly requires them.

43. SQL / D1 Security

All new payment and entitlement queries must use parameterized SQL.

Never construct SQL from:

Email
User ID
Payment ID
Checkout ID
Client-supplied plan
Client-supplied amount

without parameterization and validation.

Ownership must be checked server-side.

44. Error Handling

Payment failures must not expose internal provider details unnecessarily.

Do not expose fraud/risk codes directly to customers.

PayMongo explicitly documents fraud-related decline codes and recommends not exposing sensitive fraud-specific details to customers.

Customer-facing message:

We couldn't complete that payment. Please try another payment method or try again.

Internal logs may retain safe diagnostic information subject to privacy/security requirements.

45. Route Protection

Public routes:

Landing
Login
Signup
Public legal pages
Checkout initiation where appropriate

Authenticated application routes:

Home
Quotes
Quote detail
Settings
Other approved product routes

The application must not assume:

Authenticated = Paid

Instead:

Authenticated + entitlement = permitted product access

Free users are intentionally permitted into the application but constrained by their plan.

46. Migration Strategy

Existing development users must be handled deliberately.

Before applying entitlement migrations:

Inspect existing users.
Determine whether they are development/test/pilot accounts.
Define default entitlement.
Avoid accidental loss of access.
Do not silently convert production customers without a migration decision.

A migration may assign existing accounts:

Free

unless a verified paid entitlement exists.

This must be decided before production deployment.

47. Required Codebase Inspection

Before editing:

Read project.md.
Read AGENTS.md.
Inspect current D1 schema.
Inspect migrations.
Inspect authentication.
Inspect signup.
Inspect login.
Inspect session handling.
Inspect RequireAuth.
Inspect all quote APIs.
Inspect landing-page CTA routing.
Inspect current PayMongo integration, if any.
Inspect environment variable handling.
Inspect current tests.
Inspect existing security utilities.
Inspect current pricing/offer implementation.

Do not invent file paths.

Do not duplicate existing services.

If a required implementation detail cannot be verified:

Not verified from the current codebase.

48. Explicit Non-Goals

This implementation must not add:

Generic CRM functionality
Team management
Invoicing
Accounting
Advanced analytics
AI features
Marketing automation
Complex subscription management
Multiple pricing tiers
Referral systems
Coupon infrastructure
Device fingerprinting
Complex license-key infrastructure
Unapproved paid features
Unapproved payment providers
Unapproved database architecture
49. Testing Requirements

Required security tests include:

Free account
Can create account.
Receives free entitlement.
Can create quote 1.
Can create quote 5.
Cannot create quote 6.
Cannot bypass limit through direct API.
Cannot bypass limit through modified frontend.
Deleting a quote does not restore quota.
Marking a quote Won does not restore quota.
Marking a quote Lost does not restore quota.
Paid account
Can upgrade.
Successful payment creates paid entitlement.
Paid account can create more than five quotes.
Paid account does not receive free-limit rejection.
Payment
Failed payment does not grant entitlement.
Abandoned checkout does not grant entitlement.
Fake success redirect does not grant entitlement.
Fake payment ID does not grant entitlement.
Incorrect amount does not grant entitlement.
Incorrect currency does not grant entitlement.
Wrong product/reference does not grant entitlement.
Invalid webhook signature is rejected.
Duplicate webhook does not duplicate records.
Replay of processed webhook is safe.
Refund
Refund revokes paid entitlement.
Existing data remains.
User returns to appropriate free access.
User cannot create new quotes beyond free allowance.
Account
User A cannot access User B's entitlement.
User A cannot manipulate User B's quote count.
User cannot modify their own plan through client requests.
User cannot submit plan=paid to an API and receive paid access.
50. Acceptance Criteria
Freemium
 Public users can create a free account.
 Every new account receives a free entitlement.
 Free users can use the approved core product.
 Free users can create a maximum of five lifetime quotes.
 Deleted quotes do not restore quota.
 Won/Lost/Archived quotes do not restore quota.
 Existing quotes remain accessible after reaching the limit.
 Sixth quote creation is rejected server-side.
 Upgrade is available before the limit.
 Upgrade is available after reaching the limit.
Payments
 Payment checkout is created server-side.
 Client cannot choose the authoritative amount.
 Client cannot choose the authoritative currency.
 Payment status is verified server-side.
 Webhook authenticity is verified.
 Webhooks are idempotent.
 Incorrect payment amount cannot grant access.
 Incorrect currency cannot grant access.
 Incorrect product cannot grant access.
 Failed payments cannot grant paid access.
 Refunds revoke paid entitlement.
USD
 PayMongo USD capability is explicitly verified.
 Merchant-account support is confirmed.
 Intended payment methods support the required currency.
 Settlement/FX implications are understood.
 USD checkout is only implemented if officially supported.
 No frontend-only currency conversion is presented as USD payment processing.
Security
 No payment secrets are client-accessible.
 No client-controlled plan can grant access.
 No direct API bypass exists.
 User ownership is enforced.
 Authentication is rate-limited.
 Webhook replay is handled.
 Sensitive provider errors are not exposed.
 SQL queries are parameterized.
 Payment data is not unnecessarily logged.
UX
 Free plan is clearly explained.
 Quote usage is understandable.
 Upgrade is easy to find.
 Limit modal is contextual.
 Existing work remains accessible after limit.
 Payment failure is recoverable.
 Refund/entitlement loss is handled gracefully.
 Mobile experience remains first-class.
51. Definition of Done

The implementation is complete when:

Free signup works.
Free entitlement is created automatically.
Five lifetime quote creations are enforced server-side.
Existing quotes remain accessible after the limit.
Upgrade is permanently accessible.
Upgrade works from any appropriate in-app entry point.
PayMongo checkout is created securely.
USD capability has been explicitly verified before implementation.
Payment amount and currency are server-authoritative.
Webhook authenticity is verified.
Webhook processing is idempotent.
Successful payment activates the paid entitlement.
Refunds revoke paid entitlement appropriately.
Failed payments do not grant access.
Client-side plan manipulation cannot bypass access rules.
Direct API calls cannot bypass quote limits.
Existing authentication remains secure.
Existing product functionality remains intact.
Landing-page messaging accurately represents the freemium model.
No unsupported paid features are advertised.
Security tests pass.
Typecheck passes.
Existing tests pass.
Production build passes.
Lint passes.
Mobile and desktop QA pass.
52. Final Product Model

The finalized commercial architecture is:

VISITOR

→ Landing Page

→ Try Next Knock Free

→ Free Account

→ 5 Lifetime Quotes

→ Full core workflow

→ Upgrade anytime

→ PayMongo

→ Verified payment

→ Paid Entitlement

→ Unlimited Quotes

The most important principle is:

The free tier is the product trial. The quote limit is the paywall. The payment entitlement is the authority.

This is a materially better acquisition model for Next Knock than forcing an unknown visitor to pay before experiencing the product.