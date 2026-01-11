import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived'; // Adjusted path
import { NewLeadAlert } from '../components/emails/NewLeadAlert'; // Import new template

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, vibe, budget, message } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // 1. Add to Audience (Safe check)
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) {
        console.warn("Audience creation warning:", e);
      }
    }

    // 2. Send Email to User (With Unsubscribe Link)
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: 'Message Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // 3. Send Stylized Email to Admin (You)
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Lead: ${name} (${vibe})`,
      react: NewLeadAlert({ name, email, vibe, budget, message }), // Use the new component
    });

    await Promise.all([emailRequest, adminRequest]);

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}