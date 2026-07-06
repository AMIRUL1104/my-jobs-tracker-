import React from "react";

export default function StatsCard({ title, count, icon: Icon, colorClass }) {
  return (
    <div className="bg-[#1E293B] border border-slate-800/80 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-slate-750 transition-all duration-200">
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {count}
        </p>
      </div>

      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}
