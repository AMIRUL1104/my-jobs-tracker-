"use client";
import React from "react";
import { Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar({ onMenuClick }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="w-full h-16 bg-[#1E293B]/40 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left Part: Mobile Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block">
            Today is {currentDate}
          </p>
        </div>
      </div>

      {/* Right Part: User Profile */}
      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
        <ProfileDropdown />
      </div>
    </header>
  );
}
