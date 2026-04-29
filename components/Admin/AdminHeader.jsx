"use client";

import { Layout, Menu, Dropdown, Avatar, Badge, Space, Typography, Button } from "antd";
import { 
  UserOutlined, 
  BellOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { Text } = Typography;

export default function AdminHeader() {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch { /* ignore */ }
    router.push("/admin/login");
  };

  const menuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // Push items to the right
        height: 64,
        boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
        zIndex: 1,
      }}
    >
      <Space size={24}>
        <Badge count={0} dot offset={[-2, 2]}>
          <Button 
            type="text" 
            icon={<BellOutlined style={{ fontSize: 20 }} />} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </Badge>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#f5a623' }} />
            <Text style={{ marginLeft: 8, fontWeight: 500 }} className="hidden-xs">
              Administrator
            </Text>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
}
