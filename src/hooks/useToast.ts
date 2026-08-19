import { useState, useCallback } from 'react';
import type { ToastMessage, ToastType } from '../interfaces/toast.interface';

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, title: string, description?: string, duration = 3500) => {
    const id = 'toast-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, type, title, description, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    toastSuccess: (title: string, desc?: string) => addToast('success', title, desc),
    toastError: (title: string, desc?: string) => addToast('error', title, desc),
    toastInfo: (title: string, desc?: string) => addToast('info', title, desc),
    toastWarning: (title: string, desc?: string) => addToast('warning', title, desc),
  };
}
