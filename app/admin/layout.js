"use client";

import "antd/dist/reset.css";
import { ConfigProvider, Layout } from "antd";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import { usePathname } from "next/navigation";

const { Content } = Layout;

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

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
      {isLoginPage ? (
        <div style={{ minHeight: "100vh", background: "#f6f7fb", padding: 16 }}>
          {children}
        </div>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <AdminSidebar />
          <Layout style={{ background: "#f9fafb" }}>
            <AdminHeader />
            <Content
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
