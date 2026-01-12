import { Resend } from 'resend';
import { ResourceDelivery } from '../components/emails/ResourceDelivery'; // Import new template
import { FREE_RESOURCES } from '../constants'; // Access your resource data

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, resourceId } = req.body; // Expect resourceId now

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // 1. Find the resource details based on ID
    // We default to the first one if not found, just for safety
    const resource = FREE_RESOURCES.find(r => r.id === resourceId) || FREE_RESOURCES[0];
    
    // Construct absolute URL (assuming Vercel env or hardcoded domain)
    // IMPORTANT: Emails need full https:// links
    const baseUrl = 'https://coolo.co.nz'; 
    // Remove the leading '.' from './docs/...' to make it '/docs/...'
    const cleanPath = resource.link.replace(/^\./, ''); 
    const downloadUrl = `${baseUrl}${cleanPath}`;

    // 2. Add to Audience (Capture the Lead)
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) {
        console.warn("Already subscribed or error:", e);
      }
    }

    // 3. Send the File Email
    const emailRequest = resend.emails.send({
      from: 'COOLO <hey@coolo.co.nz>',
      to: [email],
      subject: `Download: ${resource.title}`,
      react: ResourceDelivery({ 
        resourceName: resource.title,
        downloadLink: downloadUrl
      }),
    });

    // 4. Notify You (Admin)
    const adminRequest = resend.emails.send({
      from: 'COOLO Bot <system@coolo.co.nz>',
      to: ['hey@coolo.co.nz'],
      subject: 'New Resource Download',
      html: `<p><strong>${email}</strong> just requested: ${resource.title}</p>`
    });

    await Promise.all([emailRequest, adminRequest]);

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}