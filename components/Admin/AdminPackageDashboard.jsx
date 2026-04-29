"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  List,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import {
  LogoutOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const emptyPackage = {
  slug: "",
  title: "",
  subtitle: "",
  top_background_image: "",
  duration_label: "",
  technical_level_label: "",
  technical_level_note: "",
  physical_level_label: "",
  physical_level_note: "",
  max_group_size_label: "",
  season_from: "",
  season_to: "",
  hero_description_html: "",
  meeting_point: "",
  itinerary_intro_html: "",
  is_active: true,
};

function parseError(error, fallback = "Something went wrong") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.message || fallback;
}

async function adminRequest(path, router, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    ...options,
    headers: {
       ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
       ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    router.push("/admin/login");
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }

  return data;
}

export default function AdminPackageDashboard() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [packageList, setPackageList] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [carouselImages, setCarouselImages] = useState([]);
  const [pricingTiers, setPricingTiers] = useState([]);
  const [itineraryDays, setItineraryDays] = useState([]);
  const [practicalInformation, setPracticalInformation] = useState([]);

  const [modalState, setModalState] = useState({
    type: null,
    mode: "create",
    index: -1,
    values: {},
  });

  const ensureAdmin = async () => {
    try {
      await adminRequest("/api/admin/auth/session", router, { method: "GET" });
    } catch (e) {
      if (e.message === "Unauthorized") {
        return false;
      }
      setError(parseError(e, "Admin session check failed."));
      return false;
    }
    setIsAdmin(true);
    return true;
  };

  const loadPackages = async (selectionHint) => {
    setLoading(true);
    setError("");
    try {
      const data = await adminRequest("/api/admin/packages", router, { method: "GET" });
      const list = data.packages || [];
      setPackageList(list);
      if (selectionHint && list.some((p) => p.id === selectionHint)) {
        setSelectedPackageId(selectionHint);
        return;
      }
      setSelectedPackageId((prev) => prev || (list.length ? list[0].id : null));
    } catch (e) {
      setError(parseError(e, "Failed to load packages"));
    } finally {
      setLoading(false);
    }
  };

  const loadPackageDetails = async (packageId) => {
    if (!packageId) return;
    setLoading(true);
    setError("");

    try {
      const data = await adminRequest(`/api/admin/packages/${packageId}`, router, {
        method: "GET",
      });

      form.setFieldsValue({
        ...emptyPackage,
        ...data.package,
      });

      setCarouselImages(data.carouselImages || []);
      setPricingTiers(data.pricingTiers || []);
      setItineraryDays(data.itineraryDays || []);
      setPracticalInformation(data.practicalInformation || []);
    } catch (e) {
      setError(parseError(e, "Failed to load package details"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const ok = await ensureAdmin();
      if (!ok) return;
      await loadPackages();
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedPackageId) {
      loadPackageDetails(selectedPackageId);
    } else {
      form.setFieldsValue(emptyPackage);
      setCarouselImages([]);
      setPricingTiers([]);
      setItineraryDays([]);
      setPracticalInformation([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackageId]);

  const uploadImage = async (file, onSuccess, onError) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push("/admin/login");
        onError?.(new Error("Unauthorized"));
        return;
      }
      if (!res.ok) {
        onError?.(new Error(data.error || "Upload failed"));
        return;
      }
      onSuccess?.({ url: data.url });
    } catch (e) {
      onError?.(e);
    }
  };

  const openItemModal = (type, mode = "create", index = -1) => {
    const source =
      type === "carousel"
        ? carouselImages
        : type === "pricing"
        ? pricingTiers
        : type === "itinerary"
        ? itineraryDays
        : practicalInformation;

    setModalState({
      type,
      mode,
      index,
      values: mode === "edit" ? source[index] : {},
    });
  };

  const closeItemModal = () =>
    setModalState({ type: null, mode: "create", index: -1, values: {} });

  const submitModalItem = (values) => {
    const type = modalState.type;
    const mode = modalState.mode;
    const index = modalState.index;

    if (!type) return;

    const apply = (current, setter) => {
      const next = [...current];
      if (mode === "edit") {
        next[index] = { ...next[index], ...values };
      } else {
        next.push(values);
      }
      setter(next.map((item, idx) => ({ ...item, sort_order: idx + 1 })));
    };

    if (type === "carousel") apply(carouselImages, setCarouselImages);
    if (type === "pricing") apply(pricingTiers, setPricingTiers);
    if (type === "itinerary") apply(itineraryDays, setItineraryDays);
    if (type === "practical") apply(practicalInformation, setPracticalInformation);

    closeItemModal();
  };

  const removeItem = (type, index) => {
    const apply = (current, setter) => {
      const next = current.filter((_, i) => i !== index);
      setter(next.map((item, idx) => ({ ...item, sort_order: idx + 1 })));
    };

    if (type === "carousel") apply(carouselImages, setCarouselImages);
    if (type === "pricing") apply(pricingTiers, setPricingTiers);
    if (type === "itinerary") apply(itineraryDays, setItineraryDays);
    if (type === "practical") apply(practicalInformation, setPracticalInformation);
  };

  const savePackage = async () => {
    setSaving(true);
    setError("");
    try {
      const values = await form.validateFields();
      let packageId = selectedPackageId;

      const body = {
        package: { ...values },
        carouselImages,
        pricingTiers,
        itineraryDays,
        practicalInformation,
      };

      if (!packageId) {
        const created = await adminRequest("/api/admin/packages", router, {
          method: "POST",
          body: JSON.stringify(body),
        });
        packageId = created.id;
        setSelectedPackageId(packageId);
      } else {
        await adminRequest(`/api/admin/packages/${packageId}`, router, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      }

      message.success("Package saved successfully");
      await loadPackages(packageId);
      await loadPackageDetails(packageId);
    } catch (e) {
      setError(parseError(e, "Failed to save package"));
    } finally {
      setSaving(false);
    }
  };

  const createNewPackage = () => {
    setSelectedPackageId(null);
    form.setFieldsValue(emptyPackage);
    setCarouselImages([]);
    setPricingTiers([]);
    setItineraryDays([]);
    setPracticalInformation([]);
    setError("");
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      /* ignore */
    }
    router.push("/admin/login");
  };

  if (!ready || !isAdmin) {
    return <Card loading style={{ maxWidth: 980, margin: "20px auto" }} />;
  }

  const packageForm = (
    <Form form={form} layout="vertical" initialValues={emptyPackage}>
      <Row gutter={24}>
        <Col xs={24} md={16}>
          <Form.Item
            name="title"
            label="Package Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" placeholder="e.g. Serengeti Great Migration Safari" />
          </Form.Item>
          <Form.Item name="subtitle" label="Subtitle / Short Description">
            <Input placeholder="e.g. 7 days of adventure in the heart of Tanzania" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Slug is required" }]}
          >
            <Input placeholder="serengeti-migration-safari" />
          </Form.Item>
          <Form.Item name="is_active" label="Status">
            <Select
              options={[
                { value: true, label: "Active" },
                { value: false, label: "Draft / Inactive" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item name="top_background_image" label="Hero Image URL">
            <Input placeholder="https://..." />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="meeting_point" label="Meeting Point / Starting Location">
            <Input placeholder="e.g. Arusha Airport" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="duration_label" label="Duration (Label)">
            <Input placeholder="7 days" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="max_group_size_label" label="Max Group Size">
            <Input placeholder="12 People" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="season_from" label="Season Start">
            <Input placeholder="June" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="season_to" label="Season End">
            <Input placeholder="October" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Card size="small" title="Technical Level" style={{ marginBottom: 16 }}>
            <Form.Item name="technical_level_label" label="Label">
              <Input placeholder="Easy" />
            </Form.Item>
            <Form.Item name="technical_level_note" label="Note">
              <TextArea rows={2} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Physical Level" style={{ marginBottom: 16 }}>
            <Form.Item name="physical_level_label" label="Label">
              <Input placeholder="Moderate" />
            </Form.Item>
            <Form.Item name="physical_level_note" label="Note">
              <TextArea rows={2} />
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <Form.Item name="hero_description_html" label="Hero Description (HTML supported)">
        <TextArea rows={6} />
      </Form.Item>
      <Form.Item name="itinerary_intro_html" label="Itinerary Intro (HTML supported)">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            {selectedPackageId ? "Edit Package" : "Create New Package"}
          </Title>
          <Text type="secondary">Manage your adventure packages and their details.</Text>
        </div>
        <Space>
          <Button size="large" onClick={logout} icon={<LogoutOutlined />}>Logout</Button>
          <Button 
            size="large" 
            type="primary" 
            icon={<SaveOutlined />} 
            loading={saving} 
            onClick={savePackage}
            style={{ minWidth: 150 }}
          >
            Save Changes
          </Button>
        </Space>
      </div>

      {error ? (
        <Alert
          type="error"
          showIcon
          closable
          onClose={() => setError("")}
          style={{ marginBottom: 24 }}
          message={error}
        />
      ) : null}

      <Row gutter={24}>
        <Col xs={24} lg={6}>
          <Card 
            title="All Packages" 
            size="small" 
            extra={<Button type="dashed" size="small" icon={<PlusOutlined />} onClick={createNewPackage}>New</Button>}
            style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          >
            <List
              loading={loading && !ready}
              dataSource={packageList}
              renderItem={(item) => (
                <List.Item
                  style={{
                    cursor: "pointer",
                    padding: "12px 16px",
                    margin: "4px 0",
                    transition: "all 0.2s",
                    borderLeft: selectedPackageId === item.id ? "4px solid #f5a623" : "4px solid transparent",
                    background: selectedPackageId === item.id ? "#fff9e8" : "transparent",
                    borderRadius: "0 6px 6px 0",
                  }}
                  onClick={() => setSelectedPackageId(item.id)}
                >
                  <List.Item.Meta
                    title={<Text strong style={{ fontSize: 13 }}>{item.title}</Text>}
                    description={<Text type="secondary" style={{ fontSize: 11 }}>/{item.slug}</Text>}
                  />
                  {item.is_active ? <Tag color="success" style={{ fontSize: 10 }}>Active</Tag> : <Tag style={{ fontSize: 10 }}>Draft</Tag>}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={18}>
          <Card 
            style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
            loading={loading && ready}
          >
            <Tabs
              defaultActiveKey="basic"
              type="line"
              size="large"
              tabBarGutter={32}
              items={[
                {
                  key: "basic",
                  label: "1. Basic Info",
                  children: <div style={{ paddingTop: 16 }}>{packageForm}</div>,
                },
                {
                  key: "carousel",
                  label: "2. Media",
                  children: (
                    <div style={{ paddingTop: 16 }}>
                      <EditableListCard
                        title="Carousel Images"
                        onAdd={() => openItemModal("carousel")}
                        data={carouselImages}
                        renderItem={(item, index) => (
                          <List.Item
                            actions={[
                              <Button key="edit" type="link" onClick={() => openItemModal("carousel", "edit", index)}>Edit</Button>,
                              <Popconfirm key="delete" title="Remove image?" onConfirm={() => removeItem("carousel", index)}>
                                <Button type="link" danger>Delete</Button>
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta
                              avatar={<img src={item.image_url} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }} />}
                              title={item.alt_text || `Slide #${index + 1}`}
                              description={item.image_url}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  ),
                },
                {
                  key: "pricing",
                  label: "3. Pricing",
                  children: (
                    <div style={{ paddingTop: 16 }}>
                      <EditableListCard
                        title="Pricing Tiers"
                        onAdd={() => openItemModal("pricing")}
                        data={pricingTiers}
                        renderItem={(item, index) => (
                          <List.Item
                            actions={[
                              <Button key="edit" type="link" onClick={() => openItemModal("pricing", "edit", index)}>Edit</Button>,
                              <Popconfirm key="delete" title="Remove tier?" onConfirm={() => removeItem("pricing", index)}>
                                <Button type="link" danger>Delete</Button>
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta
                              title={<Text strong>{item.label}</Text>}
                              description={
                                <Space split={<span>|</span>}>
                                  <Text>{item.currency_code} {item.price_amount}</Text>
                                  <Text>Group: {item.min_group_size || 1}-{item.max_group_size || "∞"}</Text>
                                  <Text>{item.per_label || "per person"}</Text>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  ),
                },
                {
                  key: "itinerary",
                  label: "4. Itinerary",
                  children: (
                    <div style={{ paddingTop: 16 }}>
                      <EditableListCard
                        title="Trip Itinerary"
                        onAdd={() => openItemModal("itinerary")}
                        data={itineraryDays}
                        renderItem={(item, index) => (
                          <List.Item
                            actions={[
                              <Button key="edit" type="link" onClick={() => openItemModal("itinerary", "edit", index)}>Edit</Button>,
                              <Popconfirm key="delete" title="Remove day?" onConfirm={() => removeItem("itinerary", index)}>
                                <Button type="link" danger>Delete</Button>
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta
                              avatar={item.image_url ? <img src={item.image_url} alt="" style={{ width: 50, height: 50, borderRadius: 25, objectFit: "cover" }} /> : <div style={{ width: 50, height: 50, borderRadius: 25, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}><AppstoreOutlined /></div>}
                              title={<Text strong>{item.day_label}: {item.title}</Text>}
                              description={item.duration_note || "No duration specified"}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  ),
                },
                {
                  key: "practical",
                  label: "5. FAQ",
                  children: (
                    <div style={{ paddingTop: 16 }}>
                      <EditableListCard
                        title="Practical Information & FAQ"
                        onAdd={() => openItemModal("practical")}
                        data={practicalInformation}
                        renderItem={(item, index) => (
                          <List.Item
                            actions={[
                              <Button key="edit" type="link" onClick={() => openItemModal("practical", "edit", index)}>Edit</Button>,
                              <Popconfirm key="delete" title="Remove question?" onConfirm={() => removeItem("practical", index)}>
                                <Button type="link" danger>Delete</Button>
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta title={item.question} />
                          </List.Item>
                        )}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <ItemModal
        modalState={modalState}
        onCancel={closeItemModal}
        onSubmit={submitModalItem}
        uploadImage={uploadImage}
      />
    </div>
  );
}

function EditableListCard({ title, onAdd, data, renderItem }) {
  return (
    <Card
      size="small"
      title={title}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Add
        </Button>
      }
    >
      <List
        locale={{ emptyText: "No items yet" }}
        dataSource={data}
        renderItem={renderItem}
      />
    </Card>
  );
}

function ItemModal({ modalState, onCancel, onSubmit, uploadImage }) {
  const [form] = Form.useForm();
  const visible = !!modalState.type;

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(modalState.values || {});
    } else {
      form.resetFields();
    }
  }, [visible, modalState.values, form]);

  const titleMap = {
    carousel: "Carousel Image",
    pricing: "Pricing Tier",
    itinerary: "Itinerary Day",
    practical: "Practical Information",
  };

  const submit = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  return (
    <Modal
      open={visible}
      title={`${modalState.mode === "edit" ? "Edit" : "Add"} ${
        titleMap[modalState.type] || ""
      }`}
      onCancel={onCancel}
      onOk={submit}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        {modalState.type === "carousel" ? (
          <>
            <Form.Item
              name="image_url"
              label="Image URL"
              rules={[{ required: true, message: "Image URL is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Upload with Ant Design">
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={({ file, onSuccess, onError }) =>
                  uploadImage(file, (resp) => {
                    form.setFieldValue("image_url", resp.url);
                    onSuccess?.("ok");
                  }, onError)
                }
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="alt_text" label="Alt Text">
              <Input />
            </Form.Item>
          </>
        ) : null}

        {modalState.type === "pricing" ? (
          <>
            <Form.Item name="label" label="Tier Label" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="min_group_size" label="Min Group">
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="max_group_size" label="Max Group">
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="price_amount" label="Price" rules={[{ required: true }]}>
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="currency_code"
                  label="Currency"
                  rules={[{ required: true }]}
                >
                  <Select options={[{ value: "USD" }, { value: "EUR" }]} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="per_label" label="Per Label">
              <Input placeholder="per person" />
            </Form.Item>
          </>
        ) : null}

        {modalState.type === "itinerary" ? (
          <>
            <Form.Item name="day_label" label="Day Label" rules={[{ required: true }]}>
              <Input placeholder="Day 1" />
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description_html" label="Description HTML" rules={[{ required: true }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="duration_note" label="Duration Note">
              <Input placeholder="4h of navigation" />
            </Form.Item>
            <Form.Item name="image_url" label="Optional Image URL">
              <Input />
            </Form.Item>
            <Form.Item label="Upload optional image">
              <Upload
                accept="image/*"
                showUploadList={false}
                customRequest={({ file, onSuccess, onError }) =>
                  uploadImage(file, (resp) => {
                    form.setFieldValue("image_url", resp.url);
                    onSuccess?.("ok");
                  }, onError)
                }
              >
                <Button icon={<UploadOutlined />}>Upload Day Image</Button>
              </Upload>
            </Form.Item>
          </>
        ) : null}

        {modalState.type === "practical" ? (
          <>
            <Form.Item name="question" label="Question" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="answer_html" label="Answer HTML" rules={[{ required: true }]}>
              <TextArea rows={5} />
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Modal>
  );
}
