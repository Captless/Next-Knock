import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { LandingNav } from '@/components/LandingNav';
import { LandingFooter } from '@/components/LandingFooter';
import { trackEvent, trackPageView } from '@/lib/analytics';
import { useAuth } from '@/hooks/useAuth';
import {
  PhoneIcon,
  MessageIcon,
  CheckIcon,
  PlusIcon,
  ListIcon,
} from '@/components/Icon';

const benefits = [
  {
    title: 'Never lose a quote',
    body: 'Every quote lives in one place. No spreadsheets, no sticky notes, no forgotten prospects.',
    Icon: ListIcon,
  },
  {
    title: 'Follow up at the right time',
    body: 'Next Knock tells you exactly who needs a follow-up today, so good opportunities do not slip away.',
    Icon: CheckIcon,
  },
  {
    title: 'Call or message in one tap',
    body: 'Reach the customer straight from the quote. Tap to call or text without copying numbers.',
    Icon: PhoneIcon,
  },
  {
    title: 'Know your outcome',
    body: 'Mark quotes won, lost, or archived. See what is still open and what is done.',
    Icon: CheckIcon,
  },
];

const steps = [
  {
    title: 'Create the quote',
    body: 'Add customer, service, amount, and status in seconds from your phone.',
    Icon: PlusIcon,
  },
  {
    title: 'Get a follow-up date',
    body: 'Next Knock sets a follow-up automatically so nothing is left hanging.',
    Icon: MessageIcon,
  },
  {
    title: 'Follow up and close',
    body: 'See what is due today, reach out, and update the outcome when it is done.',
    Icon: CheckIcon,
  },
];

const faqs = [
  {
    q: 'Who is Next Knock for?',
    a: 'Cleaning-business owners and operators who want a simple way to track quotes and follow up before jobs are forgotten.',
  },
  {
    q: 'Do I need a computer?',
    a: 'No. Next Knock is built mobile-first and works in your phone browser. It can also be installed like an app.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your quotes and customer information stay tied to your account and are never shared.',
  },
  {
    q: 'How much does it cost?',
    a: 'A one-time purchase of $19-$29. No subscriptions. Pricing is confirmed at checkout.',
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function Landing() {
  const { user, loading } = useAuth();

  useEffect(() => {
    trackPageView();
  }, []);

  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen bg-bg">
      <LandingNav />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pb-12 pt-12 sm:pt-16">
          <div className="flex animate-fade-up flex-col items-center text-center">
            <p className="mb-3 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
              For cleaning-business owners
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Know who to follow up with next.
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink-muted sm:text-lg">
              Next Knock helps cleaning-business owners keep track of quotes and
              follow up before good opportunities disappear.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  trackEvent('cta_hero');
                  window.location.href = '/signup';
                }}
              >
                <PlusIcon className="h-5 w-5" /> Get started
              </Button>
              <a href="#how">
                <Button variant="secondary" size="lg">
                  See how it works
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-line bg-surface shadow-card">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            <div className="aspect-[16/10] w-full bg-bg" aria-hidden>
              {/* Real product screenshot will be placed here in public/screenshots/home.png */}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-t border-line bg-surface py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading
              eyebrow="The problem"
              title="Quotes get forgotten. Jobs get lost."
            />
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ink-muted">
              Cleaning businesses lose potential work because quotes are not tracked
              and prospects are never followed up with at the right time. A good lead
              goes cold, and the job goes to someone else.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading
              eyebrow="The solution"
              title="One focused place for quotes and follow-ups"
            />
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ink-muted">
              Next Knock keeps every quote in one simple list. It tells you who needs
              a follow-up today, so you can act before the opportunity disappears.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-line bg-surface py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading eyebrow="How it works" title="Three steps, done from your phone" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-xl border border-line bg-bg p-5 shadow-card"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-accentInk">
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold text-ink-subtle">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading eyebrow="Why Next Knock" title="Built for the work you do" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3 rounded-xl border border-line bg-surface p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-line/40 text-ink">
                    <b.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-line bg-surface py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading eyebrow="Pricing" title="One simple price" />
            <div className="mx-auto mt-8 max-w-md">
              <div className="rounded-xl border border-line bg-bg p-6 text-center shadow-card">
                <p className="text-sm text-ink-muted">One-time purchase</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-ink">
                  $19&ndash;$29
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  No subscription. Pay once and keep using Next Knock.
                </p>
                <Button
                  size="lg"
                  className="mt-5 w-full"
                  onClick={() => {
                    trackEvent('cta_pricing');
                    window.location.href = '/signup';
                  }}
                >
                  Get started
                </Button>
                <p className="mt-3 text-xs text-ink-subtle">
                  Final price confirmed at checkout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-14">
          <div className="mx-auto max-w-3xl px-4">
            <SectionHeading eyebrow="FAQ" title="Common questions" />
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border border-line bg-surface p-4"
                >
                  <summary className="cursor-pointer text-base font-medium text-ink">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-line bg-ink py-14">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-accentInk sm:text-3xl">
              Stop losing quotes to forgetfulness.
            </h2>
            <p className="mt-3 text-base text-white/80">
              Start tracking your follow-ups today.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-6"
              onClick={() => {
                trackEvent('cta_final');
                window.location.href = '/signup';
              }}
            >
              Get started
            </Button>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
