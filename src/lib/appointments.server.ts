import { appointmentSchema, type AppointmentInput } from "./appointment-schema";

export async function createAppointment(input: AppointmentInput) {
  const data = appointmentSchema.parse(input);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: row, error } = await supabaseAdmin
    .from("appointments")
    .insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      boutique: data.boutique,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      format: data.format,
      piece_of_interest: data.pieceOfInterest || null,
      notes: data.notes || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[appointments] insert failed", error);
    throw new Error("We could not record your request. Please try again.");
  }

  const confirmation = await sendConfirmation(data, row.id);

  return { id: row.id as string, emailed: confirmation.sent };
}

/**
 * Sends the private-viewing confirmation email.
 * Activates automatically once the Maison sender domain is verified.
 */
async function sendConfirmation(
  data: AppointmentInput,
  reference: string,
): Promise<{ sent: boolean }> {
  try {
    const mod = await import("./appointment-email.server");
    return await mod.sendAppointmentConfirmation(data, reference);
  } catch (err) {
    console.error("[appointments] confirmation email skipped", err);
    return { sent: false };
  }
}
