import { Link } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import "./Guests.css";

export default function Guests() {
  return (
    <div className="gst-layout">
      <aside className="gst-sidebar">
        <div className="gst-sidebar-brand">
          <span className="gst-sidebar-title">HanaPin</span>
          <span className="gst-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="gst-sidebar-nav">
          <Link to="/dashboard" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="4.5" y1="8" x2="6.5" y2="8" /><line x1="4.5" y1="16" x2="6.5" y2="16" /><line x1="17.5" y1="8" x2="19.5" y2="8" /><line x1="17.5" y1="16" x2="19.5" y2="16" /></svg>
            Payment
          </Link>
          <Link to="/guests" className="gst-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="gst-sidebar-divider" />
        <div className="gst-sidebar-footer">
          <Link to="/settings" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="gst-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="gst-main">
        <header className="gst-topbar">
          <h1 className="gst-topbar-title">Guest Reviews</h1>
          <div className="gst-topbar-right">
            <div className="gst-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search reviews..." />
            </div>
            <NotificationDropdown />
            <div className="gst-user-profile">
              <div className="gst-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="gst-user-info">
                <span className="gst-user-name">User</span>
              </div>
            </div>
          </div>
        </header>

        <div className="gst-content">
          

          <div className="gst-kpi-grid">
            <div className="gst-kpi-card">
              <div className="gst-kpi-top">
                <span className="gst-kpi-icon green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </span>
                <span className="gst-badge green">&mdash;</span>
              </div>
              <span className="gst-kpi-label">Average Rating</span>
              <span className="gst-kpi-value">&mdash;</span>
            </div>
            <div className="gst-kpi-card">
              <div className="gst-kpi-top">
                <span className="gst-kpi-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </span>
                <span className="gst-badge gray">&mdash;</span>
              </div>
              <span className="gst-kpi-label">Total Reviews</span>
              <span className="gst-kpi-value">&mdash;</span>
            </div>
            <div className="gst-kpi-card">
              <div className="gst-kpi-top">
                <span className="gst-kpi-icon green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </span>
                <span className="gst-badge green">&mdash;</span>
              </div>
              <span className="gst-kpi-label">Response Rate</span>
              <span className="gst-kpi-value">&mdash;</span>
            </div>
            <div className="gst-kpi-card">
              <div className="gst-kpi-top">
                <span className="gst-kpi-icon purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <span className="gst-badge gray">&mdash;</span>
              </div>
              <span className="gst-kpi-label">Verified Stays</span>
              <span className="gst-kpi-value">&mdash;</span>
            </div>
          </div>

          <div className="gst-feedback-header">
            <h3 className="gst-feedback-title">Recent Feedback</h3>
            <div className="gst-feedback-filters">
              <button className="gst-filter-btn">
                Filter by Rating
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <button className="gst-filter-btn">
                Sort by Date
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
          </div>

          <div className="gst-reviews">
            <div className="gst-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <span className="gst-empty-text">No reviews yet</span>
            </div>
          </div>

          <button className="gst-view-more">
            View Older Reviews
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      </main>
    </div>
  );
}
