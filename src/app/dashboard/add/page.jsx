"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Briefcase,
  Link as LinkIcon,
  DollarSign,
  FileText,
} from "lucide-react";
import Link from "next/link";

// PRD অনুযায়ী Dropdown Options (Enum Validation)
const JOB_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Remote",
];

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

export default function AddJobPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      companyName: "",
      companyLogo: "",
      jobTitle: "",
      jobType: "Full-time",
      jobLocation: "",
      salary: "",
      jobURL: "",
      companyWebsite: "",
      appliedDate: new Date().toISOString().split("T")[0], // Default: Today's date
      status: "Applied",
      notes: "",
    },
  });

  // ফর্ম সাবমিশন লজিক (আপাতত কনসোলে ডাটা দেখাবে)
  const onSubmit = async (data) => {
    console.log("--- Job Application Data Form ---");
    console.log(data);

    // রিয়েল ইউজার এক্সপেরিয়েন্স দেওয়ার জন্য ১ সেকেন্ডের ফেক ডিলে
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Form submitted successfully! Check browser console for data.");
    reset(); // সাবমিট শেষে ফর্ম ক্লিয়ার করার জন্য
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back to Applications Link */}
      <div>
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Applications
        </Link>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Add New Job
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Keep records of your newly applied job positions.
        </p>
      </div>

      {/* Main Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-[#1E293B] border border-slate-800/80 rounded-2xl p-5 sm:p-8 shadow-xl"
        noValidate
      >
        {/* Section 1: Company Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Company Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Google"
                className={`w-full px-4 py-2 bg-[#0F172A] border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  errors.companyName
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                {...register("companyName", {
                  required: "Company name is required",
                })}
              />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-400 font-medium">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Company Logo URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                {...register("companyLogo")}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Job Details */}
        <div className="space-y-4 border-t border-slate-800/60 pt-6">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" /> Job Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                className={`w-full px-4 py-2 bg-[#0F172A] border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                  errors.jobTitle
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                {...register("jobTitle", { required: "Job title is required" })}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-xs text-red-400 font-medium">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Job Type *
              </label>
              <select
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                {...register("jobType", { required: "Job type is required" })}
              >
                {JOB_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Job Location
              </label>
              <input
                type="text"
                placeholder="e.g. Remote / Dhaka, BD"
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                {...register("jobLocation")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Salary (Optional)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. $60k/year or 50k/mo"
                  className="w-full pl-9 pr-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                  {...register("salary")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Status & Links */}
        <div className="space-y-4 border-t border-slate-800/60 pt-6">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <LinkIcon className="w-4 h-4" /> Application Status & Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Applied Date *
              </label>
              <input
                type="date"
                className={`w-full px-4 py-2 bg-[#0F172A] border rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 transition-all ${
                  errors.appliedDate
                    ? "border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/10"
                }`}
                {...register("appliedDate", {
                  required: "Applied date is required",
                })}
              />
              {errors.appliedDate && (
                <p className="mt-1 text-xs text-red-400 font-medium">
                  {errors.appliedDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Status *
              </label>
              <select
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                {...register("status", { required: "Status is required" })}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Job Post URL
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/jobs/..."
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                {...register("jobURL")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Company Website
              </label>
              <input
                type="url"
                placeholder="https://company.com"
                className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                {...register("companyWebsite")}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Notes */}
        <div className="space-y-4 border-t border-slate-800/60 pt-6">
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Notes / Technical Requirements
          </label>
          <textarea
            rows="4"
            placeholder="e.g. Applied through LinkedIn. Waiting for HR response. Requires Next.js and Tailwind expertise."
            className="w-full px-4 py-3 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
            {...register("notes")}
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800/60 pt-6">
          <Link
            href="/applications"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-600/10 flex items-center gap-2"
          >
            {isSubmitting ? "Saving..." : "Save Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
