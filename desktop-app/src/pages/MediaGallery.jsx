import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import "./MediaGallery.css";

const filterChips = {
  "All Photos": ["All Photos"],
  Exterior: ["All Exterior", "Main Entrance", "Reception Building", "Garden", "Cottage", "Outside Room"],
  Interior: ["All Interior", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room"],
  Amenities: ["All Amenities", "Pool", "Play Ground", "Function Hall", "Grilling Area", "Karaoke Room"],
};

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState("Interior");
  const [activeChip, setActiveChip] = useState(0);
  const chips = filterChips[activeTab] || [];

  return (
    <div className="mg-layout">
      <aside className="mg-sidebar">
        <div className="mg-sidebar-brand">
          <span className="mg-sidebar-title">HanaPin</span>
          <span className="mg-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="mg-sidebar-nav">
          <Link to="/dashboard" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="mg-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="4.5" y1="8" x2="6.5" y2="8" /><line x1="4.5" y1="16" x2="6.5" y2="16" /><line x1="17.5" y1="8" x2="19.5" y2="8" /><line x1="17.5" y1="16" x2="19.5" y2="16" /></svg>
            Payment
          </Link>
          <Link to="/guests" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="mg-sidebar-divider" />
        <div className="mg-sidebar-footer">
          <Link to="/settings" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="mg-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="mg-main">
        <header className="mg-topbar">
          <h1 className="mg-topbar-title">Media Gallery</h1>
          <div className="mg-topbar-right">
            <div className="mg-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <NotificationDropdown />
            <div className="mg-user-profile">
              <div className="mg-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="mg-user-info">
                <span className="mg-user-name">User</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mg-content">
          <div className="mg-summary-panel">
            <div className="mg-stat-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="#083e48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
              <div className="mg-stat-body">
                <span className="mg-stat-label">ACTIVITIES STORAGE</span>
                <span className="mg-stat-desc">Optimized for high-resolution assets</span>
              </div>
              <div className="mg-stat-usage">
                <span className="mg-stat-number">0 GB of 100 GB</span>
                <div className="mg-progress-bar">
                  <div className="mg-progress-fill" style={{ width: "0%" }} />
                </div>
              </div>
            </div>

            <div className="mg-stat-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="#083e48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              <div className="mg-stat-body">
                <span className="mg-stat-label">TOTAL FILES</span>
                <span className="mg-stat-number large">0</span>
              </div>
            </div>
          </div>

          <div className="mg-tabs">
            <button className={`mg-tab ${activeTab === "All Photos" ? "active" : ""}`} onClick={() => { setActiveTab("All Photos"); setActiveChip(0); }}>All Photos</button>
            <button className={`mg-tab ${activeTab === "Exterior" ? "active" : ""}`} onClick={() => { setActiveTab("Exterior"); setActiveChip(0); }}>Exterior</button>
            <button className={`mg-tab ${activeTab === "Interior" ? "active" : ""}`} onClick={() => { setActiveTab("Interior"); setActiveChip(0); }}>Interior</button>
            <button className={`mg-tab ${activeTab === "Amenities" ? "active" : ""}`} onClick={() => { setActiveTab("Amenities"); setActiveChip(0); }}>Amenities</button>
          </div>

          <div className="mg-filters">
            <span className="mg-filter-label">Filter by:</span>
            {chips.map((chip, i) => (
              <button key={chip} className={`mg-filter-chip ${activeChip === i ? "active" : ""}`} onClick={() => setActiveChip(i)}>{chip}</button>
            ))}
          </div>

          <div className="mg-gallery-add full">
            <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
            <span className="mg-gallery-add-text">No {activeTab.toLowerCase()} photos yet. Click to upload.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
