import { PageShell } from '@/components/PageShell';

export function Contact() {
  return (
    <PageShell title="Contact">
      <p>Questions, billing, or support? Reach a real person at:</p>
      <p>
        <a
          href="mailto:support@nextknock.com"
          className="font-medium text-ink underline-offset-2 hover:underline"
        >
          support@nextknock.com
        </a>
      </p>
      <p>We aim to respond within 24 hours on business days.</p>
    </PageShell>
  );
}
