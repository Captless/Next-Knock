type AnalyticsEvent = 'page_view' | 'cta_hero' | 'cta_pricing' | 'cta_final';

const ENDPOINT = '/api/analytics';

// Analytics stays ready but disabled until explicitly enabled via env.
// This prevents console/network errors in production before the backend exists.
const ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';

export function trackEvent(name: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (!ENABLED || typeof window === 'undefined') return;
  try {
    const body = JSON.stringify({ event: name, payload: payload ?? {}, ts: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  } catch {
    // Analytics must never break the page.
  }
}

export function trackPageView() {
  trackEvent('page_view');
}

