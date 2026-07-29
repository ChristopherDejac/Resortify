import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const API_URL = "http://localhost:5000/api/auth";

export default function OwnerRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "owner" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      if (data.session) {
        localStorage.setItem("access_token", data.session.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/establishment-type");
    } catch (err) {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="reg-page">
      <div className="reg-bg" />
      <nav className="reg-nav">
        <span className="reg-logo">HanaPin</span>
      </nav>
      <div className="reg-container reg-container-centered">
        <div className="reg-card reg-card-right reg-card-standalone">
          <h2 className="reg-form-title">Create Account</h2>
          <p className="reg-form-subtitle">Fill in the details to register your resort.</p>

          <form className="reg-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}

            <div className="reg-input-group">
              <label>Full Name</label>
              <div className="reg-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input type="text" placeholder="Juan Dela Cruz" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Email Address</label>
              <div className="reg-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Password</label>
              <div className="reg-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <label className="reg-checkbox">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <span>I agree to the <a href="/login">Terms of Service</a> and <a href="/login">Privacy Policy</a> of HanaPin.</span>
            </label>

            <button type="submit" className="reg-submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account \u2192"}
            </button>
          </form>

          <p className="reg-signin">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
      <footer className="reg-footer">
        <div className="reg-footer-inner">
          <div className="reg-footer-left">
            <span className="reg-footer-brand">HanaPin</span>
            <span className="reg-footer-tagline">Discover the heart of Montalban.</span>
          </div>
          <div className="reg-footer-links">
            <a href="/login">Privacy Policy</a>
            <a href="/login">Terms of Service</a>
            <a href="/login">Partner with Us</a>
            <a href="/login">Contact</a>
          </div>
          <p className="reg-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}