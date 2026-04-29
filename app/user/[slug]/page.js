"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function UserSlugPage({ params }) {
  const [user, setUser] = useState(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    checkUser();
  }, [supabase]);

  const { slug } = React.use(params);


  if (slug.includes("account-")) {
    return (
      <div className="principal-container no-navbar with-bottom-bar">
        {/* Welcome Section */}
        <div className="userStd-welcome-zone form-infos-bloc">
          <div className="row flex-sm-row form-bloc-content">
            <div className="col-xs-12 flex-xs-col flex-xs-center xs-title-zone">
              <h2>Welcome Aaron!</h2>
            </div>

            {/* Photo Upload */}
            <div className="col-xs-12 flex-xs-col flex-xs-center col-sm-3">
              <div id="photoPortrait">
                <ul className="sortable-photo-gallery not-sortable rounded">
                  <li
                    className="ui-state-default ui-state-disabled file-input-zone"
                    style={{ width: "130px" }}
                  >
                    <form
                      style={{
                        minHeight: "130px",
                        maxHeight: "166px"
                      }}
                    >
                      <div className="fileinput-button dropzone">
                        <i className="fa fa-camera icon" />
                        <span className="input-label">
                          Add a photo
                        </span>
                        <input
                          className="fileinput"
                          type="file"
                          name="file"
                          data-parent-zone-id="photoPortrait"
                          data-parent-obj-id="58254"
                          data-parent-obj-classname="com.kazaden.UserStd"
                          data-attribute-name="photoPortrait"
                          data-is-attribute-list="false"
                          data-file-name-suffix=""
                        />
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>

            {/* Title */}
            <div className="col-xs-12 col-sm-9 flex-sm-col title-zone">
              <h2 className="hidden-xs">
                Welcome Aaron!
              </h2>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="userStd-details-zone form-infos-bloc">
          <div className="form-bloc-title">
            <h2>Your personal information</h2>
            <div className="label-tip">
              This information is used by Kazaden solely to connect you
              with professional partners.
            </div>
          </div>

          <div className="form-bloc-content">
            <form
              action="/interfaceClientUserStd/updateProfilePage1/58254"
              method="post"
              id="maintInterfaceForm"
            >
              {/* About You */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="selfDescription">
                    About you
                  </label>
                  <div className="label-tip">
                    Tell us about yourself.
                  </div>
                </div>
                <div className="col-sm-8">
                  <textarea
                    name="selfDescription"
                    maxLength={300}
                    cols={100}
                    rows={10}
                    id="selfDescription"
                  />
                  <div className="text-help-zone">
                    <span>0/300</span>
                  </div>
                </div>
              </div>

              {/* Last Name */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="lastName">
                    Name *
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="lastName"
                    maxLength={50}
                    defaultValue="baraka"
                    required
                    id="lastName"
                  />
                </div>
              </div>

              {/* First Name */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="firstName">
                    First name *
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="firstName"
                    maxLength={50}
                    defaultValue="aaron"
                    required
                    id="firstName"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="gender">
                    You are *
                  </label>
                </div>
                <div className="col-sm-4">
                  <select
                    name="gender"
                    id="gender"
                    required
                  >
                    <option value="M">
                      A man
                    </option>
                    <option value="F">
                      A woman
                    </option>
                  </select>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="dateOfBirth">
                    Date of birth
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="email">
                    Email address *
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="email"
                    defaultValue="barakaaaron292@yahoo.com"
                    disabled
                    id="email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="mobilePhone">
                    Phone *
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="tel"
                    name="mobilePhone"
                    maxLength={15}
                    required
                    id="mobilePhone"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="row form-row">
                <div className="col-sm-4 label-zone">
                  <label htmlFor="address.locationName">
                    Address
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="address.locationName"
                    maxLength={128}
                    placeholder="1 rue de la Charité, Lyon"
                    id="address.locationName"
                  />
                </div>
              </div>

              {/* Submit */}
              <div id="bottom-bar">
                <button
                  type="submit"
                  className="btn custom-button white right-button primary"
                >
                  <i className="fa fa-floppy-o" />
                  <span>
                    Save
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  let title = "User Details";
  let content = "Welcome to your user dashboard.";

  if (slug.includes("trips-")) {
    title = "My Stays";
    content = "View and manage your upcoming and past adventure stays.";
  } else if (slug.includes("conversations-")) {
    title = "My Messages";
    content = "Communicate with experts and view your message history.";
  }

  return (
    <div className="user-page-container">
      <div className="row">
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title">{title}</h1>
            </div>
            <div className="panel-body">
              <p className="lead">{content}</p>
              <div className="empty-state-placeholder" style={{ 
                padding: '40px', 
                textAlign: 'center', 
                background: '#f9f9f9', 
                border: '1px dashed #ccc',
                borderRadius: '4px',
                marginTop: '20px'
              }}>
                <i className="fa fa-info-circle" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
                <p>No data to display in this section yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
