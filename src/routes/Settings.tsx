import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Button } from '@/components/Button';
import { Field, Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useToast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/ConfirmDialog';

function ChangePassword() {
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    if (!current || !next || !confirm) {
      setError('All fields are required');
      return;
    }
    if (next !== confirm) {
      setError('New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      await api.post('/api/auth/change-password', {
        currentPassword: current,
        newPassword: next,
      });
      notify('Password changed', 'success');
      setOpen(false);
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change password');
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <Button variant="secondary" full onClick={() => setOpen(true)}>
        Change password
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Field label="Current password">
        <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
      </Field>
      <Field label="New password">
        <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} />
      </Field>
      <Field label="Confirm new password">
        <Input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </Field>
      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex gap-2">
        <Button variant="secondary" full onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button full disabled={saving} onClick={submit}>
          {saving ? 'Saving…' : 'Change password'}
        </Button>
      </div>
    </div>
  );
}

export function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { notify } = useToast();
  const [name, setName] = useState(user?.businessName ?? '');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const onDelete = async () => {
    setDeleting(true);
    try {
      await api.post('/api/auth/delete');
      await signOut();
      navigate('/login', { replace: true });
    } catch (err) {
      notify(err instanceof Error ? err.message : 'Could not delete account', 'error');
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Settings</h1>

      <Card>
        <Field label="Business name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bright Clean Co."
          />
        </Field>
        <Button className="mt-3" full onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </Card>

      <Card>
        <Field label="Email">
          <Input value={user?.email ?? ''} readOnly disabled />
        </Field>
      </Card>

      <Card>
        <p className="mb-3 text-sm font-medium text-ink">Change password</p>
        <ChangePassword />
      </Card>

      <Button variant="secondary" full onClick={logout}>
        Log out
      </Button>

      <Card>
        <Button variant="ghost" full className="text-danger" onClick={() => setConfirmDelete(true)}>
          Delete account
        </Button>
      </Card>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete account?"
        message="This permanently deletes your account and all associated quotes. This cannot be undone."
        confirmLabel="Delete account"
        onConfirm={onDelete}
        onCancel={() => setConfirmDelete(false)}
      />
      {deleting && <p className="text-center text-sm text-ink-muted">Deleting…</p>}
    </div>
  );
}
