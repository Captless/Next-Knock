import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuotes } from '@/hooks/useQuotes';
import { Button } from '@/components/Button';
import { Field, Input, Textarea } from '@/components/Input';
import { Select } from '@/components/Select';
import { useToast } from '@/components/Toast';
import {
  quoteSchema,
  parseAmountToCents,
  formatAmountCents,
  quoteInputFromQuote,
} from '@/lib/quote-schema';
import { defaultFollowUpDate, todayISO } from '@/lib/dashboard';
import { SERVICE_TYPE_LABEL, type ServiceType } from '@/types';

const serviceOptions = (
  Object.keys(SERVICE_TYPE_LABEL) as ServiceType[]
).map((k) => ({ value: k, label: SERVICE_TYPE_LABEL[k] }));

const empty = {
  customerName: '',
  phone: '',
  email: '',
  address: '',
  serviceType: 'house' as ServiceType,
  amount: '',
  status: 'draft' as const,
  followUpDate: defaultFollowUpDate(todayISO()),
  notes: '',
};

export function QuoteForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { quotes, addQuote, updateQuote } = useQuotes();
  const navigate = useNavigate();
  const { notify } = useToast();

  const existing = isEdit ? quotes.find((q) => q.id === id) : undefined;

  const [form, setForm] = useState(() =>
    existing
      ? {
          ...quoteInputFromQuote(existing),
          amount: (existing.amountCents / 100).toFixed(2),
          email: existing.email ?? '',
          address: existing.address ?? '',
          notes: existing.notes ?? '',
        }
      : empty,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    const parsed = quoteSchema.safeParse({
      customerName: form.customerName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      serviceType: form.serviceType,
      amountCents: parseAmountToCents(form.amount),
      status: form.status,
      closedOutcome: undefined,
      followUpDate: form.followUpDate || undefined,
      notes: form.notes,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '');
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      setSubmitting(false);
      return;
    }
    try {
      if (isEdit && existing) {
        await updateQuote(existing.id, {
          customerName: parsed.data.customerName,
          phone: parsed.data.phone,
          email: parsed.data.email || undefined,
          address: parsed.data.address || undefined,
          serviceType: parsed.data.serviceType,
          amountCents: parsed.data.amountCents,
          followUpDate: parsed.data.followUpDate || undefined,
          notes: parsed.data.notes || undefined,
        });
        notify('Quote updated', 'success');
        navigate(`/app/quotes/${existing.id}`);
      } else {
        const created = await addQuote(parsed.data);
        notify('Quote created', 'success');
        navigate(`/app/quotes/${created.id}`);
      }
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not save quote', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-ink-muted"
      >
        Cancel
      </button>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-ink">
        {isEdit ? 'Edit quote' : 'New quote'}
      </h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Customer name" error={errors.customerName}>
          <Input
            value={form.customerName}
            onChange={(e) => set('customerName', e.target.value)}
            placeholder="Maria Santos"
            autoFocus
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="(415) 555-0142"
          />
        </Field>

        <Field label="Email" error={errors.email} hint="Optional">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="name@email.com"
          />
        </Field>

        <Field label="Address" error={errors.address} hint="Optional">
          <Input
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="128 Birch St"
          />
        </Field>

        <Field label="Service type">
          <Select
            ariaLabel="Service type"
            value={form.serviceType}
            onChange={(v) => set('serviceType', v as ServiceType)}
            options={serviceOptions}
          />
        </Field>

        <Field label="Quote amount (USD)" error={errors.amountCents}>
          <Input
            inputMode="decimal"
            value={form.amount}
            onChange={(e) => set('amount', e.target.value)}
            placeholder="180.00"
          />
        </Field>

        <Field label="Follow-up date" error={errors.followUpDate} hint="Optional">
          <Input
            type="date"
            value={form.followUpDate}
            onChange={(e) => set('followUpDate', e.target.value)}
          />
        </Field>

        <Field label="Notes" error={errors.notes} hint={`${form.notes.length}/500`}>
          <Textarea
            value={form.notes}
            maxLength={500}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="3-bed, 2-bath. Wants weekly recurring."
          />
        </Field>

        <Button type="submit" full disabled={submitting}>
          {submitting
            ? 'Saving…'
            : isEdit
              ? 'Save changes'
              : `Create quote${form.amount ? ` · ${formatAmountCents(parseAmountToCents(form.amount))}` : ''}`}
        </Button>
      </form>
    </div>
  );
}
