"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex">
      {/* Responsive Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      {/* lg:pl-64 নিশ্চিত করে যে বড় স্ক্রিনে সাইডবারের জায়গা ফিক্সড থাকবে */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Navbar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
