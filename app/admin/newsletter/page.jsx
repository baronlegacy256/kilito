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
  Divider,
  Tabs
} from "antd";
import { 
  DeleteOutlined, 
  UserAddOutlined, 
  SendOutlined,
  MailOutlined,
  EyeOutlined,
  EditOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals visibility
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [composeModalVisible, setComposeModalVisible] = useState(false);
  
  // Forms & submission states
  const [addForm] = Form.useForm();
  const [composeForm] = Form.useForm();
  const [adding, setAdding] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);
  
  // Subject & Content for preview
  const [subjectText, setSubjectText] = useState("");
  const [contentText, setContentText] = useState("");

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSubscribers(data.subscribers || []);
    } catch (e) {
      message.error(e.message || "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const addSubscriber = async (values) => {
    setAdding(true);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("Subscriber added successfully");
      setAddModalVisible(false);
      addForm.resetFields();
      fetchSubscribers();
    } catch (e) {
      message.error(e.message || "Failed to add subscriber");
    } finally {
      setAdding(false);
    }
  };

  const deleteSubscriber = async (id) => {
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("Subscriber deleted successfully");
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (e) {
      message.error(e.message || "Failed to delete subscriber");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "unsubscribed" : "active";
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success(`Subscriber status set to ${nextStatus}`);
      setSubscribers(subscribers.map(s => s.id === id ? { ...s, status: nextStatus } : s));
    } catch (e) {
      message.error(e.message || "Failed to update subscriber status");
    }
  };

  const handleBroadcast = async (values) => {
    setBroadcasting(true);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: values.subject,
          content: values.content,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send newsletter.");

      message.success(data.message || "Newsletter broadcast completed successfully!");
      setComposeModalVisible(false);
      composeForm.resetFields();
      setSubjectText("");
      setContentText("");
    } catch (e) {
      message.error(e.message || "Failed to broadcast newsletter.");
    } finally {
      setBroadcasting(false);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Space>
          <MailOutlined style={{ color: '#888' }} />
          <Text strong>{email}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Tooltip title={status === 'active' ? "Unsubscribe user" : "Subscribe user"}>
          <Switch 
            checked={status === 'active'} 
            onChange={() => toggleStatus(record.id, status)} 
            size="small"
            checkedChildren="Active"
            unCheckedChildren="Unsubscribed"
          />
        </Tooltip>
      ),
    },
    {
      title: "Subscribed At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete subscriber?"
          description="Are you sure you want to permanently remove this subscriber?"
          onConfirm={() => deleteSubscriber(record.id)}
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
        
        {/* Header Block */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>Newsletter Subscribers</Title>
            <Text type="secondary">Manage people who subscribed to the newsletter</Text>
          </div>
          
          <Space>
            <Button icon={<UserAddOutlined />} onClick={() => setAddModalVisible(true)}>
              Add Subscriber
            </Button>
            <Button type="primary" icon={<SendOutlined />} onClick={() => setComposeModalVisible(true)}>
              Send Email to All
            </Button>
          </Space>
        </div>

        {/* Directory Card */}
        <Card variant="outlined">
          <Table 
            columns={columns} 
            dataSource={subscribers} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>

      {/* Add Subscriber Modal */}
      <Modal
        title={
          <Space>
            <SafetyCertificateOutlined style={{ color: '#1890ff' }} />
            <span>Add New Subscriber</span>
          </Space>
        }
        open={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => addForm.submit()}
        confirmLoading={adding}
        destroyOnClose
      >
        <Divider style={{ margin: '12px 0 24px' }} />
        <Form form={addForm} layout="vertical" onFinish={addSubscriber}>
          <Form.Item 
            name="email" 
            label="Email Address" 
            rules={[
              { required: true, message: 'Please enter subscriber email address.' },
              { type: 'email', message: 'Please enter a valid email address.' }
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="subscriber@example.com" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Send Email Broadcast Modal */}
      <Modal
        title={
          <Space>
            <SendOutlined style={{ color: '#1890ff' }} />
            <span>Compose & Send Broadcast</span>
          </Space>
        }
        open={composeModalVisible}
        onCancel={() => setComposeModalVisible(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <Divider style={{ margin: '12px 0 24px' }} />
        
        <Form form={composeForm} layout="vertical" onFinish={handleBroadcast}>
          <Tabs defaultActiveKey="write" type="card" style={{ marginBottom: "20px" }}>
            <Tabs.TabPane 
              tab={<span><EditOutlined /> Write</span>} 
              key="write"
            >
              <Form.Item
                name="subject"
                label={<span style={{ fontWeight: "600" }}>Subject Line</span>}
                rules={[{ required: true, message: "Please enter the email subject." }]}
              >
                <Input 
                  placeholder="e.g., Adventure awaits: Explore our new Serengeti Safari Packages!" 
                  onChange={(e) => setSubjectText(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label={
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span style={{ fontWeight: "600" }}>Email Body (HTML supported)</span>
                    <Text type="secondary" style={{ fontSize: "11px" }}>💡 HTML tags are supported for structured styling</Text>
                  </div>
                }
                rules={[{ required: true, message: "Please enter the email content." }]}
              >
                <TextArea
                  placeholder="<h3>Hello Explorer!</h3><p>We are excited to share our latest safari experiences with you...</p>"
                  rows={8}
                  onChange={(e) => setContentText(e.target.value)}
                  style={{ fontFamily: "monospace" }}
                />
              </Form.Item>
            </Tabs.TabPane>

            <Tabs.TabPane 
              tab={<span><EyeOutlined /> Live Preview</span>} 
              key="preview"
            >
              <div style={{ 
                border: "1px dashed #d9d9d9", 
                borderRadius: "8px", 
                padding: "16px",
                backgroundColor: "#fafafa",
                maxHeight: "450px",
                overflowY: "auto"
              }}>
                <div style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: "8px", marginBottom: "12px" }}>
                  <Text type="secondary">Subject: </Text>
                  <Text strong>{subjectText || "(No Subject Line)"}</Text>
                </div>
                
                <div style={{ 
                  fontFamily: "sans-serif", 
                  maxWidth: "500px", 
                  margin: "0 auto", 
                  lineHeight: "1.6",
                  color: "#333333",
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  border: "1px solid #eeeeee",
                  overflow: "hidden"
                }}>
                  <div style={{ backgroundColor: "#f7f9fa", padding: "12px", textAlign: "center", borderBottom: "1px solid #eaeaeb" }}>
                    <h3 style={{ margin: 0, color: "#1a1a1a" }}>Kili to Savanna</h3>
                  </div>
                  <div 
                    style={{ padding: "20px" }}
                    dangerouslySetInnerHTML={{ 
                      __html: contentText || "<p style='color: #888; font-style: italic;'>Enter content to see the live rendering here...</p>" 
                    }}
                  />
                  <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "15px 0" }} />
                  <p style={{ fontSize: "10px", color: "#888", textAlign: "center", paddingBottom: "10px", margin: 0 }}>
                    You are receiving this email because you subscribed to the Kili to Savanna newsletter.
                  </p>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
            <Button onClick={() => setComposeModalVisible(false)}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={broadcasting} 
              icon={<SendOutlined />}
            >
              Send to All
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
