import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, ExternalLink } from 'lucide-react';
import { type Job, companies } from '@/data/mockData';
import { formatSalary, timeAgo } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const company = companies.find((c) => c.id === job.companyId);
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((s) => !s);
    toast(saved ? 'Job removed from saved' : 'Job saved to your list', 'success');
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast('Application submitted! The employer will be notified.', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/jobs/${job.id}`} className="block group">
        <div className="card p-5 hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
              {company?.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Briefcase className="w-6 h-6 text-slate-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold group-hover:text-primary-600 transition line-clamp-1">{job.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{company?.name}</p>
                </div>
                <button
                  onClick={handleSave}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                  aria-label="Save job"
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-primary-500 text-primary-500' : 'text-slate-400'}`} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {formatSalary(job.salaryMin, job.salaryMax)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {timeAgo(job.postedAt)}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-[11px]">{skill}</Badge>
                ))}
                {job.skills.length > 4 && <Badge variant="ghost" className="text-[11px]">+{job.skills.length - 4}</Badge>}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                  <Badge variant={job.workMode === 'Remote' ? 'success' : job.workMode === 'Hybrid' ? 'primary' : 'secondary'}>
                    {job.workMode}
                  </Badge>
                  <span className="text-xs text-slate-400">{job.applicants} applicants</span>
                </div>
                <button
                  onClick={handleApply}
                  className="btn-primary text-xs px-4 py-2 group/btn"
                >
                  Apply Now
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
