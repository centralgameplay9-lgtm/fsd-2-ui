import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings as SettingsIcon,
  Moon, Sun, Globe, Lock, Bell as BellIcon, Shield, Trash2, Check,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { jobSeekerStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Profile', path: '/profile', icon: User },
  { label: 'Resume', path: '/resume', icon: FileText },
  { label: 'Applications', path: '/applications', icon: Briefcase, badge: jobSeekerStats.applications },
  { label: 'Saved Jobs', path: '/saved-jobs', icon: Bookmark, badge: jobSeekerStats.saved },
  { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
  { label: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
  { label: 'Settings', path: '/settings', icon: SettingsIcon },
];

const sections = [
  { id: 'appearance', label: 'Appearance', icon: Sun },
  { id: 'notifications', label: 'Notifications', icon: BellIcon },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'delete', label: 'Delete Account', icon: Trash2 },
];

export function SettingsPage() {
  const { role } = useRole();
  const { theme, toggle } = useTheme();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('appearance');
  const [notifPrefs, setNotifPrefs] = useState({ email: true, push: true, applications: true, messages: true, interviews: true, marketing: false });
  const [deleteOpen, setDeleteOpen] = useState(false);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={cn('relative w-11 h-6 rounded-full transition', checked ? 'bg-primary-600' : 'bg-stone-300 dark:bg-stone-700')}>
      <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition', checked ? 'left-5.5' : 'left-0.5')} style={{ left: checked ? '22px' : '2px' }} />
    </button>
  );

  return (
    <DashboardLayout navItems={navItems} title="Settings" subtitle="Manage your account preferences" role={role}>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Section nav */}
        <div className="lg:col-span-1">
          <div className="card p-2 sticky top-20">
            {sections.map((s) => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition', activeSection === s.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300')}>
                <s.icon className={cn('w-4 h-4', s.id === 'delete' && 'text-danger-500')} />
                <span className={cn(s.id === 'delete' && 'text-danger-600')}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'appearance' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h3 className="font-semibold mb-4">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-md border border-stone-200 dark:border-stone-800">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-xs text-stone-500 mt-0.5">Switch between light and dark themes</p>
                  </div>
                  <Toggle checked={theme === 'dark'} onChange={toggle} />
                </div>
                <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800">
                  <p className="text-sm font-medium mb-3">Accent Color</p>
                  <div className="flex gap-2">
                    {['bg-primary-600', 'bg-accent-500', 'bg-success-500', 'bg-warning-500', 'bg-danger-500'].map((c, i) => (
                      <button key={i} className={cn('w-8 h-8 rounded-full', c, i === 0 && 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-stone-900')} onClick={() => toast('Accent color updated (demo)', 'success')} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h3 className="font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                  { key: 'applications', label: 'Application Updates', desc: 'When your application status changes' },
                  { key: 'messages', label: 'New Messages', desc: 'When you receive a new message' },
                  { key: 'interviews', label: 'Interview Reminders', desc: 'Reminders for upcoming interviews' },
                  { key: 'marketing', label: 'Marketing Emails', desc: 'Tips, news, and product updates' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-md border border-stone-200 dark:border-stone-800">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={notifPrefs[item.key as keyof typeof notifPrefs]} onChange={() => { setNotifPrefs((p) => ({ ...p, [item.key]: !p[item.key as keyof typeof notifPrefs] })); toast('Preference updated', 'success'); }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'privacy' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h3 className="font-semibold mb-4">Privacy</h3>
              <div className="space-y-3">
                {[
                  { label: 'Public Profile', desc: 'Make your profile visible to employers' },
                  { label: 'Show Online Status', desc: 'Let others see when you are online' },
                  { label: 'Profile Indexed by Search Engines', desc: 'Allow search engines to index your profile' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-md border border-stone-200 dark:border-stone-800">
                    <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-stone-500 mt-0.5">{item.desc}</p></div>
                    <Toggle checked onChange={() => toast('Privacy setting updated', 'success')} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h3 className="font-semibold mb-4">Security</h3>
              <form onSubmit={(e) => { e.preventDefault(); toast('Password updated successfully!', 'success'); }} className="space-y-4">
                <div><label className="text-sm font-medium mb-1.5 block">Current Password</label><input type="password" required className="input-base" /></div>
                <div><label className="text-sm font-medium mb-1.5 block">New Password</label><input type="password" required className="input-base" /></div>
                <div><label className="text-sm font-medium mb-1.5 block">Confirm New Password</label><input type="password" required className="input-base" /></div>
                <button type="submit" className="btn-primary"><Lock className="w-4 h-4" /> Update Password</button>
              </form>
              <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-stone-500 mt-0.5">Add an extra layer of security</p></div>
                  <Toggle checked={false} onChange={() => toast('2FA enabled (demo)', 'success')} />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'language' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h3 className="font-semibold mb-4">Language & Region</h3>
              <div className="space-y-4">
                <div><label className="text-sm font-medium mb-1.5 block">Language</label><select className="input-base" onChange={() => toast('Language updated', 'success')}><option>English (US)</option><option>Spanish</option><option>French</option><option>German</option><option>Chinese</option><option>Japanese</option></select></div>
                <div><label className="text-sm font-medium mb-1.5 block">Timezone</label><select className="input-base" onChange={() => toast('Timezone updated', 'success')}><option>Pacific Time (PT)</option><option>Mountain Time (MT)</option><option>Central Time (CT)</option><option>Eastern Time (ET)</option><option>UTC</option></select></div>
              </div>
            </motion.div>
          )}

          {activeSection === 'delete' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6 border-danger-200 dark:border-danger-900">
              <h3 className="font-semibold text-danger-600 mb-4">Delete Account</h3>
              <div className="p-4 rounded-md bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-900">
                <p className="text-sm text-danger-700 dark:text-danger-300">Warning: This action is permanent and cannot be undone. All your data, applications, and saved jobs will be permanently deleted.</p>
              </div>
              <button onClick={() => { setDeleteOpen(true); }} className="mt-4 btn bg-danger-600 hover:bg-danger-700 text-white px-5 py-2.5 rounded-lg"><Trash2 className="w-4 h-4" /> Delete My Account</button>
              {deleteOpen && (
                <div className="mt-4 p-4 rounded-md border border-danger-200 dark:border-danger-900">
                  <p className="text-sm font-medium mb-2">Type "DELETE" to confirm:</p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="DELETE" className="input-base flex-1" />
                    <button onClick={() => { toast('Account deleted (demo)', 'error'); setDeleteOpen(false); }} className="btn bg-danger-600 hover:bg-danger-700 text-white px-5 py-2.5 rounded-lg">Confirm</button>
                    <button onClick={() => setDeleteOpen(false)} className="btn-outline">Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
