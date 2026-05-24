"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Card,
  Typography,
  Modal,
  message,
  Select,
  Badge,
  Input,
} from "antd";
import {
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const STATUS_OPTIONS = ["Pending", "Contacted", "Approved", "Rejected"];

function statusColor(status) {
  if (status === "Approved") return "green";
  if (status === "Rejected") return "red";
  if (status === "Contacted") return "cyan";
  return "gold";
}

export default function PartnersPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/partner-applications", {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load applications");
      }
      setApplications(data.applications || []);
    } catch (err) {
      message.error(err.message || "Failed to fetch partner applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openDetail = (record) => {
    setSelected(record);
    setEditStatus(record.status);
    setEditNotes(record.admin_notes || "");
    setModalOpen(true);
  };

  const saveChanges = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const response = await fetch(
        `/api/admin/partner-applications/${selected.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            status: editStatus,
            admin_notes: editNotes,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update");
      }
      message.success("Application updated");
      setModalOpen(false);
      fetchApplications();
    } catch (err) {
      message.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "Submitted",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dayjs(text).format("MMM DD, YYYY HH:mm"),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      defaultSortOrder: "descend",
    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.business_type}
          </Text>
        </Space>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.email}
          </Text>
        </Space>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text) => text || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge
          status={status === "Pending" ? "processing" : "default"}
          color={statusColor(status)}
          text={status}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => openDetail(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const pendingCount = applications.filter((a) => a.status === "Pending").length;

  return (
    <div>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
        align="start"
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            <ShopOutlined style={{ marginRight: 8, color: "#f5a623" }} />
            Partner applications
          </Title>
          <Text type="secondary">
            Applications submitted from the footer &quot;Become a partner&quot;
            form.
          </Text>
        </div>
        {pendingCount > 0 && (
          <Tag color="orange">{pendingCount} pending review</Tag>
        )}
      </Space>

      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: true }}
        />
      </Card>

      <Modal
        title="Partner application"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={720}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="save"
            type="primary"
            loading={saving}
            onClick={saveChanges}
          >
            Save changes
          </Button>,
        ]}
      >
        {selected && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <Title level={4} style={{ marginBottom: 4 }}>
                {selected.company_name}
              </Title>
              <Tag>{selected.business_type}</Tag>
            </div>

            <Space wrap>
              <Text>
                <MailOutlined /> {selected.email}
              </Text>
              {selected.phone && (
                <Text>
                  <PhoneOutlined /> {selected.phone}
                </Text>
              )}
              {selected.country && <Text>{selected.country}</Text>}
              {selected.website && (
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobalOutlined /> Website
                </a>
              )}
            </Space>

            <div>
              <Text type="secondary">Contact person</Text>
              <Paragraph style={{ margin: 0 }}>{selected.contact_name}</Paragraph>
            </div>

            {selected.message && (
              <div>
                <Text type="secondary">About their services</Text>
                <Paragraph style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {selected.message}
                </Paragraph>
              </div>
            )}

            <div>
              <Text type="secondary">Status</Text>
              <Select
                style={{ width: "100%", marginTop: 8 }}
                value={editStatus}
                onChange={setEditStatus}
              >
                {STATUS_OPTIONS.map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <Text type="secondary">Internal notes</Text>
              <TextArea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Notes visible only to admins…"
                style={{ marginTop: 8 }}
              />
            </div>

            <Text type="secondary" style={{ fontSize: 12 }}>
              Submitted {dayjs(selected.created_at).format("MMMM D, YYYY HH:mm")}
            </Text>
          </Space>
        )}
      </Modal>
    </div>
  );
}
