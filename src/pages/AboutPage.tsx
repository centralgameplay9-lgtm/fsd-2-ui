import { motion } from 'framer-motion';
import { Target, Heart, Users, TrendingUp, Award, Zap, Globe, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { stats } from '@/data/mockData';

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden gradient-mesh py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl sm:text-5xl font-display font-medium text-balance">We're on a mission to connect<br /><span className="gradient-text">talent with opportunity</span></h1>
              <p className="mt-5 text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">HireHub was founded in 2024 with a simple goal: make hiring faster, fairer, and more human. Today, we're one of the fastest-growing job platforms in the world.</p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-medium">Our Values</h2>
              <p className="mt-2 text-stone-500">The principles that guide everything we do</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Target, title: 'Mission-Driven', desc: 'Every decision we make is in service of connecting people with meaningful work.' },
                { icon: Heart, title: 'Human-First', desc: 'We believe hiring is fundamentally human. Technology should enhance, not replace, that connection.' },
                { icon: Zap, title: 'Fast & Simple', desc: 'We strip away complexity so you can focus on what matters: finding the right match.' },
                { icon: Shield, title: 'Trust & Safety', desc: 'We build tools that protect both candidates and employers, creating a safe space for all.' },
              ].map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center mb-3">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-stone-500 mt-1">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-stone-50 dark:bg-stone-900/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-display font-medium">Join the HireHub Community</h2>
            <p className="mt-2 text-stone-500">Whether you're hiring or looking, we'd love to have you.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/jobs" className="btn-primary justify-center">Browse Jobs</a>
              <a href="/register" className="btn-outline justify-center">Create Account</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
