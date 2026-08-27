import { Button } from '@/components/Button';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-xl border border-line bg-bg p-6 shadow-pop">
        <h2 className="font-display text-xl font-semibold text-ink">You've reached your free quote limit</h2>
        <p className="mt-2 text-sm text-ink-muted">
          You've created 5 free quotes. Upgrade to Next Knock for unlimited quotes and keep tracking every follow-up.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button size="lg" full disabled title="Payments coming soon">
            Upgrade — $19.99
          </Button>
          <Button variant="ghost" size="md" full onClick={onClose}>
            Maybe later
          </Button>
        </div>
        <p className="mt-3 text-center text-xs text-ink-subtle">Payments will be available soon.</p>
      </div>
    </div>
  );
}
