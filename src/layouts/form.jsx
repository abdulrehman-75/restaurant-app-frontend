// layouts/form.js
import React from "react";

export default function Form({
  children,
  onSubmit,
  className = "",
  autoComplete = "off",
  ...props
}) {
  const handleSubmit = onSubmit || ((e) => e.preventDefault());

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete={autoComplete}
      className={`w-full max-w-3xl mx-auto flex flex-col items-center gap-6
                  border border-blue-200 bg-white p-6 
                  rounded-2xl shadow-md ${className}`}
      {...props}
    >
      {children}
    </form>
  );
}
