import { NextResponse } from 'next/server';
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 503 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['active', 'unsubscribed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (error) {
    console.error('Subscriber Update Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update subscriber' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 503 });
  }

  try {
    const { id } = await params;

    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Subscriber Delete Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete subscriber' }, { status: 500 });
  }
}
