import { PageShell } from '@/components/PageShell';

export function Terms() {
  return (
    <PageShell title="Terms of Service">
      <p className="text-xs text-ink-subtle">Last updated: 2026-08-25</p>
      <p>
        Next Knock is provided as-is for tracking quotes and follow-ups. By creating an account
        you agree to use the product for lawful purposes and not to abuse, scrape, or disrupt
        the service.
      </p>
      <p>
        Accounts may be suspended or terminated if used for illegal activity, spam, or to
        harm other users. You may delete your account and data at any time from Settings.
      </p>
      <p>
        Next Knock is a one-time purchase. Where a refund applies, requests are handled by
        contacting support@nextknock.com. The product is provided without warranties beyond
        what is described here.
      </p>
      <p>
        These terms may change. Material changes will be reflected on this page with an
        updated date.
      </p>
    </PageShell>
  );
}
