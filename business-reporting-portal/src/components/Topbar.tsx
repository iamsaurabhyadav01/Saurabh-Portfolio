import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, TrendingUp, ShoppingCart, Boxes, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../utils/auth';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/sales', label: 'Sales', icon: TrendingUp },
  { to: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/dashboard/inventory', label: 'Inventory', icon: Boxes },
];

const TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/sales': 'Sales Reports',
  '/dashboard/orders': 'Order Reports',
  '/dashboard/inventory': 'Inventory Reports',
};

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const title = TITLES[location.pathname] ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3.5 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800">{title}</h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Nexora MIS &middot; Internal Business Reporting Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 sm:block"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 md:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
              {user?.name.charAt(0) ?? 'A'}
            </div>
            <span className="text-sm font-medium text-slate-700">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 md:hidden"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-3 py-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
