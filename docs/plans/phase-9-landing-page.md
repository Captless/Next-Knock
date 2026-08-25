## PHASE 9 — LANDING PAGE / CONVERSION SURFACE

### Objective

Build the production-ready public landing page for Next Knock.

The landing page must:

1. Clearly communicate the product and target customer.
2. Explain the specific problem Next Knock solves.
3. Demonstrate the actual product.
4. Present the approved offer/pricing direction.
5. Provide a clear path toward the future checkout flow.
6. Perform well on mobile and desktop.
7. Be SEO-ready.
8. Be accessible.
9. Be secure.
10. Avoid exposing authenticated application data or production secrets.
11. Be production-build safe.
12. Be measurable without introducing unnecessary tracking complexity.

The landing page is a public conversion surface, not part of the authenticated application experience.

---

# 9.1 SOURCE OF TRUTH

Before implementation:

1. Read the current `project.md`.
2. Read the current Product 1 specification.
3. Read the current product-hardening/security specifications.
4. Inspect the current repository.
5. Inspect the current routing architecture.
6. Inspect the current application shell.
7. Inspect existing design-system components.
8. Inspect existing PWA configuration.
9. Inspect existing environment variables/configuration.
10. Inspect existing authentication and protected routes.

Do not assume file paths, routing structure, components, or configuration.

Reuse existing functionality.

Do not introduce a second design system.

Do not create duplicate button, typography, layout, or navigation primitives if suitable existing components already exist.

---

# 9.2 PUBLIC / AUTHENTICATED BOUNDARY

The landing page is public.

Authenticated application functionality remains protected.

The implementation must preserve a clear boundary between:

PUBLIC:

- Landing page
- Public marketing content
- Public pricing information
- Public legal/help content if implemented

PROTECTED:

- `/app/*`
- Quote data
- Customer/prospect data
- Account data
- Settings
- Any authenticated API

Do not expose authenticated data to the landing page.

Do not preload authenticated API data unnecessarily.

Do not weaken existing authentication or authorization to support the landing page.

If an already-authenticated user visits the landing page, follow the existing application's established routing behavior. Do not invent a new authentication flow unless required by the current architecture.

---

# 9.3 MARKETING POSITIONING

Primary positioning:

"Know who to follow up with next."

Supporting message:

Next Knock helps cleaning-business owners keep track of quotes and follow up before good opportunities disappear.

The page should clearly communicate:

WHO:

Cleaning-business owners/operators.

PROBLEM:

Quotes can be forgotten, left without follow-up, or become difficult to track.

SOLUTION:

Next Knock provides a focused way to track quotes, follow-ups, and outcomes.

OUTCOME:

The owner knows which quote needs attention next.

Do not position Next Knock as:

- A generic CRM.
- Accounting software.
- Invoicing software.
- Scheduling software.
- An AI assistant.
- An all-in-one business platform.

---

# 9.4 MARKETING CLAIMS

Only make claims supported by the actual product or documented evidence.

Allowed:

- Descriptions of existing functionality.
- Statements describing the product's purpose.
- Statements describing the intended workflow.

Not allowed unless verified:

- Fake customer counts.
- Fake testimonials.
- Fake reviews.
- Fake logos.
- Fake case studies.
- Fabricated revenue results.
- Unsupported conversion claims.
- Unsupported productivity percentages.
- "Guaranteed" results.
- "Trusted by thousands" claims.
- Invented integrations.
- Invented features.

Do not create placeholder testimonials that look real.

If social proof does not exist, omit it.

---

# 9.5 PAGE STRUCTURE

Use the simplest conversion-focused structure appropriate for the actual product.

Recommended structure:

1. Header/navigation
2. Hero
3. Core problem
4. Product solution
5. Actual product demonstration
6. Core workflow/how it works
7. Key benefits
8. Pricing/offer
9. FAQ
10. Final CTA
11. Footer

Do not implement sections merely because they are common on SaaS landing pages.

Every section must have a conversion or trust purpose.

Avoid excessive page length.

---

# 9.6 HERO

The hero must immediately communicate:

- Who the product is for.
- What problem it solves.
- What the user should do next.

Primary CTA should be clear and consistent.

Avoid multiple competing primary CTAs.

The hero should not rely on animation to communicate the product.

Use an actual Next Knock product screenshot/mockup where appropriate.

Do not fabricate functionality in screenshots.

---

# 9.7 PRODUCT DEMONSTRATION

Use the actual product UI wherever practical.

Screenshots must represent functionality that actually exists.

Do not show:

- Fake dashboards.
- Fake analytics.
- Fake CRM features.
- Fake customer records.
- Fake integrations.
- Fake AI features.
- UI elements that do not exist in Product 1.

If mock data is used in a marketing screenshot:

- It must be clearly fictional.
- It must not contain real customer information.
- It must not expose secrets.
- It must not imply a real customer result.

---

# 9.8 CTA ARCHITECTURE

The landing page should have one primary conversion objective.

Before Phase 10:

The CTA must NOT pretend that payment processing already exists.

Do not create fake checkout success states.

Do not create fake payment verification.

Do not store payment status in the frontend.

Do not implement temporary payment logic that will later conflict with PayMongo.

The CTA should connect to the currently approved next commercial step using the existing application architecture.

If Phase 10 is not yet implemented, use a controlled placeholder/transition that is explicitly non-production rather than pretending checkout works.

The final Phase 9 implementation must not require rewriting the landing-page architecture when PayMongo is introduced.

---

# 9.9 PRICING

Use only the currently approved pricing strategy.

Current hypothesis:

$19–$29 USD one-time purchase.

Do not introduce subscriptions.

Do not invent additional pricing tiers.

Do not create fake discounts.

Do not create fake countdown timers.

Do not create artificial scarcity.

Pricing copy should clearly state what the customer receives.

If pricing is still subject to validation, structure the component so the price can be changed without restructuring the page.

---

# 9.10 RESPONSIVE DESIGN

The landing page must be mobile-first.

Verify:

- Narrow mobile.
- Standard mobile.
- Large mobile.
- Tablet.
- Laptop.
- Desktop.
- Large desktop.

The page must not rely on fixed viewport assumptions.

Verify:

- No horizontal scrolling.
- No clipped text.
- No overflowing images.
- No broken navigation.
- No oversized buttons.
- No overlapping sections.
- No unexpected whitespace.
- No layout shifts caused by responsive changes.

The mobile layout must be intentionally designed rather than simply being a compressed desktop layout.

---

# 9.11 NAVIGATION

Keep public navigation minimal.

Use only navigation that supports:

- Understanding the product.
- Pricing.
- FAQ.
- Legal/trust information where required.
- Conversion.

Do not create unnecessary public navigation.

Do not expose authenticated application navigation as public navigation.

The primary CTA must remain visually dominant.

---

# 9.12 ACCESSIBILITY

The landing page must support:

- Semantic HTML.
- Correct heading hierarchy.
- Accessible navigation.
- Accessible buttons and links.
- Visible keyboard focus.
- Keyboard navigation.
- Sufficient contrast.
- Descriptive image alt text.
- Form labels if forms exist.
- Reduced-motion behavior.
- No information conveyed only through animation.
- Appropriate touch targets.

Do not add an accessibility dependency unless the existing architecture requires one.

---

# 9.13 SEO

Implement appropriate technical SEO.

Verify:

- Unique `<title>`.
- Useful meta description.
- Correct canonical URL.
- Correct robots behavior.
- Open Graph metadata.
- Appropriate social preview metadata.
- Semantic headings.
- Crawlable primary content.
- Descriptive image alt text.
- Appropriate `robots.txt`.
- Sitemap when appropriate for the final public site.

Do not accidentally add `noindex` to the production landing page.

Do not expose private application routes through the sitemap.

Do not create keyword-stuffed copy.

SEO must support the actual cleaning-business search intent rather than generic CRM keywords.

---

# 9.14 PERFORMANCE

The landing page is expected to receive paid traffic.

Performance is therefore a business requirement.

Avoid:

- Large JavaScript dependencies.
- Heavy animation libraries.
- Background videos unless clearly justified.
- Oversized images.
- Unnecessary web fonts.
- Multiple analytics systems.
- Large third-party embeds.
- Blocking third-party scripts.

Optimize:

- Images.
- Font loading.
- JavaScript.
- CSS.
- Above-the-fold content.
- Lazy loading for below-the-fold assets.

Use the existing React/Vite architecture.

Do not introduce a new framework solely for landing-page performance.

---

# 9.15 SECURITY

The landing page must not weaken the existing security model.

Verify:

### Secrets

- No PayMongo secret key in frontend code.
- No Worker secret exposed to client-side JavaScript.
- No private environment variable bundled into the frontend.
- No credentials in source code.
- No credentials in marketing screenshots.

### API

If the landing page makes API requests:

- Only intentionally public endpoints may be called.
- Validate inputs server-side.
- Do not expose authenticated endpoints.
- Do not trust client-provided authorization information.

### User Data

Do not collect unnecessary personal information.

Do not expose customer/quote/account data.

### Forms

If public forms are introduced:

- Validate server-side.
- Apply appropriate abuse protection.
- Prevent injection.
- Avoid leaking submitted data.
- Do not log sensitive information unnecessarily.

Do not add a public form merely because landing pages commonly have contact forms.

---

# 9.16 ANALYTICS

Only implement analytics that provide actionable information.

At minimum, the architecture should allow measurement of:

- Landing page visit.
- Primary CTA click.
- Checkout initiation once Phase 10 exists.
- Purchase once Phase 10 exists.

Do not introduce multiple analytics providers.

Do not send:

- Passwords.
- Payment secrets.
- Quote contents.
- Customer information.
- Authentication tokens.
- Other sensitive data.

Analytics must not become a privacy/security liability.

If analytics infrastructure is not yet approved, keep the implementation ready for it without adding unnecessary dependencies.

---

# 9.17 ERROR / FAILURE STATES

The landing page must remain usable if:

- An image fails to load.
- A third-party script fails.
- Analytics fails.
- The network is slow.
- A CTA destination is temporarily unavailable.

Analytics failure must never break the landing page.

Third-party functionality must not become a hard dependency for rendering the core marketing content.

---

# 9.18 PWA / APPLICATION INTERACTION

Do not break the existing PWA.

Verify:

- Manifest remains valid.
- Service worker behavior remains correct.
- Public landing page is not incorrectly cached as authenticated content.
- Authenticated API responses are not publicly cached.
- Landing-page assets use appropriate caching.
- Logout/authentication behavior remains unchanged.

Do not implement complicated offline behavior for the landing page.

---

# 9.19 ROUTING

Inspect the current routing architecture.

Ensure:

- Public landing route works.
- Authenticated application routes remain protected.
- Unknown routes behave correctly.
- No redirect loops.
- No accidental exposure of protected screens.
- No broken links.

Do not rewrite routing architecture unless the current implementation genuinely requires correction.

---

# 9.20 DESIGN SYSTEM

Reuse the existing design system where appropriate.

The landing page may have a slightly more marketing-oriented presentation than the application, but it must still feel like the same product.

Maintain consistency in:

- Typography.
- Brand accent.
- Buttons.
- Radius.
- Spacing.
- Icons.
- Product screenshots.

Do not create a completely separate visual identity.

Avoid:

- Excessive gradients.
- Excessive glassmorphism.
- Neon effects.
- Decorative blobs.
- Excessive animation.
- Generic AI landing-page templates.

---

# 9.21 ANIMATION

Use animation only when it improves comprehension or perceived quality.

Prefer:

- subtle entrance transitions
- small hover/focus transitions
- restrained product demonstrations

Respect:

`prefers-reduced-motion`

Do not use animation for essential information.

Do not add heavy animation libraries.

---

# 9.22 PRODUCTION SAFETY

Before considering Phase 9 complete:

Verify the production build.

The landing page must work in the production build, not only in development mode.

Verify:

- Build succeeds.
- Assets resolve correctly.
- Routes resolve correctly.
- Environment variables behave correctly.
- No development-only data appears.
- No console errors caused by the landing page.
- No secrets appear in generated client assets.
- No broken asset URLs.
- No hydration/runtime issues if applicable.
- No unexpected API calls.

Inspect the production bundle where appropriate for accidental secret exposure.

---

# 9.23 QA

Run the existing repository QA process.

At minimum, where applicable:

```bash
npx tsc --noEmit
npx vitest run
npm run lint
npm run build