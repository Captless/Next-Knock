import { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { LandingNav } from '@/components/LandingNav';
import { LandingFooter } from '@/components/LandingFooter';
import { trackEvent, trackPageView } from '@/lib/analytics';
import { useAuth } from '@/hooks/useAuth';
import { QuoteRow } from '@/components/QuoteRow';
import { FollowUpItem } from '@/components/FollowUpItem';
import { Badge } from '@/components/Badge';
import { ScreenshotCarousel } from '@/components/ScreenshotCarousel';
import { todayISO } from '@/lib/dashboard';
import type { Quote } from '@/types';
import {
  CheckIcon,
  PlusIcon,
  ChevronRight,
} from '@/components/Icon';

const faqs = [
  {
    q: 'How do I keep track of cleaning quotes?',
    a: 'Next Knock keeps every cleaning quote in one simple list (customer, service, amount, and status) so cleaning-business owners across the US always know what is outstanding without spreadsheets or sticky notes.',
  },
  {
    q: 'What is the best way to follow up with cleaning customers?',
    a: 'Next Knock sets a follow-up date automatically and shows you who needs a follow-up today, with tap-to-call and tap-to-message so you can reach the customer in one tap from your phone.',
  },
  {
    q: 'Do I need a CRM for my cleaning business?',
    a: 'Not necessarily. Next Knock is a focused quote and follow-up tool for cleaning businesses, not a full CRM, so it covers tracking and follow-ups without the complexity or cost of CRM software.',
  },
  {
    q: 'Is Next Knock for cleaning businesses in the United States?',
    a: 'Yes. Next Knock is built for cleaning-business owners across the United States who send quotes and need a simple way to follow up before good opportunities go cold.',
  },
  {
    q: 'How much does quote tracking software cost?',
    a: 'Next Knock is a one-time purchase of $19.99. There are no monthly subscriptions and no recurring fees. You pay once and keep using it.',
  },
  {
    q: 'Does Next Knock work without a computer?',
    a: 'Yes. Next Knock is built mobile-first and runs in your phone browser. It can also be installed on your phone like an app, which is how most cleaning businesses use it in the field.',
  },
  {
    q: 'Who can see my quotes and customer information?',
    a: 'Only you. Your quotes and customer information stay tied to your account and are never shared.',
  },
];

function toISO(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

export function Landing() {
  const { user, loading } = useAuth();

  useEffect(() => {
    trackPageView();
  }, []);

  const demos = useMemo<{ due: Quote[]; list: Quote[] }>(() => {
    const today = todayISO();
    const base = (over: Partial<Quote>): Quote => ({
      id: 'demo',
      customerName: '',
      phone: '+1 415 555 0100',
      serviceType: 'house',
      amountCents: 0,
      status: 'sent',
      createdAt: today,
      updatedAt: today,
      ...over,
    });
    const due: Quote[] = [
      base({ id: 'd1', customerName: 'Maria Santos', phone: '+1 415 555 0142', serviceType: 'house', amountCents: 42000, followUpDate: today }),
      base({ id: 'd2', customerName: 'D. Okafor', phone: '+1 415 555 0177', serviceType: 'office', amountCents: 88000, followUpDate: today }),
    ];
    const list: Quote[] = [
      ...due,
      base({ id: 'd3', customerName: 'Green Lofts', phone: '+1 415 555 0199', serviceType: 'move_in_out', amountCents: 165000, followUpDate: toISO(3) }),
      base({ id: 'd4', customerName: 'P. Nguyen', phone: '+1 415 555 0123', serviceType: 'house', amountCents: 55000, status: 'closed', closedOutcome: 'won' }),
      base({ id: 'd5', customerName: 'Ashley Reid', phone: '+1 415 555 0156', serviceType: 'post_construction', amountCents: 120000, status: 'draft' }),
    ];
    return { due, list };
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <LandingNav />

      <main>
        {/* Hero — asymmetric composition around real product UI */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex animate-fade-up flex-col items-start">
              <p className="mb-5 inline-flex items-center gap-1.5 border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                For cleaning-business owners
              </p>
              <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Stop letting good cleaning quotes go cold.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink-muted">
                Next Knock keeps your cleaning quotes visible, shows you what needs a
                follow-up, and helps you close the loop. Made for cleaning businesses
                across the US, not another complicated CRM.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    trackEvent('cta_hero');
                    window.location.href = '/signup';
                  }}
                >
                  <PlusIcon className="h-5 w-5" /> Start free
                </Button>
                <a href="#how" className="rounded-lg">
                  <Button variant="secondary" size="lg">
                    See how it works <ChevronRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Real product UI — 3D screenshot carousel */}
            <Reveal className="order-first w-full lg:order-none" id="product">
              <ScreenshotCarousel
                slides={[
                  {
                    frame: 'phone',
                    node: (
                      <div className="pointer-events-none">
                        <div className="flex items-center justify-between border-b border-line px-4 py-3">
                          <span className="font-display text-sm font-semibold text-ink">New quote</span>
                          <Badge tone="muted">Draft</Badge>
                        </div>
                        <div className="p-3">
                          <QuoteRow quote={demos.list[4]!} />
                        </div>
                      </div>
                    ),
                  },
                  {
                    frame: 'phone',
                    node: (
                      <div className="pointer-events-none">
                        <div className="border-b border-line px-4 py-3">
                          <span className="font-display text-sm font-semibold text-ink">Quotes</span>
                        </div>
                        <div className="flex flex-col gap-2 p-3">
                          {demos.list.slice(0, 3).map((q) => (
                            <QuoteRow
                              key={q.id}
                              quote={q}
                              due={q.followUpDate === todayISO() && q.status === 'sent'}
                            />
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    frame: 'phone',
                    node: (
                      <div className="pointer-events-none">
                        <div className="border-b border-line px-4 py-3">
                          <span className="font-display text-sm font-semibold text-ink">Outcome</span>
                        </div>
                        <div className="p-3">
                          <QuoteRow quote={demos.list[3]!} />
                          <p className="mt-3 text-center text-xs text-ink-subtle">
                            Marked won. The loop is closed.
                          </p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* Problem narrative — editorial progression, no cards */}
        <section id="problem" className="border-t border-line py-20 sm:py-28">
          <Reveal className="mx-auto max-w-4xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">The problem</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              A quote is lost not when it is sent, but when the follow-up is forgotten.
            </h2>
            <div className="mt-12 flex flex-col gap-0 border-t border-line">
              {[
                ['Quote sent', 'You pitched the work and the customer said they would think about it.'],
                ['The day gets busy', 'Another job, another quote, another text thread. The first one drifts back.'],
                ['Follow-up gets missed', 'No system reminded you. The date passed without a flag.'],
                ['The opportunity goes cold', 'The customer booked someone who followed up first.'],
              ].map(([title, body], i) => (
                <div key={title} className="flex gap-6 border-b border-line py-7">
                  <span className="font-display text-sm font-semibold text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h3>
                    <p className="mt-1.5 max-w-2xl text-base text-ink-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* The follow-up gap — contrast, typographic */}
        <section className="border-t border-line bg-surface py-20 sm:py-28">
          <Reveal className="mx-auto max-w-5xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">Where it breaks</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The gap is not effort. It is attention.
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              <div className="bg-surface p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">Without Next Knock</p>
                <ul className="mt-4 flex flex-col gap-3 text-base text-ink-muted">
                  {['Quote sent', 'No immediate response', 'Business gets busy', 'Quote disappears from attention', 'Follow-up missed'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-ink-subtle">-</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bg p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-success">With Next Knock</p>
                <ul className="mt-4 flex flex-col gap-3 text-base text-ink">
                  {['Quote remains visible', 'Follow-up becomes due', 'Home surfaces the action', 'Owner follows up', 'Outcome recorded'].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 shrink-0 text-success" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Simple workflow — editorial sequence */}
        <section id="how" className="border-t border-line py-20 sm:py-28">
          <Reveal className="mx-auto max-w-5xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">How it works</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Five steps. All from your phone.
            </h2>
            <ol className="mt-10 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
              {[
                ['Create', 'Add customer, service, and amount in seconds.'],
                ['Send', 'Mark the quote sent, and Next Knock sets the follow-up.'],
                ['See', 'Every open quote stays in one list, never buried.'],
                ['Follow up', 'Know exactly who needs a follow-up today.'],
                ['Close', 'Mark won or lost. The loop is closed.'],
              ].map(([t, b], i) => (
                <li key={t} className="flex items-baseline gap-5 bg-surface p-5 sm:p-6">
                  <span className="font-display text-2xl font-semibold text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
                    <p className="mt-0.5 text-sm text-ink-muted">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Three core outcomes — editorial with real UI, no card grid */}
        <section className="border-t border-line py-20 sm:py-28">
          <Reveal className="mx-auto max-w-5xl px-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">Outcomes</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What you get
            </h2>
            <div className="mt-12 flex flex-col gap-14">
              <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <span className="font-display text-5xl font-semibold text-ink-subtle">01</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Keep quotes visible</h3>
                  <p className="mt-2 text-base text-ink-muted">Active quotes never disappear into memory or scattered notes.</p>
                </div>
                <QuoteRow quote={demos.list[2]!} />
              </div>
              <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <FollowUpItem quote={demos.due[0]!} />
                <div className="lg:text-right">
                  <span className="font-display text-5xl font-semibold text-ink-subtle">02</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Know what needs follow-up</h3>
                  <p className="mt-2 text-base text-ink-muted">Home surfaces the quotes due today, with one-tap call or message.</p>
                </div>
              </div>
              <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <span className="font-display text-5xl font-semibold text-ink-subtle">03</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Track the outcome</h3>
                  <p className="mt-2 text-base text-ink-muted">Mark won or lost without a full CRM workflow.</p>
                </div>
                <QuoteRow quote={demos.list[3]!} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-line bg-surface py-20 sm:py-28">
          <Reveal className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">Pricing</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">One simple price</h2>
            </div>
            <div className="mx-auto mt-10 max-w-md">
              <div className="relative overflow-hidden rounded-xl border border-line bg-white p-8 text-center shadow-pop sm:p-10">
                <span className="inline-block rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
                  One-time purchase. Yours forever.
                </span>
                <div className="mt-6 flex items-end justify-center gap-1">
                  <span className="mb-2 text-2xl font-semibold text-success">$</span>
                  <span className="gradient-text font-display text-7xl font-semibold tracking-tight">19.99</span>
                </div>
                <p className="mt-2 text-sm text-ink-muted">One-time purchase. No subscription.</p>
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
                      <CheckIcon className="h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  full
                  className="mt-8"
                  onClick={() => {
                    trackEvent('cta_pricing');
                    window.location.href = '/signup';
                  }}
                >
                  Start free
                </Button>
                <p className="mt-3 text-sm font-medium text-success">30-day money-back guarantee</p>
                <p className="mt-1 text-xs text-ink-subtle">Final price confirmed at checkout.</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-20 sm:py-28">
          <Reveal className="mx-auto max-w-3xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">Questions owners ask</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">FAQ</h2>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((f) => (
                <details key={f.q} className="rounded-xl border border-line bg-surface p-4">
                  <summary className="cursor-pointer text-base font-medium text-ink">{f.q}</summary>
                  <p className="mt-2 text-sm text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Final CTA */}
        <section className="border-t border-line bg-ink py-20 sm:py-28">
          <Reveal className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-accentInk sm:text-4xl">
              Ready to stop losing track of your quotes?
            </h2>
            <p className="mt-3 text-base text-white/80">Start free. Keep every follow-up in view.</p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-7"
              onClick={() => {
                trackEvent('cta_final');
                window.location.href = '/signup';
              }}
            >
              Start free <ChevronRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
