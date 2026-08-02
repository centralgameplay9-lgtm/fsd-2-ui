import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings,
  TrendingUp, Eye, Send, CheckCircle2, Clock, MapPin, Calendar, ArrowRight, Award,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useRole } from '@/context/RoleContext';
import {
  jobSeekerStats, applicationTimeline, upcomingInterviews, jobs, companies,
} from '@/data/mockData';
import { Link } from 'react-router-dom';

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

export function JobSeekerDashboard() {
  const { role } = useRole();
  const recommendedJobs = jobs.slice(0, 3);

  const statCards = [
    { label: 'Applications', value: jobSeekerStats.applications, icon: Send, color: 'primary', change: '+12% this month' },
    { label: 'Saved Jobs', value: jobSeekerStats.saved, icon: Bookmark, color: 'accent', change: '+3 this week' },
    { label: 'Interviews', value: jobSeekerStats.interviews, icon: Calendar, color: 'warning', change: '1 upcoming' },
    { label: 'Profile Views', value: jobSeekerStats.profileViews, icon: Eye, color: 'success', change: '+24% this week' },
  ];

  return (
    <DashboardLayout navItems={navItems} title="Dashboard" subtitle="Welcome back, Jessica!" role={role}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-display font-semibold">{stat.value}</p>
            <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
            <p className="text-xs text-success-600 mt-1.5 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Profile completion + Quick stats */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Profile Completion</h3>
            <span className="text-2xl font-bold gradient-text">{jobSeekerStats.profileCompletion}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${jobSeekerStats.profileCompletion}%` }} transition={{ delay: 0.3, duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-500" />
          </div>
          <p className="text-xs text-stone-500 mt-2">Add your portfolio and certifications to reach 100% and increase visibility to employers.</p>
          <Link to="/profile" className="btn-secondary text-xs px-4 py-2 mt-3">Complete Profile <ArrowRight className="w-3.5 h-3.5" /></Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-5">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/jobs" className="flex items-center justify-between p-2.5 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition group">
              <span className="text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary-500" /> Browse Jobs</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/resume" className="flex items-center justify-between p-2.5 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition group">
              <span className="text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-accent-500" /> Upload Resume</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/profile" className="flex items-center justify-between p-2.5 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition group">
              <span className="text-sm flex items-center gap-2"><User className="w-4 h-4 text-success-500" /> Edit Profile</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Application timeline + Upcoming interviews */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Application Timeline</h3>
            <Link to="/applications" className="text-xs text-primary-600 font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {applicationTimeline.map((item, i) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0', item.status === 'Rejected' ? 'bg-danger-100 dark:bg-danger-900/30 text-danger-600' : item.status === 'Offer' ? 'bg-success-100 dark:bg-success-900/30 text-success-600' : item.status === 'Shortlisted' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'bg-stone-100 dark:bg-stone-800 text-stone-500')}>
                    {item.status === 'Rejected' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  {i < applicationTimeline.length - 1 && <div className="w-px h-8 bg-stone-200 dark:bg-stone-800 mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{item.jobTitle}</p>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{item.company} · {item.step}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Upcoming Interviews</h3>
            <Badge variant="warning">{upcomingInterviews.length} scheduled</Badge>
          </div>
          <div className="space-y-3">
            {upcomingInterviews.map((iv) => (
              <div key={iv.id} className="flex items-start gap-3 p-3 rounded-md bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase">{iv.date.toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-sm font-bold leading-none">{iv.date.getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{iv.jobTitle}</p>
                  <p className="text-xs text-stone-500">{iv.company}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {iv.time}</span>
                    <span className="flex items-center gap-1">{iv.mode === 'Video Call' ? '🎥' : '📍'} {iv.mode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommended jobs */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Recommended for You</h3>
            <p className="text-xs text-stone-500 mt-0.5">Based on your profile and applications</p>
          </div>
          <Link to="/jobs" className="text-xs text-primary-600 font-medium hover:underline">Browse all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recommendedJobs.map((job) => {
            const company = companies.find((c) => c.id === job.companyId);
            return (
              <Link key={job.id} to={`/jobs/${job.id}`} className="p-3 rounded-md border border-stone-200 dark:border-stone-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-soft transition group">
                <div className="flex items-start gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
                    {company?.logo && <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary-600 transition line-clamp-1">{job.title}</p>
                    <p className="text-xs text-stone-500">{company?.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-stone-100 dark:border-stone-800/50">
                  <span className="text-xs text-success-600 font-medium">${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k</span>
                  <Badge variant={job.workMode === 'Remote' ? 'success' : 'secondary'} className="text-[10px]">{job.workMode}</Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
