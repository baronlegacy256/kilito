"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    getUser();
  }, [supabase]);

  if (!user) return null; // UserLayout handles the redirect

  const metadata = user.user_metadata || {};


  return (
    <div className="principal-container no-navbar with-bottom-bar">
      {/* Welcome Section */}
      <div className="userStd-welcome-zone form-infos-bloc">
        <div className="row flex-sm-row form-bloc-content">
          <div className="col-xs-12 flex-xs-col flex-xs-center xs-title-zone">
            <h2>Welcome {metadata.full_name || user.email}!</h2>
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
              Welcome {metadata.full_name || user.email}!
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
            action="/api/user/update-profile"
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
                  defaultValue={metadata.selfDescription || ""}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="row form-row">
              <div className="col-sm-4 label-zone">
                <label htmlFor="fullName">
                  Full Name *
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="text"
                  name="fullName"
                  maxLength={100}
                  defaultValue={metadata.full_name || ""}
                  required
                  id="fullName"
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
                  defaultValue={user.email}
                  disabled
                  id="email"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="row form-row">
              <div className="col-sm-4 label-zone">
                <label htmlFor="mobilePhone">
                  Phone
                </label>
              </div>
              <div className="col-sm-4">
                <input
                  type="tel"
                  name="mobilePhone"
                  maxLength={15}
                  defaultValue={metadata.phone || ""}
                  id="mobilePhone"
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
