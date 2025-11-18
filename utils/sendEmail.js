// /utils/sendEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    throw new Error('Email service not configured');
  }

  const from =
    process.env.EMAIL_FROM || 'Property Tracker <onboarding@resend.dev>';

  const result = await resend.emails.send({
    from,
    to,
    subject,
    text,
    reply_to: replyTo,
  });

  return result;
}
