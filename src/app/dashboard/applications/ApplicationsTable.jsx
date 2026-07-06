"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Edit2,
  Trash2,
  Briefcase,
} from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

// PRD অনুযায়ী Mock Data (লগিন ও ব্যাকএন্ড এপিআই ছাড়া টেস্ট করার জন্য)
const INITIAL_JOBS = [
  {
    _id: "1",
    companyName: "Google",
    companyLogo: "",
    jobTitle: "Frontend Developer",
    jobType: "Full-time",
    jobLocation: "Remote",
    appliedDate: "2026-07-01",
    status: "Interview Scheduled",
  },
  {
    _id: "2",
    companyName: "Meta",
    companyLogo: "",
    jobTitle: "React Engineer",
    jobType: "Contract",
    jobLocation: "Hybrid",
    appliedDate: "2026-06-25",
    status: "Offer Received",
  },
  {
    _id: "3",
    companyName: "Netflix",
    companyLogo: "",
    jobTitle: "UI Developer",
    jobType: "Internship",
    jobLocation: "On-site",
    appliedDate: "2026-06-20",
    status: "Rejected",
  },
  {
    _id: "4",
    companyName: "Amazon",
    companyLogo: "",
    jobTitle: "Software Engineer",
    jobType: "Part-time",
    jobLocation: "Remote",
    appliedDate: "2026-07-05",
    status: "Applied",
  },
];

// PRD অনুযায়ী Dropdown Options (Enum Validation)
const STATUS_OPTIONS = [
  "Wishlist",
  "Applied",
  "Under Review",
  "Interview Scheduled",
  "Technical Interview",
  "HR Interview",
  "Offer Received",
  "Accepted",
  "Rejected",
  "Ghosted",
];

const JOB_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Remote",
];

export default function ApplicationsTable({ jobs }) {
  // State for Search, Filter, and Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // default: Newest First

  // Status Badge কালার ম্যাপিং (PRD Nice UI Features)
  const getStatusColor = (status) => {
    const colors = {
      Wishlist: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      "Under Review": "bg-orange-500/10 text-orange-400 border-orange-500/20",
      "Interview Scheduled":
        "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      "Technical Interview": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      "HR Interview": "bg-teal-500/10 text-teal-400 border-teal-500/20",
      "Offer Received":
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Accepted: "bg-green-500/10 text-green-400 border-green-500/20",
      Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      Ghosted: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    };
    return colors[status] || "bg-slate-500/10 text-slate-400";
  };

  // Search, Filter, এবং Sort লজিক (Memoized Performance)
  const filteredAndSortedJobs = useMemo(() => {
    let result = [...jobs];

    // 1. Search Logic (Case-insensitive Regex Search Specification)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.companyName.toLowerCase().includes(query) ||
          job.jobTitle.toLowerCase().includes(query),
      );
    }

    // 2. Filter Logic
    if (statusFilter) {
      result = result.filter((job) => job.status === statusFilter);
    }
    if (jobTypeFilter) {
      result = result.filter((job) => job.jobType === jobTypeFilter);
    }

    // 3. Sort Logic (Newest / Oldest)
    result.sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchQuery, statusFilter, jobTypeFilter, sortBy]);

  return (
    <>
      {/* Page Header */}

      {/* Search and Filters Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#1E293B] p-4 rounded-2xl border border-slate-800/80">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Company or Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter by Status */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Job Type */}
        <div className="relative">
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Job Types</option>
            {JOB_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Applications List Area */}
      {filteredAndSortedJobs.length === 0 ? (
        /* Empty State (PRD Nice UI Features) */
        <div className="bg-[#1E293B] border border-slate-800/80 rounded-2xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white">
            No applications found
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search or filter keywords.
          </p>
        </div>
      ) : (
        <>
          {/* 1. Desktop Table View (Visible on Large Screens) */}
          <div className="hidden lg:block bg-[#1E293B] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-[#1E293B]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-3 py-4">Company</th>
                  <th className="px-3 py-4">Position</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Applied Date</th>
                  <th className="px-3 py-4">Job Type</th>
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                {filteredAndSortedJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-3 py-4 font-medium text-white">
                      {job.companyName}
                    </td>
                    <td className="px-3 py-4">{job.jobTitle}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-slate-400">
                      {formatDate(job.appliedDate)}
                    </td>
                    <td className="px-3 py-4">
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700/50">
                        {job.jobType}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/applications/${job._id}`}>
                          <button
                            className="p-1.5 cursor-pointer rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile Card View (Visible on Mobile & Tablets) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
            {filteredAndSortedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#1E293B] border border-slate-800/80 rounded-2xl p-5 space-y-4 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {job.companyName}
                    </h3>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {job.jobTitle}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${getStatusColor(job.status)}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <div>
                    <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                      Applied Date
                    </p>
                    <p className="mt-0.5 font-medium text-slate-300">
                      {formatDate(job.appliedDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                      Type
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700/50">
                      {job.jobType}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions Button Row */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-800/80 pt-3">
                  <Link href={`/dashboard/applications/${job._id}`}>
                    <button className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </Link>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-xl transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
