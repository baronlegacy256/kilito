"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Space,
  Button,
  Card,
  Descriptions,
  Tag,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Divider,
  Empty,
} from "antd";
import {
  ArrowLeftOutlined,
  UserAddOutlined,
  TeamOutlined,
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Option } = Select;

export default function GroupDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  const fetchGroupDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/groups/${params.id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGroup(data.group);
    } catch (e) {
      message.error(e.message || "Failed to load group details");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchGroupDetails();
      fetchUsers();
    }
  }, [params.id]);

  const handleAddMember = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetch(`/api/admin/groups/${params.id}/add-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      message.success("Member added successfully");
      setAddMemberModalVisible(false);
      form.resetFields();
      fetchGroupDetails();
    } catch (e) {
      if (e.errorFields) return;
      message.error(e.message || "Failed to add member");
    }
  };

  const removeBookingFromGroup = async (bookingId) => {
    try {
      // We just set the group_id to null for the booking
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: null }),
      });

      if (!res.ok) throw new Error("Failed to remove member");

      message.success("Member removed from group");
      fetchGroupDetails();
    } catch (e) {
      message.error(e.message);
    }
  };

  if (loading && !group) return <div>Loading...</div>;
  if (!group) return <div>Group not found</div>;

  const bookingColumns = [
    {
      title: "Member Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.email}
          </Text>
        </Space>
      ),
    },
    {
      title: "Persons",
      dataIndex: "num_travelers",
      key: "num_travelers",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Confirmed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Link href={`/admin/bookings`}>
            <Button size="small">View Booking</Button>
          </Link>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => removeBookingFromGroup(record.id)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space direction="vertical" size={0}>
            <Link href="/admin/groups">
              <Button
                icon={<ArrowLeftOutlined />}
                type="link"
                style={{ padding: 0 }}
              >
                Back to Groups
              </Button>
            </Link>
            <Title level={2} style={{ margin: "8px 0" }}>
              {group.name || "Group Details"}
            </Title>
          </Space>
          <Space>
            <Button icon={<EditOutlined />}>Edit Group</Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setAddMemberModalVisible(true)}
            >
              Add Member
            </Button>
          </Space>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "24px",
          }}
        >
          <Card
            title={
              <Space>
                <TeamOutlined /> Group Overview
              </Space>
            }
            bordered={false}
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "fit-content",
            }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Package">
                {group.package?.title}
              </Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {dayjs(group.start_date).format("MMMM DD, YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {group.end_date
                  ? dayjs(group.end_date).format("MMMM DD, YYYY")
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={group.status === "Open" ? "success" : "default"}>
                  {group.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Capacity">
                <Text strong>
                  {group.current_participants || 0} /{" "}
                  {group.max_participants || "∞"}
                </Text>
              </Descriptions.Item>
              {group.price_override && (
                <Descriptions.Item label="Price Override">
                  ${group.price_override}
                </Descriptions.Item>
              )}
            </Descriptions>
            {group.notes && (
              <>
                <Divider style={{ margin: "12px 0" }} />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Notes:
                </Text>
                <p style={{ marginTop: 4, fontSize: 14 }}>{group.notes}</p>
              </>
            )}
          </Card>

          <Card
            title={
              <Space>
                <TeamOutlined /> Participants List
              </Space>
            }
            bordered={false}
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            extra={
              <Text type="secondary">
                {group.bookings?.length || 0} Bookings
              </Text>
            }
          >
            <Table
              columns={bookingColumns}
              dataSource={group.bookings || []}
              rowKey="id"
              pagination={false}
              locale={{
                emptyText: <Empty description="No members added yet" />,
              }}
            />
          </Card>
        </div>
      </Space>

      <Modal
        title="Add Member to Group"
        open={addMemberModalVisible}
        onOk={handleAddMember}
        onCancel={() => setAddMemberModalVisible(false)}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ num_travelers: 1 }}
        >
          <Form.Item label="Link to Registered User (Optional)" name="user_id">
            <Select
              allowClear
              placeholder="Search or Select User"
              onChange={(val) => {
                const user = users.find((u) => u.id === val);
                if (user) {
                  form.setFieldsValue({
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                  });
                }
              }}
            >
              {users.map((u) => (
                <Option key={u.id} value={u.id}>
                  {u.full_name} ({u.email})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Divider style={{ margin: "12px 0" }}>Or Manual Entry</Divider>

          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>
          </div>

          <Form.Item
            name="num_travelers"
            label="Number of Travelers"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="special_requests" label="Comments">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
