import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Available Amenities", value: "24", icon: "pool" },
  { label: "Today's Checkout", value: "18", icon: "logout" },
  { label: "Cancellations", value: "03", icon: "cancel" },
  { label: "Enquiries", value: "42", icon: "enquiry" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const iconMap = {
    pool: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V2H6v4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z M8 2v4 M16 2v4 M2 12h20",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
    cancel: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M15 9l-6 6 M9 9l6 6",
    enquiry: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  };

  return (
    <div className="dash-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`dash-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0a4b7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="sidebar-brand-text">RESORTIFY</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="#" className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Dashboard
          </Link>
          <Link to="#" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            Bookings
          </Link>
          <Link to="#" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Calendar
          </Link>
          <Link to="#" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            Guests
          </Link>
          <Link to="#" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" /></svg>
            Logout
          </Link>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>

          <div className="topbar-right">
            <div className="search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search" />
            </div>

            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span className="badge">3</span>
            </button>
            <div className="avatar">JD</div>
          </div>
        </header>

        <section className="dash-content">
          <div className="dash-header">
            <h2>Dashboard</h2>
            <p>Welcome back, Admin</p>
          </div>

          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0a4b7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {iconMap[s.icon].split(" ").map((d, j) => {
                      if (d.startsWith("M") || d.startsWith("L") || d.startsWith("C") || d.startsWith("Q") || d.startsWith("A") || d.startsWith("Z"))
                        return <path key={j} d={d} />;
                      const [tag, ...rest] = d.match(/^([a-z]+)(.*)/)?.slice(1) || [];
                      if (tag === "circle") {
                        const [cx, cy, r] = rest.join("").match(/[\d.]+/g);
                        return <circle key={j} cx={cx} cy={cy} r={r} />;
                      }
                      if (tag === "rect") {
                        const [x, y, w, h] = rest.join("").match(/[\d.]+/g);
                        return <rect key={j} x={x} y={y} width={w} height={h} />;
                      }
                      if (tag === "line") {
                        const [x1, y1, x2, y2] = rest.join("").match(/[\d.]+/g);
                        return <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} />;
                      }
                      if (tag === "polyline") {
                        const pts = rest.join("").trim();
                        return <polyline key={j} points={pts} />;
                      }
                      return null;
                    })}
                  </svg>
                </div>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="dash-section">
            <h3>Recent Bookings</h3>
            <div className="table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Olivia Rhye</td><td>Suite 201</td><td>05 May 2026</td><td>08 May 2026</td><td><span className="status confirmed">Confirmed</span></td></tr>
                  <tr><td>Phoenix Baker</td><td>Deluxe 104</td><td>06 May 2026</td><td>09 May 2026</td><td><span className="status checked-in">Checked In</span></td></tr>
                  <tr><td>Lana Steiner</td><td>Executive 302</td><td>03 May 2026</td><td>07 May 2026</td><td><span className="status pending">Pending</span></td></tr>
                  <tr><td>Demi Wilkinson</td><td>Standard 12</td><td>01 May 2026</td><td>06 May 2026</td><td><span className="status cancelled">Cancelled</span></td></tr>
                  <tr><td>Candice Wu</td><td>Penthouse 501</td><td>07 May 2026</td><td>14 May 2026</td><td><span className="status confirmed">Confirmed</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
