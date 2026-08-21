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
      <div className="login-bg" />
      <div className="login-bg-overlay" />

      <nav className="login-nav">
        <Link to="/" className="login-logo">HanaPin</Link>
      </nav>

      <main className="login-main">
        <div className="login-card">
          <h1 className="login-title">Welcome!</h1>
          <p className="login-subtitle">Sign in to manage your bookings and explore hidden gems.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Email or Username</label>
              <input type="text" placeholder="name@example.com" />
            </div>

            <div className="login-field">
              <div className="login-label-row">
                <label>Password</label>
                <a href="/login" className="login-forgot">Forgot Password?</a>
              </div>
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
            </div>

            <button type="submit" className="login-submit">Sign In</button>
          </form>

          <div className="login-divider"><span>OR CONTINUE WITH</span></div>

          <div className="login-social">
            <button className="login-social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="login-social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <p className="login-signup-row">
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </main>

      <footer className="login-footer">
        <div className="login-footer-inner">
          <div className="login-footer-left">
            <span className="login-footer-brand">HanaPin</span>
            <p className="login-footer-tagline">Discover the heart of Montalban.</p>
          </div>
          <div className="login-footer-center">
            <a href="/login" className="login-footer-link">Privacy Policy</a>
            <a href="/login" className="login-footer-link">Terms of Service</a>
            <a href="/login" className="login-footer-link">Partner with Us</a>
            <a href="/login" className="login-footer-link">Contact</a>
          </div>
          <div className="login-footer-right">
            <p className="login-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
