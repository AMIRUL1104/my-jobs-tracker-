import { serverFetch } from "../core/serverFetch";

export const getJobs = async () => {
  return serverFetch(`/jobs`);
};
export const getJobsById = async (id) => {
  return serverFetch(`/jobs/${id}`);
};

export const getStats = async () => {
  return serverFetch(`/dashboard/stats`);
};
