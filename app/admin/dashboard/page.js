"use client";

import React, { useState, useEffect } from "react";
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Typography, 
  Button, 
  Space, 
  List, 
  Skeleton,
  message 
} from "antd";
import { 
  AppstoreOutlined, 
  HomeOutlined, 
  UserOutlined, 
  ArrowRightOutlined,
  HistoryOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  TeamOutlined
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard/stats");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setStats(data);
      } catch (e) {
        message.error(e.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Dashboard Overview</Title>
        <Text type="secondary">Welcome back. Here's what's happening with your holiday packages.</Text>
      </div>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="dashboard-stat-card" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Skeleton loading={loading} active>
              <Statistic
                title={<Text type="secondary">Total Packages</Text>}
                value={stats?.counts?.packages || 0}
                prefix={<ShoppingOutlined style={{ color: '#f5a623' }} />}
                valueStyle={{ color: '#1a1a1a', fontWeight: 700 }}
              />
              <div style={{ marginTop: 16 }}>
                <Link href="/admin/packages">
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                    Manage Catalog
                  </Button>
                </Link>
              </div>
            </Skeleton>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="dashboard-stat-card" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Skeleton loading={loading} active>
              <Statistic
                title={<Text type="secondary">Active Groups</Text>}
                value={stats?.counts?.groups || 0}
                prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1a1a1a', fontWeight: 700 }}
              />
              <div style={{ marginTop: 16 }}>
                <Link href="/admin/groups">
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                    Manage Groups
                  </Button>
                </Link>
              </div>
            </Skeleton>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="dashboard-stat-card" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Skeleton loading={loading} active>
              <Statistic
                title={<Text type="secondary">Open Stays</Text>}
                value={stats?.counts?.activeStays || 0}
                prefix={<CalendarOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#1a1a1a', fontWeight: 700 }}
              />
              <div style={{ marginTop: 16 }}>
                <Link href="/admin/stays">
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                    View Departures
                  </Button>
                </Link>
              </div>
            </Skeleton>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="dashboard-stat-card" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Skeleton loading={loading} active>
              <Statistic
                title={<Text type="secondary">Admin Users</Text>}
                value={stats?.counts?.users || 0}
                prefix={<UserOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#1a1a1a', fontWeight: 700 }}
              />
              <div style={{ marginTop: 16 }}>
                <Link href="/admin/users">
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                    Manage Access
                  </Button>
                </Link>
              </div>
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <HistoryOutlined />
                <span>Recent Package Updates</span>
              </Space>
            } 
            bordered={false}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <List
              loading={loading}
              dataSource={stats?.recentActivity || []}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link href={`/admin/packages/${item.id}`} key="edit">
                      <Button type="link">Edit</Button>
                    </Link>
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={`Last updated: ${new Date(item.updated_at).toLocaleDateString()} ${new Date(item.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  />
                </List.Item>
              )}
              locale={{ emptyText: "No recent updates found" }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title="Quick Actions" 
            bordered={false}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Link href="/admin/packages" style={{ width: '100%' }}>
                <Button block>Create New Package</Button>
              </Link>
              <Link href="/admin/users" style={{ width: '100%' }}>
                <Button block>Invite New Member</Button>
              </Link>
              <Link href="/" target="_blank" style={{ width: '100%' }}>
                <Button block type="dashed" icon={<ArrowRightOutlined />}>Preview Live Site</Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
