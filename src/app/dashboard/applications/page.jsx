import React from "react";
import { getJobs } from "@/services/server/api";
import ApplicationsTable from "./ApplicationsTable";
async function ApplicationsPage() {
  const data = await getJobs();
  const jobs = data?.data || [];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage and track your job applications status.
          </p>
        </div>
      </div>

      <ApplicationsTable jobs={jobs} />
    </div>
  );
}

export default ApplicationsPage;
