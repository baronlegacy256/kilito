"use client";

import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Card, Typography, Modal, message, Select, Badge } from "antd";
import { 
  EyeOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  TeamOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      message.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        message.success(`Status updated to ${status}`);
        fetchBookings();
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, status });
        }
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      message.error("Error updating status");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dayjs(text).format("MMM DD, YYYY HH:mm"),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Customer",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
        </Space>
      ),
    },
    {
      title: "Package",
      dataIndex: "packages",
      key: "package",
      render: (pkg) => pkg?.title || "N/A",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "Booking" ? "blue" : "orange"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "gold";
        if (status === "Confirmed") color = "green";
        if (status === "Cancelled") color = "red";
        if (status === "Followed Up") color = "cyan";
        return <Badge status={status === "Pending" ? "processing" : "default"} color={color} text={status} />;
      },
    },
    {
      title: "Travelers",
      dataIndex: "num_travelers",
      key: "num_travelers",
      render: (count) => (
        <Space>
          <TeamOutlined /> {count}
        </Space>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => {
            setSelectedBooking(record);
            setIsModalOpen(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2}>Bookings & Quote Requests</Title>
        <Button type="default" onClick={fetchBookings} loading={loading}>Refresh</Button>
      </div>

      <Card>
        <Table 
          columns={columns} 
          dataSource={bookings} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Booking Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>Close</Button>,
          <Select 
            key="status"
            value={selectedBooking?.status} 
            style={{ width: 150, marginLeft: 10 }}
            onChange={(value) => updateBookingStatus(selectedBooking.id, value)}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Followed Up">Followed Up</Option>
            <Option value="Confirmed">Confirmed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        ]}
        width={700}
      >
        {selectedBooking && (
          <div style={{ padding: "10px 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: 20 }}>
              <div>
                <Text type="secondary">Customer Information</Text>
                <div style={{ marginTop: 8 }}>
                  <Title level={4} style={{ margin: "0 0 8px 0" }}>{selectedBooking.full_name}</Title>
                  <Space direction="vertical">
                    <Text><MailOutlined /> {selectedBooking.email}</Text>
                    <Text><PhoneOutlined /> {selectedBooking.phone || "No phone provided"}</Text>
                  </Space>
                </div>
              </div>
              <div>
                <Text type="secondary">Booking Information</Text>
                <div style={{ marginTop: 8 }}>
                  <Space direction="vertical">
                    <Text strong>Package: {selectedBooking.packages?.title || "N/A"}</Text>
                    <Text><CalendarOutlined /> Requested Date: {selectedBooking.start_date ? dayjs(selectedBooking.start_date).format("MMM DD, YYYY") : "Not specified"}</Text>
                    <Text><TeamOutlined /> Travelers: {selectedBooking.num_travelers}</Text>
                    <Tag color={selectedBooking.type === "Booking" ? "blue" : "orange"}>{selectedBooking.type}</Tag>
                  </Space>
                </div>
              </div>
            </div>

            <Card title="Special Requests" size="small" style={{ background: "#f9f9f9" }}>
              <Paragraph style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {selectedBooking.special_requests || "No special requests."}
              </Paragraph>
            </Card>

            <div style={{ marginTop: 20 }}>
              <Text type="secondary">Submission Date: {dayjs(selectedBooking.created_at).format("MMMM DD, YYYY HH:mm")}</Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
