import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="reg-page">
      <div className="reg-bg" />
      <nav className="reg-nav">
        <span className="reg-logo">HanaPin</span>
      </nav>
      <div className="reg-container">
        <div className="reg-card reg-card-left">
          <h1 className="reg-headline">Start your journey to the <em>Heart of Montalban, Rizal.</em></h1>
          <p className="reg-intro">Join thousands of users discovering the serene mountain escapes and lush river resorts of Montalban.</p>
          <div className="reg-role-cards">
            <button
              type="button"
              className="reg-role-card"
              onClick={() => setShowTravelerModal(true)}
            >
              <div className="reg-role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#003B46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="reg-role-title">Customer</h3>
              <p className="reg-role-desc">Find hidden gems and book seamless retreats.</p>
            </button>
            <button
              type="button"
              className="reg-role-card"
              onClick={() => navigate("/register/owner")}
            >
              <div className="reg-role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#003B46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l1.5-5h15L21 9" />
                  <path d="M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
                  <path d="M3 9h18" />
                  <path d="M9 20v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
                </svg>
              </div>
              <h3 className="reg-role-title">Owner</h3>
              <p className="reg-role-desc">List your property and grow your tourism reach.</p>
            </button>
          </div>
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

      {showTravelerModal && (
        <div className="reg-modal-overlay" onClick={() => setShowTravelerModal(false)}>
          <div className="reg-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="reg-modal-close"
              onClick={() => setShowTravelerModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="reg-form-title">Get the App</h2>
            <p className="reg-form-subtitle">
              HanaPin for travelers is available on our mobile app. Download it to create your account, search resorts, and book your stay.
            </p>
            <div className="reg-app-download">
              <div className="reg-app-download-buttons">
                <a href="#" className="reg-app-store-btn">Download on the App Store</a>
                <a href="#" className="reg-app-store-btn">Get it on Google Play</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}