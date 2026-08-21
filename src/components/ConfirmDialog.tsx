import { useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/Button';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  pending?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  pending = false,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const submittingRef = useRef(false);

  const handleCancel = useCallback(() => {
    if (pending) return;
    onCancel();
  }, [pending, onCancel]);

  useEffect(() => {
    if (!open) return;

    cancelledRef.current = false;
    submittingRef.current = false;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
        return;
      }
      if (e.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, handleCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 px-4 pb-8"
      onClick={() => handleCancel()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="w-full max-w-sm rounded-xl border border-line bg-surface p-5 shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-ink">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-1 text-sm text-ink-muted">
          {message}
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            full
            disabled={pending}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            full
            disabled={pending}
            autoFocus
            onClick={() => {
              if (pending || submittingRef.current) return;
              submittingRef.current = true;
              onConfirm();
            }}
          >
            {pending ? 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
