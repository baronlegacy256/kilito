"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

export default function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCguAccepted, setIsCguAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordValidation = useMemo(() => {
    return {
      length: password.length >= 8 && password.length <= 16,
      letter: /[a-zA-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, [password]);

  const isPasswordValid = useMemo(() => {
    return (
      passwordValidation.length &&
      passwordValidation.letter &&
      passwordValidation.number
    );
  }, [passwordValidation]);

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setFieldErrors({});

    if (!hasSupabaseBrowserEnv()) {
      setFormError("Auth is not configured. Add Supabase environment variables.");
      return;
    }

    if (!isCguAccepted) {
      setFieldErrors({
        isCguAccepted: "You must accept the General Terms and Conditions of Use.",
      });
      return;
    }

    if (!isPasswordValid) {
      setFormError("Please meet all password requirements below.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setFormError("Could not connect to auth service.");
      return;
    }

    setProcessing(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : undefined;

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: origin ? `${origin}/` : undefined,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          },
        },
      });

      if (error) {
        if (error.message?.toLowerCase().includes("already")) {
          setFieldErrors({ email: "An account with this email may already exist." });
        } else {
          setFormError(error.message);
        }
        return;
      }

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const user = data.user;
      const session = data.session;

      if (session && user) {
        await supabase
          .from("user_profiles")
          .update({ full_name: fullName || null })
          .eq("user_id", user.id);
      }

      if (session) {
        router.push("/");
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Check your email to confirm your account before signing in."
      );
    } catch (err) {
      setFormError(err?.message || "Registration failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");
    setSuccessMessage("");
    setProcessing(true);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
        },
      });

      if (googleError) {
        setFormError(googleError.message);
        return;
      }
    } catch (err) {
      setFormError(err?.message || "Google registration failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="principal"
      style={{
        backgroundColor: "#F5F5F5",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <div className="front-form register-form">
        <form onSubmit={submit} noValidate>
          <div className="form-section">
            <div className="row form-row">
              <div className="col-xs-12 section-title">
                Create your customer account
              </div>
            </div>

            <div className="row form-row">
              <div className="col-xs-12">
                <div className="custom-form-field stretch-width">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={50}
                    required
                    placeholder="First name"
                    className={fieldErrors.firstName ? "error" : ""}
                    autoComplete="given-name"
                  />
                </div>
                {fieldErrors.firstName && (
                  <div className="field-errors">{fieldErrors.firstName}</div>
                )}
              </div>
            </div>

            <div className="row form-row">
              <div className="col-xs-12">
                <div className="custom-form-field stretch-width">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={50}
                    required
                    placeholder="Name"
                    className={fieldErrors.lastName ? "error" : ""}
                    autoComplete="family-name"
                  />
                </div>
                {fieldErrors.lastName && (
                  <div className="field-errors">{fieldErrors.lastName}</div>
                )}
              </div>
            </div>

            <div className="row form-row">
              <div className="col-xs-12">
                <div className="custom-form-field stretch-width">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={64}
                    required
                    placeholder="E-mail"
                    className={fieldErrors.email ? "error" : ""}
                    autoComplete="email"
                  />
                </div>
                {fieldErrors.email && (
                  <div className="field-errors">{fieldErrors.email}</div>
                )}
              </div>
            </div>

            <div className="password-zone">
              <div className="row form-row">
                <div className="col-xs-12">
                  <div className="form-field-label">Password</div>
                </div>
                <div className="col-xs-12">
                  <div className="custom-form-field stretch-width with-icon with-action-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={16}
                      required
                      placeholder=""
                      className={fieldErrors.password ? "error" : ""}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-show-toggle action-icon"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {fieldErrors.password && (
              <div className="row form-row">
                <div className="col-xs-12">
                  <div id="password-errors" className="field-errors">
                    {fieldErrors.password}
                  </div>
                </div>
              </div>
            )}

            <div className="row form-row password-validation">
              <div className="col-xs-12 password-validation-status">
                <div id="length">
                  <i
                    className="material-icons right"
                    style={{ display: passwordValidation.length ? "inline" : "none" }}
                  >
                    check
                  </i>
                  <i
                    className="material-icons wrong"
                    style={{ display: !passwordValidation.length ? "inline" : "none" }}
                  >
                    close
                  </i>
                </div>
                Contains between 8 and 16 characters
              </div>

              <div className="col-xs-12 password-validation-status">
                <div id="letter">
                  <i
                    className="material-icons right"
                    style={{ display: passwordValidation.letter ? "inline" : "none" }}
                  >
                    check
                  </i>
                  <i
                    className="material-icons wrong"
                    style={{ display: !passwordValidation.letter ? "inline" : "none" }}
                  >
                    close
                  </i>
                </div>
                Contains at least one letter
              </div>

              <div className="col-xs-12 password-validation-status">
                <div id="number">
                  <i
                    className="material-icons right"
                    style={{ display: passwordValidation.number ? "inline" : "none" }}
                  >
                    check
                  </i>
                  <i
                    className="material-icons wrong"
                    style={{ display: !passwordValidation.number ? "inline" : "none" }}
                  >
                    close
                  </i>
                </div>
                Contains at least one digit
              </div>
            </div>

            <div className="row form-row">
              <div className="col-xs-12">
                <div className="custom-form-field">
                  <div className="custom-checkbox-zone">
                    <input
                      type="checkbox"
                      id="isCguAccepted"
                      checked={isCguAccepted}
                      onChange={(e) => setIsCguAccepted(e.target.checked)}
                    />
                    <label
                      htmlFor="isCguAccepted"
                      className="form-field-label custom-style"
                    >
                      I have read and agree to the{" "}
                      <Link
                        href="/terms-of-use"
                        className="convention-show-link"
                      >
                        General Terms and Conditions of Use.
                      </Link>
                    </label>
                  </div>
                </div>
                {fieldErrors.isCguAccepted && (
                  <div className="field-errors">{fieldErrors.isCguAccepted}</div>
                )}
              </div>
            </div>

            {formError && (
              <div className="row form-row">
                <div className="col-xs-12">
                  <div className="field-errors">{formError}</div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="row form-row">
                <div className="col-xs-12">
                  <div className="line-info" style={{ color: "#2e7d32" }}>
                    {successMessage}
                  </div>
                </div>
              </div>
            )}

            <div className="row form-row">
              <div className="col-xs-12">
                <button
                  type="submit"
                  className="btn custom-button solid-pastel-blue stretch-width"
                  disabled={processing}
                >
                  {processing ? "Registering…" : "Register"}
                </button>
              </div>
            </div>

            <div className="row form-row" style={{ marginTop: '10px' }}>
              <div className="col-xs-12">
                <button 
                  type="button" 
                  className="btn custom-button white stretch-width" 
                  onClick={handleGoogleSignIn}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <img src="/assets/images/auth/google-icon.png" alt="Google" style={{ width: '20px' }} 
                    onError={(e) => { e.target.style.display = 'none'; }} />
                  Signup with Google
                </button>
              </div>
            </div>

            <div className="row form-row">
              <div className="col-xs-12 wrapping-centered-line">
                Do you already have an account?&nbsp;
                <button
                  type="button"
                  className="convention-show-link"
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline", textDecoration: "underline" }}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("show-login-modal"));
                    }
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
