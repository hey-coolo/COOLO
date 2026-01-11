// api/unsubscribe.tsx
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    if (process.env.RESEND_AUDIENCE_ID) {
      // 1. Get Contact ID by Email
      // (Resend doesn't allow deleting by email directly in all SDK versions, 
      // so sometimes you just update them to 'unsubscribed: true')
      
      await resend.contacts.create({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: true, // <--- The Key Flag
      });
    }

    return res.status(200).json({ message: 'Unsubscribed' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}