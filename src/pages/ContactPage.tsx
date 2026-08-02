import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useToast } from '@/context/ToastContext';
import { faqs } from '@/data/mockData';

export function ContactPage() {
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Message sent! We will get back to you within 24 hours.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-display font-medium">Get in Touch</h1>
            <p className="mt-2 text-stone-500 max-w-xl mx-auto">Have a question or need help? Our team is here for you. Reach out and we'll respond within 24 hours.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Mail, title: 'Email Us', value: 'support@hirehub.com', desc: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', value: '+1 (415) 555-0100', desc: 'Mon-Fri, 9am-6pm PST' },
              { icon: MapPin, title: 'Visit Us', value: 'San Francisco, CA', desc: '535 Mission Street, Suite 1400' },
            ].map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-5 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center mx-auto mb-3">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-primary-600 mt-1">{c.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
              <h2 className="text-lg font-display font-medium mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium mb-1.5 block">Name</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base" placeholder="Your name" /></div>
                  <div><label className="text-sm font-medium mb-1.5 block">Email</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-base" placeholder="you@email.com" /></div>
                </div>
                <div><label className="text-sm font-medium mb-1.5 block">Subject</label><input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-base" placeholder="How can we help?" /></div>
                <div><label className="text-sm font-medium mb-1.5 block">Message</label><textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-base resize-none" placeholder="Tell us more..." /></div>
                <button type="submit" className="btn-primary w-full"><Send className="w-4 h-4" /> Send Message</button>
              </form>
            </motion.div>

            {/* Map + FAQ */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative text-center">
                    <MapPin className="w-10 h-10 text-primary-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">535 Mission Street</p>
                    <p className="text-xs text-stone-500">San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-2 text-sm text-stone-500">
                  <Clock className="w-4 h-4" /> Open Mon-Fri, 9:00 AM - 6:00 PM PST
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
                <h3 className="font-semibold mb-3">Quick FAQ</h3>
                <div className="space-y-2">
                  {faqs.slice(0, 3).map((faq, i) => (
                    <div key={i}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left">
                        <span className="text-sm font-medium">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === i && <p className="text-xs text-stone-500 mt-2">{faq.a}</p>}
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
