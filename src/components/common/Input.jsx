"use client";
import React from "react";

const Input = React.forwardRef(
  ({ label, type = "text", error, ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          className={`w-full px-4 py-2.5 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
            error
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
          }`}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400 font-medium">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
