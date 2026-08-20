import { useCallback, useEffect, useState } from 'react';

const KEY = 'nk.settings.v1';

interface Settings {
  businessName: string;
  notifications: boolean;
}

const load = (): Settings => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Settings;
  } catch {
    /* ignore */
  }
  return { businessName: 'My Cleaning Business', notifications: false };
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  const setBusinessName = useCallback((businessName: string) => {
    setSettings((s) => ({ ...s, businessName }));
  }, []);

  const setNotifications = useCallback((notifications: boolean) => {
    setSettings((s) => ({ ...s, notifications }));
  }, []);

  return { ...settings, setBusinessName, setNotifications };
}
