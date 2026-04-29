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
  Tooltip
} from "antd";
import { 
  DeleteOutlined, 
  EditOutlined, 
  CalendarOutlined, 
  ArrowLeftOutlined,
  ExportOutlined
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function AdminStaysPage() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStays = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stays");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStays(data.stays || []);
    } catch (e) {
      message.error(e.message || "Failed to load stays");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStays();
  }, []);

  const deleteStay = async (id) => {
    try {
      const res = await fetch(`/api/admin/stays/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      message.success("Stay deleted");
      setStays(stays.filter(s => s.id !== id));
    } catch (e) {
      message.error(e.message || "Failed to delete stay");
    }
  };

  const columns = [
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      render: (date) => (
        <Space>
          <CalendarOutlined style={{ color: "#f5a623" }} />
          <Text strong>{date}</Text>
        </Space>
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => date || "N/A",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      render: (pkg) => (
        <Space>
          <Text>{pkg?.title || "Unknown"}</Text>
          {pkg?.slug && (
            <Link href={`/packages/${pkg.slug}`} target="_blank">
              <Tooltip title="View public page">
                <ExportOutlined style={{ fontSize: 12, color: "#1890ff" }} />
              </Tooltip>
            </Link>
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
        if (status === "Open") color = "green";
        if (status === "Full") color = "gold";
        if (status === "Closed") color = "red";
        if (status === "Cancelled") color = "default";
        return <Tag color={color}>{status || "Open"}</Tag>;
      },
    },
    {
      title: "Participants",
      key: "participants",
      render: (_, record) => (
        <Badge 
          count={`${record.current_participants || 0} / ${record.max_participants || '∞'}`} 
          style={{ backgroundColor: (record.current_participants >= record.max_participants && record.max_participants) ? '#f5222d' : '#52c41a' }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/packages/${record.package_id}`}>
            <Button icon={<EditOutlined />} size="small">Manage Package</Button>
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this stay?"
            onConfirm={() => deleteStay(record.id)}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>Package Stays</Title>
            <Text type="secondary">Manage all departure dates and availability across todos los packages</Text>
          </div>
          <Link href="/admin/packages">
            <Button icon={<ArrowLeftOutlined />}>Back to Packages</Button>
          </Link>
        </div>

        <Card variant="outlined">
          <Table 
            columns={columns} 
            dataSource={stays} 
            rowKey="id" 
            loading={loading}
            pagination={{ pageSize: 15 }}
          />
        </Card>
      </Space>
    </div>
  );
}
