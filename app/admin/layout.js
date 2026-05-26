"use client";

import "antd/dist/reset.css";
import { ConfigProvider, Layout, Spin } from "antd";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminSupabaseBrowserClient } from "@/lib/supabase/browser";

const { Content } = Layout;

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCollapsed(window.innerWidth < 992);
    }
  }, []);

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    async function checkAuth() {
      try {
        const supabase = getAdminSupabaseBrowserClient();
        if (!supabase) {
          router.push("/admin/login");
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }

        // Verify active admin profile
        const { data: profile, error } = await supabase
          .from("admin_profiles")
          .select("is_active")
          .eq("user_id", session.user.id)
          .single();

        if (error || !profile?.is_active) {
          await supabase.auth.signOut();
          router.push("/admin/login");
          return;
        }
      } catch (e) {
        console.error("Auth check failed:", e);
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    }

    checkAuth();

    // Listener for auth changes
    const supabase = getAdminSupabaseBrowserClient();
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (!session && !isLoginPage) {
          router.push("/admin/login");
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [pathname, isLoginPage, router]);

  if (checking) {
    return (
      <div 
        style={{ 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          background: "#f6f7fb",
          gap: 16
        }}
      >
        <Spin size="large" />
        <span style={{ color: "#8c8c8c", fontSize: 14 }}>Verifying Administrator Session...</span>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f5a623",
          colorInfo: "#f5a623",
          colorLink: "#f5a623",
          borderRadius: 8,
          fontFamily: "Surt, Arial, sans-serif",
        },
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 991px) {
          .ant-layout-sider {
            position: fixed !important;
            height: 100vh !important;
            z-index: 1002 !important;
            top: 0 !important;
            left: 0 !important;
          }
          .admin-sidebar-backdrop {
            display: block !important;
          }
        }
        @media (min-width: 992px) {
          .admin-sidebar-backdrop {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .admin-content-container {
            padding: 16px 16px !important;
          }
        }
      `}} />

      {isLoginPage ? (
        <div style={{ minHeight: "100vh", background: "#f6f7fb", padding: 16 }}>
          {children}
        </div>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          
          {!collapsed && (
            <div 
              className="admin-sidebar-backdrop"
              onClick={() => setCollapsed(true)} 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 1000,
              }}
            />
          )}

          <Layout style={{ background: "#f9fafb" }}>
            <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content
              className="admin-content-container"
              style={{
                padding: "24px 32px",
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      )}
    </ConfigProvider>
  );
}

