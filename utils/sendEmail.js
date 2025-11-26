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

  console.log('Sending email via Resend:', { from, to, subject });

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
    reply_to: replyTo,
  });

  if (error) {
    console.error('Resend error:', error);
    // Make sure the caller (addMessage) knows it failed
    throw new Error(error.message || 'Resend failed');
  }

  console.log('Resend email sent successfully, id:', data?.id);
  return data;
}
