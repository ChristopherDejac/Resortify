import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import verifiedIcon from "./icon-wallet.svg";
import payIcon from "./icon.svg";
import "./Payment.css";

const statusFilters = ["All", "Paid & Verified", "Pending", "Rejected"];

export default function Payment() {
  const [activeStatus, setActiveStatus] = useState("All");
  const transactions = [];
  const filtered = activeStatus === "All"
    ? transactions
    : transactions.filter((t) => t.status === activeStatus);
  return (
    <div className="pay-layout">
      <aside className="pay-sidebar">
        <div className="pay-sidebar-brand">
          <span className="pay-sidebar-title">HanaPin</span>
          <span className="pay-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="pay-sidebar-nav">
          <Link to="/dashboard" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="pay-nav-item active">
            <img src={payIcon} alt="Payment" />
            Payment
          </Link>
          <Link to="/guests" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="pay-sidebar-divider" />
        <div className="pay-sidebar-footer">
          <Link to="/settings" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="pay-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="pay-main">
        <header className="pay-topbar">
          <h1 className="pay-topbar-title">Payment</h1>
          <div className="pay-topbar-right">
            <div className="pay-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <NotificationDropdown />
            <div className="pay-user-profile">
              <div className="pay-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="pay-user-info">
                <span className="pay-user-name">User</span>
              </div>
            </div>
          </div>
        </header>

        <div className="pay-content">
          <div className="pay-kpi-grid">
            <div className="pay-kpi-card">
              <div className="pay-kpi-text">
                <span className="pay-kpi-label">VERIFIED REVENUE</span>
                <span className="pay-kpi-value dash">&mdash;</span>
              </div>
              <span className="pay-kpi-icon green peso">
                <img src={verifiedIcon} alt="Verified" />
              </span>
            </div>
            <div className="pay-kpi-card">
              <div className="pay-kpi-text">
                <span className="pay-kpi-label">PENDING APPROVALS</span>
                <span className="pay-kpi-value dash">&mdash;</span>
              </div>
<span className="pay-kpi-icon amber">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="11" height="16" rx="2" /><line x1="7.5" y1="9" x2="11.5" y2="9" /><line x1="7.5" y1="13" x2="11.5" y2="13" /><line x1="7.5" y1="17" x2="10" y2="17" /><circle cx="16.5" cy="12" r="5" /><line x1="16.5" y1="12" x2="16.5" y2="9.5" /><line x1="16.5" y1="12" x2="18.3" y2="13" /></svg>
</span>
            </div>
            <div className="pay-kpi-card">
              <div className="pay-kpi-text">
                <span className="pay-kpi-label">PAID BOOKINGS</span>
                <span className="pay-kpi-value dash">&mdash;</span>
              </div>
<span className="pay-kpi-icon blue">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="7.5 12.5 10.5 15.5 16.5 9" /></svg>
</span>
            </div>
            <div className="pay-kpi-card">
              <div className="pay-kpi-text">
                <span className="pay-kpi-label">REJECTED</span>
                <span className="pay-kpi-value dash">&mdash;</span>
              </div>
              <span className="pay-kpi-icon red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
              </span>
            </div>
          </div>

          <div className="pay-filter-panel">
            <div className="pay-status-filters">
              <span className="pay-filter-label">Filter by Status:</span>
              {statusFilters.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`pay-chip${activeStatus === s ? " active" : ""}`}
                  onClick={() => setActiveStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="pay-filter-actions">
              <div className="pay-filter-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input type="text" placeholder="Search Guest or ID..." />
              </div>
              <button type="button" className="pay-filter-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Date
              </button>
              <button type="button" className="pay-export-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Export CSV
              </button>
            </div>
          </div>

          <div className="pay-table-card">
            <div className="pay-table-scroll">
              <table className="pay-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="pay-table-empty">
                      <div className="pay-table-empty-inner">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                        <span>No {activeStatus === "All" ? "payment transactions" : `${activeStatus.toLowerCase()} transactions`} yet</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
