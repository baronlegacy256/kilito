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
  Popconfirm,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Typography,
  Upload,
  message,
  Layout,
  Modal,
  List,
  DatePicker,
} from "antd";
import {
  SaveOutlined,
  UploadOutlined,
  AppstoreOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

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
  category: "",
};

function parseError(error, fallback = "Something went wrong") {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.message || fallback;
}

export default function PackageEditForm({ packageId }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [carouselImages, setCarouselImages] = useState([]);
  const [pricingTiers, setPricingTiers] = useState([]);
  const [itineraryDays, setItineraryDays] = useState([]);
  const [practicalInformation, setPracticalInformation] = useState([]);
  const [stays, setStays] = useState([]);
  const [featureSections, setFeatureSections] = useState([]);

  const [modalState, setModalState] = useState({
    type: null,
    mode: "create",
    index: -1,
    values: {},
  });

  const loadPackageDetails = async (id) => {
    if (!id || id === "new") {
      form.setFieldsValue(emptyPackage);
      setCarouselImages([]);
      setPricingTiers([]);
      setItineraryDays([]);
      setPracticalInformation([]);
      setStays([]);
      setFeatureSections([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/packages/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load package details");
      const data = await res.json();

      form.setFieldsValue({
        ...emptyPackage,
        ...data.package,
      });

      setCarouselImages(data.carouselImages || []);
      setPricingTiers(data.pricingTiers || []);
      setItineraryDays(data.itineraryDays || []);
      setPracticalInformation(data.practicalInformation || []);
      setStays(data.stays || []);
      setFeatureSections(data.featureSections || []);
    } catch (e) {
      setError(parseError(e, "Failed to load package details"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackageDetails(packageId);
  }, [packageId]);

  const uploadImage = async (file, onSuccess, onError) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onSuccess?.({ url: data.url });
    } catch (e) {
      onError?.(e);
      message.error(e.message);
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
        : type === "practical"
        ? practicalInformation
        : type === "features"
        ? featureSections
        : stays;

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
    if (type === "features") apply(featureSections, setFeatureSections);
    if (type === "stays") apply(stays, setStays);

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
    if (type === "features") apply(featureSections, setFeatureSections);
    if (type === "stays") apply(stays, setStays);
  };

  const savePackage = async () => {
    setSaving(true);
    setError("");
    try {
      const values = await form.validateFields();
      const body = {
        package: { ...values },
        carouselImages,
        pricingTiers,
        itineraryDays,
        practicalInformation,
        stays,
        featureSections,
      };

      const url = packageId === "new" ? "/api/admin/packages" : `/api/admin/packages/${packageId}`;
      const method = packageId === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save package");

      message.success("Package saved successfully");
      if (packageId === "new") {
        router.push(`/admin/packages/${data.id}`);
      } else {
        loadPackageDetails(packageId);
      }
    } catch (e) {
      setError(parseError(e, "Failed to save package"));
      message.error(parseError(e, "Failed to save package"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space direction="vertical" size={0}>
          <Button icon={<ArrowLeftOutlined />} type="link" onClick={() => router.push("/admin/packages")}>
            Back to All Packages
          </Button>
          <Title level={2} style={{ margin: "8px 0 0 0" }}>
            {packageId === "new" ? "Create New Package" : "Edit Package"}
          </Title>
        </Space>
        <Button
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          loading={saving}
          onClick={savePackage}
          style={{ minWidth: 150 }}
        >
          {packageId === "new" ? "Create Package" : "Save Changes"}
        </Button>
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

      <Card loading={loading} style={{ borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <Tabs
          defaultActiveKey="basic"
          type="line"
          size="large"
          items={[
            {
              key: "basic",
              label: "1. Basic Info",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <Form form={form} layout="vertical" initialValues={emptyPackage}>
                    <Row gutter={24}>
                      <Col xs={24} md={16}>
                        <Form.Item name="title" label="Package Title" rules={[{ required: true }]}>
                          <Input size="large" />
                        </Form.Item>
                        <Form.Item name="subtitle" label="Subtitle">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={8}>
                        <Form.Item name="slug" label="URL Slug" rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <Form.Item name="is_active" label="Status">
                          <Select options={[{ value: true, label: "Active" }, { value: false, label: "Draft" }]} />
                        </Form.Item>
                        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Category is required" }]}>
                          <Select 
                            placeholder="Select a category"
                            options={[
                              { value: "Safari tour", label: "Safari tour" },
                              { value: "Cultural tour", label: "Cultural tour" },
                              { value: "Climbing and Trekking", label: "Climbing and Trekking" },
                            ]} 
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}><Form.Item name="top_background_image" label="Hero Image URL"><Input /></Form.Item></Col>
                      <Col span={12}><Form.Item name="meeting_point" label="Meeting Point"><Input /></Form.Item></Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={6}><Form.Item name="duration_label" label="Duration"><Input /></Form.Item></Col>
                      <Col span={6}><Form.Item name="max_group_size_label" label="Max Group Size"><Input /></Form.Item></Col>
                      <Col span={6}><Form.Item name="season_from" label="Season Start"><Input /></Form.Item></Col>
                      <Col span={6}><Form.Item name="season_to" label="Season End"><Input /></Form.Item></Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Card size="small" title="Technical Level">
                          <Form.Item name="technical_level_label" label="Label"><Input /></Form.Item>
                          <Form.Item name="technical_level_note" label="Note"><TextArea rows={2} /></Form.Item>
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card size="small" title="Physical Level">
                          <Form.Item name="physical_level_label" label="Label"><Input /></Form.Item>
                          <Form.Item name="physical_level_note" label="Note"><TextArea rows={2} /></Form.Item>
                        </Card>
                      </Col>
                    </Row>
                    <Form.Item name="hero_description_html" label="Hero Description (HTML)"><TextArea rows={6} /></Form.Item>
                    <Form.Item name="itinerary_intro_html" label="Itinerary Intro (HTML)"><TextArea rows={4} /></Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: "carousel",
              label: "2. Media",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Carousel Images" onAdd={() => openItemModal("carousel")} data={carouselImages} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("carousel", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove image?" onConfirm={() => removeItem("carousel", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta
                        avatar={<img src={item.image_url} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }} />}
                        title={item.alt_text || `Slide #${index + 1}`}
                        description={item.image_url}
                      />
                    </List.Item>
                  )} />
                </div>
              ),
            },
            {
              key: "pricing",
              label: "3. Pricing",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Pricing Tiers" onAdd={() => openItemModal("pricing")} data={pricingTiers} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("pricing", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove tier?" onConfirm={() => removeItem("pricing", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta
                        title={<Text strong>{item.label}</Text>}
                        description={`${item.currency_code} ${item.price_amount} | Group: ${item.min_group_size || 1}-${item.max_group_size || "∞"}`}
                      />
                    </List.Item>
                  )} />
                </div>
              ),
            },
            {
              key: "itinerary",
              label: "4. Itinerary",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Trip Itinerary" onAdd={() => openItemModal("itinerary")} data={itineraryDays} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("itinerary", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove day?" onConfirm={() => removeItem("itinerary", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta title={`${item.day_label}: ${item.title}`} description={item.duration_note} />
                    </List.Item>
                  )} />
                </div>
              ),
            },
            {
              key: "practical",
              label: "5. FAQ",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Practical Information" onAdd={() => openItemModal("practical")} data={practicalInformation} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("practical", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove question?" onConfirm={() => removeItem("practical", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta title={item.question} />
                    </List.Item>
                  )} />
                </div>
              ),
            },
            {
              key: "stays",
              label: "6. Stays",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Departure Dates (Stays)" onAdd={() => openItemModal("stays")} data={stays} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("stays", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove stay?" onConfirm={() => removeItem("stays", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta 
                        title={<Text strong>{item.start_date} {item.end_date ? `- ${item.end_date}` : ""}</Text>} 
                        description={
                          <Space split={<span style={{ color: '#ccc' }}>|</span>}>
                            <Tag color={item.status === 'Open' ? 'green' : item.status === 'Full' ? 'gold' : 'red'}>{item.status}</Tag>
                            <span>Group: {item.min_participants || 1}-{item.max_participants || "∞"}</span>
                            {item.price_override && <Tag color="blue">Price Override: {item.price_override}</Tag>}
                          </Space>
                        }
                      />
                    </List.Item>
                  )} />
                </div>
              ),
            },
            {
              key: "features",
              label: "7. Features",
              children: (
                <div style={{ paddingTop: 16 }}>
                  <EditableListCard title="Feature Sections (Included, To Bring, etc.)" onAdd={() => openItemModal("features")} data={featureSections} renderItem={(item, index) => (
                    <List.Item actions={[
                      <Button key="edit" type="link" onClick={() => openItemModal("features", "edit", index)}>Edit</Button>,
                      <Popconfirm key="delete" title="Remove section?" onConfirm={() => removeItem("features", index)}><Button type="link" danger>Delete</Button></Popconfirm>,
                    ]}>
                      <List.Item.Meta
                        title={<Text strong>{item.title}</Text>}
                        description={`Items: ${(item.items || []).length} | Icon: ${item.icon_type || 'check'}`}
                      />
                    </List.Item>
                  )} />
                </div>
              ),
            },
          ]}
        />
      </Card>

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
    <Card size="small" title={title} extra={<Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>Add</Button>}>
      <List locale={{ emptyText: "No items yet" }} dataSource={data} renderItem={renderItem} />
    </Card>
  );
}

function ItemModal({ modalState, onCancel, onSubmit, uploadImage }) {
  const [form] = Form.useForm();
  const visible = !!modalState.type;

  useEffect(() => {
    if (visible) form.setFieldsValue(modalState.values || {});
    else form.resetFields();
  }, [visible, modalState.values, form]);

  const titleMap = { carousel: "Carousel Image", pricing: "Pricing Tier", itinerary: "Itinerary Day", practical: "Practical Information", stays: "Departure Stay", features: "Feature Section" };
  const submit = async () => {
    const values = await form.validateFields();
    if (modalState.type === "features") {
      // Split the text area by newlines to form an array
      values.items = values.items_text ? values.items_text.split('\n').filter(i => i.trim() !== '') : [];
      delete values.items_text;
    }
    onSubmit(values);
  };

  // When opening features modal, convert array to text area
  useEffect(() => {
    if (visible && modalState.type === "features" && modalState.values) {
      form.setFieldsValue({
        ...modalState.values,
        items_text: (modalState.values.items || []).join('\n')
      });
    }
  }, [visible, modalState.values, modalState.type, form]);

  return (
    <Modal open={visible} title={`${modalState.mode === "edit" ? "Edit" : "Add"} ${titleMap[modalState.type] || ""}`} onCancel={onCancel} onOk={submit} destroyOnClose>
      <Form form={form} layout="vertical">
        {modalState.type === "carousel" && (
          <>
            <Form.Item name="image_url" label="Image URL" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Upload">
              <Upload showUploadList={false} customRequest={({ file, onSuccess, onError }) => uploadImage(file, (resp) => { form.setFieldValue("image_url", resp.url); onSuccess?.("ok"); }, onError)}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="alt_text" label="Alt Text"><Input /></Form.Item>
          </>
        )}
        {modalState.type === "pricing" && (
          <>
            <Form.Item name="label" label="Tier Label" rules={[{ required: true }]}><Input /></Form.Item>
            <Row gutter={12}>
              <Col span={12}><Form.Item name="min_group_size" label="Min Group"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
              <Col span={12}><Form.Item name="max_group_size" label="Max Group"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}><Form.Item name="price_amount" label="Price" rules={[{ required: true }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item></Col>
              <Col span={12}><Form.Item name="currency_code" label="Currency" rules={[{ required: true }]}><Select options={[{ value: "USD" }, { value: "EUR" }]} /></Form.Item></Col>
            </Row>
            <Form.Item name="per_label" label="Per Label"><Input placeholder="per person" /></Form.Item>
          </>
        )}
        {modalState.type === "itinerary" && (
          <>
            <Form.Item name="day_label" label="Day Label" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="description_html" label="Description HTML" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item>
            <Form.Item name="duration_note" label="Duration Note"><Input /></Form.Item>
            <Form.Item name="image_url" label="Optional Image URL"><Input /></Form.Item>
            <Form.Item label="Upload">
              <Upload showUploadList={false} customRequest={({ file, onSuccess, onError }) => uploadImage(file, (resp) => { form.setFieldValue("image_url", resp.url); onSuccess?.("ok"); }, onError)}>
                <Button icon={<UploadOutlined />}>Upload Day Image</Button>
              </Upload>
            </Form.Item>
          </>
        )}
        {modalState.type === "practical" && (
          <>
            <Form.Item name="question" label="Question" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="answer_html" label="Answer HTML" rules={[{ required: true }]}><TextArea rows={5} /></Form.Item>
          </>
        )}
        {modalState.type === "stays" && (
          <>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
                  <Input placeholder="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="end_date" label="End Date">
                  <Input placeholder="YYYY-MM-DD" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="status" label="Status" initialValue="Open">
              <Select options={[
                { value: "Open", label: "Open" },
                { value: "Full", label: "Full" },
                { value: "Closed", label: "Closed" },
                { value: "Cancelled", label: "Cancelled" },
              ]} />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}><Form.Item name="min_participants" label="Min Participants"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
              <Col span={12}><Form.Item name="max_participants" label="Max Participants"><InputNumber min={1} style={{ width: "100%" }} /></Form.Item></Col>
            </Row>
            <Form.Item name="price_override" label="Price Override (Optional)"><InputNumber min={0} style={{ width: "100%" }} placeholder="Leave empty to use pricing tiers" /></Form.Item>
          </>
        )}
        {modalState.type === "features" && (
          <>
            <Form.Item name="title" label="Section Title (e.g. Included, To bring)" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="icon_type" label="Icon Type" initialValue="check">
              <Select options={[
                { value: "check", label: "Checkmark" },
                { value: "circle", label: "Circle (Dot)" },
                { value: "cross", label: "Cross (X)" },
              ]} />
            </Form.Item>
            <Form.Item name="items_text" label="Items (One per line)" rules={[{ required: true }]}>
              <TextArea rows={6} placeholder="Professional skipper supervision&#10;Nights on board the sailboat" />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
