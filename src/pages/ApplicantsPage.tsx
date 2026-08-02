import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, Users, MessageSquare, BarChart3, Settings, Calendar,
  Search, Star, Mail, Download, MapPin, GraduationCap, Briefcase as BriefcaseIcon, Check, X, CalendarPlus, MessageCircle,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { applicants, employerStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

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

export function ApplicantsPage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [scheduleOpen, setScheduleOpen] = useState<string | null>(null);
  const [applicantsState, setApplicantsState] = useState(applicants);

  const filtered = applicantsState.filter((a) => {
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (id: string, action: 'accept' | 'reject' | 'shortlist') => {
    setApplicantsState((prev) => prev.map((a) => a.id === id ? { ...a, status: action === 'accept' ? 'Accepted' : action === 'reject' ? 'Rejected' : 'Shortlisted' } : a));
    toast(`Applicant ${action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'shortlisted'}!`, action === 'reject' ? 'info' : 'success');
  };

  return (
    <DashboardLayout navItems={navItems} title="Applicants" subtitle="Review and manage job applicants" role={role}>
      {/* Toolbar */}
      <div className="card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 rounded-md border border-stone-200 dark:border-stone-700">
            <Search className="w-4 h-4 text-stone-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or skill..." className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['All', 'Pending', 'Shortlisted', 'Accepted', 'Rejected'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={cn('px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition', statusFilter === s ? 'bg-primary-600 text-white' : 'border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800')}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-stone-500 mb-4">{filtered.length} applicant{filtered.length !== 1 ? 's' : ''}</p>

      {/* Applicant cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((app, i) => (
          <motion.div key={app.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5">
            <div className="flex items-start gap-3">
              <img src={app.avatar} alt={app.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {app.location}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400">
                      <Star className="w-3 h-3 fill-success-500 text-success-500" />
                      <span className="text-xs font-semibold">{app.match}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><BriefcaseIcon className="w-3 h-3" /> {app.experience}</span>
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {app.education.split(',')[0]}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {app.skills.slice(0, 5).map((s) => (
                <Badge key={s} variant="secondary" className="text-[11px]">{s}</Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/50">
              <div className="flex items-center gap-1.5">
                <StatusBadge status={app.status} />
                <span className="text-xs text-stone-400">Applied {app.appliedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => toast(`Resume download started for ${app.name}`, 'success')} className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition" title="Download Resume"><Download className="w-4 h-4 text-stone-500" /></button>
                <button onClick={() => toast(`Message sent to ${app.name}`, 'success')} className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition" title="Message"><MessageCircle className="w-4 h-4 text-stone-500" /></button>
                <button onClick={() => toast(`Email sent to ${app.name}`, 'success')} className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition" title="Email"><Mail className="w-4 h-4 text-stone-500" /></button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button onClick={() => handleAction(app.id, 'accept')} className="btn bg-success-600 hover:bg-success-700 text-white text-xs px-3 py-2 rounded-md"><Check className="w-3.5 h-3.5" /> Accept</button>
              <button onClick={() => setScheduleOpen(app.id)} className="btn bg-primary-600 hover:bg-primary-700 text-white text-xs px-3 py-2 rounded-md"><CalendarPlus className="w-3.5 h-3.5" /> Schedule</button>
              <button onClick={() => handleAction(app.id, 'reject')} className="btn bg-danger-50 dark:bg-danger-900/20 hover:bg-danger-100 dark:hover:bg-danger-900/40 text-danger-600 text-xs px-3 py-2 rounded-md"><X className="w-3.5 h-3.5" /> Reject</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule interview modal */}
      <Modal open={scheduleOpen !== null} onClose={() => setScheduleOpen(null)} title="Schedule Interview">
        <form onSubmit={(e) => { e.preventDefault(); toast('Interview scheduled! The candidate will be notified.', 'success'); setScheduleOpen(null); }} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Candidate</label>
            <div className="flex items-center gap-2 p-2.5 rounded-md bg-stone-50 dark:bg-stone-800/50">
              {(() => {
                const a = applicants.find((x) => x.id === scheduleOpen);
                return a ? <><img src={a.avatar} alt="" className="w-8 h-8 rounded-full" /><span className="text-sm font-medium">{a.name}</span></> : null;
              })()}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Date</label>
              <input type="date" required className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Time</label>
              <input type="time" required className="input-base" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Interview Type</label>
            <select className="input-base">
              <option>Video Call</option>
              <option>Phone Screen</option>
              <option>On-site</option>
              <option>Technical Assessment</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Notes (Optional)</label>
            <textarea rows={2} placeholder="Add any notes for the candidate..." className="input-base resize-none" />
          </div>
          <button type="submit" className="btn-primary w-full"><CalendarPlus className="w-4 h-4" /> Schedule Interview</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
