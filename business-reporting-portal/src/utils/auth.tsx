import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Dummy credentials for this prototype. Change these two constants to
 * update the login username/password used by the portal.
 */
export const DUMMY_USERNAME = 'admin';
export const DUMMY_PASSWORD = 'Admin@123';

interface AuthUser {
  username: string;
  name: string;
  role: string;
  loginAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string, remember: boolean) => { ok: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_KEY = 'brp_session';
const REMEMBER_KEY = 'brp_remember_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore corrupt session
      }
    }
  }, []);

  const login: AuthContextValue['login'] = (username, password, remember) => {
    if (!username.trim() || !password.trim()) {
      return { ok: false, message: 'Please enter both username/email and password.' };
    }
    if (username.trim().toLowerCase() !== DUMMY_USERNAME || password !== DUMMY_PASSWORD) {
      return { ok: false, message: 'Invalid username or password. Please try again.' };
    }
    const authUser: AuthUser = {
      username: DUMMY_USERNAME,
      name: 'Administrator',
      role: 'MIS Administrator',
      loginAt: new Date().toISOString(),
    };
    const payload = JSON.stringify(authUser);
    if (remember) {
      localStorage.setItem(SESSION_KEY, payload);
      localStorage.setItem(REMEMBER_KEY, username.trim());
    } else {
      sessionStorage.setItem(SESSION_KEY, payload);
    }
    setUser(authUser);
    return { ok: true };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getRememberedUsername() {
  return localStorage.getItem(REMEMBER_KEY) || '';
}
