'use client'
import React, { useState } from 'react'

function BookingModal({ isOpen, onClose, packageData, type = 'Booking' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    mobilePhoneCode: '255',
    nbParticipants: '',
    startingDate: '',
    endingDate: '',
    comment: '',
    isCguAccepted: false,
    isNewsletterSubscribed: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
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
          phone: `+${formData.mobilePhoneCode} ${formData.mobilePhone}`,
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
        onClose()
        setSuccess(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobilePhone: '',
          mobilePhoneCode: '255',
          nbParticipants: '',
          startingDate: '',
          endingDate: '',
          comment: '',
          isCguAccepted: false,
          isNewsletterSubscribed: false
        })
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="modal fade booking-modal in" 
      id="booking-demand-modal" 
      tabIndex="-1" 
      role="dialog" 
      aria-labelledby="bookingModal" 
      aria-hidden="false" 
      data-backdrop="static" 
      style={{ 
        display: 'block', 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        overflowY: 'auto',
        zIndex: 10000,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <div className="modal-dialog" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose} aria-hidden="true" style={{ fontSize: '24px', position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none' }}>
              <i className="fa fa-times-circle"></i>
            </button>
            <div className="modal-title hidden-xs">
              <h3>
                {success ? "Merci ! Nous avons bien reçu votre demande" : "Your booking request"}
              </h3>
            </div>
            
            {!success && (
              <div id="booking-modal-title-before">
                
                <div className="modal-title visible-xs">
                  <h3>Your booking request</h3>
                </div>
                <div className="modal-sub-title">
                  <div className="subtitle">
                    <div className="title" style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f5a623' }}>
                      {packageData?.title || "The essentials of Africa Safari"}
                    </div>
                    <div className="pro" style={{ fontSize: '1rem', color: '#777' }}>
                      organized by Kili to Savanna
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-body">
            {success ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <i className="fa fa-check-circle" style={{ fontSize: '64px', color: '#f5a623', marginBottom: '20px' }}></i>
                <h4>Request Received!</h4>
                <p>Following your request, a specialist advisor will contact you to provide a quote. Dates and prices are indicative only until the booking is confirmed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="booking-demand-form" autoComplete="off">
                <input type="hidden" name="type" value="BOOK_NOW" id="type" />

                <div id="booking-form-inner">
                  <div className="process info" style={{ background: '#fdf5e6', padding: '15px', borderRadius: '4px', marginBottom: '20px', fontSize: '1rem', color: '#8a6d3b', border: '1px solid #faebcc' }}>
                    Following your request, a specialist advisor will contact you to provide a quote. Dates and prices are indicative only until the booking is confirmed.
                  </div>
                  
                  <div className="reinsurance" style={{ marginBottom: '25px' }}>
                    <div className="reinsurance-line" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#555' }}>
                      <i className="fa fa-check icon" aria-hidden="true" style={{ color: '#4caf50' }}></i>
                      <span className="text">Personalized quote</span>
                    </div>
                    <div className="reinsurance-line" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#555' }}>
                      <i className="fa fa-check icon" aria-hidden="true" style={{ color: '#4caf50' }}></i>
                      <span className="text">Your case will be monitored by a specialist advisor.</span>
                    </div>
                    <div className="reinsurance-line" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#555' }}>
                      <i className="fa fa-check icon" aria-hidden="true" style={{ color: '#4caf50' }}></i>
                      <span className="text">Confirmation and payment once the quote is validated</span>
                    </div>
                  </div>

                  <div className="modal-inner-container dates-container" style={{ padding: '20px 0', borderBottom: '1px solid #eee', paddingTop: 0 }}>
                    <div className="row">
                      <div className="col-sm-4">
                        <label className="form-field-label" style={{ fontWeight: '600', fontSize: '1rem', color: '#444', marginBottom: '8px', display: 'block' }}>Preferred dates</label>
                      </div>

                      <div className="col-sm-8">
                        <div className="row date-clone date-range">
                          <div className="col-sm-5">
                            <label className="form-field-label visible-xs">Beginning *</label>
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="date" 
                                className="starting-date" 
                                name="startingDate" 
                                value={formData.startingDate}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>

                          <div className="col-sm-5">
                            <label className="form-field-label visible-xs">END</label>
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="date" 
                                className="ending-date" 
                                name="endingDate" 
                                value={formData.endingDate}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-inner-container" style={{ padding: '20px 0', borderBottom: '1px solid #eee' }}>
                    <div className="row form-row">
                      <div className="col-sm-4">
                        <label className="form-field-label" style={{ fontWeight: '600', fontSize: '1rem', color: '#444', marginBottom: '8px', display: 'block' }}>How many of you are there?</label>
                      </div>

                      <div className="col-sm-7">
                        <div className="custom-form-field stretch-width with-icon separated">
                          <select 
                            name="nbParticipants" 
                            value={formData.nbParticipants}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                          >
                            <option value="">Select</option>
                            {[...Array(30)].map((_, i) => (
                              <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'person' : 'people'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-inner-container" style={{ padding: '20px 0', borderBottom: '1px solid #eee' }}>
                    <label className="form-field-label section-title" style={{ fontWeight: '600', fontSize: '1.25rem', color: '#333', marginBottom: '15px', display: 'block' }}>Your contact details</label>
                    <div className="info" style={{ fontSize: '1rem', color: '#666', marginBottom: '15px' }}>
                      This information is necessary for the Kili to Savanna teams to contact you and follow up on your booking. It is used for this purpose only.
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row form-row" style={{ marginBottom: '15px' }}>
                          <div className="col-sm-4">
                            <label className="form-field-label soft-label" style={{ fontWeight: '400', color: '#666' }}>Email *</label>
                          </div>
                          <div className="col-sm-8">
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '15px' }}>
                      <div className="col-sm-12">
                        <div className="row form-row">
                          <div className="col-sm-4">
                            <label className="form-field-label soft-label" style={{ fontWeight: '400', color: '#666' }}>Phone *</label>
                          </div>
                          <div className="col-xs-4 col-sm-3">
                            <div className="custom-form-field stretch-width separated">
                              <select 
                                name="mobilePhoneCode" 
                                value={formData.mobilePhoneCode}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              >
                                <option value="255">TZA +255</option>
                                <option value="254">KEN +254</option>
                                <option value="27">ZAF +27</option>
                                <option value="33">FRA +33</option>
                                <option value="1">USA +1</option>
                                <option value="44">GBR +44</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xs-8 col-sm-5">
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="tel" 
                                name="mobilePhone" 
                                value={formData.mobilePhone}
                                onChange={handleChange}
                                placeholder="0XXXXXXXX" 
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '15px' }}>
                      <div className="col-sm-12">
                        <div className="row form-row">
                          <div className="col-sm-4">
                            <label className="form-field-label soft-label" style={{ fontWeight: '400', color: '#666' }}>Name *</label>
                          </div>
                          <div className="col-sm-8">
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="text" 
                                name="lastName" 
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row form-row">
                          <div className="col-sm-4">
                            <label className="form-field-label soft-label" style={{ fontWeight: '400', color: '#666' }}>First name *</label>
                          </div>
                          <div className="col-sm-8">
                            <div className="custom-form-field stretch-width separated">
                              <input 
                                type="text" 
                                name="firstName" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-inner-container" style={{ padding: '20px 0', borderBottom: '1px solid #eee' }}>
                    <label className="form-field-label section-title" style={{ fontWeight: '600', fontSize: '1.25rem', color: '#333', marginBottom: '15px', display: 'block' }}>Additional information</label>
                    <div className="row form-row">
                      <div className="col-sm-12 line-info" style={{ fontSize: '0.9rem', color: '#888', marginBottom: '15px' }}>
                        • The time when you are most easily reachable to be contacted <br />
                        • Any information you deem useful: your project, your experience...
                      </div>
                    </div>
                    <div className="row form-row">
                      <div className="col-sm-12">
                        <div className="custom-form-field separated">
                          <textarea 
                            name="comment" 
                            rows="4" 
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Tell us more about your request..."
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
                          ></textarea>
                          <div className="input-max-length-zone" style={{ textAlign: 'right', fontSize: '0.75rem', color: '#aaa', marginTop: '5px' }}>
                            <span className="input-max-length-current-size">
                              {formData.comment.length}/2000
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-inner-container modal-inner-container-bottom" style={{ padding: '20px 0' }}>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="custom-form-field">
                          <div className="custom-checkbox-zone" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                            <input 
                              type="checkbox" 
                              name="isCguAccepted" 
                              checked={formData.isCguAccepted}
                              onChange={handleChange}
                              id="isCguAccepted" 
                              required 
                              style={{ marginTop: '4px' }}
                            />
                            <label htmlFor="isCguAccepted" className="form-field-label custom-style" style={{ fontWeight: '400', fontSize: '1rem', color: '#666' }}>
                              I have read and agree to the <a href="#" className="convention-show-link" style={{ color: '#f5a623' }}>General Terms and Conditions of Use.</a>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-sm-12">
                        <div className="custom-form-field">
                          <div className="custom-checkbox-zone" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                            <input 
                              type="checkbox" 
                              name="isNewsletterSubscribed" 
                              checked={formData.isNewsletterSubscribed}
                              onChange={handleChange}
                              id="isNewsletterSubscribed" 
                              style={{ marginTop: '4px' }}
                            />
                            <label htmlFor="isNewsletterSubscribed" className="form-field-label custom-style" style={{ fontWeight: '400', fontSize: '1rem', color: '#666' }}>
                              I would like to receive Kili to Savanna news (new dates, trips...)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: '20px' }}>
                      <div className="col-sm-4 col-sm-offset-4">
                        <div className="custom-form-field stretch-width">
                          <button 
                            type="submit" 
                            className="btn custom-button rounded hover-grow solid-yellow stretch-width"
                            disabled={loading}
                            style={{ 
                              background: '#f5a623', 
                              color: 'white', 
                              border: 'none', 
                              padding: '12px', 
                              fontWeight: '700', 
                              textTransform: 'uppercase', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              width: '100%'
                            }}
                          >
                            <div>
                              {loading ? "Processing..." : "Make a request"}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="row">
                        <div className="col-sm-12">
                          <p style={{ color: '#e57373', textAlign: 'center', marginTop: '10px' }}>{error}</p>
                        </div>
                      </div>
                    )}

                    <div className="row form-row">
                      <div className="col-sm-12 line-info" style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: '#888' }}>
                        You will be contacted within 1 to 24 hours depending on the urgency of your project.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
