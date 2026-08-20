import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/Button';
import { Field, Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useToast } from '@/components/Toast';
import { cn } from '@/lib/cn';
import { api } from '@/lib/api';

export function Settings() {
  const { user, signOut } = useAuth();
  const { notifications, setNotifications } = useSettings();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [name, setName] = useState(user?.businessName ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.patch<{ businessName: string }>('/api/auth/me', {
        businessName: name.trim() || 'My Cleaning Business',
      });
      notify('Settings saved', 'success');
    } catch {
      notify('Could not save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Settings</h1>

      <Card>
        <Field label="Business name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bright Clean Co." />
        </Field>
        <Button className="mt-3" full onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-ink">Follow-up reminders</p>
            <p className="text-xs text-ink-muted">Get notified when a quote is due.</p>
          </div>
          <button
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications(!notifications)}
            className={cn(
              'tap relative h-7 w-12 shrink-0 rounded-full transition-colors',
              notifications ? 'bg-ink' : 'bg-line',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-6 w-6 rounded-full bg-surface shadow transition-all',
                notifications ? 'left-[22px]' : 'left-0.5',
              )}
            />
          </button>
        </div>
        {!notifications && (
          <p className="mt-2 text-xs text-ink-subtle">Coming soon — reminders not active yet.</p>
        )}
      </Card>

      <Button variant="secondary" full onClick={logout}>
        Log out
      </Button>
    </div>
  );
}
