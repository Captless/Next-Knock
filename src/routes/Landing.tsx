import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
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

/** Blank product frame. No fabricated UI — real screenshot inserted later. */
function ScreenshotFrame({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-visual overflow-hidden rounded-xl border border-line bg-surface shadow-card ${className}`}>
      <div className="aspect-[16/10] w-full bg-bg" aria-hidden />
    </div>
  );
}

const solutionPoints = [
  'Track quotes',
  'See what needs attention',
  'Follow up on time',
  'Track outcomes',
];

const steps = [
  {
    n: '01',
    title: 'Create a quote',
    body: 'Add customer, service, amount, and status in seconds from your phone.',
    Icon: PlusIcon,
  },
  {
    n: '02',
    title: 'Follow up',
    body: 'Next Knock sets a follow-up automatically and reminds you when it is due.',
    Icon: MessageIcon,
  },
  {
    n: '03',
    title: 'Track the outcome',
    body: 'Mark quotes won, lost, or archived. See what is open and what is done.',
    Icon: CheckIcon,
  },
];

const benefits = [
  {
    title: 'Keep quotes organized',
    body: 'Every quote lives in one place. No spreadsheets, no sticky notes, no forgotten prospects.',
    Icon: ListIcon,
  },
  {
    title: 'Know what needs attention',
    body: 'Next Knock shows exactly who needs a follow-up today, so good opportunities do not slip away.',
    Icon: CheckIcon,
  },
  {
    title: 'Follow up consistently',
    body: 'A follow-up date is set automatically, so nothing is left hanging after the first conversation.',
    Icon: MessageIcon,
  },
  {
    title: 'Avoid forgetting potential jobs',
    body: 'Reach the customer in one tap and update the outcome when the work is won or lost.',
    Icon: PhoneIcon,
  },
];

const faqs = [
  {
    q: 'How do I keep track of cleaning quotes?',
    a: 'Next Knock keeps every quote in one simple list — customer, service, amount, and status — so you always know what is outstanding without spreadsheets or sticky notes.',
  },
  {
    q: 'What is the best way to follow up with cleaning customers?',
    a: 'Next Knock sets a follow-up date automatically and shows you who needs a follow-up today, with tap-to-call and tap-to-message so you can reach the customer in one tap.',
  },
  {
    q: 'Do I need a CRM for my cleaning business?',
    a: 'Not necessarily. Next Knock is a focused quote and follow-up tool, not a full CRM, so it covers tracking and follow-ups without the complexity or cost of CRM software.',
  },
  {
    q: 'How much does quote tracking software cost?',
    a: 'Next Knock is a one-time purchase of $19.99. There are no monthly subscriptions and no recurring fees — you pay once and keep using it.',
  },
  {
    q: 'Does Next Knock work without a computer?',
    a: 'Yes. Next Knock is built mobile-first and runs in your phone browser. It can also be installed on your phone like an app.',
  },
  {
    q: 'Who can see my quotes and customer information?',
    a: 'Only you. Your quotes and customer information stay tied to your account and are never shared.',
  },
];

export function Landing() {
  const { user, loading } = useAuth();

  useEffect(() => {
    trackPageView();
  }, []);

  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingNav />

      <main>
        {/* Hero — split composition */}
        <section className="mx-auto max-w-5xl px-4 pb-14 pt-12 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex animate-fade-up flex-col items-start">
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/5 px-3 py-1 text-xs font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                For cleaning-business owners
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Know who to follow up with next.
              </h1>
              <p className="mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
                Next Knock helps cleaning-business owners keep track of quotes and
                follow up before good opportunities disappear.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    trackEvent('cta_hero');
                    window.location.href = '/signup';
                  }}
                >
                  <PlusIcon className="h-5 w-5" /> Get started
                </Button>
                <a href="#how" className="rounded-lg">
                  <Button variant="secondary" size="lg">
                    See how it works
                  </Button>
                </a>
              </div>
            </div>
            <Reveal className="order-first lg:order-none">
              <ScreenshotFrame />
            </Reveal>
          </div>
        </section>

        {/* Problem — vertical editorial statement */}
        <section id="problem" className="border-t border-line py-16 sm:py-24">
          <Reveal className="mx-auto max-w-3xl px-4">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Quotes are lost not when they are created, but when follow-up is
              forgotten.
            </h2>
            <p className="mt-5 text-base text-ink-muted sm:text-lg">
              Cleaning businesses lose potential work because quotes are never
              tracked and prospects are never followed up with at the right time. A
              good lead goes cold, and the job goes to someone else.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm text-ink">
              <li className="flex items-center gap-2">
                <span className="text-success">&rarr;</span>
                A quote goes out. Days pass.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">&rarr;</span>
                You meant to check back. You didn't.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">&rarr;</span>
                The customer books someone who did.
              </li>
            </ul>
          </Reveal>
        </section>

        {/* Solution — split with product visual */}
        <section className="border-t border-line bg-surface py-16 sm:py-24">
          <Reveal className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                One focused place for quotes and follow-ups
              </h2>
              <p className="mt-4 text-base text-ink-muted">
                Next Knock keeps every quote in one simple list. It tells you who
                needs a follow-up today, so you can act before the opportunity
                disappears.
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-ink">
                {solutionPoints.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-success" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <ScreenshotFrame />
          </Reveal>
        </section>

        {/* Product showcase — full-width visual */}
        <section className="py-16 sm:py-24">
          <Reveal className="mx-auto max-w-4xl px-4">
            <ScreenshotFrame />
            <p className="mt-4 text-center text-sm text-ink-subtle">
              A clean, mobile-first view of your quotes and follow-ups.
            </p>
          </Reveal>
        </section>

        {/* How it works — numbered sequence */}
        <section id="how" className="border-t border-line bg-surface py-16 sm:py-24">
          <Reveal className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Three steps, done from your phone
              </h2>
            </div>
            <ol className="relative mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
              <span
                aria-hidden
                className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-success/30 sm:block"
              />
              {steps.map((s) => (
                <li key={s.n} className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-accentInk shadow-card">
                    <s.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Benefits — divided list */}
        <section className="border-t border-line py-16 sm:py-24">
          <Reveal className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Built for the work you do
              </h2>
            </div>
            <div className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3 border-b border-line py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                    <b.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-line bg-surface py-16 sm:py-24">
          <Reveal className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                One simple price
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-md">
              <div className="relative overflow-hidden rounded-xl border border-line bg-white p-8 text-center shadow-pop sm:p-10">
                {/* Decorative curved line accent behind the price */}
                <svg
                  className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-24 w-64 text-line"
                  viewBox="0 0 256 96"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M8 72 C 64 16 192 16 248 72"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M40 84 C 96 40 160 40 216 84"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                <div className="relative z-10">
                  <span className="inline-block rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
                    Pay once. Yours forever.
                  </span>
                  <div className="mt-6 flex items-end justify-center gap-1">
                    <span className="mb-2 text-2xl font-semibold text-success">$</span>
                    <span className="gradient-text font-display text-7xl font-semibold tracking-tight">
                      19.99
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">
                    One-time purchase. No subscription.
                  </p>

                  <ul className="mx-auto mt-8 flex max-w-xs flex-col gap-3 text-left">
                    {[
                      'Unlimited quotes',
                      'Automatic follow-up dates',
                      'Know who needs follow-up today',
                      'Tap-to-call & tap-to-message',
                      'Won / lost outcome tracking',
                      'Installable app on your phone',
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-ink">
                        <CheckIcon className="h-4 w-4 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    variant="primary"
                    full
                    onClick={() => {
                      trackEvent('cta_pricing');
                      window.location.href = '/signup';
                    }}
                  >
                    Get started
                  </Button>
                  <p className="mt-3 text-sm font-medium text-success">
                    30-day money-back guarantee
                  </p>
                  <p className="mt-1 text-xs text-ink-subtle">
                    No credit card required · Final price confirmed at checkout.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-16 sm:py-24">
          <Reveal className="mx-auto max-w-3xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                 FAQ
              </h2>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-xl border border-line bg-surface p-4">
                  <summary className="cursor-pointer text-base font-medium text-ink">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="border-t border-line bg-ink py-16 sm:py-24">
          <Reveal className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-accentInk sm:text-3xl">
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
          </Reveal>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
