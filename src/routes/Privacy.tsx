import { PageShell } from '@/components/PageShell';

export function Privacy() {
  return (
    <PageShell title="Privacy Policy">
      <p className="text-xs text-ink-subtle">Last updated: 2026-08-25</p>
      <p>
        Next Knock collects the information you provide to create and use your account: your
        email address, business name, and a hashed password. We also store the quotes and
        customer details you enter so the product can show your follow-ups.
      </p>
      <p>
        We use this data only to deliver the service — authentication, storing your quotes,
        and sending follow-up reminders. We do not sell your data, and your quotes and
        customer information are never shared with other accounts.
      </p>
      <p>
        Your password is hashed and never stored in plain text. Session tokens are kept in an
        HttpOnly cookie and expire after 30 days.
      </p>
      <p>
        You can delete your account at any time from Settings. Deletion removes your account,
        quotes, and activity history. For any privacy request, contact us at
        support@nextknock.com.
      </p>
    </PageShell>
  );
}
