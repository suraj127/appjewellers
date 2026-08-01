import { z } from "zod";

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  boutique: z.string().trim().min(2).max(120),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date"),
  preferredTime: z.string().trim().min(3).max(10),
  format: z.enum(["boutique", "video"]),
  pieceOfInterest: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
