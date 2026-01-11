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
    // 1. Add to Resend Audience
    // This captures the lead so you can email them later
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) {
        // If they are already subscribed, Resend might throw an error. 
        // We log it but don't stop the download.
        console.warn("Audience creation warning:", e);
      }
    }

    // 2. (Optional) Send yourself a notification that someone downloaded a resource
    await resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: 'New Resource Download',
      html: `<p>New lead captured: <strong>${email}</strong></p>`
    });

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}