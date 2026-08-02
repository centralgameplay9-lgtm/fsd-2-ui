import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings,
  UploadCloud, FileText as FileIcon, Download, Eye, Trash2, CheckCircle2, File,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { useRole } from '@/context/RoleContext';
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
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function ResumePage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [dragging, setDragging] = useState(false);
  const [resume, setResume] = useState<{ name: string; size: string; date: string } | null>({
    name: 'Jessica_Williams_Resume.pdf',
    size: '248 KB',
    date: 'Jul 28, 2026',
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setResume({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
    toast('Resume uploaded successfully!', 'success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <DashboardLayout navItems={navItems} title="Resume Management" subtitle="Upload and manage your resumes" role={role}>
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Upload area */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Upload Resume</h3>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition',
              dragging ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20' : 'border-stone-300 dark:border-stone-700 hover:border-primary-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            )}
          >
            <motion.div animate={dragging ? { scale: 1.1 } : { scale: 1 }} className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8" />
            </motion.div>
            <p className="text-sm font-medium">{dragging ? 'Drop your file here' : 'Drag & drop your resume here'}</p>
            <p className="text-xs text-stone-500 mt-1">or click to browse · PDF, DOCX, DOC (max 5MB)</p>
            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Current resume */}
          {resume && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold mb-3">Current Resume</h4>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50">
                <div className="w-12 h-12 rounded-lg bg-danger-100 dark:bg-danger-900/30 text-danger-600 flex items-center justify-center shrink-0">
                  <FileIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{resume.name}</p>
                  <p className="text-xs text-stone-500">{resume.size} · Uploaded {resume.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPreviewOpen(true)} className="p-2 rounded-md hover:bg-white dark:hover:bg-stone-700 transition" title="Preview"><Eye className="w-4 h-4 text-stone-500" /></button>
                  <button onClick={() => toast('Resume downloaded!', 'success')} className="p-2 rounded-md hover:bg-white dark:hover:bg-stone-700 transition" title="Download"><Download className="w-4 h-4 text-stone-500" /></button>
                  <button onClick={() => { setResume(null); toast('Resume deleted', 'info'); }} className="p-2 rounded-md hover:bg-white dark:hover:bg-stone-700 transition" title="Delete"><Trash2 className="w-4 h-4 text-danger-500" /></button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tips */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
          <h3 className="font-semibold mb-4">Resume Tips</h3>
          <div className="space-y-3">
            {[
              'Use a clean, professional format with clear section headers',
              'Quantify your achievements with metrics and numbers',
              'Tailor your resume for each job application',
              'Keep it to 1-2 pages maximum',
              'Use keywords from the job description',
              'Proofread for typos and grammatical errors',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                <p className="text-xs text-stone-600 dark:text-stone-300">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Previous versions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5 mt-4">
        <h3 className="font-semibold mb-4">Resume History</h3>
        <div className="space-y-2">
          {[
            { name: 'Jessica_Williams_Resume_v2.pdf', date: 'Jul 28, 2026', size: '248 KB', current: true },
            { name: 'Jessica_Williams_Resume_v1.pdf', date: 'Jun 15, 2026', size: '232 KB', current: false },
            { name: 'Jessica_Williams_Resume_2025.pdf', date: 'Dec 10, 2025', size: '198 KB', current: false },
          ].map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-md border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition">
              <File className="w-5 h-5 text-danger-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-stone-500">{file.size} · {file.date}</p>
              </div>
              {file.current && <span className="badge bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300 text-[11px]">Current</span>}
              <button className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-700 transition"><Download className="w-4 h-4 text-stone-500" /></button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preview modal */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Resume Preview" className="max-w-2xl">
        <div className="aspect-[8.5/11] rounded-md bg-white border border-stone-200 dark:border-stone-800 p-8 overflow-y-auto max-h-[70vh]">
          <div className="text-center pb-4 border-b-2 border-primary-600">
            <h2 className="text-2xl font-display font-medium text-stone-900">Jessica Williams</h2>
            <p className="text-sm text-stone-600 mt-1">Senior Frontend Engineer</p>
            <p className="text-xs text-stone-500 mt-2">San Francisco, CA · jessica.williams@email.com · jessicawilliams.dev</p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-2">Summary</h3>
            <p className="text-xs text-stone-600 leading-relaxed">Frontend engineer with 6 years of experience building delightful, accessible web applications. Passionate about design systems, performance, and developer experience.</p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-2">Experience</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-stone-900">Frontend Engineer · Google</p>
                <p className="text-xs text-stone-500">2021 - Present</p>
                <p className="text-xs text-stone-600 mt-1">Building internal tools used by 10k+ Googlers. Led migration to React 18.</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">Frontend Engineer · Airbnb</p>
                <p className="text-xs text-stone-500">2018 - 2021</p>
                <p className="text-xs text-stone-600 mt-1">Developed booking flows and host dashboard features.</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-2">Education</h3>
            <p className="text-xs font-semibold text-stone-900">M.S. Computer Science, Stanford University</p>
            <p className="text-xs text-stone-500">2018</p>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wide mb-2">Skills</h3>
            <p className="text-xs text-stone-600">React, TypeScript, Next.js, Tailwind CSS, GraphQL, Framer Motion, Accessibility, Design Systems</p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
