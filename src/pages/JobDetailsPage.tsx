import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Briefcase, DollarSign, Clock, Building2, Share2, Bookmark, ArrowLeft,
  CheckCircle2, Mail, Phone, Calendar, Users, Globe, Star,
} from 'lucide-react';
import { jobs, companies } from '@/data/mockData';
import { formatSalary, timeAgo, formatDate, cn } from '@/lib/utils';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { JobCard } from '@/components/JobCard';
import { useToast } from '@/context/ToastContext';

export function JobDetailsPage() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id);
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyStep, setApplyStep] = useState<'form' | 'success'>('form');

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-medium">Job not found</h1>
        <Link to="/jobs" className="btn-primary mt-4 inline-flex">Back to Jobs</Link>
      </div>
    );
  }

  const company = companies.find((c) => c.id === job.companyId);
  const similarJobs = jobs.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 3);

  const handleApply = () => {
    setApplyStep('success');
    toast('Application submitted successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-6">
        <Link to="/jobs" className="hover:text-primary-600 transition flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Jobs
        </Link>
        <span>/</span>
        <span className="text-stone-900 dark:text-stone-100 font-medium truncate">{job.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
                {company?.logo && <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-display font-medium">{job.title}</h1>
                    <Link to={`/companies/${company?.id}`} className="text-primary-600 hover:underline text-sm font-medium">{company?.name}</Link>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-stone-500">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {timeAgo(job.postedAt)}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.applicants} applicants</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge variant={job.workMode === 'Remote' ? 'success' : job.workMode === 'Hybrid' ? 'primary' : 'secondary'}>{job.workMode}</Badge>
                  <Badge variant="outline">{job.category}</Badge>
                  <Badge variant="outline">{job.experience}</Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-3">Job Description</h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{job.description}</p>
          </motion.div>

          {/* Responsibilities */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-3">Responsibilities</h2>
            <ul className="space-y-2.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Requirements */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-3">Requirements</h2>
            <ul className="space-y-2.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-3">Benefits</h2>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((b, i) => (
                <Badge key={i} variant="success" className="py-1.5 px-3">{b}</Badge>
              ))}
            </div>
          </motion.div>

          {/* Required Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">{s}</span>
              ))}
            </div>
          </motion.div>

          {/* Recruiter */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
            <h2 className="text-lg font-display font-medium mb-4">Recruiter Details</h2>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold shrink-0">
                {job.recruiter.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{job.recruiter.name}</p>
                <p className="text-xs text-stone-500">{job.recruiter.title}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {job.recruiter.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {job.recruiter.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Apply card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-5 sticky top-20">
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Salary</span>
                <span className="font-semibold text-success-600">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Experience</span>
                <span className="font-semibold">{job.experience}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Location</span>
                <span className="font-semibold">{job.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Job Type</span>
                <span className="font-semibold">{job.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Deadline</span>
                <span className="font-semibold">{formatDate(job.deadline)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button onClick={() => { setApplyOpen(true); setApplyStep('form'); }} className="btn-primary w-full">
                Apply Now
              </button>
              <button onClick={() => { setSaved((s) => !s); toast(saved ? 'Removed from saved' : 'Job saved!', 'success'); }} className={cn('btn-outline w-full', saved && 'border-primary-500 text-primary-600')}>
                <Bookmark className={cn('w-4 h-4', saved && 'fill-primary-500')} /> {saved ? 'Saved' : 'Save Job'}
              </button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast('Link copied to clipboard!', 'success'); }} className="btn-ghost w-full">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </motion.div>

          {/* Company card */}
          {company && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-5">
              <h3 className="font-semibold mb-3">About the Company</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{company.name}</p>
                  <p className="text-xs text-stone-500">{company.industry}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {company.employees} employees</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {company.location}</div>
                <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> {company.website}</div>
                <div className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-warning-500 fill-warning-500" /> {company.rating} rating</div>
              </div>
              <Link to={`/companies/${company.id}`} className="btn-ghost w-full mt-4 text-xs justify-center">
                View Company <Building2 className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}

          {/* Similar jobs */}
          {similarJobs.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-5">
              <h3 className="font-semibold mb-3">Similar Jobs</h3>
              <div className="space-y-3">
                {similarJobs.map((j) => {
                  const c = companies.find((co) => co.id === j.companyId);
                  return (
                    <Link key={j.id} to={`/jobs/${j.id}`} className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
                        {c?.logo && <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium group-hover:text-primary-600 transition line-clamp-1">{j.title}</p>
                        <p className="text-xs text-stone-500">{c?.name} · {j.location}</p>
                        <p className="text-xs text-success-600 font-medium mt-0.5">{formatSalary(j.salaryMin, j.salaryMax)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Apply modal */}
      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title="Apply for this position">
        {applyStep === 'form' ? (
          <form onSubmit={(e) => { e.preventDefault(); handleApply(); }} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input type="text" required defaultValue="Jessica Williams" className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input type="email" required defaultValue="jessica.williams@email.com" className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <input type="tel" defaultValue="+1 (415) 555-0101" className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Resume</label>
              <div className="border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-lg p-4 text-center hover:border-primary-400 transition cursor-pointer">
                <p className="text-sm text-stone-500">Click to upload or drag & drop</p>
                <p className="text-xs text-stone-400 mt-1">PDF, DOCX (max 5MB)</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cover Letter (Optional)</label>
              <textarea rows={3} placeholder="Tell the employer why you're a great fit..." className="input-base resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full">Submit Application</button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold">Application Submitted!</h3>
            <p className="text-sm text-stone-500 mt-2">Your application for {job.title} at {company?.name} has been sent. You'll be notified when there's an update.</p>
            <div className="flex gap-2 mt-6">
              <Link to="/dashboard" className="btn-primary flex-1 justify-center">Track Application</Link>
              <button onClick={() => setApplyOpen(false)} className="btn-outline flex-1">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
