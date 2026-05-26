"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import Link from "next/link";


export default function TripsPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        
        const { data: bookingsData, error } = await supabase
          .from('bookings')
          .select(`
            *,
            packages(title, images)
          `)
          .eq('email', session.user.email)
          .order('created_at', { ascending: false });

        if (!error) {
          setBookings(bookingsData);
        }
      }
      setLoading(false);
    };
    getData();
  }, [supabase]);

  if (loading) return null;
  if (!user) return null; // layout handles redirect


  return (
    <div className="principal-container no-navbar with-bottom-bar">
      <style dangerouslySetInnerHTML={{__html: `
        .stay-card-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .stay-card-image-col {
          min-height: 150px;
        }
        .stay-card-image-col img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .stay-card-info-col {
          padding: 15px 20px;
        }
        .stay-card-action-col {
          padding: 15px 20px;
          text-align: right;
          border-left: 1px solid #f5f5f5;
        }
        @media (max-width: 767px) {
          .stay-card-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .stay-card-image-col {
            width: 100% !important;
            height: 160px !important;
            min-height: 160px !important;
          }
          .stay-card-image-col img {
            height: 160px !important;
          }
          .stay-card-info-col {
            width: 100% !important;
            padding: 15px !important;
          }
          .stay-card-action-col {
            width: 100% !important;
            padding: 15px !important;
            text-align: left !important;
            border-left: none !important;
            border-top: 1px solid #f5f5f5 !important;
          }
        }
      `}} />
      <div className="userStd-details-zone form-infos-bloc">
        <div className="form-bloc-title">
          <h2>My Stays</h2>
          <div className="label-tip">
            View and manage your upcoming and past adventure stays.
          </div>
        </div>

        <div className="form-bloc-content">
          <div className="row">
            {bookings && bookings.map((booking) => (
              <div className="col-xs-12" key={booking.id} style={{ marginBottom: '20px' }}>
                <div className="panel panel-default" style={{ border: '1px solid #e4e4e4', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="panel-body" style={{ padding: '0' }}>
                    <div className="row no-margin stay-card-row">
                      <div className="col-sm-4 no-padding stay-card-image-col">
                        <img 
                          src={booking.packages?.images?.[0] || "/assets/images/home/safari.jpg"} 
                          alt={booking.packages?.title || "Stay"} 
                        />
                      </div>
                      <div className="col-sm-5 stay-card-info-col">
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0a3552', fontWeight: 'bold' }}>
                          {booking.packages?.title || "Custom Adventure"}
                        </h3>
                        <div style={{ color: '#7d7873', marginBottom: '5px' }}>
                          <i className="fa fa-calendar-o" style={{ marginRight: '8px' }} />
                          {booking.start_date ? `Starts on ${new Date(booking.start_date).toLocaleDateString()}` : "Date to be confirmed"}
                        </div>
                        <div style={{ color: '#7d7873' }}>
                          <i className="fa fa-users" style={{ marginRight: '8px' }} />
                          {booking.num_travelers} {booking.num_travelers === 1 ? 'Traveler' : 'Travelers'}
                        </div>
                      </div>
                      <div className="col-sm-3 stay-card-action-col">
                        <div style={{ marginBottom: '10px' }}>
                          <span className="label" style={{ 
                            padding: '4px 8px', 
                            borderRadius: '3px', 
                            fontSize: '11px', 
                            textTransform: 'uppercase',
                            backgroundColor: booking.status === 'Confirmed' ? '#468847' : '#f89406',
                            color: 'white'
                          }}>
                            {booking.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0a3552', marginBottom: '10px' }}>
                          {booking.type || "Booking"}
                        </div>
                        <button className="btn custom-button white" style={{ 
                          width: '100%', 
                          border: '1px solid #e4e4e4',
                          color: '#474747',
                          fontSize: '13px'
                        }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!bookings || bookings.length === 0) && (
            <div className="empty-state-placeholder" style={{ 
              padding: '60px 40px', 
              textAlign: 'center', 
              background: '#f9f9f9', 
              border: '1px dashed #ccc',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              <i className="fa fa-info-circle" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
              <p style={{ fontSize: '16px', color: '#7d7873' }}>No stays to display yet. Explore our packages to start your next adventure!</p>
              <Link href="/" className="btn custom-button negative-blue" style={{ marginTop: '20px' }}>Explore Stays</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
