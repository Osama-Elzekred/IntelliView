'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toastitem } from '.././components';
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const open = useCallback((component, IsDone, timeout = 5000) => {
    const id = Date.now();
    // Include the icon in the toast object
    setToasts((toasts) => [...toasts, { id, component, IsDone }]);

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
          (
            { id, component, IsDone } // Assuming `icon` is part of your toast object
          ) =>
            Toastitem({
              key: id,
              value: component,
              onAbort: () => close(id),
              className: '',
              IsDone, // Pass the icon variable to ToastItem
            })
        )}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
