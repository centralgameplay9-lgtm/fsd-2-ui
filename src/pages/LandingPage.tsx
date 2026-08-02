import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Briefcase, ArrowRight, Star, TrendingUp, Users, Building2, CheckCircle2,
  Code2, Palette, Megaphone, HeartPulse, GraduationCap, Target, Cog, ChevronDown, Quote, Mail,
} from 'lucide-react';
import { jobs, companies, categories, testimonials, faqs, stats } from '@/data/mockData';
import { JobCard } from '@/components/JobCard';
import { useToast } from '@/context/ToastContext';

const categoryIcons: Record<string, typeof Code2> = {
  Code2, Palette, Megaphone, TrendingUp, HeartPulse, GraduationCap, Target, Cog,
};

export function LandingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-mesh pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 -left-10 w-80 h-80 bg-primary-300/20 dark:bg-primary-700/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-300/15 dark:bg-accent-700/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Editorial heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs font-medium text-primary-700 dark:text-primary-300">12,500+ jobs available now</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-stone-900 dark:text-stone-50 leading-[1.05] text-balance">
                Find work that <span className="italic text-primary-600 dark:text-primary-400">feels</span><br />
                like the next right step.
              </h1>
              <p className="mt-6 text-lg text-stone-600 dark:text-stone-400 max-w-xl leading-relaxed">
                Discover thousands of opportunities from companies that actually care. Apply with one click, track every application, and never lose momentum.
              </p>
            </motion.div>

            {/* Right: Search card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="glass-strong rounded-2xl p-5 shadow-soft-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/15 transition">
                    <Search className="w-5 h-5 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Job title, keyword, or company"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/15 transition">
                    <MapPin className="w-5 h-5 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Location or remote"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
                    />
                  </div>
                  <button onClick={handleSearch} className="btn-primary w-full justify-center py-3">
                    <Search className="w-4 h-4" /> Search Jobs
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 text-sm">
                  <span className="text-stone-500 text-xs">Popular:</span>
                  {['Frontend Engineer', 'Product Designer', 'Remote', 'Full Stack'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setSearch(tag); }}
                      className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <Link to="/jobs" className="btn-primary w-full sm:w-auto justify-center">
              Browse All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/post-job" className="btn-outline w-full sm:w-auto justify-center">
              Post a Job
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-display font-semibold gradient-text">{stat.value}</p>
                <p className="mt-1.5 text-sm text-stone-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Explore</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">Browse by category</h2>
            <p className="mt-2 text-stone-500 max-w-lg">Find opportunities in your field of expertise across industries.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[cat.icon] || Briefcase;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to="/jobs"
                    className="card p-5 hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-800 transition group block"
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 bg-${cat.color}-100 dark:bg-${cat.color}-900/30 text-${cat.color}-600 dark:text-${cat.color}-400 group-hover:scale-110 transition`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">{cat.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{cat.count} open positions</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-24 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Hand-picked</p>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">Featured roles</h2>
              <p className="mt-2 text-stone-500">Opportunities from top companies hiring now.</p>
            </div>
            <Link to="/jobs" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:gap-2.5 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {featuredJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/jobs" className="btn-outline inline-flex">View all jobs</Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Trusted by</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">Top companies hiring</h2>
            <p className="mt-2 text-stone-500">Join industry leaders building the future.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {companies.map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/companies/${company.id}`}
                  className="card p-5 flex flex-col items-center text-center hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-800 transition group"
                >
                  <div className="w-14 h-14 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden mb-3 group-hover:scale-105 transition">
                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">{company.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{company.openJobs} open jobs</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 sm:py-24 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Simple process</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">How it works</h2>
            <p className="mt-2 text-stone-500">Get hired in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Search & Discover', desc: 'Browse thousands of jobs filtered by your skills, location, and preferences.', step: '01' },
              { icon: CheckCircle2, title: 'Apply with One Click', desc: 'Submit applications instantly and track their status in real-time from your dashboard.', step: '02' },
              { icon: TrendingUp, title: 'Get Hired', desc: 'Connect with employers, ace interviews, and land your dream job.', step: '03' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative card p-7"
              >
                <span className="absolute top-5 right-5 text-4xl font-display font-semibold text-stone-200 dark:text-stone-800">{item.step}</span>
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">{item.desc}</p>
      </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">Loved by professionals</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">Stories from our community</h2>
            <p className="mt-2 text-stone-500">Join 850k+ professionals who found their next role.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <Quote className="w-8 h-8 text-primary-300 dark:text-primary-800 mb-3" />
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-stone-200 dark:border-stone-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-stone-900 dark:text-stone-100">{t.name}</p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-stone-100/50 dark:bg-stone-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-50">Frequently asked questions</h2>
            <p className="mt-2 text-stone-500">Everything you need to know.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-sm text-stone-900 dark:text-stone-100">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-stone-500">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-accent-700 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <Mail className="w-10 h-10 text-white mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">Get jobs in your inbox</h2>
              <p className="mt-2 text-white/80">Subscribe to receive personalized job alerts every week.</p>
              <form
                onSubmit={(e) => { e.preventDefault(); toast('Subscribed! Check your inbox for confirmation.', 'success'); setEmail(''); }}
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg px-4 py-3 text-sm text-stone-900 outline-none bg-white/95"
                />
                <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm px-6 py-3 rounded-lg transition">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
