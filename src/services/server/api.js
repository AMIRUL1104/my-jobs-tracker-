export const getStats = async () => {
  return serverFetch(`/api/stats`);
};
