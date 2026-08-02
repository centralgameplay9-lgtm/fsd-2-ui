import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Building2, Bell, Moon, Sun, Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRole, type Role } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import { notifications } from '@/data/mockData';

const roleColors: Record<Role, string> = {
  'Job Seeker': 'text-primary-600',
  Employer: 'text-accent-600',
  Admin: 'text-danger-600',
};

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { role, setRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: 'Jobs', path: '/jobs' },
    { label: 'Companies', path: '/companies' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setRoleOpen(false);
    if (r === 'Job Seeker') navigate('/dashboard');
    else if (r === 'Employer') navigate('/employer');
    else navigate('/admin');
  };

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-slate-200/60 dark:border-slate-800/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-soft">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">HireHub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition',
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Role switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <span className={cn('font-semibold', roleColors[role])}>{role}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              <AnimatePresence>
                {roleOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setRoleOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-48 z-20 card p-1.5 shadow-soft-lg"
                    >
                      {(['Job Seeker', 'Employer', 'Admin'] as Role[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => handleRoleChange(r)}
                          className={cn(
                            'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition',
                            role === r ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                          )}
                        >
                          {r === 'Job Seeker' && <User className="w-4 h-4" />}
                          {r === 'Employer' && <Building2 className="w-4 h-4" />}
                          {r === 'Admin' && <Settings className="w-4 h-4" />}
                          {r}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 z-20 card shadow-soft-lg max-h-96 overflow-y-auto"
                    >
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <span className="font-semibold text-sm">Notifications</span>
                        <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      {notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            'px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer',
                            !n.read && 'bg-primary-50/40 dark:bg-primary-900/10'
                          )}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{n.title}</p>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Link to="/notifications" onClick={() => setNotifOpen(false)} className="block py-2.5 text-center text-sm text-primary-600 font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        View all notifications
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button onClick={toggle} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-1.5 pl-1">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=entropy&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-56 z-20 card p-1.5 shadow-soft-lg"
                    >
                      <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                        <p className="text-sm font-semibold">Jessica Williams</p>
                        <p className="text-xs text-slate-500">jessica.williams@email.com</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <div className="border-t border-slate-200 dark:border-slate-800 mt-1 pt-1">
                        <Link to="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-soft-lg md:hidden p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-3 py-2.5 rounded-md text-sm font-medium transition',
                      isActive(link.path) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="px-3 text-xs font-semibold text-slate-400 uppercase mb-2">Switch Role</p>
                  {(['Job Seeker', 'Employer', 'Admin'] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => { handleRoleChange(r); setMobileOpen(false); }}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm transition',
                        role === r ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      )}
                    >
                      {r === 'Job Seeker' && <User className="w-4 h-4" />}
                      {r === 'Employer' && <Building2 className="w-4 h-4" />}
                      {r === 'Admin' && <Settings className="w-4 h-4" />}
                      {r}
                    </button>
                  ))}
                </div>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition mt-3">
                  Sign Out
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
