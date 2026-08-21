import { Link } from "react-router-dom";
import { useState } from "react";
import "./Booking.css";

const filters = ["All", "Confirmed", "Pending", "Checked-out", "Cancelled"];

export default function Bookings() {
  const [activeFilter, setActiveFilter] = useState("Confirmed");

  const isCancelled = activeFilter === "Cancelled";
  const isDetailed = activeFilter === "Confirmed" || activeFilter === "Checked-out" || isCancelled;
  const isCheckedOut = activeFilter === "Checked-out";

  return (
    <div className="bk-layout">
      <aside className="bk-sidebar">
        <div className="bk-sidebar-brand">
          <span className="bk-sidebar-title">HanaPin</span>
          <span className="bk-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="bk-sidebar-nav">
          <Link to="/dashboard" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="bk-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            Manage Booking
          </Link>
          <Link to="/guests" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
          <div style={{ flex: 1 }} />
          <Link to="/settings" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="bk-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" /></svg>
            Logout
          </Link>
        </nav>
      </aside>

      <main className="bk-main">
        <header className="bk-topbar">
          <h1 className="bk-topbar-title">Manage Booking</h1>
          <div className="bk-topbar-right">
            <div className="bk-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="bk-icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>
          </div>
        </header>

        <div className="bk-content">
          {isCancelled ? (
            <div className="bk-kpi-grid three">
              <div className="bk-kpi-card">
                <div className="bk-kpi-top">
                  <span className="bk-kpi-label">CANCELLATION RATE</span>
                  <span className="bk-kpi-icon red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                  </span>
                </div>
                <span className="bk-kpi-value">&mdash;</span>
                <span className="bk-kpi-sub">&mdash;</span>
              </div>
              <div className="bk-kpi-card">
                <div className="bk-kpi-top">
                  <span className="bk-kpi-label">REFUNDS PENDING</span>
                  <span className="bk-kpi-icon green">
                    <span style={{ fontSize: 20, fontWeight: 700 }}>₱</span>
                  </span>
                </div>
                <span className="bk-kpi-value">&mdash;</span>
                <span className="bk-kpi-sub">&mdash;</span>
              </div>
              <div className="bk-kpi-card">
                <div className="bk-kpi-top">
                  <span className="bk-kpi-label">TOP REASON</span>
                  <span className="bk-kpi-icon gray">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                  </span>
                </div>
                <span className="bk-kpi-value">&mdash;</span>
                <span className="bk-kpi-sub">&mdash;</span>
              </div>
            </div>
          ) : isCheckedOut ? (
            <div className="bk-kpi-grid two">
              <div className="bk-kpi-card">
                <div className="bk-kpi-top">
                  <span className="bk-kpi-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17l-3-3M5 17l-3 3M19 17l3-3M19 17l3 3" /><path d="M12 3v12M9 9l3 3 3-3" /></svg>
                  </span>
                </div>
                <span className="bk-kpi-label">DEPARTURES TODAY</span>
                <span className="bk-kpi-value">&mdash;</span>
              </div>
              <div className="bk-kpi-card">
                <div className="bk-kpi-top">
                  <span className="bk-kpi-icon gray">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  </span>
                </div>
                <span className="bk-kpi-label">ROOMS PENDING CLEANING</span>
                <span className="bk-kpi-value">&mdash;</span>
              </div>
            </div>
          ) : (
            <div className="bk-kpi-grid">
              <div className="bk-kpi-card">
                <span className="bk-kpi-label">TOTAL BOOKINGS</span>
                <span className="bk-kpi-value">&mdash;</span>
              </div>
              <div className="bk-kpi-card">
                <span className="bk-kpi-label">PENDING CHECK-INS</span>
                <span className="bk-kpi-value green">&mdash;</span>
              </div>
              <div className="bk-kpi-card">
                <span className="bk-kpi-label">ACTIVE STAYS</span>
                <span className="bk-kpi-value">&mdash;</span>
              </div>
            </div>
          )}

          <div className="bk-filter-panel">
            <div className="bk-filter-row">
              <span className="bk-filter-label">Filter by Status:</span>
              <div className="bk-status-chips">
                {filters.map((f) => (
                  <button
                    key={f}
                    className={`bk-status-chip${activeFilter === f ? " active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bk-filter-actions">
              <div className="bk-search-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input type="text" placeholder="Guest Name or ID..." />
              </div>
              <button className="bk-date-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Date
              </button>
              <button className="bk-new-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                New Booking
              </button>
              {isCancelled && (
                <button className="bk-export-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Export Report
                </button>
              )}
            </div>
          </div>

          <div className="bk-table-card">
            <table className="bk-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Name</th>
                  <th>Cottage/Room</th>
                  {isDetailed ? (
                    <th>Stay Dates</th>
                  ) : (
                    <>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                    </>
                  )}
                  <th>Status</th>
                  {isCancelled && <th>Reason</th>}
                  {isDetailed && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={isCancelled ? 8 : isDetailed ? 7 : 6} className="bk-table-empty">
                    <div className="bk-table-empty-inner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                      <span>No {activeFilter.toLowerCase()} bookings found</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bk-table-footer">
              <span className="bk-table-info">
                Showing 0{isDetailed ? ` ${activeFilter}` : ""} bookings
              </span>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
