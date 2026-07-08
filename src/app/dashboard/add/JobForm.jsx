"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  Link as LinkIcon,
  DollarSign,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AddNewJob, UpdateJob } from "@/services/server/action";
import { formatDate } from "@/lib/formatDate";

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

// initialData প্রপ্স রিসিভ করা হলো
export default function JobForm({ jobId, initialData }) {
  const router = useRouter();
  const isEditMode = !!jobId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    // ডাটাবেজের ফিল্ডের নাম আর defaultValues এর নাম সেম হলে সরাসরি initialData বসিয়ে দেওয়া যায়
    defaultValues: initialData || {
      companyName: "",
      companyLogo: "",
      jobTitle: "",
      jobType: "Full-time",
      jobLocation: "",
      salary: "",
      jobURL: "",
      companyWebsite: "",
      appliedDate: formatDate(new Date().toISOString()), // ডিফল্ট appliedDate আজকের তারিখে সেট করা হলো
      status: "Applied",
      notes: "",
    },
  });

  const onSubmit = async (data) => {
    let result;
    if (isEditMode) {
      result = await UpdateJob(jobId, data);
    } else {
      result = await AddNewJob(data);
    }

    if (result.success) {
      toast.success(
        isEditMode ? "Job updated successfully!" : "Job added successfully!",
      );
      if (!isEditMode) reset();
      router.push("/dashboard/applications");
      router.refresh();
    } else {
      toast.error(result.message || "Something went wrong!");
    }
  };

  return (
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
              className={`w-full px-4 py-2 bg-[#0F172A] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 transition-all ${
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
              className={`w-full px-4 py-2 bg-[#0F172A] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 transition-all ${
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
                placeholder="e.g. $60k/year"
                className="w-full pl-9 pr-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
              className="w-full px-4 py-2 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
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
          placeholder="e.g. Next.js and Tailwind expertise."
          className="w-full px-4 py-3 bg-[#0F172A] border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
          {...register("notes")}
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-800/60 pt-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard/applications")}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-600/10 flex items-center gap-2"
        >
          {isSubmitting
            ? "Saving..."
            : isEditMode
              ? "Update Application"
              : "Save Application"}
        </button>
      </div>
    </form>
  );
}
