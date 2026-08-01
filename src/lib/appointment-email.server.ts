import type { AppointmentInput } from "./appointment-schema";

/**
 * Private-viewing confirmation email.
 *
 * Once the Maison sender domain is verified, this delegates to the managed
 * email sender. Until then it records the intent and reports `sent: false`
 * so the booking itself still succeeds.
 */
export async function sendAppointmentConfirmation(
  data: AppointmentInput,
  reference: string,
): Promise<{ sent: boolean }> {
  console.info("[appointments] confirmation queued", {
    reference,
    to: data.email,
    boutique: data.boutique,
    date: data.preferredDate,
    time: data.preferredTime,
    format: data.format,
  });
  return { sent: false };
}
