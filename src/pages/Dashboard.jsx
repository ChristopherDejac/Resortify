import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dash-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`dash-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-title">HanaPin</span>
          <span className="sidebar-brand-sub">MANAGEMENT HUB</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            Manage Booking
          </Link>
          <Link to="/guests" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
          <div style={{ flex: 1 }} />
          <Link to="/settings" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" /></svg>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="dash-main">
        <header className="dash-topbar">
          <button className="hamburger" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>

          <div className="topbar-left">
            <span className="topbar-brand">HanaPin</span>
            <span className="topbar-brand-sub">MANAGEMENT HUB</span>
          </div>

          <h1 className="topbar-title">Dashboard</h1>

          <div className="topbar-right">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>

            <button className="icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>

          </div>
        </header>

        <section className="dash-content">
          <div className="welcome-section">
            <h2 className="welcome-title">Your dashboard is currently empty.</h2>
            <p className="welcome-sub">
              Add a property to start managing bookings, reviews, and analytics.
            </p>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card empty">
              <span className="kpi-label">Total Bookings</span>
              <span className="kpi-value">&mdash;</span>
              <span className="kpi-badge empty-state">No Data</span>
            </div>
            <div className="kpi-card empty">
              <span className="kpi-label">Active Amenities</span>
              <span className="kpi-value">&mdash;</span>
              <span className="kpi-badge empty-state">No Data</span>
            </div>
            <div className="kpi-card empty">
              <span className="kpi-label">Average Rating</span>
              <span className="kpi-value">&mdash;</span>
              <span className="kpi-badge empty-state">No Data</span>
            </div>
          </div>

          <div className="analytics-grid">
            <div className="chart-card empty">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Booking Velocity</h3>
                  <p className="chart-sub">Activity trends across all locations</p>
                </div>
              </div>
              <div className="empty-chart">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c0c8d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <p className="empty-chart-text">No booking data available yet.</p>
                <p className="empty-chart-sub">Connect a property or wait for activity to begin.</p>
              </div>
            </div>

            <div className="side-cards">
              <div className="alert-card empty">
                <div className="empty-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c0c8d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h4 className="alert-title">No Alerts</h4>
                <p className="alert-text">
                  You&apos;re all caught up. Alerts will appear here when action is needed.
                </p>
              </div>

              <div className="review-card empty">
                <div className="empty-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c0c8d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h4 className="review-title">No Reviews Yet</h4>
                <p className="review-text empty">
                  Guest reviews will appear here once bookings are completed.
                </p>
              </div>
            </div>
          </div>

          <div className="recent-bookings">
            <div className="recent-bookings-header">
              <div>
                <h2 className="recent-bookings-title">Recent Bookings</h2>
                <p className="recent-bookings-sub">No Data</p>
              </div>
              <a href="/bookings" className="recent-bookings-link">View All Bookings</a>
            </div>

            <div className="bookings-card empty">
              <div className="empty-bookings">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c0c8d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <p className="empty-bookings-text">No bookings yet</p>
                <p className="empty-bookings-sub">Bookings will appear here once guests start reserving.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
