import { serverFetch } from "../core/serverFetch";

export const getJobs = async () => {
  return serverFetch(`/jobs`);
};
