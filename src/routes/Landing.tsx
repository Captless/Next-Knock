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
  ChevronRight,
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
    q: 'What is Next Knock?',
    a: 'Next Knock is a focused tool that helps cleaning-business owners track quotes and follow up before good opportunities disappear.',
  },
  {
    q: 'Who is it for?',
    a: 'Cleaning-business owners and operators who want a simple way to track quotes and follow up while moving between jobs.',
  },
  {
    q: 'Is it a CRM?',
    a: 'No. Next Knock is a focused quote and follow-up tool, not a CRM, accounting, or scheduling platform.',
  },
  {
    q: 'How does payment work?',
    a: 'Next Knock is a one-time purchase. Pricing is confirmed at checkout — there are no subscriptions.',
  },
  {
    q: 'Do I need a computer?',
    a: 'No. Next Knock is built mobile-first and works in your phone browser. It can also be installed like an app.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your quotes and customer information stay tied to your account and are never shared.',
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

  return (
    <div className="min-h-screen bg-bg">
      <LandingNav />

      <main>
        {/* Hero — split composition */}
        <section className="mx-auto max-w-5xl px-4 pb-14 pt-12 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex animate-fade-up flex-col items-start">
              <p className="mb-4 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
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
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Quotes are lost not when they are created, but when follow-up is
              forgotten.
            </h2>
            <p className="mt-4 text-base text-ink-muted sm:text-lg">
              Cleaning businesses lose potential work because quotes are never
              tracked and prospects are never followed up with at the right time. A
              good lead goes cold, and the job goes to someone else.
            </p>
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
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="relative rounded-xl border border-line bg-bg p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-semibold text-line">
                      {s.n}
                    </span>
                    {i < steps.length - 1 && (
                      <ChevronRight className="hidden h-5 w-5 text-ink-subtle sm:block" />
                    )}
                  </div>
                  <div className="mb-3 mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-accentInk">
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{s.body}</p>
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
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-line/40 text-ink">
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
              <div className="rounded-xl border border-line bg-bg p-6 text-center shadow-card">
                <p className="text-sm text-ink-muted">One-time purchase</p>
                <p className="font-display mt-2 text-4xl font-semibold tracking-tight text-ink">
                  $19.99
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
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-16 sm:py-24">
          <Reveal className="mx-auto max-w-3xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Common questions
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
