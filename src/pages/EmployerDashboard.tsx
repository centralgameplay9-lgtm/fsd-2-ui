import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, Users, MessageSquare, BarChart3, Settings, Calendar,
  TrendingUp, Eye, Send, CheckCircle2, Clock, ArrowRight, UserCheck, UserX,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { employerStats, jobs, applicants, companies } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { timeAgo, formatSalary } from '@/lib/utils';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/employer', icon: LayoutDashboard },
  { label: 'Company', path: '/employer/company', icon: Building2 },
  { label: 'Post Job', path: '/employer/post-job', icon: PlusCircle },
  { label: 'Manage Jobs', path: '/employer/jobs', icon: Briefcase, badge: employerStats.activeJobs },
  { label: 'Applicants', path: '/employer/applicants', icon: Users, badge: employerStats.totalApplications },
  { label: 'Interviews', path: '/employer/interviews', icon: Calendar, badge: employerStats.interviewsScheduled },
  { label: 'Messages', path: '/messages', icon: MessageSquare, badge: 3 },
  { label: 'Reports', path: '/employer/reports', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function EmployerDashboard() {
  const { role } = useRole();
  const { toast } = useToast();
  const employerJobs = jobs.filter((j) => j.companyId === 'c1').slice(0, 5);
  const recentApplicants = applicants.slice(0, 4);

  const statCards = [
    { label: 'Active Jobs', value: employerStats.activeJobs, icon: Briefcase, color: 'primary', change: '+2 this month' },
    { label: 'Applications', value: employerStats.totalApplications, icon: Send, color: 'accent', change: '+18% this week' },
    { label: 'Shortlisted', value: employerStats.shortlisted, icon: UserCheck, color: 'warning', change: '+5 this week' },
    { label: 'Hired', value: employerStats.hired, icon: CheckCircle2, color: 'success', change: '+1 this month' },
  ];

  const chartData = [
    { day: 'Mon', apps: 12 },
    { day: 'Tue', apps: 19 },
    { day: 'Wed', apps: 15 },
    { day: 'Thu', apps: 22 },
    { day: 'Fri', apps: 28 },
    { day: 'Sat', apps: 8 },
    { day: 'Sun', apps: 5 },
  ];
  const maxApps = Math.max(...chartData.map((d) => d.apps));

  return (
    <DashboardLayout navItems={navItems} title="Employer Dashboard" subtitle="Manage your hiring pipeline" role={role}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-success-600 mt-1.5 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Applications chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Applications This Week</h3>
              <p className="text-xs text-slate-500 mt-0.5">109 total applications received</p>
            </div>
            <Badge variant="success"><TrendingUp className="w-3 h-3" /> +18%</Badge>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {chartData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.apps / maxApps) * 100}%` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 hover:from-primary-700 hover:to-primary-500 transition cursor-pointer relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">{d.apps}</span>
                </motion.div>
                <span className="text-xs text-slate-500">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/employer/post-job" className="flex items-center justify-between p-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition group">
              <span className="text-sm flex items-center gap-2"><PlusCircle className="w-4 h-4 text-primary-500" /> Post a New Job</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/employer/applicants" className="flex items-center justify-between p-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition group">
              <span className="text-sm flex items-center gap-2"><Users className="w-4 h-4 text-accent-500" /> Review Applicants</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/employer/jobs" className="flex items-center justify-between p-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition group">
              <span className="text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-success-500" /> Manage Jobs</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/employer/reports" className="flex items-center justify-between p-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition group">
              <span className="text-sm flex items-center gap-2"><BarChart3 className="w-4 h-4 text-warning-500" /> View Reports</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Active jobs + Recent applicants */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Job Postings</h3>
            <Link to="/employer/jobs" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {employerJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-3 p-3 rounded-md border border-slate-200 dark:border-slate-800 hover:shadow-soft transition">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                  <img src={companies[0].logo} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{job.title}</p>
                  <p className="text-xs text-slate-500">{job.applicants} applicants · {timeAgo(job.postedAt)}</p>
                </div>
                <StatusBadge status={job.status} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Applicants</h3>
            <Link to="/employer/applicants" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentApplicants.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-md border border-slate-200 dark:border-slate-800 hover:shadow-soft transition">
                <img src={app.avatar} alt={app.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{app.name}</p>
                  <p className="text-xs text-slate-500">{app.experience} · {app.match}% match</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toast(`${app.name} shortlisted!`, 'success')} className="p-1.5 rounded-md bg-success-50 dark:bg-success-900/20 text-success-600 hover:bg-success-100 dark:hover:bg-success-900/40 transition"><UserCheck className="w-4 h-4" /></button>
                  <button onClick={() => toast(`${app.name} rejected`, 'info')} className="p-1.5 rounded-md bg-danger-50 dark:bg-danger-900/20 text-danger-600 hover:bg-danger-100 dark:hover:bg-danger-900/40 transition"><UserX className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
