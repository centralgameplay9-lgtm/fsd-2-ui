import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, Briefcase, DollarSign } from 'lucide-react';
import { jobs, companies } from '@/data/mockData';
import { JobCard } from '@/components/JobCard';
import { Pagination, EmptyState } from '@/components/ui/Pagination';
import { JobCardSkeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
const workModes = ['Remote', 'Hybrid', 'On-site'];
const experienceLevels = ['0-1 year', '1+ year', '2+ years', '3+ years', '4+ years', '5+ years', '7+ years'];
const dateFilters = ['Any time', 'Past 24 hours', 'Past week', 'Past month'];
const salaryRanges = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '$50k - $100k', min: 50000, max: 100000 },
  { label: '$100k - $150k', min: 100000, max: 150000 },
  { label: '$150k - $200k', min: 150000, max: 200000 },
  { label: '$200k+', min: 200000, max: Infinity },
];

export function JobSearchPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState(0);
  const [dateFilter, setDateFilter] = useState('Any time');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allSkills = useMemo(() => [...new Set(jobs.flatMap((j) => j.skills))].sort(), []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [search, location, selectedTypes, selectedModes, selectedExp, selectedSalary, dateFilter, selectedCompanies, selectedSkills, sortBy]);

  const filtered = useMemo(() => {
    let result = jobs.filter((j) => {
      const q = search.toLowerCase();
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.skills.some((s) => s.toLowerCase().includes(q)) || companies.find((c) => c.id === j.companyId)?.name.toLowerCase().includes(q);
      const matchLoc = !location || j.location.toLowerCase().includes(location.toLowerCase());
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(j.type);
      const matchMode = selectedModes.length === 0 || selectedModes.includes(j.workMode);
      const matchExp = selectedExp.length === 0 || selectedExp.some((e) => j.experience.includes(e));
      const range = salaryRanges[selectedSalary];
      const matchSalary = selectedSalary === 0 || (j.salaryMin >= range.min && j.salaryMax <= range.max);
      const matchCompany = selectedCompanies.length === 0 || selectedCompanies.includes(j.companyId);
      const matchSkills = selectedSkills.length === 0 || selectedSkills.some((s) => j.skills.includes(s));
      const matchDate = dateFilter === 'Any time' ||
        (dateFilter === 'Past 24 hours' && (Date.now() - j.postedAt.getTime()) < 86400000) ||
        (dateFilter === 'Past week' && (Date.now() - j.postedAt.getTime()) < 604800000) ||
        (dateFilter === 'Past month' && (Date.now() - j.postedAt.getTime()) < 2592000000);
      return matchSearch && matchLoc && matchType && matchMode && matchExp && matchSalary && matchCompany && matchSkills && matchDate;
    });

    if (sortBy === 'salary') result = [...result].sort((a, b) => b.salaryMax - a.salaryMax);
    else if (sortBy === 'recent') result = [...result].sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

    return result;
  }, [search, location, selectedTypes, selectedModes, selectedExp, selectedSalary, selectedCompanies, selectedSkills, dateFilter, sortBy]);

  const perPage = 6;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setCurrentPage(1);
  };

  const clearAll = () => {
    setSearch(''); setLocation(''); setSelectedTypes([]); setSelectedModes([]); setSelectedExp([]);
    setSelectedSalary(0); setDateFilter('Any time'); setSelectedCompanies([]); setSelectedSkills([]);
    setCurrentPage(1);
  };

  const activeFilterCount = selectedTypes.length + selectedModes.length + selectedExp.length + selectedCompanies.length + selectedSkills.length + (selectedSalary > 0 ? 1 : 0) + (dateFilter !== 'Any time' ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs text-primary-600 font-medium hover:underline">Clear all ({activeFilterCount})</button>
        )}
      </div>

      {/* Date Posted */}
      <FilterSection title="Date Posted">
        <div className="space-y-2">
          {dateFilters.map((d) => (
            <label key={d} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="date" checked={dateFilter === d} onChange={() => { setDateFilter(d); setCurrentPage(1); }} className="w-4 h-4 accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{d}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Job Type */}
      <FilterSection title="Job Type">
        <div className="space-y-2">
          {jobTypes.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggle(t, selectedTypes, setSelectedTypes)} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{t}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Work Mode */}
      <FilterSection title="Work Mode">
        <div className="space-y-2">
          {workModes.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedModes.includes(m)} onChange={() => toggle(m, selectedModes, setSelectedModes)} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{m}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience Level">
        <div className="space-y-2">
          {experienceLevels.map((e) => (
            <label key={e} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedExp.includes(e)} onChange={() => toggle(e, selectedExp, setSelectedExp)} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{e}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary */}
      <FilterSection title="Salary Range">
        <div className="space-y-2">
          {salaryRanges.map((r, i) => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="salary" checked={selectedSalary === i} onChange={() => { setSelectedSalary(i); setCurrentPage(1); }} className="w-4 h-4 accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{r.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Company */}
      <FilterSection title="Company">
        <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
          {companies.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" checked={selectedCompanies.includes(c.id)} onChange={() => toggle(c.id, selectedCompanies, setSelectedCompanies)} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition">{c.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Skills */}
      <FilterSection title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {allSkills.slice(0, 12).map((s) => (
            <button
              key={s}
              onClick={() => toggle(s, selectedSkills, setSelectedSkills)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium border transition',
                selectedSkills.includes(s)
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-700'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Search bar */}
      <div className="card p-2 mb-6 flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Job title, keyword, or company" className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400" />
        </div>
        <div className="sm:w-px h-px sm:h-auto bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 flex items-center gap-2 px-3">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" value={location} onChange={(e) => { setLocation(e.target.value); setCurrentPage(1); }} placeholder="Location" className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400" />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="card p-5 sticky top-20">
            <FilterPanel />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">
                {loading ? 'Searching...' : `${filtered.length} job${filtered.length !== 1 ? 's' : ''} found`}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">Find your next opportunity</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowMobileFilters(true)} className="lg:hidden btn-secondary text-xs px-3 py-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-3 pr-8 py-2 text-sm font-medium outline-none cursor-pointer focus:border-primary-500"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : paginated.length > 0 ? (
              paginated.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
            ) : (
              <EmptyState
                icon={<Briefcase className="w-8 h-8" />}
                title="No jobs match your filters"
                description="Try adjusting your search criteria or clearing some filters to see more results."
                action={<button onClick={clearAll} className="btn-primary">Clear all filters</button>}
              />
            )}
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel />
            <button onClick={() => setShowMobileFilters(false)} className="btn-primary w-full mt-6">
              Show {filtered.length} results
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-5 border-b border-slate-100 dark:border-slate-800/50 last:border-0 last:pb-0">
      <h4 className="text-sm font-semibold mb-3">{title}</h4>
      {children}
    </div>
  );
}
