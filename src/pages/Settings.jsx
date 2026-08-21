import { Link } from "react-router-dom";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="st-layout">
      <aside className="st-sidebar">
        <div className="st-sidebar-brand">
          <span className="st-sidebar-title">HanaPin</span>
          <span className="st-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="st-sidebar-nav">
          <Link to="/dashboard" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            Manage Booking
          </Link>
          <Link to="/guests" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
          <div style={{ flex: 1 }} />
          <Link to="/settings" className="st-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="st-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" /></svg>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="st-main">
        <header className="st-topbar">
          <div>
            <h1 className="st-topbar-title">Account Settings</h1>
            <p className="st-topbar-sub">Manage your property details, security preferences, and automated communications.</p>
          </div>
          <div className="st-topbar-right">
            <div className="st-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="st-icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
          </div>
        </header>

        <div className="st-content">
          <div className="st-columns">
            <div className="st-column-left">
              <div className="st-card">
                <div className="st-card-header">
                  <span className="st-card-title">Property Profile</span>
                  <button className="st-btn-primary">Save Changes</button>
                </div>
                <div className="st-profile-layout">
                  <div className="st-profile-left">
                    <div className="st-logo-box" />
                    <span className="st-logo-update">UPDATE LOGO</span>
                    <label className="st-field-label">Display Name</label>
                    <input className="st-input" type="text" placeholder="Enter property name" />
                  </div>
                  <div className="st-profile-right">
                    <label className="st-field-label">Contact Number</label>
                    <input className="st-input" type="text" placeholder="Enter contact number" />
                    <label className="st-field-label">Contact Email</label>
                    <input className="st-input" type="email" placeholder="Enter contact email" />
                    <label className="st-field-label">Bio</label>
                    <textarea className="st-textarea" placeholder="Write a short description about your property" />
                  </div>
                </div>
              </div>

              <div className="st-card">
                <span className="st-card-title">Account Security</span>
                <div className="st-password-row">
                  <div className="st-field-group">
                    <label className="st-field-label">Current Password</label>
                    <input className="st-input" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="st-field-group">
                    <label className="st-field-label">New Password</label>
                    <input className="st-input" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="st-field-group">
                    <label className="st-field-label">Confirm New Password</label>
                    <input className="st-input" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <div className="st-2fa-row">
                  <div className="st-2fa-info">
                    <strong>Two-Factor Authentication</strong>
                    <span>Secure your account by requiring an additional verification code.</span>
                  </div>
                  <button className="st-btn-outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>

            <div className="st-column-right">
              <div className="st-card">
                <span className="st-card-title">Notification Preferences</span>
                <p className="st-card-sub">Choose how and when you want to be alerted about activity.</p>
                <div className="st-toggle-list">
                  <div className="st-toggle-row">
                    <div>
                      <strong>Booking Confirmations</strong>
                      <span>Email alert on every reservation</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div>
                      <strong>Review Reminders</strong>
                      <span>Notify when a guest leaves feedback</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div>
                      <strong>Marketing</strong>
                      <span>Updates on new features</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div>
                      <strong>SMS Alerts</strong>
                      <span>Urgent booking cancellations</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="st-card">
                <span className="st-card-title">Regional &amp; Display</span>
                <label className="st-field-label">Primary Language</label>
                <div className="st-select-wrapper">
                  <select className="st-select">
                    <option value="">Select language</option>
                    <option>English (US)</option>
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <label className="st-field-label">Default Currency</label>
                <div className="st-select-wrapper">
                  <select className="st-select">
                    <option value="">Select currency</option>
                    <option>Philippine Peso (PHP)</option>
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <div className="st-info-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                  <span>Changes to currency will reflect in your public pricing and internal revenue reports.</span>
                </div>
              </div>

              <button className="st-btn-primary st-btn-full">Save Global Changes</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
