"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const MOCK_MESSAGES = [
  {
    id: 1,
    with: "Jean-Baptiste",
    subject: "Mountaineering Adventure",
    lastMessage: "Looking forward to seeing you at the base camp!",
    date: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    with: "Safari Expert",
    subject: "Booking #67290",
    lastMessage: "Your safari permits have been secured.",
    date: "Yesterday",
    unread: false
  }
];

export default function ConversationsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [supabase]);

  if (loading) return null;
  if (!user) return null;


  return (
    <div className="principal-container no-navbar with-bottom-bar">
      <style dangerouslySetInnerHTML={{__html: `
        .message-card-row {
          display: flex;
          align-items: center;
        }
        .message-card-avatar-col {
          text-align: center;
        }
        .message-card-info-col {
          padding-left: 10px;
        }
        .message-card-meta-col {
          text-align: right;
        }
        @media (max-width: 767px) {
          .message-card-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px;
          }
          .message-card-avatar-col {
            display: none !important;
          }
          .message-card-info-col {
            width: 100% !important;
            padding-left: 0 !important;
          }
          .message-card-meta-col {
            width: 100% !important;
            text-align: left !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            border-top: 1px dashed #e4e4e4 !important;
            padding-top: 10px !important;
            margin-top: 4px !important;
          }
          .message-card-meta-col div {
            margin-bottom: 0 !important;
          }
        }
      `}} />
      <div className="userStd-details-zone form-infos-bloc">
        <div className="form-bloc-title">
          <h2>My Messages</h2>
          <div className="label-tip">
            Communicate with our experts and manage your trip discussions.
          </div>
        </div>

        <div className="form-bloc-content">
          <div className="row">
            {MOCK_MESSAGES.map((message) => (
              <div className="col-xs-12" key={message.id} style={{ marginBottom: '10px' }}>
                <div className="panel panel-default" style={{ 
                  border: '1px solid #e4e4e4', 
                  borderRadius: '4px', 
                  backgroundColor: message.unread ? '#fdf8f0' : '#ffffff',
                  borderLeft: message.unread ? '4px solid #ffae3b' : '1px solid #e4e4e4'
                }}>
                  <div className="panel-body" style={{ padding: '15px 20px' }}>
                    <div className="row message-card-row">
                      <div className="col-sm-2 message-card-avatar-col">
                        <div style={{ 
                          width: '50px', 
                          height: '50px', 
                          lineHeight: '50px', 
                          borderRadius: '50%', 
                          background: '#0a3552', 
                          color: 'white', 
                          fontSize: '18px', 
                          margin: '0 auto' 
                        }}>
                          {message.with.charAt(0)}
                        </div>
                      </div>
                      <div className="col-sm-8 message-card-info-col">
                        <div style={{ fontWeight: 'bold', color: '#0a3552' }}>{message.with}</div>
                        <div style={{ fontWeight: message.unread ? 'bold' : 'normal', fontSize: '14px', margin: '4px 0' }}>
                          {message.subject}
                        </div>
                        <div style={{ color: '#7d7873', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {message.lastMessage}
                        </div>
                      </div>
                      <div className="col-sm-2 message-card-meta-col">
                        <div style={{ fontSize: '12px', color: '#a1a1a1', marginBottom: '8px' }}>{message.date}</div>
                        <button className="btn custom-button white no-padding" style={{ border: 'none', color: '#0f4c75', background: 'transparent' }}>
                          Open <i className="fa fa-angle-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {MOCK_MESSAGES.length === 0 && (
            <div className="empty-state-placeholder" style={{ 
              padding: '60px 40px', 
              textAlign: 'center', 
              background: '#f9f9f9', 
              border: '1px dashed #ccc',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              <i className="fa fa-comments-o" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
              <p style={{ fontSize: '16px', color: '#7d7873' }}>You have no conversations yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
