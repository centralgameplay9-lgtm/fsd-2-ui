import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings,
  CheckCircle2, Calendar, Mail, Info, Check, Trash2,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/Badge';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { notifications as initialNotifs, jobSeekerStats } from '@/data/mockData';
import { timeAgo, cn } from '@/lib/utils';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/profile', icon: User },
  { label: 'Resume', path: '/resume', icon: FileText },
  { label: 'Applications', path: '/applications', icon: Briefcase, badge: jobSeekerStats.applications },
  { label: 'Saved Jobs', path: '/saved-jobs', icon: Bookmark, badge: jobSeekerStats.saved },
  { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
  { label: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const typeIcons = {
  application: CheckCircle2,
  interview: Calendar,
  message: Mail,
  system: Info,
};

const typeColors = {
  application: 'bg-success-100 dark:bg-success-900/30 text-success-600',
  interview: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600',
  message: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600',
  system: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600',
};

export function NotificationsPage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? notifs : filter === 'Unread' ? notifs.filter((n) => !n.read) : notifs.filter((n) => n.type === filter.toLowerCase());

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    toast('All notifications marked as read', 'success');
  };

  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id: string) => { setNotifs((prev) => prev.filter((n) => n.id !== id)); toast('Notification deleted', 'info'); };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <DashboardLayout navItems={navItems} title="Notifications" subtitle={`${unreadCount} unread notifications`} role={role}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['All', 'Unread', 'Application', 'Interview', 'Message', 'System'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition', filter === f ? 'bg-primary-600 text-white' : 'border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800')}>{f}</button>
          ))}
        </div>
        <button onClick={markAllRead} className="btn-ghost text-xs whitespace-nowrap"><Check className="w-4 h-4" /> Mark all read</button>
      </div>

      <div className="card divide-y divide-stone-100 dark:divide-stone-800/50">
        {filtered.map((n, i) => {
          const Icon = typeIcons[n.type];
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className={cn('flex items-start gap-3 p-4 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition group', !n.read && 'bg-primary-50/30 dark:bg-primary-900/10')}>
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', typeColors[n.type])}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-sm text-stone-500 mt-0.5">{n.message}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-stone-400">{timeAgo(n.time)}</span>
                  {!n.read && <button onClick={() => markRead(n.id)} className="text-xs text-primary-600 font-medium hover:underline">Mark read</button>}
                  <button onClick={() => remove(n.id)} className="text-xs text-stone-400 hover:text-danger-500 transition flex items-center gap-1 opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-stone-500">No notifications to show.</div>}
      </div>
    </DashboardLayout>
  );
}
