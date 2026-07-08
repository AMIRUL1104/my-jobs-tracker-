import { getJobsById } from "@/services/server/api";
import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Building,
  Briefcase,
  MapPin,
  DollarSign,
  Globe,
  ExternalLink,
  FileText,
  User,
  Code,
  Clock,
  RefreshCw,
} from "lucide-react";
import { formatDate } from "@/lib/formatDate";

// Status Badge কালার ম্যাপিং
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
  return colors[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20";
};

async function ApplicationDetailsPage({ params }) {
  const { id } = await params;

  // ব্যাকএন্ড সার্ভার থেকে ডাটা ফেচ করা হচ্ছে
  const response = await getJobsById(id);
  const job = response?.data || response; // রেসপন্স স্ট্রাকচার অ্যাডজাস্টমেন্ট

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-slate-400 mb-4">
          Job application details not found.
        </p>
        <Link
          href="/dashboard/applications"
          className="text-sm text-blue-500 hover:underline"
        >
          Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Applications
        </Link>

        <Link
          href={`/dashboard/add?jobId=${id}`}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700/50 transition-colors"
        >
          Edit Application
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-[#1E293B] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 sm:space-y-8">
        {/* Header Section: Company Profile & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/60">
          <div className="flex items-start sm:items-center gap-4">
            {/* Company Logo */}
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] border border-slate-800 flex items-center justify-center text-slate-400 font-bold text-xl overflow-hidden shrink-0">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                job.companyName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {job.jobTitle}
              </h1>
              <p className="text-sm font-medium text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />{" "}
                {job.companyName}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="sm:text-right">
            <span
              className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-xl border ${getStatusColor(job.status)}`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* Info Grid Module (Job Parameters) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div className="flex items-center gap-3 bg-[#0F172A]/40 p-3.5 rounded-xl border border-slate-800/40">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                Job Type
              </p>
              <p className="text-slate-200 font-medium mt-0.5">{job.jobType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0F172A]/40 p-3.5 rounded-xl border border-slate-800/40">
            <MapPin className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                Job Location
              </p>
              <p className="text-slate-200 font-medium mt-0.5">
                {job.jobLocation || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0F172A]/40 p-3.5 rounded-xl border border-slate-800/40">
            <Calendar className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                Applied Date
              </p>
              <p className="text-slate-200 font-medium mt-0.5">
                {formatDate(job.appliedDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#0F172A]/40 p-3.5 rounded-xl border border-slate-800/40">
            <DollarSign className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                Salary Package
              </p>
              <p className="text-slate-200 font-medium mt-0.5">
                {job.salary || "Not Specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Links Action Row */}
        {(job.jobURL || job.companyWebsite) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {job.jobURL && (
              <a
                href={job.jobURL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> View Job Post
              </a>
            )}
            {job.companyWebsite && (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-300 rounded-xl text-xs font-medium transition-colors"
              >
                <Globe className="w-4 h-4" /> Visit Company Website
              </a>
            )}
          </div>
        )}

        {/* Notes Block */}
        <div className="border-t border-slate-800/60 pt-6 space-y-2.5">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" /> Notes & Logs
          </h3>
          <div className="w-full min-h-[100px] bg-[#0F172A] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {job.notes || "No notes added for this job application."}
          </div>
        </div>

        {/* Technical & Database Meta Section (IDs and Timestamps) */}
        <div className="border-t border-slate-800/60 pt-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4 text-slate-500" /> System Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400 bg-[#0F172A]/30 p-4 rounded-xl border border-slate-800/50 font-mono">
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="text-slate-600">Application ID:</span>{" "}
                <span className="text-slate-300 break-all">{job._id}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-600">Created By ID:</span>{" "}
                <span className="text-slate-300 break-all">
                  {job.createdBy}
                </span>
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-600">Created At:</span>
                <span className="text-slate-300">
                  {formatDate(job.createdAt)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-600">Updated At:</span>
                <span className="text-slate-300">
                  {formatDate(job.updatedAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetailsPage;
