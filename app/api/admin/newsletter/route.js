import { NextResponse } from 'next/server';
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";
import nodemailer from 'nodemailer';

export async function GET(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ subscribers: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();

    // Check if manually adding a subscriber
    if (body.email) {
      const { email } = body;
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, status: 'active' }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // unique violation
          return NextResponse.json({ error: 'This email address is already registered.' }, { status: 400 });
        }
        throw error;
      }
      return NextResponse.json({ success: true, subscriber: data });
    }

    const { subject, content } = body;

    if (!subject || !content) {
      return NextResponse.json({ error: 'Subject and content are required' }, { status: 400 });
    }

    // 1. Fetch all active subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'active');

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ success: true, sentCount: 0, message: 'No active subscribers found.' });
    }

    // 2. Configure mailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: 'SMTP server is not configured in environment variables.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort || 587,
      secure: smtpPort === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 3. Send emails
    let sentCount = 0;
    let failedCount = 0;
    
    const sendPromises = subscribers.map(async (sub) => {
      const mailOptions = {
        from: `"Kili to Savanna" <${smtpUser}>`,
        to: sub.email,
        subject: subject,
        text: content.replace(/<[^>]*>/g, ''), 
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333333;">
            <div style="background-color: #f7f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #eaeaeb;">
              <h2 style="margin: 0; color: #1a1a1a;">Kili to Savanna</h2>
            </div>
            <div style="padding: 30px 20px;">
              ${content}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center; margin-bottom: 0;">
              You are receiving this email because you subscribed to the Kili to Savanna newsletter.
            </p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    });

    const results = await Promise.allSettled(sendPromises);
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        sentCount++;
      } else {
        failedCount++;
        console.error('Failed to send newsletter email:', result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      message: `Successfully sent newsletter to ${sentCount} subscriber(s).${failedCount > 0 ? ` Failed to send to ${failedCount} subscriber(s).` : ''}`
    });
  } catch (error) {
    console.error('Admin Newsletter Send Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send newsletters' }, { status: 500 });
  }
}
