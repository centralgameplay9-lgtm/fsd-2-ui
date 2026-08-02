import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { companies } from '@/data/mockData';
import { useState } from 'react';

export function CompaniesPage() {
  const [search, setSearch] = useState('');
  const filtered = companies.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-medium">Top Companies</h1>
            <p className="mt-2 text-stone-500">Discover great companies hiring on HireHub</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 mb-6 max-w-md">
            <Search className="w-4 h-4 text-stone-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search companies..." className="w-full bg-transparent text-sm outline-none" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/companies/${c.id}`} className="card p-5 hover:shadow-soft-lg hover:border-primary-200 dark:hover:border-primary-800 transition group block">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0">
                      <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary-600 transition">{c.name}</h3>
                      <p className="text-xs text-stone-500">{c.industry}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-stone-500">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning-500 fill-warning-500" /> {c.rating}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.employees}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-stone-500 mt-3 line-clamp-2">{c.about}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/50">
                    <span className="text-xs text-stone-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</span>
                    <span className="text-xs font-medium text-primary-600">{c.openJobs} open jobs</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
