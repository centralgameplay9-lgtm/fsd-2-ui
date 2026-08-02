import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, Users, MessageSquare, BarChart3, Settings, Calendar,
  Search, Trash2, Pencil, Eye, MoreVertical, ChevronDown, ArrowUpDown,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Pagination, EmptyState } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { jobs, companies, employerStats } from '@/data/mockData';
import { formatDate, cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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

type SortKey = 'title' | 'applicants' | 'postedAt';

export function ManageJobsPage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('postedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || j.status === statusFilter;
      return matchSearch && matchStatus;
    });
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortKey === 'applicants') cmp = a.applicants - b.applicants;
      else cmp = a.postedAt.getTime() - b.postedAt.getTime();
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, statusFilter, sortKey, sortDir]);

  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleSelectAll = () => setSelected(selected.length === paginated.length ? [] : paginated.map((j) => j.id));

  const handleDelete = () => {
    if (deleteTarget) toast('Job deleted successfully', 'info');
    else if (selected.length > 0) toast(`${selected.length} job(s) deleted`, 'info');
    setDeleteOpen(false);
    setDeleteTarget(null);
    setSelected([]);
  };

  return (
    <DashboardLayout navItems={navItems} title="Manage Jobs" subtitle="View and manage your job postings" role={role}>
      {/* Toolbar */}
      <div className="card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 rounded-md border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs..." className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="appearance-none rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-3 pr-8 py-2 text-sm outline-none cursor-pointer">
              <option>All</option>
              <option>Active</option>
              <option>Closed</option>
              <option>Draft</option>
              <option>Expired</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <Link to="/employer/post-job" className="btn-primary text-sm whitespace-nowrap"><PlusCircle className="w-4 h-4" /> Post Job</Link>
        </div>

        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-sm text-slate-600 dark:text-slate-300">{selected.length} selected</span>
            <button onClick={() => setDeleteOpen(true)} className="btn text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 px-3 py-1.5"><Trash2 className="w-4 h-4" /> Delete Selected</button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-4 py-3 text-left w-10">
                  <input type="checkbox" checked={selected.length === paginated.length && paginated.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-primary-600" />
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  <button onClick={() => toggleSort('title')} className="flex items-center gap-1 hover:text-primary-600 transition">
                    Title <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Location</th>
                <th className="px-4 py-3 text-left font-semibold">
                  <button onClick={() => toggleSort('applicants')} className="flex items-center gap-1 hover:text-primary-600 transition">
                    Applicants <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">
                  <button onClick={() => toggleSort('postedAt')} className="flex items-center gap-1 hover:text-primary-600 transition">
                    Posted <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((job) => {
                const company = companies.find((c) => c.id === job.companyId);
                return (
                  <tr key={job.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(job.id)} onChange={() => toggleSelect(job.id)} className="w-4 h-4 rounded accent-primary-600" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                          {company?.logo && <img src={company.logo} alt="" className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-xs text-slate-500">{company?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{job.location}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{job.applicants}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><StatusBadge status={job.status} /></td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{formatDate(job.postedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/jobs/${job.id}`} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Eye className="w-4 h-4 text-slate-500" /></Link>
                        <Link to="/employer/post-job" className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Pencil className="w-4 h-4 text-slate-500" /></Link>
                        <button onClick={() => { setDeleteTarget(job.id); setDeleteOpen(true); }} className="p-1.5 rounded-md hover:bg-danger-50 dark:hover:bg-danger-900/20 transition"><Trash2 className="w-4 h-4 text-danger-500" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No jobs found" description="Try adjusting your search or filters." action={<Link to="/employer/post-job" className="btn-primary">Post a Job</Link>} />
        )}

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Job?">
        <p className="text-sm text-slate-600 dark:text-slate-300">Are you sure you want to delete this job posting? This action cannot be undone. All applicant data associated with this job will also be removed.</p>
        <div className="flex gap-2 mt-6">
          <button onClick={() => setDeleteOpen(false)} className="btn-outline flex-1">Cancel</button>
          <button onClick={handleDelete} className="btn bg-danger-600 hover:bg-danger-700 text-white px-5 py-2.5 rounded-lg flex-1">Delete</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
