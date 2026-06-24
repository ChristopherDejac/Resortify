import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <span className="login-header-logo">HanaPin</span>
        <Link to="/register" className="login-header-signup">Sign Up</Link>
      </header>

      <div className="login-bg" />

      <main className="login-main">
        <div className="login-card">
          <div className="login-card-left">
            <div className="login-card-left-bg" />
            <div className="login-card-left-overlay" />
            <div className="login-card-left-content">
              <h1 className="login-hero-title">Reconnect with Nature.</h1>
              <p className="login-hero-sub">
                Access your private portal to the most exclusive escapes in Montalban, Rizal.
              </p>
            </div>
          </div>

          <div className="login-card-right">
            <h2 className="login-welcome-title">Welcome</h2>
            <p className="login-welcome-sub">
              Sign in to manage your bookings and explore hidden gems.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label>Email or Username</label>
                <input type="text" placeholder="hello@hanapin.com" />
              </div>

              <div className="login-field">
                <label>Password</label>
                <div className="login-password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••••••"
                  />
                  <button
                    type="button"
                    className="login-eye"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="login-forgot-row">
                  <a href="/login">Forgot Password?</a>
                </div>
              </div>

              <button type="submit" className="login-submit">Sign In</button>
            </form>

            <div className="login-divider"><span>OR CONTINUE WITH</span></div>

            <div className="login-social">
              <button className="login-social-btn">Google</button>
              <button className="login-social-btn">Facebook</button>
            </div>

            <p className="login-signup-row">
              Don&apos;t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <div className="login-footer-inner">
          <div className="login-footer-left">
            <span className="login-footer-brand">HanaPin</span>
            <span className="login-footer-tagline">Discover the heart of Montalban.</span>
          </div>
          <div className="login-footer-links">
            <a href="/login">Privacy Policy</a>
            <a href="/login">Terms of Service</a>
            <a href="/login">Partner with Us</a>
            <a href="/login">Contact</a>
          </div>
          <p className="login-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
