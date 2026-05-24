'use client'

import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { PHONE_COUNTRY_CODES, getDialCode } from '@/lib/phone-country-codes'
import './booking-modal.css'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
  mobilePhoneCountry: 'TZ',
  nbParticipants: '',
  startingDate: '',
  endingDate: '',
  comment: '',
  isCguAccepted: false,
  isNewsletterSubscribed: false,
}

const BENEFITS = [
  'Personalized quote',
  'Your case will be monitored by a specialist advisor',
  'Confirmation and payment once the quote is validated',
]

function BookingModal({ isOpen, onClose, packageData, type = 'Booking' }) {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const requestTitle =
    type === 'Quote' ? 'Your quote request' : 'Your booking request'

  const packageTitle =
    packageData?.title || 'The essentials of Africa Safari'

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }))
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM)
    setSuccess(false)
    setError('')
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.isCguAccepted) {
      setError('Please accept the general terms of use.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: `+${getDialCode(formData.mobilePhoneCountry)} ${formData.mobilePhone}`,
          num_travelers: parseInt(formData.nbParticipants) || 1,
          start_date: formData.startingDate,
          special_requests: formData.comment,
          package_id: packageData?.id,
          type: type,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit request. Please try again.')
      }

      setSuccess(true)
      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      title={null}
      closable={false}
      centered
      destroyOnClose
      maskClosable
      width={640}
      wrapClassName="booking-demand-modal-wrap"
      zIndex={10000}
      styles={{ body: { padding: 0 } }}
    >
      <div id="booking-demand-modal" className="booking-modal">
        <header className="booking-modal__header">
          <button
            type="button"
            className="booking-modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            <i className="fa fa-times" aria-hidden="true" />
          </button>
          <h2 className="booking-modal__heading">
            {success
              ? 'Thank you — we received your request'
              : requestTitle}
          </h2>
          {!success && (
            <div className="booking-modal__package">
              <p className="booking-modal__package-title">{packageTitle}</p>
              <p className="booking-modal__package-org">
                Organized by Kili to Savanna
              </p>
            </div>
          )}
        </header>

        <div className="booking-modal__body">
          {success ? (
            <div className="booking-modal__success">
              <div className="booking-modal__success-icon">
                <i className="fa fa-check" aria-hidden="true" />
              </div>
              <h4>Request received</h4>
              <p>
                A specialist advisor will contact you shortly with a quote.
                Dates and prices remain indicative until your booking is
                confirmed.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="booking-demand-form" autoComplete="off">
              <div className="booking-modal__notice">
                <i
                  className="fa fa-info-circle booking-modal__notice-icon"
                  aria-hidden="true"
                />
                <span>
                  Following your request, a specialist advisor will contact you
                  with a quote. Dates and prices are indicative until confirmed.
                </span>
              </div>

              <ul className="booking-modal__benefits">
                {BENEFITS.map((text) => (
                  <li key={text} className="booking-modal__benefit">
                    <i className="fa fa-check" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <section className="booking-modal__section" aria-labelledby="bm-trip">
                <h3 id="bm-trip" className="booking-modal__section-title">
                  Trip details
                </h3>
                <div className="booking-modal__fields">
                  <div className="booking-modal__field">
                    <span className="booking-modal__label">Preferred dates</span>
                    <div className="booking-modal__field-row">
                      <div className="booking-modal__field">
                        <label className="booking-modal__label" htmlFor="startingDate">
                          Start *
                        </label>
                        <input
                          id="startingDate"
                          type="date"
                          className="booking-modal__input"
                          name="startingDate"
                          value={formData.startingDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="booking-modal__field">
                        <label className="booking-modal__label" htmlFor="endingDate">
                          End
                        </label>
                        <input
                          id="endingDate"
                          type="date"
                          className="booking-modal__input"
                          name="endingDate"
                          value={formData.endingDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="booking-modal__field">
                    <label className="booking-modal__label" htmlFor="nbParticipants">
                      Number of travelers *
                    </label>
                    <select
                      id="nbParticipants"
                      className="booking-modal__select"
                      name="nbParticipants"
                      value={formData.nbParticipants}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      {[...Array(30)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className="booking-modal__section" aria-labelledby="bm-contact">
                <h3 id="bm-contact" className="booking-modal__section-title">
                  Your contact details
                </h3>
                <p className="booking-modal__section-desc">
                  We use this information only to follow up on your request.
                </p>
                <div className="booking-modal__fields">
                  <div className="booking-modal__field">
                    <label className="booking-modal__label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="booking-modal__input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="booking-modal__field">
                    <span className="booking-modal__label">Phone *</span>
                    <div className="booking-modal__field-row booking-modal__field-row--phone">
                      <select
                        className="booking-modal__select booking-modal__country-select"
                        name="mobilePhoneCountry"
                        value={formData.mobilePhoneCountry}
                        onChange={handleChange}
                        required
                        aria-label="Country code"
                      >
                        {PHONE_COUNTRY_CODES.map(({ iso, name, dial }) => (
                          <option key={iso} value={iso}>
                            {name} (+{dial})
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        className="booking-modal__input"
                        name="mobilePhone"
                        value={formData.mobilePhone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div className="booking-modal__field-row">
                    <div className="booking-modal__field">
                      <label className="booking-modal__label" htmlFor="lastName">
                        Last name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="booking-modal__input"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        autoComplete="family-name"
                      />
                    </div>
                    <div className="booking-modal__field">
                      <label className="booking-modal__label" htmlFor="firstName">
                        First name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="booking-modal__input"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        autoComplete="given-name"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="booking-modal__section" aria-labelledby="bm-extra">
                <h3 id="bm-extra" className="booking-modal__section-title">
                  Additional information
                </h3>
                <p className="booking-modal__hint">
                  Best time to reach you, travel experience, or anything else that
                  helps us prepare your quote.
                </p>
                <div className="booking-modal__field">
                  <textarea
                    className="booking-modal__textarea"
                    name="comment"
                    rows={4}
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Tell us more about your request…"
                    maxLength={2000}
                  />
                  <div className="booking-modal__char-count">
                    {formData.comment.length}/2000
                  </div>
                </div>
              </section>

              <section className="booking-modal__section booking-modal__section--submit">
                <div className="booking-modal__checks">
                  <label className="booking-modal__check">
                    <input
                      type="checkbox"
                      name="isCguAccepted"
                      checked={formData.isCguAccepted}
                      onChange={handleChange}
                      required
                    />
                    <span className="booking-modal__check-text">
                      I have read and agree to the{' '}
                      <a href="#">General Terms and Conditions of Use</a>.
                    </span>
                  </label>
                  <label className="booking-modal__check">
                    <input
                      type="checkbox"
                      name="isNewsletterSubscribed"
                      checked={formData.isNewsletterSubscribed}
                      onChange={handleChange}
                    />
                    <span className="booking-modal__check-text">
                      I would like to receive Kili to Savanna news (new dates,
                      trips…)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="booking-modal__submit"
                  disabled={loading}
                >
                  {loading ? 'Sending…' : 'Make a request'}
                </button>

                {error && <p className="booking-modal__error">{error}</p>}

                <p className="booking-modal__footer-note">
                  You will be contacted within 1–24 hours depending on urgency.
                </p>
              </section>
            </form>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default BookingModal
