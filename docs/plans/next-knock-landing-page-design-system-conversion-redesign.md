# Next Knock Landing Page — Complete Visual Recomposition & Conversion Redesign

> **Version:** 2.0.0
> **Last Updated:** 2026-08-27
> **Status:** Final — Implementation Specification
> **Design Direction:** New Visual Composition — Quiet Precision + Tactile Utility + Product Motion
> **Primary Market:** US-based and other premium-market cleaning businesses
> **Primary Conversion Goal:** Signup / product trial entry
> **Scope:** Landing page only

---

# 1. Executive Decision

The Next Knock landing page must be **completely redesigned as a new visual and structural experience**.

This is **not a landing-page polish, reskin, modernization, cleanup, or incremental redesign**.

The current landing page exists only as an implementation reference for:

* Existing functionality
* Verified routes
* Existing signup/login behavior
* Existing brand assets
* Existing product UI
* Existing design tokens
* Existing copy that remains factually valid
* Existing reusable technical primitives

The current landing page's:

* Layout
* Section composition
* Hero composition
* Card arrangements
* Visual hierarchy
* Spacing rhythm
* Feature presentation
* Decorative treatment
* Marketing structure
* Component arrangement
* Overall visual silhouette

must **not** be treated as the design baseline.

The implementation must create a materially different landing-page experience.

## Critical Rule

> **Reuse functionality and verified assets where appropriate. Do not preserve the existing landing-page design merely because the code already exists.**

If the final result could reasonably be described as:

> "the old Next Knock landing page, but cleaner/polished/modernized"

the implementation has failed.

The correct result should feel like:

> **A new website for the same product.**

---

# 2. Redesign Requirement

The implementation must rethink the landing page from first principles.

The agent must not begin by modifying existing landing-page CSS and progressively polishing it.

Instead:

1. Inspect the existing implementation.
2. Understand what functionality must survive.
3. Identify reusable technical primitives.
4. Discard the existing visual composition as the design baseline.
5. Develop a new information architecture and visual composition.
6. Implement the new landing page.
7. Reuse verified functionality underneath the new presentation.
8. Compare the result against the previous landing page.
9. Verify that the new page is materially different.

The redesign must differ substantially in:

* Hero geometry
* Section composition
* Product presentation
* Typography hierarchy
* Visual rhythm
* Information grouping
* Feature presentation
* CTA placement
* Section transitions
* Interaction model
* Motion strategy
* Overall page silhouette

---

# 3. Design Philosophy

The landing page should combine:

**Quiet Precision + Tactile Utility + Product Motion**

The result should feel:

* Professional
* Focused
* Practical
* Calm
* Modern
* Precise
* Confident
* Business-oriented
* Product-driven

It should not feel:

* Generic SaaS
* AI-generated
* Template-derived
* Overdecorated
* Developer-tool oriented
* Enterprise-heavy
* Consumer-app-like
* Luxury lifestyle oriented
* Playful startup marketing
* Visually chaotic

The customer is a busy cleaning-business owner.

The website should communicate:

> **"This is a serious tool that solves a specific operational problem."**

not:

> **"Look how many visual effects this website has."**

---

# 4. Current Landing Page Is NOT the Design Source of Truth

The current landing page must be inspected, but its visual structure is explicitly non-authoritative.

## The agent MAY reuse

* Existing logo
* Brand assets
* Existing verified product screenshots/UI
* Existing signup route
* Existing login route
* Existing CTA handlers
* Existing semantic content where still accurate
* Existing design tokens
* Existing accessibility utilities
* Existing responsive utilities
* Existing shared components when technically appropriate

## The agent MUST NOT automatically preserve

* Existing hero structure
* Existing feature-card structure
* Existing section ordering
* Existing section layouts
* Existing card grid
* Existing visual hierarchy
* Existing decorative elements
* Existing landing-page component composition
* Existing marketing-page CSS structure

A component may be reused technically only when doing so does not constrain the new design.

---

# 5. Design References

The following websites are **reference ecosystems**, not templates.

Do not copy their branding, layouts, wording, or visual identity.

## Motion

[Motion](https://motion.dev/?utm_source=chatgpt.com)

Use as reference for:

* Product motion
* Layout transitions
* State transitions
* Gesture feedback
* Scroll-linked interactions
* React animation principles

Motion should explain the product rather than decorate the page.

---

## React Bits

[React Bits](https://reactbits.dev/?utm_source=chatgpt.com)

Use selectively for:

* Animated lists
* Typography treatments
* Small interaction patterns
* Controlled visual transitions
* Product storytelling

Do not import large effect collections.

Do not use effects simply because they are visually impressive.

---

## Magic UI

[Magic UI](https://magicui.design/?utm_source=chatgpt.com)

Use selectively for:

* Marketing composition
* CTA patterns
* Typography interaction
* Product showcase concepts

Do not reproduce its visual identity.

---

## Aceternity UI

[Aceternity UI](https://ui.aceternity.com/?utm_source=chatgpt.com)

Use selectively for:

* Section composition
* Product showcase concepts
* Spatial composition
* Interactive presentation

Avoid decorative effects that do not communicate the product.

---

## Linear

[Linear](https://linear.app/?utm_source=chatgpt.com)

Reference:

* Typography
* Whitespace
* Product-first storytelling
* Visual precision
* Information hierarchy
* Restrained motion

Do not clone Linear.

---

## Stripe

[Stripe](https://stripe.com/?utm_source=chatgpt.com)

Reference:

* Conversion architecture
* Progressive storytelling
* Product visualization
* Use-case communication
* Information architecture

Do not copy Stripe's structure or branding.

---

## Vercel

[Vercel](https://vercel.com/?utm_source=chatgpt.com)

Reference:

* Typography
* Spatial composition
* Technical precision
* Whitespace
* Strong hierarchy

Do not copy Vercel's dark/technical identity.

---

# 6. Visual Vocabulary

The page should use multiple visual languages as a coherent system.

| Style               | Role                  | Usage      |
| ------------------- | --------------------- | ---------- |
| Minimalism          | Foundation            | Heavy      |
| Editorial / Swiss   | Layout                | Heavy      |
| Flat Design         | Clarity               | Heavy      |
| Tactile UI          | Product personality   | Selective  |
| Neubrutalism        | Borders/controls      | Light      |
| Skeuomorphism       | Affordance            | Very light |
| Neuromorphism       | Depth                 | Minimal    |
| Soft UI             | Surface depth         | Minimal    |
| Glassmorphism       | Secondary treatment   | Rare       |
| Bento UI            | Information grouping  | Selective  |
| Kinetic Typography  | Attention             | Light      |
| Spatial UI          | Product demonstration | Selective  |
| Claymorphism        | Playfulness           | Avoid      |
| Aurora UI           | Decoration            | Avoid      |
| Organic Blob UI     | Decoration            | Avoid      |
| Y2K                 | Identity              | Avoid      |
| Cyberpunk           | Identity              | Avoid      |
| Retro-futurism      | Identity              | Avoid      |
| Heavy 3D/WebGL      | Effects               | Avoid      |
| Excessive Brutalism | Identity              | Avoid      |

The goal is not to visibly demonstrate every style.

The goal is to create a coherent design language using the strongest applicable principles.

---

# 7. Required Design Shift

The implementation must demonstrate a clear transition away from conventional SaaS landing-page composition.

## Avoid default patterns such as

```text
Hero
↓
Three cards
↓
Three more cards
↓
Screenshot card
↓
Testimonial cards
↓
Pricing cards
↓
CTA
```

Do not build the page as a collection of rectangular marketing cards.

Instead, favor:

* Editorial composition
* Typography-led sections
* Asymmetric layouts
* Open whitespace
* Product UI as visual evidence
* Dividers
* Spatial relationships
* Layered but restrained product presentation
* Interactive demonstrations
* Large type
* Strong alignment systems
* Controlled tactile surfaces
* Purposeful motion

---

# 8. New Landing Page Architecture

The following architecture is the recommended starting point.

The agent may adjust section proportions or exact composition after inspecting the product, but must preserve the overall narrative.

```text
Navigation
      ↓
Hero / Product Introduction
      ↓
Problem Narrative
      ↓
The Follow-Up Gap
      ↓
Simple Workflow
      ↓
Interactive Product Demonstration
      ↓
Three Core Outcomes
      ↓
Objection Handling
      ↓
Trust / Transparency
      ↓
Pricing / Offer if verified
      ↓
Final Conversion
      ↓
Footer
```

This is a narrative framework, not a mandate to create one visually isolated block per item.

Sections may visually merge where that produces a stronger experience.

---

# 9. Hero — Completely New Composition

The hero must be redesigned from scratch.

Do not preserve the existing hero layout.

## Primary message

Recommended direction:

> **Stop letting good cleaning quotes go cold.**

Supporting direction:

> Next Knock helps cleaning businesses keep quotes visible, know what needs follow-up, and stay on top of opportunities without another complicated CRM.

Copy must be validated against the actual product.

## Hero requirements

The hero must immediately communicate:

1. Who this is for.
2. What problem exists.
3. What Next Knock does.
4. What action the visitor should take.

## Visual direction

Do NOT use:

* Generic SaaS dashboard floating beside text
* Generic gradient background
* Decorative 3D object
* Abstract blobs
* Fake charts
* Fake statistics
* Generic laptop mockup

Instead, construct the hero around **real Next Knock product UI**.

Potential composition:

```text
                     NEXT KNOCK

       Stop letting good cleaning
               quotes go cold.

      Keep every quote visible.
      Know what needs follow-up.
      Close the loop.

                 [ Start Free ]

             ┌───────────────────┐
             │ REAL PRODUCT UI   │
             │                   │
             │ Needs Follow-up   │
             │ Customer          │
             │ $420              │
             │ Follow up today   │
             └───────────────────┘
```

However, this exact arrangement is NOT mandatory.

The agent must create a new composition rather than mechanically reproducing this diagram.

## Strong preference

Use asymmetry and spatial hierarchy.

For example:

* Typography occupying one visual plane
* Product UI occupying another
* Product UI partially intersecting the content area
* Editorial alignment
* Large negative space
* Subtle motion connecting text and product state

---

# 10. Hero Motion

Motion must demonstrate product behavior.

A possible sequence:

```text
Quote
↓
Follow-up date
↓
Due state
↓
Home visibility
↓
User action
↓
Won / Lost
```

The actual implementation must only represent behavior verified in the application.

Do not fake product functionality.

Do not animate imaginary automation.

Do not claim Next Knock sends messages automatically unless the actual product does so.

---

# 11. Problem Narrative

The problem section should not be a four-card feature grid.

Use editorial storytelling.

Possible structure:

```text
QUOTE SENT

        ↓

THE DAY GETS BUSY

        ↓

FOLLOW-UP GETS MISSED

        ↓

THE OPPORTUNITY GOES COLD
```

The typography and spacing should create the progression.

Potential techniques:

* Increasing whitespace
* Progressive alignment
* Large type
* Scroll-linked emphasis
* Product-state transitions
* Minimal separators

No fabricated revenue-loss statistics.

No unsupported percentages.

---

# 12. The Follow-Up Gap

Create a visually distinct explanation of the operational gap.

The key concept:

```text
Quote sent
     ↓
No immediate response
     ↓
Business gets busy
     ↓
Quote disappears from attention
     ↓
Follow-up is missed
```

Then introduce:

```text
Next Knock
     ↓
Quote remains visible
     ↓
Follow-up becomes due
     ↓
Home surfaces the action
     ↓
Owner follows up
     ↓
Outcome recorded
```

The contrast should be primarily typographic and spatial.

Avoid generic comparison cards.

---

# 13. Solution Presentation

The solution should communicate simplicity.

Core workflow:

```text
CREATE
   ↓
SEND
   ↓
SEE
   ↓
FOLLOW UP
   ↓
CLOSE
```

The exact labels must reflect verified product behavior.

The landing page must never imply functionality that does not exist.

---

# 14. Product Demonstration — Highest Priority

The product demonstration should be one of the strongest visual sections.

Use actual Next Knock UI wherever possible.

The visitor should understand the workflow without reading large amounts of marketing copy.

## Demonstrate

```text
Create Quote
     ↓
Send Quote
     ↓
Quote Remains Visible
     ↓
Follow-Up Becomes Due
     ↓
Home Surfaces It
     ↓
User Takes Action
     ↓
Won / Lost
```

## Product UI principles

Use:

* Real components
* Real terminology
* Real states
* Real values where appropriate
* Real interaction patterns

Do not fabricate:

* Analytics
* Revenue charts
* Customer counts
* AI recommendations
* Team dashboards
* Automated communication
* CRM functionality

---

# 15. Product Motion

If Motion is added, use it primarily for the product demonstration.

Preferred behavior:

1. Quote exists.
2. Follow-up date is visible.
3. State changes.
4. Quote becomes relevant to follow-up.
5. UI transitions demonstrate the relationship.
6. Outcome is recorded.

Motion should help the visitor understand:

> "I can see what needs follow-up."

rather than:

> "This website has cool animations."

---

# 16. Three Core Outcomes

Avoid a three-card feature grid.

Present the three outcomes through an editorial composition.

## Outcome 1

### Keep Quotes Visible

Explain the verified functionality that prevents active quotes from disappearing into memory.

## Outcome 2

### Know What Needs Follow-Up

Explain the Home/follow-up workflow.

## Outcome 3

### Track the Outcome

Explain Won/Lost behavior without implying a full CRM.

Potential visual arrangement:

```text
01

KEEP
QUOTES
VISIBLE
                    REAL PRODUCT UI


                         02

                   KNOW WHAT
                   NEEDS FOLLOW-UP


03

TRACK
THE
OUTCOME
```

The final layout should be determined during implementation.

---

# 17. Objection Handling

Keep objection handling compact.

Potential objections:

### "I already use text and email."

Next Knock does not need to replace communication tools. It helps keep track of which quotes need attention.

### "I don't need another CRM."

Next Knock is intentionally narrower than a CRM.

### "I only get a few quotes."

Consistent follow-up can still be useful even with modest quote volume.

### "I don't want another system to maintain."

Emphasize the focused workflow and low cognitive overhead.

Only make claims supported by the actual implementation.

---

# 18. Trust

Trust must be based on reality.

Never fabricate:

* Testimonials
* Customer logos
* Reviews
* User counts
* Revenue figures
* Case studies
* Usage statistics
* Ratings

If legitimate evidence exists, use it.

If legitimate evidence does not exist, use:

* Real product UI
* Transparent explanation
* Clear pricing
* Privacy information
* Terms
* Support/contact information
* Clear business identity
* Accurate product capabilities

The product itself is the primary proof.

---

# 19. Pricing

Inspect the current implementation and authoritative project documentation before adding pricing.

Do not invent pricing.

If pricing is verified:

* Present it clearly.
* Keep the design restrained.
* Avoid excessive pricing-card decoration.
* Explain the offer succinctly.
* Keep signup obvious.

If pricing is not verified:

> **Pricing requires confirmation before implementation.**

Never add:

* Fake discounts
* Fake countdowns
* Artificial scarcity
* Fake "limited spots"
* Unsupported price comparisons

---

# 20. Final CTA

The final CTA should reinforce the core problem.

Possible direction:

> **Ready to stop losing track of your quotes?**

Primary CTA:

> **Start using Next Knock**

The exact CTA must match the verified signup flow.

The final CTA should be visually distinct through:

* Typography
* Whitespace
* Strong alignment
* Controlled contrast
* Product context

Do not rely on gradients or oversized decorative backgrounds.

---

# 21. Navigation

Navigation should be redesigned as part of the new visual composition.

Required functionality:

* Next Knock logo
* Login
* Primary signup CTA

Avoid:

* Mega menus
* Excessive links
* Decorative navigation
* Unnecessary dropdowns

Mobile navigation must be intentionally designed rather than simply collapsed desktop navigation.

---

# 22. Typography

Use the existing typography system where appropriate.

Primary preference:

**Inter**, if already established by the application.

Otherwise inspect the existing implementation before introducing a new font.

Use hierarchy through:

* Size
* Weight
* Contrast
* Line length
* Tracking
* Spacing
* Alignment

Avoid excessive typography styles.

Recommended hierarchy:

```text
Eyebrow
↓
Hero Heading
↓
Supporting Copy
↓
Section Heading
↓
Body
↓
UI Label
↓
Metadata
```

Large typography is encouraged where it improves editorial composition.

---

# 23. Color

The existing Next Knock palette is authoritative.

Use:

* Existing background
* Existing text
* Existing surface
* Existing borders
* Existing action/accent color

Do not invent a new brand palette.

The accent should be concentrated around:

* Primary CTA
* Important interaction states
* Product emphasis
* Focus states where appropriate

Avoid:

* Rainbow palettes
* Large gradients
* Decorative color fields
* Neon accents

---

# 24. Surfaces

Cards are not the default design primitive.

Prefer:

* Open layouts
* Borders
* Dividers
* Whitespace
* Typography
* Product UI
* Spatial grouping

Use cards only where a card materially improves comprehension.

Do not automatically wrap every feature in:

```text
┌──────────────┐
│ Feature      │
│ Description  │
└──────────────┘
```

---

# 25. Tactile Utility

Tactile design should make the interface feel like a useful business tool.

Use existing tokens where verified.

Potential characteristics:

* Strong borders
* Controlled shadows
* Clear hover states
* Pressed states
* 44px minimum touch targets
* Small translation
* Strong focus states

Existing shadow tokens should be reused where available.

Do not make every element physically move.

The goal is:

> **"This is a tool."**

not:

> **"This is a toy."**

---

# 26. Approved Animation System

Inspect the repository before adding dependencies.

If animation is currently CSS-native and sufficient, do not introduce a dependency merely for decoration.

If a dedicated animation library is justified, use **Motion for React** as the single approved animation dependency.

Verify the current package/API before installation.

Do not blindly install deprecated or unnecessary alternatives.

Do not introduce:

* framer-motion
* gsap
* react-spring
* animejs
* Multiple animation libraries

Simple CSS hover/focus/pressed transitions may remain CSS-native.

---

# 27. Animation Restrictions

Forbidden:

* Cursor-following effects
* Particle backgrounds
* Scroll hijacking
* Excessive parallax
* Infinite decorative loops
* Heavy WebGL
* Heavy 3D
* Large animated gradients
* Animation that blocks content
* Layout-shifting animation
* Generic fade-in on every element
* Decorative effects with no product/UX purpose

Every animation must support:

**Understanding, hierarchy, or interaction.**

---

# 28. Reduced Motion

Respect:

```text
prefers-reduced-motion
```

When enabled:

* Disable non-essential movement.
* Preserve all information.
* Preserve all state changes.
* Preserve functionality.
* Do not hide information inside animation.
* Do not require animation to understand the product.

---

# 29. Responsive Design

Mobile and desktop must be designed intentionally.

## Mobile

Explicitly design:

* Hero composition
* Product UI scaling
* Navigation
* CTA placement
* Typography
* Section spacing
* Touch targets
* Horizontal overflow
* Product demonstrations

Do not simply stack desktop elements.

## Desktop

Use:

* Wider compositions
* Editorial alignment
* Asymmetry where useful
* Strong whitespace
* Product-focused layouts
* Controlled visual rhythm

Do not stretch a mobile design across desktop.

---

# 30. Accessibility

Requirements:

* Semantic HTML
* One logical H1
* Correct heading hierarchy
* Accessible buttons
* Accessible links
* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Meaningful alt text
* Decorative media correctly hidden
* Reduced-motion support
* No hover-only interaction

Target:

**WCAG 2.2 AA principles where applicable.**

Visual novelty must never override accessibility.

---

# 31. Performance

Prioritize:

* Minimal JavaScript
* Optimized SVG
* Optimized product imagery
* Responsive images
* Lazy loading below-the-fold media
* Stable layout
* Minimal animation overhead
* No unnecessary dependencies
* Fast initial rendering

Do not add libraries simply because they provide visually impressive marketing components.

---

# 32. SEO

Verify:

* Page title
* Meta description
* Canonical URL where applicable
* One H1
* Semantic headings
* Descriptive content
* Open Graph metadata
* Social metadata where appropriate
* Favicon
* Product/site identity
* Truthful structured data where useful

Avoid keyword stuffing.

SEO copy should naturally reinforce:

* Cleaning businesses
* Quotes
* Quote follow-up
* Follow-up management
* Business workflow

Do not create pages or content outside the landing-page scope.

---

# 33. Codebase Inspection

Before editing, inspect:

1. Repository structure
2. Authoritative project documentation
3. Current landing page
4. Authenticated product UI
5. Design tokens
6. Brand assets
7. Shared components
8. Dependencies
9. Routing
10. Signup/login behavior
11. Existing test/build commands

Do not invent:

* Files
* Routes
* APIs
* Components
* Dependencies
* Product capabilities
* Database behavior

If something cannot be verified:

> **Not verified from the current codebase.**

---

# 34. Reuse Policy

The implementation should follow:

> **Reuse functionality, not visual composition.**

## Reuse when appropriate

* Logo
* Brand assets
* Existing product UI
* Signup functionality
* Login functionality
* CTA handlers
* Design tokens
* Accessibility primitives
* Verified shared components

## Do not reuse merely for convenience

* Existing landing hero
* Existing marketing cards
* Existing section layout
* Existing marketing-page wrapper
* Existing decorative elements
* Existing landing-page composition

If an existing component forces the new design to resemble the old page, create a new landing-page composition instead.

Do not duplicate product functionality.

---

# 35. Scope

This specification covers the landing page only.

Do not modify:

* Quote lifecycle
* Follow-up logic
* Quote management
* Authentication architecture
* Database schema
* Payment architecture
* Core product functionality
* Product scope

unless an existing verified integration is required for the landing page and the change is explicitly justified.

Do not create new product features merely to make the landing page more impressive.

---

# 36. Implementation Workflow

## Phase 0 — Repository Audit

Inspect the repository completely enough to understand:

* Current landing page
* Product UI
* Components
* Tokens
* Brand assets
* Routing
* Authentication
* Dependencies
* Tests
* Build system

Report conflicts before editing.

---

## Phase 1 — Existing Page Decomposition

Before implementation, document internally:

### Keep

Technical functionality and verified assets that remain useful.

### Discard

Existing visual structures that constrain the new design.

### Replace

Existing landing-page structures that will be rebuilt.

Do not start implementation until the current page has been understood.

---

## Phase 2 — New Composition

Design a new landing-page composition independently from the existing page.

Define:

* Hero geometry
* Product placement
* Section rhythm
* Typography hierarchy
* Problem narrative
* Product demonstration
* Benefit presentation
* Objection handling
* Trust
* CTA hierarchy
* Responsive behavior
* Motion opportunities

The new composition must be materially different from the current landing page.

---

## Phase 3 — Visual System

Implement:

* Typography
* Spacing
* Borders
* Surfaces
* Buttons
* Product presentation
* Editorial layouts
* Responsive behavior
* Tactile interactions

Use existing tokens where appropriate.

---

## Phase 4 — Product Demonstration

Integrate verified product UI.

Create meaningful visual transitions showing:

```text
Quote
↓
Follow-up
↓
Action
↓
Outcome
```

Do not fabricate product behavior.

---

## Phase 5 — Motion

Only after the static composition is correct:

* Add product-state motion.
* Add meaningful interaction feedback.
* Add limited section transitions where useful.
* Verify reduced-motion behavior.

Do not use animation to compensate for weak layout.

---

## Phase 6 — QA

Validate:

* Mobile
* Tablet
* Desktop
* Accessibility
* Performance
* SEO
* CTA flow
* Product accuracy
* Visual differentiation
* Console errors
* Broken assets

---

# 37. Visual Differentiation Test

This is a mandatory acceptance test.

Compare the newly implemented landing page against the previous landing page.

The new implementation must show substantial differences in:

* Hero composition
* Section composition
* Product presentation
* Typography scale
* Layout geometry
* Visual hierarchy
* Feature presentation
* Spacing rhythm
* CTA placement
* Motion strategy
* Overall page silhouette

## Failure condition

If the result can reasonably be described as:

* A polish
* A reskin
* A cleanup
* A modernization
* A slightly different arrangement
* The same landing page with better CSS

then the implementation is **not complete**.

Redesign the composition.

---

# 38. Anti-AI-Slop Audit

Before completion, verify:

* [ ] No gradient hero background
* [ ] No generic floating dashboard
* [ ] No fake statistics
* [ ] No fake testimonials
* [ ] No fake logos
* [ ] No glow effects
* [ ] No decorative blobs
* [ ] No decorative 3D
* [ ] No particle background
* [ ] No excessive rounded cards
* [ ] No feature-card grid as default composition
* [ ] No generic "Everything you need..." SaaS copy
* [ ] No meaningless animated text
* [ ] No excessive glassmorphism
* [ ] No excessive neumorphism
* [ ] No excessive brutalism
* [ ] No visual effect without a product/UX purpose
* [ ] No unsupported product claims
* [ ] No invented functionality

---

# 39. Conversion Architecture

The visitor should progress through:

```text
Recognition
     ↓
Problem
     ↓
Consequence
     ↓
Solution
     ↓
Product Understanding
     ↓
Trust
     ↓
Objection Resolution
     ↓
Conversion
```

The page should answer:

1. Who is this for?
2. What problem does it solve?
3. How does it work?
4. Why should I trust it?
5. What should I do next?

---

# 40. Conversion Rules

Do not:

* Use manipulative urgency
* Invent financial claims
* Invent customer evidence
* Overuse CTAs
* Hide important information
* Create fake scarcity
* Create fake discounts
* Use misleading UI

The primary CTA should remain clear without dominating every section.

Recommended CTA locations:

* Hero
* After product demonstration
* Final CTA

---

# 41. Product Accuracy

Every product visualization must represent actual Next Knock behavior.

Before implementing a product demonstration, inspect the application.

Verify:

* Quote states
* Follow-up behavior
* Home behavior
* Won/Lost behavior
* Quote terminology
* Existing UI structure

Do not invent product interactions.

If the desired animation cannot accurately represent the current product:

> **Do not implement the fictional interaction.**

Use a simpler truthful representation.

---

# 42. Security

The landing page must not expose:

* Secrets
* API keys
* Private data
* Internal endpoints unnecessarily
* Authentication tokens
* User information

All signup/login behavior must use the existing verified authentication flow.

Do not create client-side authentication shortcuts.

---

# 43. Testing Requirements

Use the project-standard commands defined by the repository and AGENTS.md.

Do not invent new commands.

At minimum, where applicable:

```text
npx tsc --noEmit
npx vitest run
npm run lint
npm run build
```

Recommended verification order:

```text
Typecheck
↓
Tests
↓
Lint
↓
Build
```

---

# 44. Functional QA

Verify:

* Logo
* Navigation
* Login
* Signup
* Hero CTA
* Product demonstration
* Mobile navigation
* Final CTA
* Pricing CTA if present
* Internal links
* Legal links
* Support/contact links

No dead buttons.

No decorative buttons pretending to be functional.

---

# 45. Responsive QA

Test:

* Small mobile
* Large mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Check:

* Overflow
* Clipping
* Product UI scaling
* Typography
* CTA visibility
* Navigation
* Section spacing
* Image loading
* Animation behavior
* Touch targets

---

# 46. Accessibility QA

Verify:

* Keyboard navigation
* Focus visibility
* Heading hierarchy
* Contrast
* Semantic HTML
* Button/link semantics
* Alt text
* Reduced motion
* Screen-reader meaningful structure
* No hover-only functionality

---

# 47. Performance QA

Check:

* Initial render
* Image loading
* Layout stability
* JavaScript size
* Animation performance
* Console errors
* Broken assets
* Unnecessary dependencies

---

# 48. Acceptance Criteria

## Redesign

* [ ] The landing page is a materially new visual composition.
* [ ] The old landing-page layout was not treated as the design baseline.
* [ ] The hero has been structurally redesigned.
* [ ] Section composition is substantially different.
* [ ] Product presentation is substantially different.
* [ ] Typography hierarchy is substantially different where appropriate.
* [ ] Visual rhythm is substantially different.
* [ ] The page does not feel like a polished version of the previous page.

## Product

* [ ] Real product UI is used where possible.
* [ ] Product behavior is represented truthfully.
* [ ] No invented features exist.
* [ ] Quote/follow-up workflow is understandable.
* [ ] Core value proposition is specific.

## Design

* [ ] Quiet Precision is the foundation.
* [ ] Tactile Utility is used selectively.
* [ ] Product Motion is purposeful.
* [ ] Editorial/Swiss principles are visible.
* [ ] Multiple visual influences are integrated coherently.
* [ ] Cards are not the default layout primitive.
* [ ] Decorative effects do not dominate the page.
* [ ] No generic AI/SaaS visual language remains.

## Conversion

* [ ] Target audience is obvious.
* [ ] Problem is immediately understandable.
* [ ] Solution is easy to understand.
* [ ] Product demonstration creates product understanding.
* [ ] CTA hierarchy is coherent.
* [ ] Signup flow works.
* [ ] No manipulative conversion tactics exist.

## Trust

* [ ] No fabricated proof exists.
* [ ] Product UI provides tangible evidence.
* [ ] Legal/support information is accessible.
* [ ] Pricing is truthful if displayed.

## Technical

* [ ] Existing product functionality remains unchanged.
* [ ] Existing authentication behavior remains unchanged.
* [ ] No unnecessary dependencies are introduced.
* [ ] Mobile layout is intentionally designed.
* [ ] Desktop layout is intentionally designed.
* [ ] Accessibility requirements are met.
* [ ] SEO fundamentals are implemented.
* [ ] Performance remains acceptable.
* [ ] Typecheck passes.
* [ ] Tests pass.
* [ ] Lint passes.
* [ ] Production build passes.

---

# 49. Definition of Done

The landing page is complete only when:

1. The repository has been inspected.
2. Authoritative documentation has been reviewed.
3. Existing landing-page functionality has been understood.
4. Existing product UI has been inspected.
5. Existing design tokens have been inspected.
6. Existing brand assets have been inspected.
7. Existing routes and authentication behavior have been verified.
8. The old landing-page visual structure has been explicitly treated as non-authoritative.
9. A new visual composition has been implemented.
10. The hero has been substantially redesigned.
11. The page's overall visual silhouette differs from the previous page.
12. Real product UI provides product proof.
13. Product behavior is represented truthfully.
14. Quote follow-up is immediately understandable.
15. Quiet Precision is visually dominant.
16. Tactile Utility is restrained.
17. Product Motion is purposeful.
18. No AI-slop visual patterns remain.
19. No fabricated proof exists.
20. CTA hierarchy is coherent.
21. Mobile is intentionally designed.
22. Desktop is intentionally designed.
23. Accessibility requirements are met.
24. SEO fundamentals are implemented.
25. Performance remains acceptable.
26. Existing product functionality is unchanged.
27. Typecheck passes.
28. Tests pass.
29. Lint passes.
30. Production build passes.
31. The visual differentiation test passes.

---

# 50. Required OpenCode Final Report

After implementation, report:

## Files Changed

List every changed file.

## Files Created

List every newly created file.

## Files Removed

List every removed file.

## Architecture

Explain whether existing components were reused, replaced, or intentionally not reused.

## Design

Explain the major differences between the previous and new landing page.

## Product Accuracy

Explain which real product UI and verified behaviors are represented.

## Dependencies

Report:

* Dependencies added
* Dependencies removed
* Reason for each

If Motion was added, explain why it was necessary.

## QA

Report:

* Typecheck result
* Test result
* Lint result
* Build result
* Responsive verification
* Accessibility verification
* Console verification

## Remaining Issues

List unresolved issues explicitly.

## Scope Verification

Confirm:

* No core product functionality changed.
* No database changes occurred.
* No authentication architecture changes occurred.
* No unsupported product capabilities were introduced.
* No fabricated marketing proof was introduced.

---

# 51. Hard Stop Conditions

The agent must stop and report instead of silently proceeding if:

* The specification conflicts with the current product behavior.
* Existing product UI does not support the proposed demonstration.
* A requested visual effect requires a major architectural change.
* A dependency introduces significant unnecessary cost or complexity.
* Existing authentication behavior is unclear.
* Product capabilities are unclear.
* A visual requirement would require inventing product functionality.
* A database change appears necessary.
* Core product functionality would need modification.
* Existing design tokens conflict materially with the specification.

Do not silently expand scope.

---

# 52. Final Design Principle

The most important requirement is:

> **Build a new landing page for the existing product — do not build a prettier version of the existing landing page.**

The current implementation is a source of technical truth, not a source of visual inspiration.

The new page should feel like it was designed independently from the old page while remaining unmistakably Next Knock.

The final experience should communicate:

> **Stop letting good cleaning quotes go cold.**

and make the visitor understand:

> **Next Knock gives me a simple system for keeping quotes visible, knowing what needs follow-up, and closing the loop.**

The product should be the proof.

The design should create interest.

The motion should create understanding.

The copy should create recognition.

The CTA should create action.

**Do not optimize for novelty.**

**Do not optimize for preserving existing code.**

**Optimize for the strongest landing page that can truthfully be built from the existing Next Knock product.**
