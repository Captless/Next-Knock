# Next Knock — Phase 9 Landing Page Refinement

## 1. Objective

Refine the existing Next Knock landing page to make it feel more polished, professional, product-driven, visually distinctive, and commercially credible.

This is a REFINEMENT of the existing Phase 9 landing page.

The current landing-page foundation is considered good.

Do NOT rebuild the landing page from scratch.

Do NOT redesign the authenticated application.

Do NOT introduce unrelated product functionality.

The target visual direction is:

> Quietly premium product editorial.

The landing page should feel:

- Professional
- Calm
- Modern
- Product-focused
- Trustworthy
- Intentional
- Slightly more dynamic
- Less template-like
- Less static
- More visually memorable
- More commercially credible

It must NOT become:

- Flashy
- Over-animated
- AI-themed
- Neon
- Glassmorphic
- Overly futuristic
- Visually cluttered
- Generic SaaS
- A generic AI landing page
- An Apple clone
- A Web3-style interface
- A design experiment that sacrifices usability

The objective is to make the existing design substantially better while preserving the established Next Knock identity and architecture.

---

# 2. AUTHORITATIVE REFERENCES

Before making any changes, the implementation agent MUST inspect the current repository.

Read:

1. `project.md`
2. Current Phase 9 landing-page documentation, if present
3. Product-hardening documentation
4. Security documentation, if present
5. Current repository structure
6. Current landing route
7. All landing-page components
8. Global styles
9. Tailwind configuration
10. `package.json`
11. Existing dependencies
12. Routing configuration
13. Existing design-system components
14. PWA configuration
15. Existing analytics implementation
16. Existing screenshot/product-preview implementation
17. Existing public/authenticated route boundaries

The current repository is the implementation source of truth.

Do not assume previously discussed file paths, component names, routes, or implementation details are still accurate.

Do not invent files or architecture before inspecting the repository.

---

# 3. CHANGE CONTROL

This task is strictly:

> PHASE 9 LANDING PAGE REFINEMENT

The scope is visual, UX, marketing presentation, accessibility, performance, and public landing-page quality.

Do NOT modify unrelated application functionality.

Do NOT modify:

- Quote functionality
- Follow-up functionality
- Quote lifecycle
- Quote Detail
- Dashboard
- Settings
- Authentication
- Authorization
- Database
- D1 schema
- Workers API
- Payment logic
- PayMongo integration
- Account entitlements
- PWA application logic
- Existing product business logic

unless an existing landing-page dependency genuinely requires a change.

If an unrelated system requires modification, STOP and report the dependency rather than silently expanding scope.

---

# 4. AGENT DECISION BOUNDARY

This document is an implementation specification, not a creative brainstorming prompt.

The implementation agent MUST follow the requirements and constraints defined here.

The agent MUST NOT independently introduce:

- New product concepts
- New product features
- New application workflows
- New business rules
- New routes
- New APIs
- New database structures
- New authentication behavior
- New payment behavior
- New marketing claims
- New dependencies
- New visual systems unrelated to this specification

## MUST

If a requirement is explicitly defined, implement it.

## MUST NOT

If behavior is explicitly prohibited, do not implement it even if it appears visually attractive or technically convenient.

## MAY

Optional implementation is allowed only when:

1. It already exists in the repository, OR
2. It is a minor implementation detail required to satisfy an explicit requirement,
3. It does not change product behavior,
4. It does not introduce unnecessary dependencies,
5. It does not expand scope,
6. It preserves the existing architecture.

## SMALLEST CORRECT CHANGE

When multiple implementations satisfy the requirement:

Choose the smallest correct implementation that:

- Reuses existing code
- Preserves architecture
- Minimizes regression risk
- Minimizes dependencies
- Preserves existing behavior

## ABSENCE OF INSTRUCTION

The absence of an instruction is NOT permission to invent a new feature, design system, interaction, product behavior, or architecture.

## STOP

STOP and report instead of guessing when:

- Repository implementation conflicts materially with this specification.
- A visual change requires modifying unrelated application functionality.
- A screenshot/product state is unavailable.
- A new dependency appears necessary.
- A security boundary would change.
- Existing application behavior would need modification.
- A requirement materially affects architecture.
- A requested marketing claim cannot be verified.
- The current implementation differs materially from the assumptions in this document.

Do not silently resolve material ambiguity by inventing a solution.

---

# 5. CORE DESIGN DIRECTION

Target:

## Quietly Premium Product Editorial

The design should communicate:

- Practicality
- Reliability
- Professionalism
- Simplicity
- Product maturity
- Trust

Use:

- Strong typography
- Better typographic hierarchy
- Generous whitespace
- Restrained color palette
- Clear visual rhythm
- Real product imagery
- Subtle depth
- Subtle motion
- Editorial section composition
- Product-focused storytelling
- Professional SaaS quality

Avoid:

- Excessive gradients
- Neon colors
- Glowing backgrounds
- Glassmorphism
- Giant decorative icons
- Floating blobs
- Excessive rounded cards
- Excessive shadows
- Excessive animation
- AI-generated visual clichés
- Decorative effects without purpose
- Excessive badges
- Fake complexity
- Visual noise

The current Next Knock visual identity must remain recognizable.

Refine it rather than replacing it.

---

# 6. TYPOGRAPHY REFINEMENT

Inspect the existing typography implementation before changing it.

The current product typography should remain the foundation.

The landing page may have slightly stronger editorial typography while remaining visually related to the application.

## Display Typography

Use a slightly more distinctive modern sans-serif for:

- Hero headline
- Major section headings
- Large editorial statements

Preferred direction:

- Manrope
- Or an equivalent restrained modern display sans-serif

Do NOT use:

- Futuristic fonts
- Decorative fonts
- Monospace display fonts
- Highly stylized fonts
- Highly geometric technology-startup fonts

The display font should improve personality without making the product feel like a technology demo.

## Body/UI Typography

Preserve the existing product typography system where practical.

Body text must remain:

- Readable
- Neutral
- Professional
- Easy to scan

## Font Loading

Before adding any font:

1. Inspect whether a suitable font already exists.
2. Inspect the current font-loading strategy.
3. Prefer local/self-hosted assets if a new font is genuinely necessary.
4. Avoid blocking external font requests solely for visual novelty.
5. Avoid unnecessary font weights.
6. Avoid loading multiple font families unnecessarily.

Do not add a font dependency without justification.

---

# 7. HERO REFINEMENT

The hero is the highest-priority visual refinement.

The hero must clearly communicate:

> Know who to follow up with next.

The existing core positioning must remain consistent with the approved product direction.

Do not invent unsupported claims.

## Required Hero Structure

The hero should contain:

1. Audience/product eyebrow.
2. Strong display headline.
3. Supporting description.
4. Primary CTA.
5. Existing secondary CTA where appropriate.
6. Product visual.

The product visual should become more prominent and visually meaningful.

Conceptual hierarchy:

    Audience / context

    Strong headline

    Supporting message

    Primary CTA     Secondary CTA

            ACTUAL PRODUCT UI

Do not overcrowd the hero.

Do not add unnecessary badges, statistics, trust indicators, or decorative elements.

---

# 8. HERO PRODUCT VISUAL

The hero product visual should feel like a real product demonstration rather than a generic placeholder.

Preferred characteristics:

- Actual Next Knock interface
- Clean framing
- Appropriate aspect ratio
- Subtle border
- Controlled shadow
- Subtle depth
- Professional presentation
- Correct product UI

If a real screenshot is already present in the repository:

1. Inspect it.
2. Preserve important information.
3. Do not distort the aspect ratio.
4. Do not fabricate additional UI.
5. Do not expose real customer information.
6. Do not expose secrets.
7. Use fictional/demo information where required.

If no real screenshot is available:

- Preserve the existing placeholder mechanism.
- Improve the presentation container only.
- Do not fabricate a detailed application UI.
- Do not build a complex fake dashboard that will later be discarded.

Do not invent product states.

---

# 9. HERO PRODUCT MICRO-INTERACTION

The hero product visual should no longer feel completely static.

However, animation must remain restrained and purposeful.

Preferred concept:

    Product screenshot
            ↓
    Relevant follow-up area receives
    subtle visual emphasis
            ↓
    Small contextual indicator appears
            ↓
    Indicator fades
            ↓
    Normal state
            ↓
    Wait
            ↓
    Repeat

The interaction should reinforce:

> Know who to follow up with next.

It must not exist merely for decoration.

## Preferred emphasis

Where the actual screenshot/product visual supports it:

- Highlight the follow-up area.
- Highlight the next-action area.
- Use a subtle ring, opacity change, or background emphasis.
- Optionally show a small contextual label such as:
  `Follow up today`

Only use labels that accurately represent existing product functionality.

Do NOT invent:

- Fake quote counts
- Fake revenue numbers
- Fake customers
- Fake activity
- Fake metrics
- Fake notifications
- Fake product features

If the actual screenshot does not support a specific animation target, use a simpler subtle presentation rather than fabricating one.

---

# 10. MICRO-INTERACTION IMPLEMENTATION

Prefer:

- CSS transitions
- CSS keyframes
- Small React state where necessary

Do NOT introduce:

- Framer Motion
- GSAP
- Anime.js
- Motion One
- Other animation libraries

unless an appropriate animation library already exists in the repository and can be reused without unnecessary complexity.

Do not add a major dependency for a simple landing-page animation.

The animation must:

- Be lightweight
- Avoid layout shifts
- Avoid blocking page rendering
- Avoid excessive CPU usage
- Stop or simplify under reduced-motion settings

---

# 11. HOVER BEHAVIOR

Desktop may have subtle hover behavior for the product visual.

Preferred behavior:

    Normal
      ↓
    Hover
      ↓
    Very small elevation
      +
    Slight shadow increase
      +
    Optional tiny scale change

Do NOT:

- Create dramatic zoom
- Create parallax
- Rotate the screenshot
- Make it bounce
- Make it glow
- Make it look clickable if it is not clickable

If the screenshot does not navigate anywhere, it must not appear to be a functional button.

---

# 12. MOBILE ANIMATION

Mobile must not depend on hover.

If the product demonstration is animated:

- It may run automatically at a slow interval.
- It must remain subtle.
- It must not interfere with scrolling.
- It must not cause layout shifts.
- It must not consume excessive resources.

For users with:

    prefers-reduced-motion: reduce

disable nonessential looping animation.

The product visual and its meaning must remain visible.

---

# 13. SECTION RHYTHM

The existing page should not repeatedly use the same visual pattern for every section.

Avoid:

    Centered eyebrow
    Centered heading
    Centered paragraph
    Three cards

    Centered eyebrow
    Centered heading
    Centered paragraph
    Three cards

    Centered eyebrow
    Centered heading
    Centered paragraph
    Cards

Introduce stronger visual rhythm using a controlled mixture of:

- Centered editorial sections
- Split layouts
- Product demonstrations
- Numbered workflows
- Large typography
- Feature lists
- Horizontal dividers
- Product screenshots
- Alternating content alignment

The page should feel like one coherent story.

Do not redesign the entire page architecture.

---

# 14. PROBLEM SECTION

The problem section should create recognition for the target customer.

Core idea:

Quotes are not necessarily lost when they are created.

They are lost when follow-up is forgotten or delayed.

Present this with stronger editorial typography and hierarchy.

Do NOT invent:

- Industry statistics
- Conversion rates
- Revenue-loss statistics
- Unsupported claims

Do NOT create unnecessary cards solely to fill space.

The section should answer:

> Why does this product need to exist?

---

# 15. SOLUTION SECTION

Strengthen the connection between the problem and the actual product.

The section should demonstrate that Next Knock provides a simple way to:

- Track quotes
- See what needs attention
- Follow up
- Track outcomes

Preferred conceptual structure:

    Solution statement

    Actual Next Knock product visual

    Short explanation of what the user is seeing

Use actual product functionality.

Do not create fake UI solely for marketing purposes.

---

# 16. HOW IT WORKS

The workflow should feel like a sequence instead of three unrelated cards.

Preferred conceptual structure:

    01
    Create

        ↓

    02
    Follow up

        ↓

    03
    Close

Desktop may use:

    01 Create  →  02 Follow up  →  03 Close

Mobile should naturally stack the sequence.

Use subtle separators/arrows only when they improve comprehension.

Do not create large decorative arrows.

The workflow must match the actual Product 1 workflow.

Do not introduce new workflow steps.

---

# 17. BENEFITS SECTION

Reduce the feeling of repeated floating cards.

Prefer a more editorial list/grid using:

- Strong headings
- Concise descriptions
- Dividers
- Subtle icons where already supported

Valid product-value themes include:

- Keep quotes organized.
- Know what needs attention.
- Follow up on time.
- Track outcomes.

Do not add unsupported product functionality.

Do not imply:

- AI
- Automation
- CRM capabilities
- Team management
- Advanced analytics
- Invoicing
- Scheduling
- Integrations

unless those capabilities actually exist and are explicitly in scope.

---

# 18. PRICING SECTION

Preserve the approved pricing strategy.

Current pricing hypothesis:

> $19–$29 USD one-time purchase.

Do NOT silently change the pricing model.

Do NOT introduce:

- Subscription tiers
- Monthly billing
- Fake discounts
- Fake countdowns
- Fake scarcity
- Fake crossed-out pricing
- Unsupported guarantees

The visual presentation may be refined.

The section must clearly communicate:

- Price
- Purchase model
- Included functionality
- Primary CTA

Do not make an independent monetization decision during this refinement.

PayMongo functionality remains Phase 10 unless already implemented in the current repository.

---

# 19. NAVIGATION REFINEMENT

Inspect the current landing navigation.

Improve polish without unnecessarily changing the existing information architecture.

Potential refinements:

- Better spacing
- Stronger typography
- Better CTA hierarchy
- Refined border/background
- Better hover states
- Better focus states
- Better responsive behavior

Do NOT:

- Turn it into an oversized floating glass panel.
- Add unnecessary navigation items.
- Add authenticated application navigation.
- Rewrite routing.

The public navigation must remain simple.

---

# 20. CTA DESIGN

The primary CTA must remain visually obvious.

Reuse the existing button system where possible.

Do not create multiple competing primary CTAs.

CTA requirements:

- Appropriate touch target
- Readable text
- Balanced padding
- Consistent radius
- Clear hover state
- Clear focus state
- Clear active state
- No overflow at narrow widths
- No unnecessary oversized treatment

Do not implement fake checkout functionality.

Do not bypass the approved commercial flow.

---

# 21. VISUAL CONSISTENCY

The landing page may be slightly more editorial than the authenticated application.

However, it must clearly belong to Next Knock.

Maintain consistency in:

- Brand colors
- Typography principles
- Button treatment
- Border treatment
- Radius
- Spacing
- Iconography
- Product imagery

Do not create a completely separate visual identity.

---

# 22. ANIMATION SYSTEM

Use a small animation vocabulary.

Allowed:

### Entrance

Subtle fade/fade-up.

### Hover

Small elevation, opacity, or transform changes.

### Product Preview

Slow, purposeful micro-interaction.

### CTA

Normal hover/active/focus transitions.

Avoid:

- Multiple looping animations competing for attention.
- Continuous animated backgrounds.
- Large parallax effects.
- Decorative particles.
- Excessive scroll-triggered animation.
- Constant movement.
- Bouncing UI.
- Rotating screenshots.
- Glowing UI.

The page must still look good with animation disabled.

---

# 23. PERFORMANCE

The landing page will eventually receive paid traffic.

Performance is therefore a commercial requirement.

Do NOT:

- Add large animation libraries.
- Add unnecessary dependencies.
- Add huge image assets.
- Add multiple external font providers.
- Add unnecessary third-party scripts.
- Use autoplay video without explicit justification.
- Load below-the-fold assets unnecessarily early.

Inspect:

- Image sizes
- Image formats
- Font loading
- JavaScript bundle impact
- Third-party resources
- Animation performance

The hero product visual must not become an unnecessarily large network payload.

Avoid layout shift.

---

# 24. ACCESSIBILITY

All changes must preserve or improve accessibility.

Verify:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Meaningful alt text
- Accessible buttons
- Accessible links
- Appropriate touch targets
- Reduced-motion support

Animation must never communicate important information exclusively through movement.

If an animation communicates meaning, the same information must exist in accessible text/content.

---

# 25. SEO

Do not regress existing SEO.

Verify:

- Page title
- Meta description
- Canonical URL
- Open Graph metadata
- Social metadata
- Heading hierarchy
- Crawlability
- Robots behavior

Do NOT accidentally:

- Add `noindex`
- Remove canonical metadata
- Break metadata
- Expose authenticated routes to search engines

Do not keyword-stuff content.

---

# 26. SECURITY

This refinement must not weaken existing security.

Verify:

- No secrets in landing-page code.
- No private environment variables bundled into client code.
- No PayMongo secret keys client-side.
- No authentication tokens exposed.
- No quote/customer data exposed.
- No private API calls required for public marketing content.
- No new public API endpoints unless explicitly required.
- No unsafe HTML injection.
- No user-controlled content rendered unsafely.
- No security boundary weakened.

Do not introduce a public form simply to make the landing page appear more complete.

If a new form or API interaction is introduced, STOP and evaluate:

- Server-side validation
- Abuse protection
- Input handling
- Error leakage
- Privacy
- Data retention
- Authentication requirements

Do not proceed with a new public data-collection mechanism without explicit scope approval.

---

# 27. ROUTING SAFETY

Inspect current routing before modifying CTA behavior.

Verify:

- `/` remains public.
- `/app/*` remains protected.
- Login remains accessible.
- Signup remains accessible.
- CTA links do not create redirect loops.
- Public routes do not load authenticated data.
- Authentication boundaries remain intact.

Do not rewrite the router.

---

# 28. ANALYTICS

Preserve the existing analytics architecture.

Do not add another analytics provider.

If CTA tracking already exists:

- Preserve it.
- Ensure refinements do not break it.

If analytics tracking is not currently implemented:

Do not introduce a large analytics system solely for this visual refinement.

Any future analytics event must not contain:

- Passwords
- Authentication tokens
- Customer data
- Quote contents
- Payment credentials
- Secrets

---

# 29. RESPONSIVE QA

Verify the landing page at:

- 320px
- 360px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1280px
- 1440px+

These are QA reference widths, not instructions to add new breakpoints.

Verify:

- No horizontal scrolling
- No clipped headings
- No CTA overflow
- No broken image proportions
- No overlapping elements
- No excessive whitespace
- No cramped sections
- No navigation overflow
- No animation-induced layout shift
- No broken screenshot framing

Mobile must remain the primary UX consideration.

Desktop must remain intentionally designed rather than merely stretched mobile content.

---

# 30. PRODUCT SCREENSHOT RULES

If an actual screenshot exists:

1. Inspect it before implementation.
2. Preserve important product content.
3. Preserve aspect ratio.
4. Do not fabricate additional product UI.
5. Do not expose real customer information.
6. Do not expose secrets.
7. Use fictional/demo data if necessary.

If no actual screenshot exists:

- Preserve the current placeholder mechanism.
- Improve its presentation only.
- Do not build a fake detailed application interface.
- Do not invent customer data.
- Do not invent quote counts.
- Do not invent metrics.
- Do not invent notifications.

The landing page must never promise functionality the actual product does not provide.

---

# 31. IMPLEMENTATION ORDER

Follow this order.

## Step 1 — Repository Inspection

Inspect:

- Current project state
- Landing route
- Landing components
- Global styles
- Typography
- Existing animations
- Screenshot implementation
- CTA implementation
- Navigation
- Responsive structure
- Analytics
- Routing

## Step 2 — Establish Existing Reusable Components

Identify existing components that can be reused.

Do not create duplicate primitives.

## Step 3 — Typography

Refine typography only after verifying the current font setup.

## Step 4 — Hero

Refine:

- Typography
- Hierarchy
- Spacing
- CTA composition
- Product visual
- Product micro-interaction

## Step 5 — Section Rhythm

Refine:

- Problem
- Solution
- How It Works
- Benefits

## Step 6 — Navigation and CTA Polish

Improve existing controls without changing routing.

## Step 7 — Responsive Refinement

Verify mobile, tablet, and desktop layouts.

## Step 8 — Accessibility

Verify semantics, focus, contrast, touch targets, and reduced motion.

## Step 9 — Performance

Inspect assets, fonts, dependencies, and animation performance.

## Step 10 — Validation

Run the project's required QA commands.

Do not proceed to unrelated phases.

---

# 32. DEPENDENCY RULE

Do not install new dependencies unless absolutely necessary.

Prefer:

- Existing React functionality
- Existing CSS
- Existing Tailwind utilities
- Existing components
- Existing asset handling

For animation:

Prefer CSS and minimal React state.

For typography:

Prefer existing/local implementation.

If a new dependency appears necessary:

STOP before installing it.

Report:

- Dependency name
- Why existing functionality cannot satisfy the requirement
- Bundle/runtime impact
- Maintenance impact
- Alternative approaches
- Recommendation

Do not silently add the dependency.

---

# 33. NON-GOALS

Do NOT:

- Redesign the authenticated application.
- Modify Dashboard.
- Modify Quotes.
- Modify Quote Detail.
- Modify Settings.
- Modify authentication.
- Modify authorization.
- Modify D1.
- Modify Workers API.
- Implement PayMongo.
- Implement subscriptions.
- Change pricing strategy.
- Add AI functionality.
- Add CRM functionality.
- Add team functionality.
- Add advanced analytics.
- Add invoicing.
- Add scheduling.
- Add integrations.
- Add marketing automation.
- Add customer portals.
- Add new Product 1 features.
- Add a new animation framework.
- Add fake testimonials.
- Add fake statistics.
- Add fake social proof.
- Add fake product functionality.
- Add unnecessary analytics.
- Rewrite routing.
- Rewrite the entire design system.
- Change the core product positioning.

---

# 34. STOP CONDITIONS

STOP and report rather than guessing if:

1. Current implementation conflicts materially with this specification.
2. A visual change requires modifying unrelated application functionality.
3. The actual screenshot structure differs materially from the assumed structure.
4. A new dependency appears necessary.
5. A security boundary would need to change.
6. A new API endpoint appears necessary.
7. A database change appears necessary.
8. A requested marketing claim is unsupported.
9. The actual product does not support something proposed for the landing page.
10. A requested change would alter Product 1 scope.
11. The implementation would require replacing the existing architecture.
12. The implementation would require modifying authentication/payment behavior.

Do not silently expand scope.

---

# 35. TESTING

Run the existing project validation commands where available.

Expected commands:

    npx tsc --noEmit
    npx vitest run
    npm run lint
    npm run build

Follow the repository's actual established QA order if it differs.

All applicable checks must pass.

Do not claim tests passed unless they were actually executed.

Do not claim build success unless the build actually completed successfully.

---

# 36. MANUAL QA

## Hero

Verify:

- Typography hierarchy.
- Headline wrapping.
- Supporting text readability.
- CTA alignment.
- CTA touch targets.
- Product visual.
- Screenshot proportions.
- Micro-interaction.
- No layout shift.
- No excessive animation.

## Navigation

Verify:

- Desktop.
- Mobile.
- CTA.
- Anchor links.
- Focus states.
- No overflow.

## Problem

Verify:

- Strong hierarchy.
- Correct messaging.
- No fabricated claims.
- Proper spacing.

## Solution

Verify:

- Product visual.
- Actual functionality represented.
- Clear relationship between problem and solution.

## How It Works

Verify:

- Correct workflow.
- Clear sequence.
- Mobile stacking.
- Desktop alignment.

## Benefits

Verify:

- No repetitive card-heavy appearance.
- Correct product benefits.
- Consistent spacing.

## Pricing

Verify:

- Approved pricing.
- Correct purchase model.
- No fake scarcity.
- No fake discounts.
- Correct CTA.

## FAQ

Verify:

- Existing FAQ behavior.
- Keyboard accessibility.
- Mobile behavior.
- No layout problems.

## Footer

Verify:

- Links work.
- No broken navigation.
- Responsive behavior.
- Correct legal/product links where already present.

---

# 37. ACCEPTANCE CRITERIA

The refinement is complete only when all applicable requirements below are satisfied.

## Visual

- [ ] Landing page feels more polished than the previous implementation.
- [ ] Landing page remains recognizably Next Knock.
- [ ] Typography has stronger personality.
- [ ] Hero hierarchy is stronger.
- [ ] Product visual is more prominent.
- [ ] Sections have stronger visual rhythm.
- [ ] Page feels less static.
- [ ] Animation remains restrained.
- [ ] Page does not look like a generic AI SaaS template.
- [ ] Page does not become visually cluttered.

## Product Representation

- [ ] Product screenshots represent actual functionality.
- [ ] No fake product functionality is presented.
- [ ] Product promise remains accurate.
- [ ] No unsupported marketing claims exist.
- [ ] No fake statistics exist.
- [ ] No fake testimonials exist.
- [ ] No fake social proof exists.

## Interaction

- [ ] Hero product visual has an appropriate subtle micro-interaction where supported.
- [ ] Desktop hover behavior is subtle.
- [ ] Mobile does not depend on hover.
- [ ] Reduced-motion mode disables nonessential motion.
- [ ] Animation does not create layout shifts.
- [ ] Animation does not interfere with scrolling.

## Responsive

- [ ] 320px works.
- [ ] 360px works.
- [ ] 375px works.
- [ ] 390px works.
- [ ] 414px works.
- [ ] Tablet works.
- [ ] Desktop works.
- [ ] Large desktop works.
- [ ] No horizontal overflow.
- [ ] No clipped content.
- [ ] No broken image proportions.
- [ ] No overlapping controls.

## Accessibility

- [ ] Semantic headings.
- [ ] Correct heading hierarchy.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Appropriate contrast.
- [ ] Accessible buttons.
- [ ] Accessible links.
- [ ] Appropriate touch targets.
- [ ] Reduced-motion support.
- [ ] Meaningful alt text.

## Security

- [ ] No secrets exposed.
- [ ] No private API calls from public marketing content.
- [ ] No authenticated data exposed.
- [ ] No unsafe HTML rendering introduced.
- [ ] No security boundary weakened.
- [ ] No new public API introduced without explicit scope.
- [ ] No sensitive analytics data introduced.

## Performance

- [ ] No unnecessary animation dependency.
- [ ] No unnecessary dependency added.
- [ ] Hero asset is appropriately sized.
- [ ] Font loading is reasonable.
- [ ] No unnecessary blocking third-party resource introduced.
- [ ] Production build succeeds.

## Regression

- [ ] Existing public routes work.
- [ ] Login works.
- [ ] Signup works.
- [ ] Authenticated routes remain protected.
- [ ] PWA behavior remains intact.
- [ ] Existing application functionality remains unchanged.
- [ ] Existing analytics behavior remains intact where applicable.

---

# 38. DEFINITION OF DONE

Phase 9 landing-page refinement is complete when:

1. Current repository was inspected before modification.
2. Current landing implementation was understood.
3. Existing components were reused where appropriate.
4. Typography was refined without creating a disconnected brand.
5. Hero presentation was improved.
6. Product screenshot presentation was improved.
7. Product-focused subtle motion was implemented where supported.
8. Section rhythm was improved.
9. Problem → Solution → Workflow → Benefits → Pricing storytelling is clear.
10. Responsive behavior was verified.
11. Accessibility was verified.
12. SEO was not regressed.
13. Security was not weakened.
14. No unnecessary dependencies were introduced.
15. No unsupported marketing claims were added.
16. No fake product functionality was added.
17. Existing application functionality remains unchanged.
18. TypeScript passes.
19. Tests pass.
20. Lint passes.
21. Production build passes.
22. Manual visual QA passes.
23. No known blocking regression remains.

The final landing page should feel:

> Calm, premium, credible, product-focused, and intentionally designed.

It should NOT feel:

> Flashy, over-animated, generic, or AI-generated.

---

# 39. FINAL REPORT

OpenCode must provide a factual implementation report.

Do not claim anything that was not verified.

## Inspection

Report:

- Landing route inspected.
- Landing components inspected.
- Global styles inspected.
- Typography inspected.
- Existing animation system inspected.
- Screenshot/product-preview implementation inspected.
- Routing inspected.
- Analytics inspected.
- Relevant dependencies inspected.

## Changes

Report:

- Files changed.
- Files added.
- Files removed.
- Components reused.
- Typography changes.
- Hero changes.
- Product visual changes.
- Animation changes.
- Section-layout changes.
- Navigation changes.
- Responsive changes.
- Accessibility changes.

## Dependencies

Report:

- Dependencies added: none

OR, if one was added:

- Dependency name
- Reason
- Alternatives considered
- Bundle/runtime impact
- Why it was necessary

## Security

Report:

- Public/authenticated boundary verified.
- Secret exposure checked.
- Public API usage checked.
- No security boundary changed.

## QA

Report exact results for:

- Typecheck
- Tests
- Lint
- Build
- Responsive QA
- Accessibility QA
- Reduced-motion QA
- Manual visual QA

## Remaining Issues

List only verified issues.

If none remain, explicitly state:

> No known remaining issues identified within the scope of this refinement.

Do not claim the entire product is production-ready solely because this landing-page refinement passed.

Do not perform additional work outside this specification.

STOP after completing this Phase 9 refinement and report the result.