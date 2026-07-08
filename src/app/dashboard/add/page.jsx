import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import JobForm from "./JobForm";
import { getJobsById } from "@/services/server/api"; // আপনার কাস্টম সার্ভার অ্যাকশন ইমপোর্ট করুন

export default async function AddJobPage({ searchParams }) {
  const params = await searchParams;
  const jobId = params?.jobId || null;
  const isEditMode = !!jobId;

  let initialData = null;

  // যদি এডিট মোড হয়, তবে সার্ভারেই ডাটা ফেচ হবে
  if (isEditMode) {
    const response = await getJobsById(jobId);
    if (response?.success) {
      initialData = response.data; // ডাটাবেজ থেকে পাওয়া অবজেক্ট
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Applications
        </Link>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEditMode ? "Edit Job Application" : "Add New Job"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {isEditMode
            ? "Update the details of your existing job application."
            : "Keep records of your newly applied job positions."}
        </p>
      </div>

      {/* initialData প্রপ্স হিসেবে ফর্মে পাঠানো হচ্ছে */}
      <JobForm jobId={jobId} initialData={initialData} />
    </div>
  );
}
