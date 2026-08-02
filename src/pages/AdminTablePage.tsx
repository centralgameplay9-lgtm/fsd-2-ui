import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText, Flag, BarChart3, Settings,
  Search, Download, Trash2, Pencil, Eye, Ban, CheckCircle2, ChevronDown, Plus,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Pagination, EmptyState } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { adminUsers, adminReports, jobs, companies, categories } from '@/data/mockData';
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

type TableType = 'users' | 'employers' | 'jobs' | 'applications' | 'categories' | 'reports';

interface AdminTablePageProps {
  type: TableType;
}

export function AdminTablePage({ type }: AdminTablePageProps) {
  const { role } = useRole();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const config = useMemo(() => {
    switch (type) {
      case 'users':
        return {
          title: 'Users', subtitle: 'Manage all platform users',
          data: adminUsers.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status, date: u.joined, avatar: u.avatar })),
          columns: ['User', 'Role', 'Status', 'Joined', 'Actions'] as string[],
        };
      case 'employers':
        return {
          title: 'Employers', subtitle: 'Manage employer accounts',
          data: adminUsers.filter((u) => u.role === 'Employer').map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status, date: u.joined, avatar: u.avatar })),
          columns: ['Employer', 'Status', 'Joined', 'Actions'] as string[],
        };
      case 'jobs':
        return {
          title: 'Jobs', subtitle: 'Manage all job postings',
          data: jobs.map((j) => ({ id: j.id, name: j.title, email: companies.find((c) => c.id === j.companyId)?.name || '', role: j.category, status: j.status, date: j.postedAt, avatar: companies.find((c) => c.id === j.companyId)?.logo })),
          columns: ['Job', 'Company', 'Category', 'Status', 'Posted', 'Actions'] as string[],
        };
      case 'applications':
        return {
          title: 'Applications', subtitle: 'View all job applications',
          data: jobs.flatMap((j) => Array.from({ length: Math.min(j.applicants, 3) }, (_, i) => ({ id: `${j.id}-a${i}`, name: `Applicant ${i + 1}`, email: `applicant${i + 1}@email.com`, role: j.title, status: i === 0 ? 'Accepted' : i === 1 ? 'Pending' : 'Rejected', date: j.postedAt, avatar: '' }))),
          columns: ['Applicant', 'Position', 'Status', 'Date', 'Actions'] as string[],
        };
      case 'categories':
        return {
          title: 'Categories', subtitle: 'Manage job categories',
          data: categories.map((c) => ({ id: c.name, name: c.name, email: '', role: `${c.count} jobs`, status: 'Active', date: new Date(), avatar: '' })),
          columns: ['Category', 'Jobs', 'Status', 'Actions'] as string[],
        };
      case 'reports':
        return {
          title: 'Reports', subtitle: 'Handle user reports',
          data: adminReports.map((r) => ({ id: r.id, name: r.target, email: r.reporter, role: r.reason, status: r.status, date: r.date, avatar: '' })),
          columns: ['Target', 'Reporter', 'Reason', 'Status', 'Date', 'Actions'] as string[],
        };
    }
  }, [type]);

  const filtered = config.data.filter((d) => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()));
  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleSelectAll = () => setSelected(selected.length === paginated.length ? [] : paginated.map((d) => d.id));

  const handleExport = () => {
    toast('CSV exported successfully!', 'success');
  };

  const handleDelete = () => {
    toast(`${selected.length > 0 ? selected.length : 1} item(s) deleted`, 'info');
    setDeleteOpen(false);
    setSelected([]);
  };

  return (
    <DashboardLayout navItems={navItems} title={config.title} subtitle={config.subtitle} role={role}>
      {/* Toolbar */}
      <div className="card p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 rounded-md border border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}...`} className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
          <button onClick={handleExport} className="btn-outline text-sm whitespace-nowrap"><Download className="w-4 h-4" /> Export CSV</button>
          <button onClick={() => toast('Add form would open here', 'info')} className="btn-primary text-sm whitespace-nowrap"><Plus className="w-4 h-4" /> Add New</button>
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
                {config.columns.map((col) => (
                  <th key={col} className={cn('px-4 py-3 text-left font-semibold', (col === 'Date' || col === 'Posted' || col === 'Joined') && 'hidden lg:table-cell', col === 'Actions' && 'text-right')}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((d) => (
                <tr key={d.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(d.id)} onChange={() => toggleSelect(d.id)} className="w-4 h-4 rounded accent-primary-600" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {d.avatar ? <img src={d.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" /> : <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">{d.name.charAt(0)}</div>}
                      <div>
                        <p className="font-medium">{d.name}</p>
                        {d.email && <p className="text-xs text-slate-500">{d.email}</p>}
                      </div>
                    </div>
                  </td>
                  {config.columns.includes('Role') && <td className="px-4 py-3"><Badge variant="secondary" className="text-[11px]">{d.role}</Badge></td>}
                  {config.columns.includes('Company') && <td className="px-4 py-3 text-slate-500">{d.email}</td>}
                  {config.columns.includes('Category') && <td className="px-4 py-3"><Badge variant="outline" className="text-[11px]">{d.role}</Badge></td>}
                  {config.columns.includes('Jobs') && <td className="px-4 py-3 font-medium">{d.role}</td>}
                  {config.columns.includes('Position') && <td className="px-4 py-3 text-slate-500">{d.role}</td>}
                  {config.columns.includes('Reporter') && <td className="px-4 py-3 text-slate-500">{d.email}</td>}
                  {config.columns.includes('Reason') && <td className="px-4 py-3"><Badge variant="warning" className="text-[11px]">{d.role}</Badge></td>}
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  {(config.columns.includes('Date') || config.columns.includes('Posted') || config.columns.includes('Joined')) && <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">{formatDate(d.date)}</td>}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toast('View details', 'info')} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Eye className="w-4 h-4 text-slate-500" /></button>
                      <button onClick={() => toast('Edit form would open', 'info')} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Pencil className="w-4 h-4 text-slate-500" /></button>
                      {d.status === 'Active' || d.status === 'Pending' ? (
                        <button onClick={() => toast('User suspended', 'warning')} className="p-1.5 rounded-md hover:bg-warning-50 dark:hover:bg-warning-900/20 transition"><Ban className="w-4 h-4 text-warning-500" /></button>
                      ) : (
                        <button onClick={() => toast('User activated', 'success')} className="p-1.5 rounded-md hover:bg-success-50 dark:hover:bg-success-900/20 transition"><CheckCircle2 className="w-4 h-4 text-success-500" /></button>
                      )}
                      <button onClick={() => { setSelected([d.id]); setDeleteOpen(true); }} className="p-1.5 rounded-md hover:bg-danger-50 dark:hover:bg-danger-900/20 transition"><Trash2 className="w-4 h-4 text-danger-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <EmptyState icon={<Users className="w-8 h-8" />} title="No results found" description="Try adjusting your search." />}

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Confirm Delete">
        <p className="text-sm text-slate-600 dark:text-slate-300">Are you sure you want to delete the selected item(s)? This action cannot be undone.</p>
        <div className="flex gap-2 mt-6">
          <button onClick={() => setDeleteOpen(false)} className="btn-outline flex-1">Cancel</button>
          <button onClick={handleDelete} className="btn bg-danger-600 hover:bg-danger-700 text-white px-5 py-2.5 rounded-lg flex-1">Delete</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
