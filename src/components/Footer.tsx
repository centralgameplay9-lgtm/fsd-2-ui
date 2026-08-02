import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Github, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-semibold tracking-tight">HireHub</span>
            </Link>
            <p className="text-sm text-stone-500 max-w-xs">
              The modern job portal connecting talented professionals with great companies. Find your dream job today.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-500 hover:text-primary-600 hover:border-primary-300 dark:hover:border-primary-700 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'For Job Seekers', links: ['Browse Jobs', 'Companies', 'Salary Guide', 'Career Advice', 'Resume Builder'] },
            { title: 'For Employers', links: ['Post a Job', 'Pricing', 'Candidate Search', 'Employer Branding', 'Analytics'] },
            { title: 'Company', links: ['About Us', 'Contact', 'Careers', 'Blog', 'Press Kit'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-display font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-stone-500 hover:text-primary-600 transition">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500">© 2026 HireHub. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-primary-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-primary-600 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
