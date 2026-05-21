"use client";

import { Layout, Menu, Typography, Space } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const { Sider } = Layout;
const { Title } = Typography;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* ignore */
    }
    router.push("/admin/login");
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "/admin/packages",
      icon: <AppstoreOutlined />,
      label: <Link href="/admin/packages">Packages</Link>,
    },
    {
      key: "/admin/groups",
      icon: <TeamOutlined />,
      label: <Link href="/admin/groups">Groups</Link>,
    },
    {
      key: "/admin/stays",
      icon: <HomeOutlined />,
      label: <Link href="/admin/stays">Stays</Link>,
    },
    {
      key: "/admin/bookings",
      icon: <DashboardOutlined />,
      label: <Link href="/admin/bookings">Bookings</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: "/admin/newsletter",
      icon: <MailOutlined />,
      label: <Link href="/admin/newsletter">Newsletter</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: <Link href="/admin/dashboard">Settings</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <Sider
      width={260}
      theme="dark"
      style={{
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        background: "#001529",
      }}
    >
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <Space direction="vertical" size={0}>
          <Title level={4} style={{ margin: 0, color: "#ffffff" }}>
            Kilito <span style={{ color: "#f5a623" }}>Admin</span>
          </Title>
          <Typography.Text
            style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}
          >
            Control Panel
          </Typography.Text>
        </Space>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ borderRight: 0, background: "transparent" }}
      />
    </Sider>
  );
}
