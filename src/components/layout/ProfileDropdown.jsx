"use client";
import React, { useState, useRef, useEffect } from "react";
// import { useAuth } from '@/context/AuthProvider';
import { LogOut, User, ChevronDown } from "lucide-react";

const user = {
  name: "Amirul Islam",
  email: "amirulislam9.@gmail.com",
  role: "admin",
};

export default function ProfileDropdown() {
  //   const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু ক্লোজ করার লজিক
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-all duration-200 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-semibold text-sm">
          {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-slate-200">
            {user?.name || "Admin User"}
          </p>
          <p className="text-xs text-slate-400">
            {user?.role || "Administrator"}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-slate-850 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="px-4 py-2 border-b border-slate-800 md:hidden">
            <p className="text-sm font-medium text-slate-200 truncate">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>

          <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-150 text-left">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
