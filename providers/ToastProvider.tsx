import React from "react";
import { Toaster } from "sonner";

const ToastProvider = () => {
  return <Toaster position="top-center" richColors duration={2000} />;
};

export default ToastProvider;
