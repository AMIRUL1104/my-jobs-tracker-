import React from "react";
import {
  Briefcase,
  Clock,
  CalendarCheck,
  XCircle,
  CheckCircle,
  HelpCircle,
  Eye,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusChart from "@/components/dashboard/StatusChart";

// সার্ভার-সাইড ডাটা ফেচিং ফাংশন (তোমার ব্যাকএন্ড রেডি হলে এপিআই লিঙ্ক বসাবে)
async function getDashboardData() {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, { cache: 'no-store' });
    // if (!res.ok) throw new Error('Failed to fetch stats');
    // return res.json();

    // লগিন ছাড়া টেস্ট করার জন্য PRD অনুযায়ী স্ট্যাটিক ডেমো ডাটা
    return {
      success: true,
      stats: {
        total: 24,
        wishlist: 4,
        applied: 8,
        underReview: 3,
        interview: 5,
        offerReceived: 1,
        accepted: 1,
        rejected: 2,
        ghosted: 0,
      },
      chartData: [
        { status: "Wishlist", count: 4 },
        { status: "Applied", count: 8 },
        { status: "Review", count: 3 },
        { status: "Interview", count: 5 },
        { status: "Offer", count: 1 },
        { status: "Rejected", count: 2 },
      ],
    };
  } catch (error) {
    console.error("Fetch dashboard stats error:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-400">Failed to load dashboard data.</p>
      </div>
    );
  }

  const { stats, chartData } = data;

  const cardConfigs = [
    {
      title: "Total Applications",
      count: stats.total,
      icon: Briefcase,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Wishlist",
      count: stats.wishlist,
      icon: Eye,
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      title: "Applied",
      count: stats.applied,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-400",
    },
    {
      title: "Under Review",
      count: stats.underReview,
      icon: HelpCircle,
      color: "bg-orange-500/10 text-orange-400",
    },
    {
      title: "Interview",
      count: stats.interview,
      icon: CalendarCheck,
      color: "bg-indigo-500/10 text-indigo-400",
    },
    {
      title: "Offer Received",
      count: stats.offerReceived,
      icon: CheckCircle,
      color: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "Rejected",
      count: stats.rejected,
      icon: XCircle,
      color: "bg-red-500/10 text-red-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Here is an overview of your current job hunt analytics.
        </p>
      </div>

      {/* Grid of Statistics Cards */}
      {/* মোবাইল ফার্স্টের জন্য ১ কলাম, ট্যাবলেটে ২ কলাম, এবং বড় স্ক্রিনে ৩ থেকে ৪ কলাম রেসপন্সিভনেস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cardConfigs.map((card, idx) => (
          <StatsCard
            key={idx}
            title={card.title}
            count={card.count}
            icon={card.icon}
            colorClass={card.color}
          />
        ))}
      </div>

      {/* Analytics Chart Row */}
      <div className="w-full">
        <StatusChart data={chartData} />
      </div>
    </div>
  );
}
