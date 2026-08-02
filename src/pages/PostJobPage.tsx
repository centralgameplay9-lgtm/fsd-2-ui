import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, Users, MessageSquare, BarChart3, Settings, Calendar,
  Check, ChevronLeft, ChevronRight, Eye, Briefcase as BriefcaseIcon, DollarSign, MapPin, Star, Clock,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { employerStats, categories } from '@/data/mockData';
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

const steps = ['Basic Info', 'Details', 'Requirements', 'Preview'];

export function PostJobPage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '', category: '', description: '', salaryMin: '', salaryMax: '',
    experience: '', location: '', type: 'Full-time', workMode: 'Remote',
    skills: '', deadline: '', benefits: '',
  });

  const update = (key: string, val: string) => setFormData((prev) => ({ ...prev, [key]: val }));

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handlePublish = () => {
    toast('Job posted successfully! It will appear in search results shortly.', 'success');
    setStep(0);
    setPreview(false);
  };

  return (
    <DashboardLayout navItems={navItems} title="Post a Job" subtitle="Create a new job listing" role={role}>
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button onClick={() => i < step && setStep(i)} className="flex items-center gap-2 group">
                <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition', i < step ? 'bg-success-500 text-white' : i === step ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400')}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn('text-sm font-medium hidden sm:block', i === step ? 'text-primary-600' : 'text-slate-400')}>{s}</span>
              </button>
              {i < steps.length - 1 && <div className={cn('flex-1 h-0.5 mx-2 rounded transition', i < step ? 'bg-success-500' : 'bg-slate-200 dark:bg-slate-800')} />}
            </div>
          ))}
        </div>

        <div className="card p-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-lg font-semibold">Basic Information</h2>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Job Title *</label>
                  <input type="text" value={formData.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Senior Frontend Engineer" className="input-base" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Category *</label>
                    <select value={formData.category} onChange={(e) => update('category', e.target.value)} className="input-base">
                      <option value="">Select category</option>
                      {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Job Type</label>
                    <select value={formData.type} onChange={(e) => update('type', e.target.value)} className="input-base">
                      {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Job Description *</label>
                  <textarea rows={5} value={formData.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the role and what the candidate will do..." className="input-base resize-none" />
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-lg font-semibold">Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Minimum Salary ($)</label>
                    <input type="number" value={formData.salaryMin} onChange={(e) => update('salaryMin', e.target.value)} placeholder="80000" className="input-base" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Maximum Salary ($)</label>
                    <input type="number" value={formData.salaryMax} onChange={(e) => update('salaryMax', e.target.value)} placeholder="120000" className="input-base" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Experience Required</label>
                    <input type="text" value={formData.experience} onChange={(e) => update('experience', e.target.value)} placeholder="e.g. 3+ years" className="input-base" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. San Francisco, CA" className="input-base" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Work Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Remote', 'Hybrid', 'On-site'].map((m) => (
                      <button key={m} onClick={() => update('workMode', m)} className={cn('py-2.5 rounded-md text-sm font-medium border transition', formData.workMode === m ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'border-slate-200 dark:border-slate-700 hover:border-primary-300')}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Application Deadline</label>
                  <input type="date" value={formData.deadline} onChange={(e) => update('deadline', e.target.value)} className="input-base" />
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="text-lg font-semibold">Requirements & Benefits</h2>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Required Skills (comma-separated)</label>
                  <input type="text" value={formData.skills} onChange={(e) => update('skills', e.target.value)} placeholder="React, TypeScript, Node.js" className="input-base" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Benefits (comma-separated)</label>
                  <input type="text" value={formData.benefits} onChange={(e) => update('benefits', e.target.value)} placeholder="Health insurance, Equity, Remote work" className="input-base" />
                </div>
                <div className="p-4 rounded-md bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                  <p className="text-sm text-primary-700 dark:text-primary-300">Tip: Be specific about required skills and benefits to attract the best candidates. Jobs with detailed requirements receive 3x more qualified applications.</p>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Preview</h2>
                  <button onClick={() => setPreview(!preview)} className="btn-ghost text-xs"><Eye className="w-4 h-4" /> {preview ? 'Hide' : 'Show'} Preview</button>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shrink-0">
                        <BriefcaseIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{formData.title || 'Job Title'}</h3>
                        <p className="text-sm text-slate-500">Stripe</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {formData.location || 'Location'}</span>
                          <span className="flex items-center gap-1"><BriefcaseIcon className="w-3.5 h-3.5" /> {formData.type}</span>
                          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {formData.salaryMin && formData.salaryMax ? `$${formData.salaryMin}k - $${formData.salaryMax}k` : 'Salary'}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formData.experience || 'Experience'}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">{formData.workMode}</span>
                          {formData.category && <span className="badge bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{formData.category}</span>}
                        </div>
                      </div>
                    </div>
                    {formData.description && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <p className="text-sm text-slate-600 dark:text-slate-300">{formData.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <button onClick={prev} disabled={step === 0} className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            {step < steps.length - 1 ? (
              <button onClick={next} className="btn-primary">Next <ChevronRight className="w-4 h-4" /></button>
            ) : (
              <button onClick={handlePublish} className="btn-primary"><Check className="w-4 h-4" /> Publish Job</button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
