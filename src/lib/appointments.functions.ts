import { createServerFn } from "@tanstack/react-start";
import { appointmentSchema } from "./appointment-schema";

export const bookAppointment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => appointmentSchema.parse(data))
  .handler(async ({ data }) => {
    const { createAppointment } = await import("./appointments.server");
    return createAppointment(data);
  });
