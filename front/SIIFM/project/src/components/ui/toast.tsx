// // components/Toast/ToastProvider.tsx
// "use client";

// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { XCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

// type ToastType = "success" | "error" | "info" | "warning";

// interface Toast {
//   id: number;
//   type: ToastType;
//   message: string;
//   duration?: number;
// }

// interface ToastContextProps {
//   showToast: (type: ToastType, message: string, duration?: number) => void;
// }

// const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// export function ToastProvider({ children }: { children: ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const showToast = (type: ToastType, message: string, duration = 3000) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, type, message, duration }]);
//   };

//   const removeToast = (id: number) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
//         <AnimatePresence>
//           {toasts.map((toast) => {
//             const config = {
//               success: { bg: "bg-green-100", border: "border-green-500", icon: CheckCircle, color: "text-green-600" },
//               error: { bg: "bg-red-100", border: "border-red-500", icon: XCircle, color: "text-red-600" },
//               info: { bg: "bg-blue-100", border: "border-blue-500", icon: Info, color: "text-blue-600" },
//               warning: { bg: "bg-yellow-100", border: "border-yellow-500", icon: AlertTriangle, color: "text-yellow-600" },
//             }[toast.type];

//             // Fechamento automático
//             useEffect(() => {
//               const timer = setTimeout(() => removeToast(toast.id), toast.duration);
//               return () => clearTimeout(timer);
//             }, [toast]);

//             const Icon = config.icon;

//             return (
//               <motion.div
//                 key={toast.id}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 50 }}
//                 transition={{ duration: 0.3 }}
//                 className={`flex items-center p-4 rounded-lg border ${config.border} ${config.bg} shadow-lg w-96`}
//               >
//                 <Icon className={`w-6 h-6 ${config.color}`} />
//                 <span className="ml-3 text-sm font-medium text-gray-800 flex-1">{toast.message}</span>
//                 <button onClick={() => removeToast(toast.id)} className="text-gray-600 hover:text-gray-900 ml-2">
//                   ✖
//                 </button>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (!context) throw new Error("useToast must be used within a ToastProvider");
//   return context;
// }


// components/Toast/ToastProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextProps {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, message: string, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

// Componente separado para cada Toast
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration ?? 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const config = {
    success: { bg: "bg-green-100", border: "border-green-500", icon: CheckCircle, color: "text-green-600" },
    error: { bg: "bg-red-100", border: "border-red-500", icon: XCircle, color: "text-red-600" },
    info: { bg: "bg-blue-100", border: "border-blue-500", icon: Info, color: "text-blue-600" },
    warning: { bg: "bg-yellow-100", border: "border-yellow-500", icon: AlertTriangle, color: "text-yellow-600" },
  }[toast.type];

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center p-4 rounded-lg border ${config.border} ${config.bg} shadow-lg w-96`}
    >
      <Icon className={`w-6 h-6 ${config.color}`} />
      <span className="ml-3 text-sm font-medium text-gray-800 flex-1">{toast.message}</span>
      <button onClick={onClose} className="text-gray-600 hover:text-gray-900 ml-2">
        ✖
      </button>
    </motion.div>
  );
}
