import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';
interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastCtx {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastCtx>({ toast: () => {} });

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'border-success-200 bg-success-50 text-success-800 dark:border-success-800 dark:bg-success-950 dark:text-success-200',
  error: 'border-danger-200 bg-danger-50 text-danger-800 dark:border-danger-800 dark:bg-danger-950 dark:text-danger-200',
  info: 'border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-200',
  warning: 'border-warning-200 bg-warning-50 text-warning-800 dark:border-warning-800 dark:bg-warning-950 dark:text-warning-200',
};

const iconColors = {
  success: 'text-success-500',
  error: 'text-danger-500',
  info: 'text-primary-500',
  warning: 'text-warning-500',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-soft-lg ${styles[t.type]}`}
              >
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColors[t.type]}`} />
                <p className="text-sm font-medium flex-1">{t.message}</p>
                <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-100 transition">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
