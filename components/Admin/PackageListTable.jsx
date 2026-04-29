"use client";

import { useEffect, useState } from "react";
import { Table, Input, Button, Space, Tag, Popconfirm, message, Typography, Select } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function PackageListTable() {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (e) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleCategoryChange = async (id, category) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update category");
      message.success("Category updated successfully");
      // Update local state to reflect change without full reload
      setPackages((prev) => 
        prev.map((pkg) => pkg.id === id ? { ...pkg, category } : pkg)
      );
    } catch (e) {
      message.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete package");
      message.success("Package deleted successfully");
      loadPackages();
    } catch (e) {
      message.error(e.message);
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchText.toLowerCase()) ||
    pkg.slug.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Package Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div style={{ fontWeight: 600 }}>{text}</div>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text) => <Tag color="blue">/{text}</Tag>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Safari tour", value: "Safari tour" },
        { text: "Cultural tour", value: "Cultural tour" },
        { text: "Climbing and Trekking", value: "Climbing and Trekking" },
      ],
      onFilter: (value, record) => record.category === value,
      render: (text, record) => (
        <Select
          defaultValue={text}
          style={{ width: "100%" }}
          onChange={(value) => handleCategoryChange(record.id, value)}
          placeholder="Set Category"
        >
          <Select.Option value="Safari tour">Safari tour</Select.Option>
          <Select.Option value="Cultural tour">Cultural tour</Select.Option>
          <Select.Option value="Climbing and Trekking">Climbing and Trekking</Select.Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (active) => (
        <Tag color={active ? "success" : "default"}>
          {active ? "ACTIVE" : "DRAFT"}
        </Tag>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => window.open(`/packages/${record.slug}`, "_blank")}
          >
            View
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            type="primary"
            ghost
            onClick={() => router.push(`/admin/packages/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this package?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Adventure Packages</Title>
          <Typography.Text type="secondary">Manage all adventure packages in the system</Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => router.push("/admin/packages/new")}
        >
          Create New Package
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by title or slug..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 400 }}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredPackages}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
}
