import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText, Flag, BarChart3, Settings,
  TrendingUp, TrendingDown, DollarSign, ArrowRight, Activity,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { useRole } from '@/context/RoleContext';
import {
  userGrowthData, topCategoriesData, adminUsers, adminReports, jobs, companies,
} from '@/data/mockData';
import { formatDate, cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const navItems: NavItem[] = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Employers', path: '/admin/employers', icon: Building2 },
  { label: 'Jobs', path: '/admin/jobs', icon: Briefcase },
  { label: 'Applications', path: '/admin/applications', icon: FileText },
  { label: 'Reports', path: '/admin/reports', icon: Flag, badge: 2 },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function AdminDashboard() {
  const { role } = useRole();

  const statCards = [
    { label: 'Total Users', value: '850K+', icon: Users, color: 'primary', change: '+12%', trend: 'up' },
    { label: 'Active Employers', value: '3,200', icon: Building2, color: 'accent', change: '+8%', trend: 'up' },
    { label: 'Total Jobs', value: '12,500', icon: Briefcase, color: 'success', change: '+5%', trend: 'up' },
    { label: 'Revenue (MTD)', value: '$48.2K', icon: DollarSign, color: 'warning', change: '-3%', trend: 'down' },
  ];

  const maxUsers = Math.max(...userGrowthData.map((d) => d.users));

  return (
    <DashboardLayout navItems={navItems} title="Admin Overview" subtitle="Platform analytics and management" role={role}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn('flex items-center gap-0.5 text-xs font-medium', stat.trend === 'up' ? 'text-success-600' : 'text-danger-600')}>
                {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        {/* User growth chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">User Growth</h3>
              <p className="text-xs text-slate-500 mt-0.5">Monthly active users vs employers</p>
            </div>
            <Badge variant="success"><TrendingUp className="w-3 h-3" /> Growing</Badge>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {userGrowthData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end justify-center gap-0.5 h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.users / maxUsers) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="w-3 rounded-t bg-primary-500 hover:bg-primary-600 transition cursor-pointer relative group"
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">{d.users}</span>
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.employers / maxUsers) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    className="w-3 rounded-t bg-accent-500 hover:bg-accent-600 transition cursor-pointer relative group"
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition whitespace-nowrap">{d.employers}</span>
                  </motion.div>
                </div>
                <span className="text-[10px] text-slate-500">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/50">
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-primary-500" /> Users</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded bg-accent-500" /> Employers</span>
          </div>
        </motion.div>

        {/* Top categories */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-5">
          <h3 className="font-semibold mb-5">Top Categories</h3>
          <div className="space-y-3">
            {topCategoriesData.map((cat, i) => {
              const max = Math.max(...topCategoriesData.map((c) => c.value));
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{cat.name}</span>
                    <span className="text-xs text-slate-500">{cat.value} jobs</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(cat.value / max) * 100}%` }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }} className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent registrations + Reports */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Registrations</h3>
            <Link to="/admin/users" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {adminUsers.slice(0, 5).map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant={u.role === 'Employer' ? 'primary' : 'secondary'} className="text-[10px]">{u.role}</Badge>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(u.joined)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Reports</h3>
            <Link to="/admin/reports" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {adminReports.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-md border border-slate-200 dark:border-slate-800">
                <div className={cn('w-8 h-8 rounded-md flex items-center justify-center shrink-0', r.status === 'Pending' ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-600' : 'bg-success-100 dark:bg-success-900/30 text-success-600')}>
                  <Flag className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.target}</p>
                  <p className="text-xs text-slate-500">by {r.reporter} · {r.reason}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
