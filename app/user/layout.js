"use client";

import React, { useEffect, useState, Fragment } from "react";
import UserHeader from "@/components/User/UserHeader";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";


export default function UserLayout({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    // Dynamically load the user-interface stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/styles/user-interface.css";
    link.id = "user-interface-stylesheet";
    document.head.appendChild(link);

    // Initial session check
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        router.push("/");
      } else {
        setSession(currentSession);
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.push("/");
      }
    });

    return () => {
      subscription.unsubscribe();
      // Remove the stylesheet when unmounting
      const existingLink = document.getElementById("user-interface-stylesheet");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, [supabase, router]);


  if (loading) {
    // Show a loading state or nothing while checking authentication
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f9f9f9' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Fragment>
      <UserHeader user={session.user} />
      <div id="principal">
        {children}
      </div>
    </Fragment>
  );
}

