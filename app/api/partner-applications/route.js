import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      company_name,
      contact_name,
      email,
      phone,
      country,
      website,
      business_type,
      message,
    } = body;

    if (!company_name?.trim() || !contact_name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Company name, contact name, and email are required." },
        { status: 400 }
      );
    }

    if (!business_type?.trim()) {
      return NextResponse.json(
        { error: "Please select a business type." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database connection failed." },
        { status: 500 }
      );
    }

    const row = {
      company_name: company_name.trim(),
      contact_name: contact_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      country: country?.trim() || null,
      website: website?.trim() || null,
      business_type: business_type.trim(),
      message: message?.trim() || null,
      status: "Pending",
    };

    const { data, error } = await supabase
      .from("partner_applications")
      .insert([row])
      .select("id")
      .single();

    if (error) {
      console.error("Partner application insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to submit application." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("POST /api/partner-applications error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
