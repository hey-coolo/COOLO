// api/contact.js
import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, role, problem, goal } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // --- 1. RESEND: Add to Audience (Optional / Soft Fail) ---
    // We wrap this in a separate try/catch so it doesn't block the email if it fails.
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' '),
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
          properties: {
            business_name: business || '',
            job_role: role || '',
          }
        });
      } catch (audiencError) {
        console.warn("Could not add to audience (Check Audience ID):", audiencError);
        // We continue execution even if this fails!
      }
    }

    // --- 2. RESEND: Send Stylized Auto-Reply (Transactional) ---
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>', 
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // --- 3. RESEND: Notify YOU (Admin Notification) ---
    const adminNotificationRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: `New Brief: ${name} from ${business}`,
      html: `
        <h1>New Intel Received</h1>
        <p><strong>Agent:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role} @ ${business}</p>
        <hr />
        <h3>The Pain</h3>
        <p>${problem}</p>
        <h3>The Goal</h3>
        <p>${goal}</p>
      `,
    });

    // Wait for critical emails to send
    await Promise.all([emailRequest, adminNotificationRequest]);

    return res.status(200).json({ message: 'Transmission Successful' });

  } catch (error) {
    console.error('Critical Resend Error:', error);
    return res.status(500).json({ error: 'Internal System Error' });
  }
}