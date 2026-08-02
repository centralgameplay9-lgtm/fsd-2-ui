import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, Users, Star, Building2, Calendar, ArrowRight, Briefcase } from 'lucide-react';
import { companies, jobs } from '@/data/mockData';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JobCard } from '@/components/JobCard';
import { Badge } from '@/components/ui/Badge';
import { formatSalary, cn } from '@/lib/utils';

export function CompanyPage() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id) || companies[0];
  const companyJobs = jobs.filter((j) => j.companyId === company.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Cover */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden mb-6">
            <div className="h-48 sm:h-64 relative">
              <img src={company.cover} alt={company.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
                <div className="w-24 h-24 rounded-lg bg-white dark:bg-slate-900 p-1 shadow-soft-lg shrink-0">
                  <img src={company.logo} alt={company.name} className="w-full h-full rounded-md object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <h1 className="text-2xl font-bold">{company.name}</h1>
                  <p className="text-sm text-slate-500">{company.industry}</p>
                </div>
                <div className="flex gap-2">
                  <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm"><Globe className="w-4 h-4" /> Website</a>
                  <Link to="/jobs" className="btn-primary text-sm">View Jobs <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-slate-400" /> {company.employees}</div>
                <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-slate-400" /> {company.location}</div>
                <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-slate-400" /> Founded {company.founded}</div>
                <div className="flex items-center gap-2 text-sm"><Star className="w-4 h-4 text-warning-500 fill-warning-500" /> {company.rating} rating</div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-6">
                <h2 className="text-lg font-semibold mb-3">About {company.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{company.about}</p>
              </motion.div>

              {/* Open jobs */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Open Positions</h2>
                  <Badge variant="primary">{companyJobs.length} jobs</Badge>
                </div>
                <div className="space-y-4">
                  {companyJobs.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                  {companyJobs.length === 0 && <p className="text-sm text-slate-500">No open positions at this time.</p>}
                </div>
              </motion.div>

              {/* Gallery */}
              {company.gallery.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
                  <h2 className="text-lg font-semibold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {company.gallery.map((img, i) => (
                      <div key={i} className="aspect-video rounded-md overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-5">
                <h3 className="font-semibold mb-3">Company Info</h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Industry</span><span className="font-medium">{company.industry}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Company Size</span><span className="font-medium">{company.size}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Founded</span><span className="font-medium">{company.founded}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Location</span><span className="font-medium">{company.location}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Website</span><span className="font-medium text-primary-600">{company.website}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Open Jobs</span><span className="font-medium">{company.openJobs}</span></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card p-5">
                <h3 className="font-semibold mb-3">Reviews</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl font-bold">{company.rating}</span>
                  <div>
                    <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={cn('w-4 h-4', s <= Math.round(company.rating) ? 'fill-warning-500 text-warning-500' : 'text-slate-300 dark:text-slate-700')} />)}</div>
                    <p className="text-xs text-slate-500 mt-0.5">Based on 248 reviews</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[{ label: 'Culture', val: 4.8 }, { label: 'Salary', val: 4.5 }, { label: 'Work-life', val: 4.7 }, { label: 'Growth', val: 4.6 }].map((r) => (
                    <div key={r.label} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-16">{r.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-warning-500" style={{ width: `${(r.val / 5) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium w-8 text-right">{r.val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

