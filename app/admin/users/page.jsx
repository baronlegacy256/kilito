"use client";

import React, { useState, useEffect } from "react";
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  Typography, 
  message, 
  Popconfirm, 
  Card,
  Modal,
  Form,
  Input,
  Switch,
  Tooltip,
  Divider
} from "antd";
import { 
  DeleteOutlined, 
  UserAddOutlined, 
  SafetyCertificateOutlined,
  MailOutlined,
  UserOutlined,
  KeyOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUsers(data.users || []);
    } catch (e) {
      message.error(e.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("User created successfully");
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (e) {
      message.error(e.message || "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("User deleted");
      setUsers(users.filter(u => u.id !== id));
    } catch (e) {
      message.error(e.message || "Failed to delete user");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentStatus }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("User status updated");
      setUsers(users.map(u => u.id === id ? { ...u, is_active: !currentStatus } : u));
    } catch (e) {
      message.error(e.message || "Failed to update status");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => (
        <Space>
          <UserOutlined />
          <Text strong>{text || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Space>
          <MailOutlined style={{ color: '#888' }} />
          <Text>{email}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (active, record) => (
        <Tooltip title={active ? "Deactivate account" : "Activate account"}>
          <Switch 
            checked={active} 
            onChange={() => toggleStatus(record.id, active)} 
            size="small"
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete this user?"
          description="This will permanently remove the admin account."
          onConfirm={() => deleteUser(record.id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Button icon={<DeleteOutlined />} danger size="small" type="text" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>User Management</Title>
            <Text type="secondary">Manage admin accounts and their access permissions</Text>
          </div>
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => setModalVisible(true)}>
            Add New Admin
          </Button>
        </div>

        <Card variant="outlined">
          <Table 
            columns={columns} 
            dataSource={users} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>

      <Modal
        title={
          <Space>
            <SafetyCertificateOutlined style={{ color: '#f5a623' }} />
            <span>Add New Admin User</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={submitting}
        destroyOnClose
      >
        <Divider style={{ margin: '12px 0 24px' }} />
        <Form form={form} layout="vertical" onFinish={createUser}>
          <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Full Name" />
          </Form.Item>
          
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
            <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email Address" />
          </Form.Item>
          
          <Form.Item name="password" label="Temporary Password" rules={[{ required: true, min: 8, message: 'Password must be at least 8 chars' }]}>
            <Input.Password prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Temporary Password" />
          </Form.Item>
          
          <Text type="secondary" style={{ fontSize: 13 }}>
            Note: New users will be active immediately. Please provide them with their temporary password.
          </Text>
        </Form>
      </Modal>
    </div>
  );
}
