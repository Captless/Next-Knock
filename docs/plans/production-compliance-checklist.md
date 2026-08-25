# Next Knock — Production Compliance & Launch Checklist

## Purpose

This document is a mandatory pre-launch verification checklist.

It does not authorize feature expansion.

OpenCode must inspect the current repository and verify each requirement against the actual implementation.

Do not invent compliance mechanisms.

Do not modify unrelated functionality.

If a requirement cannot be verified from the repository, mark it:

NOT VERIFIED

Do not assume compliance.

---

# 1. GOOGLE SEARCH COMPLIANCE

## Search Essentials

- [ ] Site is crawlable where intended.
- [ ] robots.txt does not accidentally block important public pages.
- [ ] No accidental noindex directives.
- [ ] Canonical URLs are correct.
- [ ] Public landing page has unique, useful content.
- [ ] Page content accurately represents Next Knock.
- [ ] No keyword stuffing.
- [ ] No hidden text intended to manipulate rankings.
- [ ] No cloaking.
- [ ] No deceptive redirects.
- [ ] No automatically generated low-value pages created solely for search traffic.
- [ ] No doorway pages.
- [ ] No manipulative link schemes.
- [ ] No copied content presented as original.
- [ ] No fake structured data.

Reference:
Google Search Essentials and current Search spam policies.

---

# 2. LANDING PAGE QUALITY

- [ ] Landing page clearly explains the product.
- [ ] Product claims match actual functionality.
- [ ] CTA destination matches CTA wording.
- [ ] Pricing shown on the page is accurate.
- [ ] No fake testimonials.
- [ ] No fake customer logos.
- [ ] No fake user counts.
- [ ] No fake reviews.
- [ ] No fake awards.
- [ ] No fake guarantees.
- [ ] No deceptive countdowns.
- [ ] No fake scarcity.
- [ ] No misleading screenshots.
- [ ] No fabricated product functionality.
- [ ] Important information is visible without deceptive interaction.
- [ ] Navigation works normally.
- [ ] Page does not automatically redirect users unexpectedly.

---

# 3. GOOGLE ADS READINESS

If Google Ads will be used:

- [ ] Ad destination is functional.
- [ ] Landing page content matches the advertisement.
- [ ] Product/offer is clearly explained.
- [ ] Pricing is not misleading.
- [ ] CTA does not misrepresent the destination.
- [ ] No malicious downloads.
- [ ] No forced redirects.
- [ ] No deceptive functionality.
- [ ] No prohibited content.
- [ ] No misleading claims.

Do not launch paid traffic until these are verified.

---

# 4. ADSENSE

Only applicable if AdSense is introduced.

- [ ] AdSense policy requirements reviewed.
- [ ] Privacy policy discloses Google advertising cookies.
- [ ] Third-party advertising vendors are disclosed where required.
- [ ] Users are given applicable personalization opt-out information.
- [ ] Required consent mechanisms are implemented where legally/policy required.
- [ ] Ads are clearly distinguishable from site content.
- [ ] No encouragement to click ads.
- [ ] No misleading ad placement.
- [ ] No artificial impressions/clicks.
- [ ] No paid-to-click traffic.
- [ ] No invalid traffic generation.
- [ ] Ads are not placed on prohibited pages.

AdSense publishers are responsible for complying with Google's current Publisher Policies. :contentReference[oaicite:1]{index=1}

---

# 5. PRIVACY

- [ ] Privacy Policy exists.
- [ ] Privacy Policy is publicly accessible.
- [ ] Privacy Policy accurately describes collected data.
- [ ] Authentication data is covered.
- [ ] Quote/customer data is covered where applicable.
- [ ] Payment-related data handling is described accurately.
- [ ] Analytics are disclosed.
- [ ] Cookies/local storage are disclosed where applicable.
- [ ] Third-party services are disclosed.
- [ ] Data retention is addressed.
- [ ] Account deletion behavior is accurately described.
- [ ] User rights/processes are accurately described.
- [ ] No privacy claims contradict the implementation.

Do not claim "we collect no data" if the application stores account, quote, authentication, analytics, or payment-related information.

---

# 6. COOKIE / CONSENT

Inspect the actual implementation.

- [ ] Identify every cookie.
- [ ] Identify every localStorage/sessionStorage usage.
- [ ] Identify analytics/tracking scripts.
- [ ] Identify advertising scripts.
- [ ] Identify third-party SDKs.
- [ ] Determine whether consent is legally/policy required.
- [ ] Implement consent only where necessary.
- [ ] Do not load consent-dependent advertising/tracking before required consent.
- [ ] Consent choices are persistent.
- [ ] Users can change applicable choices.
- [ ] Privacy policy matches implementation.

For Google advertising, requirements differ by jurisdiction. Google specifically requires consent mechanisms for applicable users in the EEA, UK and Switzerland under its EU user consent policy. :contentReference[oaicite:2]{index=2}

---

# 7. PHILIPPINE DATA PRIVACY

Because Next Knock is operated from the Philippines, review applicable Philippine privacy requirements.

- [ ] Personal-data collection is identified.
- [ ] Purpose of collection is defined.
- [ ] Data processing has an appropriate legal basis.
- [ ] Data minimization is applied.
- [ ] Access controls exist.
- [ ] Users can exercise applicable privacy rights.
- [ ] Retention/deletion practices are defined.
- [ ] Third-party processors are identified.
- [ ] Security measures are appropriate.
- [ ] Privacy policy accurately reflects processing.
- [ ] Cross-border processing is reviewed where applicable.

Use the Philippine National Privacy Commission's current guidance as the authoritative legal reference.

Do not make legal conclusions without verification.

---

# 8. AUTHENTICATION

- [ ] Passwords are never stored plaintext.
- [ ] Password handling uses the existing approved implementation.
- [ ] Sessions expire appropriately.
- [ ] Logout invalidates the appropriate session.
- [ ] Protected routes require authentication.
- [ ] Authentication cannot be bypassed through frontend manipulation.
- [ ] Sensitive authentication errors do not leak information.
- [ ] Password reset behavior is secure if implemented.
- [ ] Account deletion behavior is secure.

---

# 9. AUTHORIZATION / IDOR

For every user-owned resource:

- [ ] Server derives identity from authenticated session.
- [ ] User cannot supply another user's ID to access their records.
- [ ] Quote ownership is enforced server-side.
- [ ] Update ownership is enforced server-side.
- [ ] Delete ownership is enforced server-side.
- [ ] Read ownership is enforced server-side.
- [ ] API endpoints cannot be accessed by changing IDs.
- [ ] Frontend hiding is NOT used as authorization.

This is a blocking security requirement.

---

# 10. DATABASE SECURITY

- [ ] SQL queries are parameterized.
- [ ] No unsafe SQL string concatenation.
- [ ] User-owned records have ownership boundaries.
- [ ] Database migrations are reproducible.
- [ ] Production schema matches expected migrations.
- [ ] No destructive migration is executed without review.
- [ ] Sensitive data is not unnecessarily stored.
- [ ] Errors do not expose database internals.

---

# 11. API SECURITY

Inspect every public/protected endpoint.

- [ ] Authentication requirements are explicit.
- [ ] Authorization requirements are explicit.
- [ ] Request validation occurs server-side.
- [ ] Input limits exist where appropriate.
- [ ] Invalid input is rejected.
- [ ] Unexpected fields are handled safely.
- [ ] Errors do not expose secrets or stack traces.
- [ ] Sensitive endpoints have appropriate abuse protection.
- [ ] CORS is intentionally configured.
- [ ] HTTP methods are restricted appropriately.

---

# 12. PAYMENT SECURITY

For PayMongo:

- [ ] Secret keys exist only server-side.
- [ ] Frontend never contains secret keys.
- [ ] Frontend payment success is not trusted.
- [ ] Webhook authenticity is verified.
- [ ] Duplicate webhook events are handled safely.
- [ ] Delayed webhook events are handled safely.
- [ ] Payment status is stored server-side.
- [ ] Entitlement is determined server-side.
- [ ] User cannot unlock paid access by modifying frontend state.
- [ ] Payment/account mismatch is handled.
- [ ] Failed payments do not grant entitlement.
- [ ] Cancelled payments do not grant entitlement.

---

# 13. XSS / INJECTION

- [ ] User-generated text is safely rendered.
- [ ] No unnecessary dangerouslySetInnerHTML.
- [ ] HTML input is sanitized where HTML is intentionally supported.
- [ ] URLs are validated before rendering as links.
- [ ] SQL injection protections verified.
- [ ] Script injection protections verified.
- [ ] Error messages do not render unsafe input.

---

# 14. CSRF / REQUEST SECURITY

Review based on the actual authentication architecture.

- [ ] Determine whether cookie-based authentication is used.
- [ ] Determine whether CSRF protection is required.
- [ ] State-changing requests are appropriately protected.
- [ ] SameSite cookie configuration is appropriate.
- [ ] Origin/referer validation is considered where applicable.
- [ ] CORS does not accidentally permit unauthorized origins.

Do not add CSRF infrastructure blindly if the architecture does not require it.

---

# 15. SECRETS

Search the repository and production configuration.

- [ ] No API keys committed to Git.
- [ ] No PayMongo secret keys in frontend bundles.
- [ ] No JWT/session secrets in source code.
- [ ] No database credentials committed.
- [ ] No private environment variables exposed through Vite client variables.
- [ ] `.env` files are appropriately ignored.
- [ ] Production secrets are stored using the appropriate Cloudflare mechanism.
- [ ] Logs do not expose secrets.

---

# 16. ACCOUNT DELETION

- [ ] User can delete account if promised by product.
- [ ] Deletion is authenticated.
- [ ] Deletion is authorized.
- [ ] Associated user-owned data is handled consistently.
- [ ] Payment records are handled appropriately.
- [ ] Sessions are invalidated.
- [ ] Deleted users cannot continue accessing protected resources.
- [ ] Privacy policy accurately describes deletion behavior.

---

# 17. ACCESSIBILITY

- [ ] Semantic HTML.
- [ ] Correct heading hierarchy.
- [ ] Labels for inputs.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Sufficient contrast.
- [ ] Touch targets are usable.
- [ ] Images have appropriate alt text.
- [ ] Decorative images are marked appropriately.
- [ ] Dialogs are accessible.
- [ ] Reduced motion is supported.

---

# 18. SEO TECHNICAL CHECK

- [ ] `<title>` exists.
- [ ] Meta description exists.
- [ ] Canonical URL exists where appropriate.
- [ ] Open Graph metadata exists.
- [ ] Social preview is correct.
- [ ] Sitemap exists if appropriate.
- [ ] robots.txt is intentional.
- [ ] No accidental noindex.
- [ ] No broken canonical.
- [ ] No duplicate public URLs creating unnecessary duplication.
- [ ] 404 behavior is correct.
- [ ] HTTPS is enforced.

---

# 19. PERFORMANCE

- [ ] Landing page loads efficiently.
- [ ] Images are optimized.
- [ ] Fonts are reasonable.
- [ ] JavaScript bundle is reasonable.
- [ ] No unnecessary dependencies.
- [ ] No unnecessary third-party scripts.
- [ ] No excessive animation.
- [ ] No layout shifts caused by assets.
- [ ] Mobile performance is acceptable.

---

# 20. CONTENT INTEGRITY

- [ ] Every product feature advertised exists.
- [ ] Every pricing statement is accurate.
- [ ] Every CTA does what it says.
- [ ] No fake testimonials.
- [ ] No fake statistics.
- [ ] No fake customer logos.
- [ ] No fake reviews.
- [ ] No fake guarantees.
- [ ] No misleading screenshots.
- [ ] No fabricated integrations.
- [ ] No fabricated certifications.
- [ ] No fabricated business information.

---

# 21. LEGAL / COMMERCIAL PAGES

Verify whether the final commercial implementation requires:

- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Refund/Cancellation Policy
- [ ] Cookie Policy or equivalent disclosure
- [ ] Contact/support information
- [ ] Payment terms
- [ ] Product access terms

Do not create legal text by hallucinating jurisdiction-specific requirements.

Legal documents must be reviewed against the actual business model and applicable law.

---

# 22. PRODUCTION CONFIGURATION

- [ ] Production domain uses HTTPS.
- [ ] HTTP redirects to HTTPS where appropriate.
- [ ] Production environment variables are correct.
- [ ] Development secrets are not used in production.
- [ ] Production API endpoints are correct.
- [ ] Production D1 database is correct.
- [ ] Production migrations are applied.
- [ ] Production webhook URL is correct.
- [ ] Error logging is configured appropriately.
- [ ] Debug output is disabled where inappropriate.
- [ ] Source maps are reviewed for sensitive information.

---

# 23. GOOGLE SEARCH / ADS FINAL REVIEW

Before publishing:

- [ ] Search policies reviewed.
- [ ] Search spam policies reviewed.
- [ ] Landing-page quality reviewed.
- [ ] Claims reviewed.
- [ ] Privacy disclosures reviewed.
- [ ] Cookie/consent behavior reviewed.
- [ ] Ads configuration reviewed if applicable.
- [ ] No deceptive behavior found.

---

# 24. LAUNCH BLOCKERS

The website MUST NOT be considered production-ready if any of the following exist:

- [ ] Authentication bypass
- [ ] Authorization bypass
- [ ] Cross-user data access
- [ ] Exposed secrets
- [ ] Payment bypass
- [ ] Unsafe webhook verification
- [ ] SQL injection
- [ ] Stored/reflected XSS
- [ ] Broken account deletion
- [ ] Misleading payment behavior
- [ ] Broken HTTPS
- [ ] Major privacy disclosure mismatch
- [ ] Fake commercial claims
- [ ] Broken checkout
- [ ] Broken production API
- [ ] Critical data-loss issue

---

# 25. VERIFICATION RULE

OpenCode must NOT mark an item complete merely because the code appears to support it.

For every security/compliance requirement:

1. Inspect implementation.
2. Determine whether the requirement applies.
3. Verify behavior.
4. Test where possible.
5. Record the result.

Allowed statuses:

PASS
FAIL
NOT APPLICABLE
NOT VERIFIED

Never convert:

NOT VERIFIED

into:

PASS

without evidence.

---

# 26. FINAL REPORT

Report:

## Google Search

PASS / FAIL / NOT VERIFIED

## Google Ads

PASS / FAIL / NOT VERIFIED / NOT APPLICABLE

## AdSense

PASS / FAIL / NOT VERIFIED / NOT APPLICABLE

## Privacy

PASS / FAIL / NOT VERIFIED

## Security

PASS / FAIL / NOT VERIFIED

## Authentication

PASS / FAIL / NOT VERIFIED

## Authorization

PASS / FAIL / NOT VERIFIED

## Payments

PASS / FAIL / NOT VERIFIED / NOT APPLICABLE

## Accessibility

PASS / FAIL / NOT VERIFIED

## SEO

PASS / FAIL / NOT VERIFIED

## Performance

PASS / FAIL / NOT VERIFIED

## Production Configuration

PASS / FAIL / NOT VERIFIED

## Blocking Issues

List every P0/P1 issue.

## Files Changed

List every modified file.

## Tests Executed

List exact commands and results.

## Final Recommendation

One of:

READY FOR PRODUCTION
NOT READY — BLOCKED
READY WITH NON-BLOCKING ISSUES