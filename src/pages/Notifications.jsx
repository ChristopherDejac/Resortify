import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import "./Notifications.css";

const filterChips = [
  "All Notifications",
  "Unread",
  "Payments & Deposits",
  "Bookings & Check-ins",
  "Reviews & Feedback",
  "System & LGU",
];

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="ntf-layout">
      <aside className="ntf-sidebar">
        <div className="ntf-sidebar-brand">
          <span className="ntf-sidebar-title">HanaPin</span>
          <span className="ntf-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="ntf-sidebar-nav">
          <Link to="/dashboard" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
            Payment
          </Link>
          <Link to="/guests" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="ntf-sidebar-divider" />
        <div className="ntf-sidebar-footer">
          <Link to="/settings" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="ntf-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="ntf-main">
        <header className="ntf-topbar">
          <h1 className="ntf-topbar-title">Notifications</h1>
          <div className="ntf-topbar-right">
            <div className="ntf-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <NotificationDropdown />
            <div className="ntf-user-profile">
              <div className="ntf-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="ntf-user-info">
                <span className="ntf-user-name">User</span>
              </div>
            </div>
          </div>
        </header>

        <div className="ntf-content">
          <div className="ntf-kpi-grid">
            <div className="ntf-kpi-card">
              <div className="ntf-kpi-body">
                <span className="ntf-kpi-label">UNREAD ALERTS</span>
                <span className="ntf-kpi-value">0</span>
                <span className="ntf-kpi-sub">No alerts requiring attention</span>
              </div>
              <span className="ntf-kpi-icon red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </span>
            </div>
            <div className="ntf-kpi-card">
              <div className="ntf-kpi-body">
                <span className="ntf-kpi-label">PENDING PAYMENTS</span>
                <span className="ntf-kpi-value">₱0.00</span>
                <span className="ntf-kpi-sub">Nothing awaiting verification</span>
              </div>
              <span className="ntf-kpi-icon orange">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="4.5" y1="8" x2="6.5" y2="8" /><line x1="4.5" y1="16" x2="6.5" y2="16" /><line x1="17.5" y1="8" x2="19.5" y2="8" /><line x1="17.5" y1="16" x2="19.5" y2="16" /></svg>
              </span>
            </div>
            <div className="ntf-kpi-card">
              <div className="ntf-kpi-body">
                <span className="ntf-kpi-label">TODAY'S CHECK-INS</span>
                <span className="ntf-kpi-value">0</span>
                <span className="ntf-kpi-sub">No arrivals scheduled</span>
              </div>
              <span className="ntf-kpi-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </span>
            </div>
            <div className="ntf-kpi-card">
              <div className="ntf-kpi-body">
                <span className="ntf-kpi-label">RECENT REVIEWS</span>
                <span className="ntf-kpi-value">0.0</span>
                <span className="ntf-kpi-sub">No reviews from recent stays</span>
              </div>
              <span className="ntf-kpi-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </span>
            </div>
          </div>

          <div className="ntf-filter-card">
            <div className="ntf-filter-chips">
              {filterChips.map((chip, i) => (
                <button
                  key={chip}
                  className={`ntf-filter-chip${activeFilter === i ? " active" : ""}`}
                  onClick={() => setActiveFilter(i)}
                >
                  {chip} (0)
                </button>
              ))}
            </div>
            <button type="button" className="ntf-mark-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Mark All as Read
            </button>
          </div>

          <div className="ntf-feed-empty">
            <div className="ntf-feed-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </div>
            <h3 className="ntf-feed-empty-title">No notifications yet</h3>
            <p className="ntf-feed-empty-sub">Payment verifications, booking updates, and guest reviews will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}