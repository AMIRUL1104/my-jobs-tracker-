"use server";

import { serverMutation } from "../core/server";

export const AddNewJob = async (data) => {
  return serverMutation("/jobs", data);
};

// export const updateAppointmentStatus = async (data) => {
//   return serverMutation("/api/appointments", data, "PATCH");
// };
