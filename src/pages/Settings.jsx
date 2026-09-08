import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import "./Settings.css";

function PasswordField({ label, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="st-field">
      <label className="st-field-label">{label}</label>
      <div className="st-password-wrap">
        <input
          className="st-input"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="st-password-toggle"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setShowLogout(false);
    navigate("/login");
  };

  return (
    <div className="st-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`st-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-title">HanaPin</span>
          <span className="sidebar-brand-sub">MANAGEMENT HUB</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="4.5" y1="8" x2="6.5" y2="8" /><line x1="4.5" y1="16" x2="6.5" y2="16" /><line x1="17.5" y1="8" x2="19.5" y2="8" /><line x1="17.5" y1="16" x2="19.5" y2="16" /></svg>
            Payment
          </Link>
          <Link to="/guests" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="sidebar-divider" />
        <div className="sidebar-footer">
          <Link to="/settings" className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="st-main">
        <header className="st-topbar">
          <button className="hamburger" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>

          <div className="topbar-left">
            <span className="topbar-brand">HanaPin</span>
            <span className="topbar-brand-sub">MANAGEMENT HUB</span>
          </div>

          <div>
            <h1 className="st-topbar-title">Account Settings</h1>
            <p className="st-topbar-sub">Manage your property details, security preferences, and automated communications.</p>
          </div>
          <div className="st-topbar-right">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <NotificationDropdown />
            <div className="st-user-profile">
              <div className="st-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="st-user-info">
                <span className="st-user-name">User</span>
              </div>
            </div>
          </div>
        </header>

        <div className="st-content">
          <div className="st-columns">
            <div className="st-column-left">
              <div className="st-card">
                <div className="st-card-header">
                  <div className="st-avatar-wrap">
                    <div className="st-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <button className="st-avatar-edit" aria-label="Edit profile photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                    </button>
                  </div>
                  <div>
                    <span className="st-card-title">Profile</span>
                    <p className="st-card-sub">Manage your personal information</p>
                  </div>
                </div>

                <div className="st-field-grid">
                  <div className="st-field">
                    <label className="st-field-label">Full Name</label>
                    <input className="st-input" type="text" placeholder="Enter your full name" />
                  </div>
                  <div className="st-field">
                    <label className="st-field-label">Username</label>
                    <input className="st-input" type="text" placeholder="Enter your username" />
                  </div>
                  <div className="st-field">
                    <label className="st-field-label">Email Address</label>
                    <input className="st-input" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="st-field">
                    <label className="st-field-label">Mobile Number</label>
                    <input className="st-input" type="text" placeholder="+63 000 000 0000" />
                  </div>
                  <div className="st-field">
                    <label className="st-field-label">Date of Birth</label>
                    <input className="st-input" type="text" placeholder="MM/DD/YYYY" />
                  </div>
                  <div className="st-field">
                    <label className="st-field-label">Gender</label>
                    <div className="st-select-wrapper">
                      <select className="st-select">
                        <option value="">Select gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Prefer not to say</option>
                      </select>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                  </div>
                </div>

                <div className="st-field">
                  <label className="st-field-label">Address</label>
                  <textarea className="st-textarea" placeholder="Enter your address"></textarea>
                </div>
              </div>

              <div className="st-card">
                <span className="st-card-title">Security &amp; Privacy</span>
                <div className="st-password-row">
                  <PasswordField label="Current Password" placeholder="Current password" />
                  <PasswordField label="New Password" placeholder="New password" />
                  <PasswordField label="Confirm New" placeholder="Confirm new" />
                </div>

                <div className="st-2fa-row">
                  <div className="st-2fa-info">
                    <strong>Two-Factor Authentication (2FA)</strong>
                    <span>Extra layer of security via SMS/Email</span>
                  </div>
                  <label className="st-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="st-slider" />
                  </label>
                </div>

                <div className="st-login-activity">
                  <span className="st-activity-title">Recent Login Activity</span>
                  <div className="st-login-row">
                    <div className="st-login-info">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                      <span>Chrome on Windows &bull; Manila, PH</span>
                    </div>
                    <span className="st-login-status">Active now</span>
                  </div>
                  <div className="st-login-row">
                    <div className="st-login-info">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                      <span>iPhone 14 &bull; Palawan, PH</span>
                    </div>
                    <span className="st-login-muted">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="st-column-right">
              <div className="st-card">
                <span className="st-card-title">Quick Actions</span>
                <button className="st-btn-primary st-btn-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                  Save Profile
                </button>
                <button className="st-btn-secondary st-btn-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  Verify Email
                </button>
                <button className="st-btn-danger">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  Delete Account
                </button>
                <button className="st-btn-ghost" onClick={() => setShowLogout(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Log Out
                </button>
              </div>

              <div className="st-card">
                <span className="st-card-title">App Preferences</span>
                <label className="st-field-label">Language</label>
                <div className="st-select-wrapper">
                  <select className="st-select">
                    <option>English (US)</option>
                    <option>Filipino</option>
                    <option>Spanish</option>
                  </select>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>

                <label className="st-field-label">Theme Selection</label>
                <div className="st-theme-list">
                  <button className="st-theme-option active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    Light
                  </button>
                  <button className="st-theme-option">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    Dark
                  </button>
                  <button className="st-theme-option">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                    System
                  </button>
                </div>
              </div>

              <div className="st-card">
                <span className="st-card-title">Notifications</span>
                <div className="st-toggle-list">
                  <div className="st-toggle-row">
                    <span>Push Notifications</span>
                    <label className="st-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <span>Email Alerts</span>
                    <label className="st-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <span>SMS Notifications</span>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                </div>

                <div className="st-notif-group">
                  <span className="st-notif-group-title">Bookings</span>
                  <div className="st-toggle-row">
                    <div className="st-toggle-text">
                      <strong>Bookings</strong>
                      <span>Confirmations &amp; Updates</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div className="st-toggle-text">
                      <strong>Direct Chat</strong>
                      <span>Messages from hosts</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div className="st-toggle-text">
                      <strong>Review Reminders</strong>
                      <span>After your stay</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="st-slider" />
                    </label>
                  </div>
                  <div className="st-toggle-row">
                    <div className="st-toggle-text">
                      <strong>Promotional</strong>
                      <span>Deals &amp; newsletters</span>
                    </div>
                    <label className="st-switch">
                      <input type="checkbox" />
                      <span className="st-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showLogout && (
        <div className="st-logout-overlay" onClick={() => setShowLogout(false)}>
          <div className="st-logout-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <span className="st-logout-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </span>
            <h2 id="logout-title" className="st-logout-title">Are you sure you want to Log out?</h2>
            <p className="st-logout-message">You will need to sign in again to access the management hub.</p>
            <div className="st-logout-actions">
              <button type="button" className="st-btn-logout-confirm" onClick={confirmLogout}>Yes, Log out</button>
              <button type="button" className="st-btn-logout-cancel" onClick={() => setShowLogout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
