"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleShow = () => setIsOpen(true);
    const handleHide = () => setIsOpen(false);

    window.addEventListener("show-login-modal", handleShow);
    window.addEventListener("hide-login-modal", handleHide);

    return () => {
      window.removeEventListener("show-login-modal", handleShow);
      window.removeEventListener("hide-login-modal", handleHide);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setIsLoading(false);
    setError("");
    setMessage("");
  };

  const ensureSupabase = () => {
    if (!hasSupabaseBrowserEnv()) {
      setError("Auth is not configured yet. Add Supabase env variables.");
      return null;
    }
    return getSupabaseBrowserClient();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const supabase = ensureSupabase();
      if (!supabase) return;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setMessage("Logged in successfully.");
      setTimeout(() => closeModal(), 600);
    } catch (err) {
      setError(err?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      const supabase = ensureSupabase();
      if (!supabase) return;
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
        },
      });

      if (googleError) {
        setError(googleError.message);
        return;
      }
    } catch (err) {
      setError(err?.message || "Google sign in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email first.");
      return;
    }

    setIsLoading(true);
    try {
      const supabase = ensureSupabase();
      if (!supabase) return;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }
      setMessage("Password reset email sent.");
    } catch (err) {
      setError(err?.message || "Unable to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div
        id="login-modal"
        className="modal fade login-modal"
        style={{ display: "none" }}
        aria-hidden="false"
      ></div>
    );
  }

  return (
    <>
      <div
        className="modal fade login-modal in"
        id="login-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="login-modal"
        aria-hidden="false"
        style={{ display: "block", paddingRight: "17px", zIndex: 20000 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={closeModal}
                aria-hidden="true"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="front-form ">
                <form
                  action="#"
                  method="post"
                  name="loginFormCustom1"
                  autoComplete="off"
                  onSubmit={handleSignIn}
                  id="loginFormCustom1"
                >
                  <div className="form-section">
                    <div className="row form-row">
                      <div className="col-xs-12 section-title">
                        Log in with your credentials
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-xs-12">
                        <div className="custom-form-field stretch-width">
                          <input
                            type="email"
                            name="username"
                            id="modal-username"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-xs-12">
                        <div className="custom-form-field stretch-width with-icon with-action-icon">
                          <input
                            type="password"
                            name="password"
                            id="modal-password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span className="password-show-toggle action-icon" data-target="password">
                            <i className="fa fa-eye-slash" aria-hidden="true"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-xs-12 custom-form-field">
                        <div className="custom-form-field">
                          <div className="custom-checkbox-zone">
                            <input type="checkbox" name="remember-me" id="remember_me1"
                                defaultChecked />
                            <label htmlFor='remember_me1' className="form-field-label">
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="login-message"></div>

                    <div className="login-spinner"><i className="fa fa-spinner fa-pulse fa-fw"></i></div>

                    <div className="row form-row">
                      <div className="col-xs-12">
                        <button
                          type="submit"
                          className="btn custom-button solid-pastel-blue stretch-width"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Log in"}
                        </button>
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-xs-12">
                        <button type="button" className="text-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }} onClick={handleForgotPassword}>
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="row form-row">
                      <div className="col-xs-12 section-title">
                        Alternative login
                      </div>
                    </div>

                    <div className="row form-row">
                      <div className="col-xs-12">
                        <button 
                          type="button" 
                          className="btn custom-button white stretch-width" 
                          onClick={handleGoogleSignIn}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                        >
                          <img src="/assets/images/auth/google-icon.png" alt="Google" style={{ width: '20px' }} 
                            onError={(e) => { e.target.style.display = 'none'; }} />
                          Continue with Google
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="row form-row">
                      <div className="col-xs-12 wrapping-centered-line">
                        Don't have an account?
                        &nbsp;
                        <Link
                          href="/register"
                          className="text-link"
                          onClick={() => closeModal()}
                        >
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </div>

                  {(error || message) && (
                    <div className="form-section">
                      <div className="row form-row">
                        <div className="col-xs-12">
                          <div
                            className="line-info"
                            style={{ color: error ? "#cc0000" : "#2e7d32" }}
                          >
                            {error || message}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade in"
        onClick={closeModal}
        style={{ zIndex: 19990 }}
      ></div>
    </>
  );
}

export default LoginModal;
