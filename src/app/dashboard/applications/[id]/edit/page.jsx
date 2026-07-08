import React from "react";

async function EditJobs({ params }) {
  const { id } = await params;
  const details = await getJobsById(id);
  return <div></div>;
}

export default EditJobs;
