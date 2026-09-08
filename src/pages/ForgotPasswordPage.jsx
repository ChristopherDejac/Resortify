import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="fpp-page">
      <div className="fpp-bg" />
      <div className="fpp-bg-overlay" />

      <nav className="fpp-nav">
        <Link to="/" className="fpp-logo">HanaPin</Link>
      </nav>

      <main className="fpp-main">
        <div className="fpp-card">
          <h1 className="fpp-title">Forgot Password</h1>
          <p className="fpp-desc">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          {sent ? (
            <div className="fpp-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7fd4b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
              <p>
                We&apos;ve sent a reset link to <strong>{email}</strong>. Check
                your inbox to continue.
              </p>
            </div>
          ) : (
            <form className="fpp-form" onSubmit={handleSubmit}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="fpp-error">{error}</p>}
              <button type="submit" className="fpp-submit">SEND RESET LINK</button>
            </form>
          )}

          <Link to="/login" className="fpp-back">Back to Sign In</Link>
        </div>
      </main>

      <footer className="fpp-footer">
        <div className="fpp-footer-inner">
          <div className="fpp-footer-left">
            <span className="fpp-footer-brand">HanaPin</span>
            <p className="fpp-footer-tagline">Discover the heart of Montalban.</p>
          </div>
          <div className="fpp-footer-center">
            <a href="/login" className="fpp-footer-link">Privacy Policy</a>
            <a href="/login" className="fpp-footer-link">Terms of Service</a>
            <a href="/login" className="fpp-footer-link">Partner with Us</a>
            <a href="/login" className="fpp-footer-link">Contact</a>
          </div>
          <div className="fpp-footer-right">
            <p className="fpp-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}