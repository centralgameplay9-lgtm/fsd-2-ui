import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300',
  danger: 'bg-danger-100 text-danger-700 dark:bg-danger-900/40 dark:text-danger-300',
  ghost: 'bg-transparent text-slate-600 dark:text-slate-400',
  outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
};

export function Badge({ variant = 'secondary', children, className }: BadgeProps) {
  return <span className={cn('badge', variants[variant], className)}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, Variant> = {
    Active: 'success',
    Closed: 'danger',
    Draft: 'secondary',
    Expired: 'warning',
    Pending: 'warning',
    Shortlisted: 'primary',
    Accepted: 'success',
    Rejected: 'danger',
    Offer: 'success',
    Interview: 'primary',
    Applied: 'secondary',
  };
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>;
}
