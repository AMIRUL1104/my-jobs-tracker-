"use client";
import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  isLoading,
  ...props
}) => {
  const baseStyle =
    "w-full py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 focus:ring-2 focus:ring-blue-500/20",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white focus:ring-2 focus:ring-slate-500/20",
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${baseStyle} ${variants[variant]}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
