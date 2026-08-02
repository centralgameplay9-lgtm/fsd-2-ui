import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Menu, X, Bell, Moon, Sun, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRole, type Role } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import { notifications } from '@/data/mockData';

export interface NavItem {
  label: string;
  path: string;
  icon: typeof Briefcase;
  badge?: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  title: string;
  subtitle?: string;
  role: Role;
}

export function DashboardLayout({ children, navItems, title, subtitle, role }: DashboardLayoutProps) {
  const { theme, toggle } = useTheme();
  const { setRole } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleRoleChange = (r: Role) => {
    setRole(r);
    if (r === 'Job Seeker') navigate('/dashboard');
    else if (r === 'Employer') navigate('/employer');
    else navigate('/admin');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-semibold tracking-tight">HireHub</span>
        </Link>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 dark:bg-stone-800/50 mb-2">
          <div className="relative">
            <span className={cn('w-2 h-2 rounded-full', role === 'Job Seeker' ? 'bg-primary-500' : role === 'Employer' ? 'bg-accent-500' : 'bg-danger-500')} />
          </div>
          <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">{role} View</span>
        </div>
        <div className="flex gap-1 mb-3">
          {(['Job Seeker', 'Employer', 'Admin'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              className={cn(
                'flex-1 py-1.5 rounded-md text-[11px] font-medium transition',
                role === r ? 'bg-primary-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500'
              )}
            >
              {r === 'Job Seeker' ? 'Seeker' : r}
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition group',
              isActive(item.path)
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            )}
          >
            <item.icon className={cn('w-4.5 h-4.5 shrink-0', isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : 'text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300')} />
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary-600 text-white text-[10px] font-bold">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-stone-200 dark:border-stone-800">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition">
          <LogOut className="w-4.5 h-4.5 text-stone-400" /> Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-stone-900 lg:hidden"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 glass-strong border-b border-stone-200/60 dark:border-stone-800/60">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-display font-medium">{title}</h1>
                {subtitle && <p className="text-xs text-stone-500 hidden sm:block">{subtitle}</p>}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="relative">
                <button onClick={() => setNotifOpen((o) => !o)} className="relative p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger-500 text-white text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>}
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-80 z-20 card shadow-soft-lg max-h-96 overflow-y-auto">
                        <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 font-semibold text-sm">Notifications</div>
                        {notifications.slice(0, 5).map((n) => (
                          <div key={n.id} className={cn('px-4 py-3 border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition cursor-pointer', !n.read && 'bg-primary-50/40 dark:bg-primary-900/10')}>
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={toggle} className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <div className="relative">
                <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-1.5 pl-1">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=entropy&q=80" alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-stone-800" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-48 z-20 card p-1.5 shadow-soft-lg">
                        <div className="px-3 py-2 border-b border-stone-200 dark:border-stone-800 mb-1">
                          <p className="text-sm font-semibold">Jessica Williams</p>
                          <p className="text-xs text-stone-500">{role}</p>
                        </div>
                        <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition"><User className="w-4 h-4" /> Profile</Link>
                        <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition"><Settings className="w-4 h-4" /> Settings</Link>
                        <Link to="/" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition"><LogOut className="w-4 h-4" /> Sign Out</Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
