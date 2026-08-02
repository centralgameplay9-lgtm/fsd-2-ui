import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings,
  MapPin, Mail, Phone, Globe, GraduationCap, Award, Languages, Link2, Pencil, Plus, X, Camera,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';
import { useRole } from '@/context/RoleContext';
import { currentUser, jobSeekerStats } from '@/data/mockData';

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

export function ProfilePage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <DashboardLayout navItems={navItems} title="My Profile" subtitle="Manage your professional profile" role={role}>
      {/* Cover + Avatar */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 relative">
          <button className="absolute top-3 right-3 p-2 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-sm transition">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="relative shrink-0">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-slate-900" />
              <button className="absolute bottom-1 right-1 p-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold">{currentUser.name}</h2>
                  <p className="text-sm text-slate-500">{currentUser.title}</p>
                </div>
                <button onClick={() => setEditOpen(true)} className="btn-secondary text-xs px-3 py-2">
                  <Pencil className="w-3.5 h-3.5" /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {currentUser.location}</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {currentUser.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {currentUser.phone}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {currentUser.website}</span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-2xl">{currentUser.bio}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {currentUser.skills.map((s) => (
              <Badge key={s} variant="primary" className="text-[11px]">{s}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Experience */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary-500" /> Experience</h3>
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"><Plus className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div className="space-y-4">
            {currentUser.experience.map((exp, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{exp.role}</p>
                  <p className="text-xs text-primary-600">{exp.company}</p>
                  <p className="text-xs text-slate-400">{exp.duration}</p>
                  <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><GraduationCap className="w-4 h-4 text-accent-500" /> Education</h3>
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"><Plus className="w-4 h-4 text-slate-400" /></button>
          </div>
          <div className="space-y-4">
            {currentUser.education.map((edu, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-accent-600">{edu.school}</p>
                  <p className="text-xs text-slate-400">Class of {edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Award className="w-4 h-4 text-warning-500" /> Certifications</h3>
          <div className="space-y-2">
            {currentUser.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/50">
                <Award className="w-4 h-4 text-warning-500 shrink-0" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Languages className="w-4 h-4 text-success-500" /> Languages</h3>
          <div className="space-y-2">
            {currentUser.languages.map((lang, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-md bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm">{lang.split(' (')[0]}</span>
                <Badge variant="secondary" className="text-[11px]">{lang.match(/\(([^)]+)\)/)?.[1] || ''}</Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Link2 className="w-4 h-4 text-primary-500" /> Social Links</h3>
          <div className="space-y-2">
            {Object.entries(currentUser.social).map(([key, val]) => (
              <a key={key} href="#" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                <span className="text-xs font-semibold uppercase text-slate-400 w-16">{key}</span>
                <span className="text-sm text-primary-600 group-hover:underline">{val}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Portfolio placeholder */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <h3 className="font-semibold mb-4">Portfolio</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-400">
                <Plus className="w-6 h-6" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
        <form onSubmit={(e) => { e.preventDefault(); toast('Profile updated successfully!', 'success'); setEditOpen(false); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Full Name</label>
              <input type="text" defaultValue={currentUser.name} className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title</label>
              <input type="text" defaultValue={currentUser.title} className="input-base" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Bio</label>
            <textarea rows={3} defaultValue={currentUser.bio} className="input-base resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location</label>
              <input type="text" defaultValue={currentUser.location} className="input-base" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <input type="text" defaultValue={currentUser.phone} className="input-base" />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">Save Changes</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
