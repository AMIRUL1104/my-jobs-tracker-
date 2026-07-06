"use client";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Briefcase, PlusCircle, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Applications", icon: Briefcase, path: "/dashboard/applications" },
    { label: "Add Job", icon: PlusCircle, path: "/dashboard/add" },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#1E293B] border-r border-slate-800/80 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-white tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            JobTrackr<span className="text-blue-500">.</span>
          </Link>
          {/* Close Button for Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-200 group"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-500 font-medium">
            v1.0.0 — Personal Use
          </p>
        </div>
      </aside>
    </>
  );
}
