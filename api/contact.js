import { Resend } from 'resend';
import { MissionReceivedEmail } from '../components/emails/MissionReceived';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 1. Security: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, business, role, problem, goal } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and Name are required' });
  }

  try {
    // --- 1. ADD CONTACT TO RESEND AUDIENCE (Database) ---
    // We wrap this in a try/catch so it doesn't block the email if it fails
    // (e.g. if the user is already on the list)
    try {
      const audienceId = process.env.RESEND_AUDIENCE_ID;
      
      const contactPayload = {
        email: email,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        unsubscribed: false,
      };

      // Only add audienceId if you actually have one configured in Vercel
      if (audienceId) {
        contactPayload.audienceId = audienceId;
      }

      await resend.contacts.create(contactPayload);
      console.log("Contact added to Resend Audience");
    } catch (contactError) {
      // Log error but DO NOT CRASH. Continue to send the email.
      console.warn("Could not add contact to audience (likely already exists or no ID):", contactError);
    }

    // --- 2. SEND "MISSION RECEIVED" EMAIL (Transactional) ---
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>', // Make sure this domain is verified in Resend
      to: [email],
      subject: 'Mission Received // COOLO',
      react: MissionReceivedEmail({ name }),
    });

    // --- 3. SEND NOTIFICATION TO YOU ---
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

    // Wait for the emails to actually send
    await Promise.all([emailRequest, adminNotificationRequest]);

    return res.status(200).json({ message: 'Transmission Successful' });

  } catch (error) {
    console.error('Critical Error:', error);
    return res.status(500).json({ error: 'Internal System Error' });
  }
}