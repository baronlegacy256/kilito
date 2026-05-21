"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Input, Layout, Typography, Space, theme } from "antd";
import { LockOutlined, MailOutlined, SafetyCertificateOutlined, WarningOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text, Link } = Typography;

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { token } = theme.useToken();

  useEffect(() => {
    async function checkConfig() {
      try {
        const res = await fetch("/api/admin/auth/config-check");
        const data = await res.json();
        setIsConfigured(data.configured);
      } catch (e) {
        setIsConfigured(false);
      } finally {
        setChecking(false);
      }
    }
    checkConfig();
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (e) {
      setError(e.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 440,
          maxWidth: "100%",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: "40px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: token.colorPrimary,
              borderRadius: 12,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: "0 4px 12px rgba(245, 166, 35, 0.3)",
            }}
          >
            <LockOutlined style={{ fontSize: 24, color: "#fff" }} />
          </div>
          <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
            Admin Console
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Secured separate administration access
          </Text>
        </div>

        {!checking && !isConfigured && (
          <Alert
            type="warning"
            showIcon
            icon={<WarningOutlined />}
            message="Configuration Required"
            description="Admin credentials are not yet configured in server environment variables. Please set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET."
            style={{ marginBottom: 24, borderRadius: 8 }}
          />
        )}

        {isConfigured && (
          <div style={{ marginBottom: 24 }}>
            <Alert
              type="info"
              message="Configured Correctly"
              description="Server has detected admin credentials. Use the email and password you set in your .env.local file."
              showIcon
              icon={<SafetyCertificateOutlined />}
              style={{ borderRadius: 8 }}
            />
          </div>
        )}

        <Form layout="vertical" onFinish={handleLogin} disabled={loading || checking}>
          <Form.Item
            label="Administrator Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your admin email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="info@kilitosavannasafariclub.com"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="••••••••"
            />
          </Form.Item>

          {error && (
            <Alert
              type="error"
              message={error}
              showIcon
              style={{ marginBottom: 24, borderRadius: 8 }}
            />
          )}

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            style={{
              height: 48,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            Sign In to Dashboard
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Managed by Kilito Savanna Adventures IT
          </Text>
        </div>
      </Card>
    </div>
  );
}
