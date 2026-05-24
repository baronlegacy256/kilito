'use client'

import React, { useEffect, useMemo } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Alert,
  Result,
  ConfigProvider,
} from 'antd'
import { PHONE_COUNTRY_CODES, getDialCode } from '@/lib/phone-country-codes'
import './partner-modal.css'

const { TextArea } = Input

const BUSINESS_TYPES = [
  'Safari / tour operator',
  'Safari guide',
  'Travel agency',
  'Lodge / accommodation',
  'Transport provider',
  'Activity provider',
  'Other',
]

function PartnerApplicationModal({ isOpen, onClose }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')

  const countryOptions = useMemo(
    () =>
      PHONE_COUNTRY_CODES.map(({ iso, name, dial }) => ({
        value: iso,
        label: `${name} (+${dial})`,
      })),
    []
  )

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    form.resetFields()
    setSuccess(false)
    setError('')
    setLoading(false)
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    setError('')

    try {
      const phone = values.mobilePhone?.trim()
        ? `+${getDialCode(values.mobilePhoneCountry || 'TZ')} ${values.mobilePhone.trim()}`
        : null

      const response = await fetch('/api/partner-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: values.companyName,
          contact_name: values.contactName,
          email: values.email,
          phone,
          country: values.country,
          website: values.website,
          business_type: values.businessType,
          message: values.message,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application.')
      }

      setSuccess(true)
      setTimeout(handleClose, 3500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffae3b',
          borderRadius: 8,
          fontSize: 16,
        },
      }}
    >
      <Modal
        open={isOpen}
        title={
          success
            ? 'Application received'
            : 'Become a Kili to Savanna partner'
        }
        onCancel={handleClose}
        centered
        destroyOnClose
        maskClosable
        width={680}
        wrapClassName="partner-modal-wrap"
        footer={
          success
            ? [
                <Button key="close" type="primary" onClick={handleClose}>
                  Close
                </Button>,
              ]
            : [
                <Button key="cancel" onClick={handleClose}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={() => form.submit()}
                >
                  Submit application
                </Button>,
              ]
        }
      >
        {success ? (
          <div className="partner-modal-success">
            <Result
              status="success"
              title="Thank you for applying"
              subTitle="Our team will review your application and contact you within a few business days."
            />
          </div>
        ) : (
          <>
            <p className="partner-modal-intro">
              Join our network of adventure professionals. Tell us about your
              business and we will get back to you shortly.
            </p>

            {error && (
              <Alert
                type="error"
                message={error}
                showIcon
                closable
                onClose={() => setError('')}
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark
              initialValues={{ mobilePhoneCountry: 'TZ' }}
              scrollToFirstError
            >
              <p className="partner-modal-section-title">Your business</p>

              <Form.Item
                name="companyName"
                label="Company / organization name"
                rules={[
                  { required: true, message: 'Please enter your company name' },
                ]}
              >
                <Input placeholder="Your company name" size="large" />
              </Form.Item>

              <Form.Item
                name="businessType"
                label="Business type"
                rules={[
                  { required: true, message: 'Please select a business type' },
                ]}
              >
                <Select
                  placeholder="Select business type"
                  size="large"
                  options={BUSINESS_TYPES.map((t) => ({ value: t, label: t }))}
                />
              </Form.Item>

              <Form.Item name="country" label="Country / region">
                <Input placeholder="e.g. Tanzania" size="large" />
              </Form.Item>

              <Form.Item name="website" label="Website">
                <Input placeholder="https://your-website.com" size="large" />
              </Form.Item>

              <p className="partner-modal-section-title">Contact details</p>

              <Form.Item
                name="contactName"
                label="Contact name"
                rules={[
                  { required: true, message: 'Please enter a contact name' },
                ]}
              >
                <Input placeholder="Full name" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  type="email"
                  placeholder="you@company.com"
                  size="large"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item label="Phone">
                <div className="partner-modal-phone-row">
                  <Form.Item name="mobilePhoneCountry" noStyle>
                    <Select
                      size="large"
                      showSearch
                      optionFilterProp="label"
                      options={countryOptions}
                      aria-label="Country code"
                    />
                  </Form.Item>
                  <Form.Item name="mobilePhone" noStyle>
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      size="large"
                      autoComplete="tel"
                    />
                  </Form.Item>
                </div>
              </Form.Item>

              <p className="partner-modal-section-title">About your services</p>

              <Form.Item
                name="message"
                label="Description"
                extra="Experience, destinations, group sizes, languages, etc."
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about your business…"
                  maxLength={3000}
                  showCount
                />
              </Form.Item>
            </Form>

            <p
              style={{
                margin: '8px 0 0',
                fontSize: 13,
                color: '#6b6560',
                textAlign: 'center',
              }}
            >
              We typically respond within 2–5 business days.
            </p>
          </>
        )}
      </Modal>
    </ConfigProvider>
  )
}

export default PartnerApplicationModal
