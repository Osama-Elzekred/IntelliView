'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toastitem } from '.././components';
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const open = useCallback((component, timeout = 5000) => {
    const id = Date.now();
    setToasts((toasts) => [...toasts, { id, component }]);

    setTimeout(() => close(id), timeout);
  }, []);

  const close = useCallback((id) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="space-y-2 fixed top-4 right-4 p-2">
        {toasts.map(
          ({ id, component }) =>
            Toastitem({
              key: id,
              value: component,
              onAbort: () => close(id),
              className: '',
            })
          // <div key={id} className="relative">
          //   <button
          //     className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60"
          //     onClick={() => close(id)}
          //   >
          //     X
          //   </button>
          //   {component}
          // </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
