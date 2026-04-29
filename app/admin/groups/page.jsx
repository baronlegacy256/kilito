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
  Badge,
  Tooltip,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  PlusOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [form] = Form.useForm();

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/groups");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setGroups(data.groups || []);
    } catch (e) {
      message.error(e.message || "Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (e) {
      console.error("Failed to load packages", e);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchPackages();
  }, []);

  const showModal = (group = null) => {
    setEditingGroup(group);
    if (group) {
      form.setFieldsValue({
        ...group,
        start_date: dayjs(group.start_date),
        end_date: group.end_date ? dayjs(group.end_date) : null,
      });
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date ? values.end_date.format("YYYY-MM-DD") : null,
      };

      const url = editingGroup
        ? `/api/admin/groups/${editingGroup.id}`
        : "/api/admin/groups";
      const method = editingGroup ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      message.success(`Group ${editingGroup ? "updated" : "created"}`);
      setModalVisible(false);
      fetchGroups();
    } catch (e) {
      if (e.errorFields) return;
      message.error(e.message || "Operation failed");
    }
  };

  const deleteGroup = async (id) => {
    try {
      const res = await fetch(`/api/admin/groups/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("Group deleted");
      setGroups(groups.filter((g) => g.id !== id));
    } catch (e) {
      message.error(e.message || "Failed to delete group");
    }
  };

  const columns = [
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{name || "Unnamed Group"}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.package?.title}
          </Text>
        </Space>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      render: (date) => (
        <Space>
          <CalendarOutlined style={{ color: "#f5a623" }} />
          <Text>{dayjs(date).format("MMM DD, YYYY")}</Text>
        </Space>
      ),
    },
    {
      title: "Size",
      key: "size",
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Badge
            count={`${record.current_participants || 0} / ${record.max_participants || "∞"}`}
            style={{
              backgroundColor:
                record.current_participants >= record.max_participants &&
                record.max_participants
                  ? "#f5222d"
                  : "#52c41a",
            }}
          />
          {record.min_participants > 1 && (
            <Text type="secondary" style={{ fontSize: 11 }}>
              Min: {record.min_participants}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Open") color = "success";
        if (status === "Full") color = "warning";
        if (status === "Closed") color = "error";
        if (status === "Cancelled") color = "default";
        return <Tag color={color}>{status || "Open"}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/groups/${record.id}`}>
            <Button icon={<EyeOutlined />} size="small">
              Details
            </Button>
          </Link>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => deleteGroup(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
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
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Groups Management
            </Title>
            <Text type="secondary">
              Manage tour groups, start dates, and participant lists
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Create New Group
          </Button>
        </div>

        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
        >
          <Table
            columns={columns}
            dataSource={groups}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>

      <Modal
        title={editingGroup ? "Edit Group" : "Create New Group"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: "Open", min_participants: 1 }}
        >
          <Form.Item
            name="package_id"
            label="Package"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a package">
              {packages.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="name" label="Group Name (Optional)">
            <Input placeholder="e.g. Summer Expedition 2024" />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="start_date"
              label="Start Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="end_date" label="End Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item name="min_participants" label="Min Size">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="max_participants" label="Max Size">
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Option value="Open">Open</Option>
                <Option value="Full">Full</Option>
                <Option value="Closed">Closed</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="price_override" label="Price Override (Optional)">
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item name="notes" label="Admin Notes">
            <Input.TextArea
              rows={3}
              placeholder="Internal notes about this group..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
