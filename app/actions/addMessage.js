'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { sendEmail } from '@/utils/sendEmail';
// import { revalidatePath } from 'next/cache'; // only if you need it

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
    const email = formData.get('email'); // user's email from the form
    const phone = formData.get('phone');
    const body = formData.get('body');

    // 1) Save the message in MongoDB
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

    // 2) Email the property owner via Resend
    const text = `
You have a new inquiry on one of your properties.

From: ${name} (${email}${phone ? `, ${phone}` : ''})

Message:
${body}
    `.trim();

    await sendEmail({
      to: recipientUser.email,
      subject: 'New property inquiry',
      text,
      replyTo: email, // "Reply" goes to the user
    });

    return { submitted: true };
  } catch (err) {
    console.error('Error in addMessage:', err);
    return { error: 'Unable to send message. Please try again.' };
  }
}

export default addMessage;
