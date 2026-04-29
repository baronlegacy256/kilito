'use client'
import React, { useState } from 'react'
import BookingModal from './BookingModal'

export default function PackageDetail({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('Booking')

  // In a real app, you'd fetch this data based on id
  const packageData = {
    id: id,
    title: "7-Day Serengeti & Ngorongoro Adventure",
    price: 1380
  }
  return (
    <main id="package-detail-page">

      {/* Hero Banner */}
      <div
        className="package-detail-hero"
        style={{
          backgroundImage: "url(/assets/images/home/safari.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "420px",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 1, padding: "2rem", color: "#fff" }}
        >
          <div style={{ fontSize: "0.85rem", marginBottom: "0.4rem", opacity: 0.85 }}>
            <span className="glyphicon glyphicon-map-marker" /> Tanzania
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
            Package Details
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div className="row">

          {/* Left — Main Details */}
          <div className="col-md-8">

            {/* Quick Stats */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
                padding: "1rem 1.5rem",
                background: "#f8f8f8",
                borderRadius: "8px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase" }}>Duration</div>
                <div style={{ fontWeight: 600 }}>
                  <i className="fa fa-calendar-o" style={{ marginRight: "0.3rem" }} />
                  7 Days
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase" }}>Type</div>
                <div style={{ fontWeight: 600 }}>
                  <i className="fa fa-users" style={{ marginRight: "0.3rem" }} />
                  Private Tour
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase" }}>Rating</div>
                <div style={{ fontWeight: 600, color: "#f5a623" }}>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa fa-star" style={{ marginRight: "2px" }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase" }}>Availability</div>
                <div style={{ fontWeight: 600 }}>
                  <i className="fa fa-check-circle" style={{ marginRight: "0.3rem", color: "#4caf50" }} />
                  On Request
                </div>
              </div>
            </div>

            {/* Overview */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", borderBottom: "2px solid #f5a623", paddingBottom: "0.5rem" }}>
                Overview
              </h2>
              <p style={{ lineHeight: 1.8, color: "#444" }}>
                Experience the raw beauty of East Africa on this carefully curated journey through iconic
                national parks and wilderness areas. From the sweeping plains of the Serengeti to the
                dramatic Ngorongoro Crater, every day brings unforgettable wildlife encounters and
                breathtaking landscapes.
              </p>
            </section>

            {/* Highlights */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", borderBottom: "2px solid #f5a623", paddingBottom: "0.5rem" }}>
                Highlights
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Game drives in Serengeti National Park",
                  "Visit the famous Ngorongoro Crater",
                  "Witness the Great Migration (seasonal)",
                  "Sundowner drinks in the bush",
                  "Expert local guide throughout the trip",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem", color: "#444" }}>
                    <i className="fa fa-check-circle" style={{ color: "#f5a623", marginTop: "3px", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section style={{ marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem", borderBottom: "2px solid #f5a623", paddingBottom: "0.5rem" }}>
                Itinerary
              </h2>
              {[
                { day: "Day 1", title: "Arrival & Transfer", desc: "Arrive at Kilimanjaro International Airport. Transfer to your lodge for the night." },
                { day: "Day 2", title: "Serengeti National Park", desc: "Full-day game drive in Serengeti. Spot lions, elephants, zebras and more." },
                { day: "Day 3", title: "Serengeti — Ngorongoro", desc: "Morning drive then transfer to Ngorongoro Conservation Area." },
                { day: "Day 4", title: "Ngorongoro Crater", desc: "Descend into the crater for an incredible wildlife experience." },
                { day: "Day 5", title: "Tarangire National Park", desc: "Visit Tarangire, famous for its large elephant herds and baobab trees." },
                { day: "Day 6", title: "Leisure & Cultural Visit", desc: "Optional Maasai village visit. Afternoon at leisure." },
                { day: "Day 7", title: "Departure", desc: "Transfer to airport for your return flight. Safari memories for a lifetime!" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                    padding: "1rem",
                    borderLeft: "3px solid #f5a623",
                    background: "#fafafa",
                    borderRadius: "0 6px 6px 0",
                  }}
                >
                  <div style={{ minWidth: "60px", fontWeight: 700, color: "#f5a623", fontSize: "0.85rem" }}>
                    {item.day}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{item.title}</div>
                    <div style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </section>

          </div>

          {/* Right — Booking Sidebar */}
          <div className="col-md-4">
            <div
              style={{
                position: "sticky",
                top: "1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Price Header */}
              <div style={{ background: "#1a1a2e", color: "#fff", padding: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", opacity: 0.7, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Starting from
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "#f5a623" }}>
                  $1,380
                  <span style={{ fontSize: "0.9rem", fontWeight: 400, color: "#ccc" }}>&nbsp;/ person</span>
                </div>
              </div>

              {/* Included */}
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #eee" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>What&apos;s Included</div>
                {[
                  "All park entry fees",
                  "Full board accommodation",
                  "Airport transfers",
                  "Professional guide",
                  "Game drives in 4x4",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.88rem", color: "#444" }}>
                    <i className="fa fa-check" style={{ color: "#4caf50", fontSize: "0.75rem" }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Not Included */}
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #eee" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.95rem" }}>Not Included</div>
                {[
                  "International flights",
                  "Travel insurance",
                  "Personal expenses",
                  "Visa fees",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.88rem", color: "#888" }}>
                    <i className="fa fa-times" style={{ color: "#e57373", fontSize: "0.75rem" }} />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "1.5rem" }}>
                <button
                  onClick={() => {
                    setModalType('Booking')
                    setIsModalOpen(true)
                  }}
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    background: "#f5a623",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    marginBottom: "0.75rem",
                  }}
                >
                  Book This Package
                </button>
                <button
                  onClick={() => {
                    setModalType('Quote')
                    setIsModalOpen(true)
                  }}
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    background: "transparent",
                    color: "#1a1a2e",
                    border: "2px solid #1a1a2e",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                  }}
                >
                  Request a Custom Quote
                </button>
              <p style={{ fontSize: "0.78rem", color: "#999", textAlign: "center", marginTop: "0.75rem" }}>
                  <i className="fa fa-lock" style={{ marginRight: "0.3rem" }} />
                  No payment required to enquire
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageData={packageData} 
        type={modalType}
      />
    </main>
  )
}
