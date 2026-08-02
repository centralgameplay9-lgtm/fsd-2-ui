import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome, Building2, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useRole, type Role } from '@/context/RoleContext';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register' | 'forgot' | 'reset';

export function AuthPage({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setRole } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<Role>('Job Seeker');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordStrength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-danger-500', 'bg-danger-500', 'bg-warning-500', 'bg-accent-500', 'bg-success-500'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register' && password !== confirmPassword) {
      toast('Passwords do not match', 'error');
      return;
    }
    if (mode === 'forgot') {
      toast('Password reset link sent to your email!', 'success');
      navigate('/login');
      return;
    }
    if (mode === 'reset') {
      toast('Password reset successfully!', 'success');
      navigate('/login');
      return;
    }
    setRole(accountType);
    toast(`${mode === 'login' ? 'Welcome back!' : 'Account created!'} Signed in as ${accountType}.`, 'success');
    navigate(accountType === 'Job Seeker' ? '/dashboard' : accountType === 'Employer' ? '/employer' : '/admin');
  };

  const titles: Record<AuthMode, { title: string; subtitle: string; btn: string }> = {
    login: { title: 'Welcome Back', subtitle: 'Sign in to your HireHub account', btn: 'Sign In' },
    register: { title: 'Create Account', subtitle: 'Join HireHub and find your dream job', btn: 'Create Account' },
    forgot: { title: 'Forgot Password', subtitle: 'Enter your email to reset your password', btn: 'Send Reset Link' },
    reset: { title: 'Reset Password', subtitle: 'Enter your new password', btn: 'Reset Password' },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-semibold tracking-tight">HireHub</span>
          </Link>

          <h1 className="text-3xl font-display font-medium tracking-tight">{titles[mode].title}</h1>
          <p className="text-sm text-stone-500 mt-1">{titles[mode].subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" required placeholder="John Doe" className="input-base pl-10" />
                </div>
              </div>
            )}

            {mode !== 'reset' && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" required placeholder="you@email.com" className="input-base pl-10" />
                </div>
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'reset') && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-base pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'register' && password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={cn('h-1.5 flex-1 rounded-full transition', i < passwordStrength ? strengthColors[passwordStrength] : 'bg-stone-200 dark:bg-stone-800')} />
                      ))}
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{strengthLabels[passwordStrength]}</p>
                  </div>
                )}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-base pl-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Account Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Job Seeker', 'Employer', 'Admin'] as Role[]).map((r) => (
                      <button key={r} type="button" onClick={() => setAccountType(r)} className={cn('flex flex-col items-center gap-1.5 py-3 rounded-md border text-xs font-medium transition', accountType === r ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'border-stone-200 dark:border-stone-700 hover:border-primary-300')}>
                        {r === 'Job Seeker' ? <User className="w-4 h-4" /> : r === 'Employer' ? <Building2 className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-primary-600" /> <span className="text-stone-600 dark:text-stone-300">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">Forgot password?</Link>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">{titles[mode].btn} <ArrowRight className="w-4 h-4" /></button>
          </form>

          {(mode === 'login' || mode === 'register') && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
                <span className="text-xs text-stone-400">or continue with</span>
                <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => toast('Google sign-in (demo)', 'info')} className="btn-outline justify-center py-2.5"><Chrome className="w-4 h-4" /> Google</button>
                <button onClick={() => toast('GitHub sign-in (demo)', 'info')} className="btn-outline justify-center py-2.5"><Github className="w-4 h-4" /> GitHub</button>
              </div>
            </>
          )}

          <p className="text-center text-sm text-stone-500 mt-6">
            {mode === 'login' && <>Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up</Link></>}
            {mode === 'register' && <>Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link></>}
            {mode === 'forgot' && <Link to="/login" className="text-primary-600 font-medium hover:underline">Back to sign in</Link>}
            {mode === 'reset' && <Link to="/login" className="text-primary-600 font-medium hover:underline">Back to sign in</Link>}
          </p>
        </motion.div>
      </div>

      {/* Right: illustration */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative text-white max-w-md">
          <h2 className="text-3xl font-display font-medium leading-tight">Your dream career<br />starts here.</h2>
          <p className="mt-4 text-white/80">Join 850,000+ professionals who found their next role through HireHub. Browse 12,500+ jobs from top companies.</p>
          <div className="mt-8 space-y-3">
            {['Free for job seekers', 'Track applications in real-time', 'Get matched with top employers', 'Apply with one click'].map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"><Check className="w-3 h-3" /></div>
                <span className="text-sm text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
