import { useState, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, BarChart3, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth, getRememberedUsername } from '../../utils/auth';
import { useToast } from '../../components/Toast';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState(getRememberedUsername());
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(!!getRememberedUsername());
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const errors: { username?: string; password?: string } = {};
    if (!username.trim()) errors.username = 'Username or email is required.';
    if (!password.trim()) errors.password = 'Password is required.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      const result = login(username, password, remember);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.message ?? 'Login failed.');
        return;
      }
      showToast('success', 'Login successful', 'Welcome back to Nexora MIS.');
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-brand-50/40 to-slate-100 px-4 py-10">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-cardHover md:grid-cols-2">
        {/* Branding panel */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-700 to-brand-900 p-10 text-white md:flex">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                <BarChart3 className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">Nexora MIS</span>
            </div>
            <p className="mt-1 text-sm text-brand-100">Business Reporting Portal</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-snug">
              Sales, Orders &amp; Inventory reporting, all in one place.
            </h2>
            <p className="mt-3 text-sm text-brand-100">
              Access daily operational reports, download Excel exports and monitor business performance across all
              store locations.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-brand-100">
              <ShieldCheck className="h-4 w-4" />
              Secure internal access &middot; Authorized personnel only
            </div>
          </div>

          <p className="text-xs text-brand-200">&copy; 2026 Nexora Retail Pvt. Ltd. All rights reserved.</p>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-2.5 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-slate-800">Nexora MIS</span>
          </div>

          <h1 className="text-xl font-bold text-slate-800">Sign in to your account</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your credentials to access the reporting portal.</p>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Username or Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="input-field pl-9"
                  autoComplete="username"
                />
              </div>
              {fieldErrors.username && <p className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-9 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full !py-3">
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3.5 py-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-600">Demo credentials</p>
            <p className="mt-0.5">
              Username: <span className="font-mono font-semibold">admin</span> &middot; Password:{' '}
              <span className="font-mono font-semibold">Admin@123</span>
            </p>
          </div>
        </div>
      </div>

      {forgotOpen && <ForgotPasswordModal onClose={() => setForgotOpen(false)} />}
    </div>
  );
}

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base font-bold text-slate-800">Reset your password</h3>
        {!sent ? (
          <>
            <p className="mt-1 text-sm text-slate-500">
              Enter your registered email and we&rsquo;ll send you a password reset link. (Demo only — no email is
              actually sent.)
            </p>
            <form onSubmit={handleSend} className="mt-4 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-field"
              />
              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Send Link
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-slate-600">
              If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            </p>
            <button onClick={onClose} className="btn-primary mt-4 w-full">
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
