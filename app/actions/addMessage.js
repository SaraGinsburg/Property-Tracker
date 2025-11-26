'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function addMessage(previousState, formData) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return { error: 'You must be logged in to send a message' };
    }

    const { userId } = sessionUser;
    const recipientId = formData.get('recipient');

    if (!recipientId) {
      return { error: 'Missing property owner information' };
    }

    if (userId === recipientId) {
      return { error: 'You cannot send a message to yourself' };
    }

    // Find the property owner to get their email
    const recipientUser = await User.findById(recipientId).select('email name');
    if (!recipientUser || !recipientUser.email) {
      return { error: 'Unable to find property owner email' };
    }

    const propertyId = formData.get('property');
    const name = formData.get('name');
    const email = formData.get('email'); // user's email
    const phone = formData.get('phone');
    const body = formData.get('body');

    // 1) Save message
    const newMessage = new Message({
      sender: userId,
      recipient: recipientId,
      property: propertyId,
      name,
      email,
      phone,
      body,
    });

    await newMessage.save();

    const text = `
You have a new inquiry on one of your properties.

From: ${name} (${email}${phone ? `, ${phone}` : ''})

Message:
${body}
`.trim();

    console.log('Sending inquiry email to owner:', recipientUser.email);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: recipientUser.email,
      subject: 'New property inquiry',
      text,
      html: text.replace(/\n/g, '<br>'), // simple HTML version
      reply_to: email || undefined,
    });

    console.log('DEBUG EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('DEBUG API KEY PRESENT:', !!process.env.RESEND_API_KEY);
    console.log('RESEND RESULT data:', data);
    console.log('RESEND RESULT error:', error);

    if (error) {
      console.error('Resend email error:', error);
      return { error: 'Email could not be sent, please try again later.' };
    }

    return { submitted: true };
  } catch (err) {
    console.error('Error in addMessage:', err);
    return { error: 'Unable to send message. Please try again.' };
  }
}

export default addMessage;
