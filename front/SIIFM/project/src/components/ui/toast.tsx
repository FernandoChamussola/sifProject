// context/ToastContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { NotificationModal } from "@/components/NotificationModal";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextProps {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState({ isOpen: false, type: "success" as ToastType, message: "", duration: 3000 });

  const showToast = (type: ToastType, message: string, duration = 3000) => {
    setToast({ isOpen: true, type, message, duration });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <NotificationModal
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
