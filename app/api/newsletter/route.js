import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing.' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Insert subscriber into Supabase
    const { data: existingUser, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ success: true, message: 'You are already subscribed to the newsletter!' });
    }

    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (insertError) {
      console.error('Newsletter insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    // 2. Send email via Brevo SMTP to Admin
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || 'info@kilitosavannasafariclub.com';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort || 587,
        secure: smtpPort === '465', // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const adminMailOptions = {
        from: `"Kili to Savanna" <${smtpUser}>`,
        to: adminEmail,
        subject: 'New Newsletter Subscriber!',
        text: `Great news! A new user has subscribed to the newsletter.\n\nEmail: ${email}\n\nYou can view all subscribers in your admin dashboard.`,
        html: `
          <h3>New Newsletter Subscriber!</h3>
          <p>Great news! A new user has subscribed to the newsletter.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>You can view all subscribers in your admin dashboard.</p>
        `,
      };

      const subscriberMailOptions = {
        from: `"Kili to Savanna" <${smtpUser}>`,
        to: email,
        subject: 'Welcome to the Kili to Savanna Newsletter!',
        text: `Hi there,\n\nThank you for subscribing to the Kili to Savanna newsletter! You will now receive our latest updates, travel stories, and advice for your next adventure.\n\nBest regards,\nThe Kili to Savanna Team`,
        html: `
          <h3>Welcome to the Kili to Savanna Newsletter!</h3>
          <p>Hi there,</p>
          <p>Thank you for subscribing to our newsletter! You will now receive our latest updates, travel stories, and advice for your next adventure.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Kili to Savanna Team</strong></p>
        `,
      };

      try {
        await transporter.sendMail(adminMailOptions);
        console.log('Notification email sent to admin for:', email);
        
        await transporter.sendMail(subscriberMailOptions);
        console.log('Welcome email sent to subscriber:', email);
      } catch (mailError) {
        console.error('Failed to send emails:', mailError);
        // We don't fail the request if the email fails
      }
    } else {
      console.log('SMTP credentials not provided. Skipping admin notification email.');
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Newsletter Subscribe Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
