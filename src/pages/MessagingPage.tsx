import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Bookmark, MessageSquare, Bell, Settings,
  Send, Paperclip, Search, ArrowLeft, Phone, Video, MoreVertical, Smile,
} from 'lucide-react';
import { DashboardLayout, type NavItem } from '@/layouts/DashboardLayout';
import { useRole } from '@/context/RoleContext';
import { useToast } from '@/context/ToastContext';
import { messages as initialMessages, jobSeekerStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

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

export function MessagingPage() {
  const { role } = useRole();
  const { toast } = useToast();
  const [conversations, setConversations] = useState(initialMessages);
  const [activeId, setActiveId] = useState(initialMessages[0].id);
  const [input, setInput] = useState('');
  const [mobileChat, setMobileChat] = useState(false);

  const active = conversations.find((c) => c.id === activeId)!;

  const sendMessage = () => {
    if (!input.trim()) return;
    setConversations((prev) => prev.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, { id: Math.random().toString(36).slice(2), senderId: 'me', text: input, time: new Date() }] } : c));
    setInput('');
  };

  return (
    <DashboardLayout navItems={navItems} title="Messages" subtitle="Chat with employers and candidates" role={role}>
      <div className="card overflow-hidden h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          {/* Chat list */}
          <div className={cn('w-full sm:w-80 border-r border-stone-200 dark:border-stone-800 flex flex-col', mobileChat && 'hidden')}>
            <div className="p-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 px-3 rounded-md border border-stone-200 dark:border-stone-700">
                <Search className="w-4 h-4 text-stone-400" />
                <input type="text" placeholder="Search messages..." className="w-full bg-transparent py-2 text-sm outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {conversations.map((c) => (
                <button key={c.id} onClick={() => { setActiveId(c.id); setMobileChat(true); }} className={cn('w-full flex items-start gap-3 p-3 border-b border-stone-100 dark:border-stone-800/50 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition text-left', activeId === c.id && 'bg-primary-50/50 dark:bg-primary-900/20')}>
                  <div className="relative shrink-0">
                    <img src={c.senderAvatar} alt={c.senderName} className="w-10 h-10 rounded-full object-cover" />
                    {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success-500 ring-2 ring-white dark:ring-stone-900" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{c.senderName}</p>
                      <span className="text-[10px] text-stone-400 shrink-0">{c.time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{c.preview}</p>
                  </div>
                  {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className={cn('flex-1 flex flex-col', !mobileChat && 'hidden sm:flex')}>
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b border-stone-200 dark:border-stone-800">
              <button onClick={() => setMobileChat(false)} className="sm:hidden p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"><ArrowLeft className="w-5 h-5" /></button>
              <img src={active.senderAvatar} alt={active.senderName} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{active.senderName}</p>
                <p className="text-xs text-stone-500">{active.online ? 'Online now' : 'Last seen recently'}</p>
              </div>
              <button onClick={() => toast('Starting voice call...', 'info')} className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"><Phone className="w-4 h-4 text-stone-500" /></button>
              <button onClick={() => toast('Starting video call...', 'info')} className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"><Video className="w-4 h-4 text-stone-500" /></button>
              <button className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"><MoreVertical className="w-4 h-4 text-stone-500" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-900/30">
              {active.messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn('flex', msg.senderId === 'me' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[75%] px-3.5 py-2 rounded-lg text-sm', msg.senderId === 'me' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-sm shadow-soft')}>
                    <p>{msg.text}</p>
                    <p className={cn('text-[10px] mt-0.5', msg.senderId === 'me' ? 'text-white/60' : 'text-stone-400')}>{msg.time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <button onClick={() => toast('Attach file (demo)', 'info')} className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"><Paperclip className="w-5 h-5 text-stone-400" /></button>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20" />
                <button onClick={() => toast('Emoji picker (demo)', 'info')} className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"><Smile className="w-5 h-5 text-stone-400" /></button>
                <button onClick={sendMessage} className="btn-primary p-2.5"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
