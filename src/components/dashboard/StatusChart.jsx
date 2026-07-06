"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusChart({ data }) {
  return (
    <div className="w-full h-[300px] sm:h-[350px] bg-[#1E293B] border border-slate-800/80 rounded-2xl p-4 sm:p-6">
      <h3 className="text-sm sm:text-base font-semibold text-white mb-4 sm:mb-6">
        Applications by Status
      </h3>

      <div className="w-full h-[220px] sm:h-[260px] text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="status"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderColor: "#334155",
                borderRadius: "12px",
                color: "#FFF",
              }}
              cursor={{ fill: "#334155", opacity: 0.2 }}
            />
            <Bar
              dataKey="count"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
