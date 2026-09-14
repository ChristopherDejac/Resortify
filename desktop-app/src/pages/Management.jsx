import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../components/NotificationDropdown";
import MapPinEditor from "../components/MapPinEditor";
import "./Management.css";

const amenitiesList = [
  { label: "Swimming Pool", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-7 17h14a10 10 0 0 0-7-17z" /><path d="M12 12v7" /><path d="M8 17h8" /><path d="M5 19h14" /></svg> },
  { label: "Water Slides", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c3-2 7-2 10 0s7 0 10 0" /><path d="M2 19c3-2 7-2 10 0s7 0 10 0" /><path d="M2 11c3-2 7-2 10 0s7 0 10 0" /><path d="M12 2v9" /></svg> },
  { label: "Wave Pool", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg> },
  { label: "Shower Area", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l4-4m0 0l4 4m-4-4v-8a4 4 0 0 1 4-4h4" /><path d="M16 20l4-4m0 0l-4-4" /></svg> },
  { label: "Comfort Rooms", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><circle cx="12" cy="12" r="2" /></svg> },
  { label: "Free Wi-Fi", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></svg> },
  { label: "Parking Area", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="12" rx="2" /><path d="M7 21h10" /><path d="M12 15v6" /></svg> },
  { label: "On-site Dining", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" /></svg> },
  { label: "Sports Court", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" /><path d="M12 6v6l4 2" /></svg> },
  { label: "Play Ground", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M4 12h16" /><path d="M12 4v16" /></svg> },
  { label: "Gym / Fitness", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5a5 5 0 0 1 7 0L12 8l-1.5-1.5a5 5 0 0 1 7 7L12 18l-5.5-5.5a5 5 0 0 1 0-7z" /></svg> },
  { label: "Spa Services", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-5 0-9-4-9-9 0-6 9-13 9-13s9 7 9 13c0 5-4 9-9 9z" /><path d="M9 12l2 2 4-4" /></svg> },
  { label: "Pet Friendly", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { label: "Resort Store", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="15" y2="6" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="15" y2="14" /></svg> },
  { label: "Garden Area", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22V12l10-9 10 9v10" /><path d="M12 2v20" /><path d="M6 22v-4a6 6 0 0 1 12 0v4" /></svg> },
  { label: "BBQ Area", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="20" height="12" rx="2" /><circle cx="8" cy="14" r="1" /><circle cx="16" cy="14" r="1" /><line x1="2" y1="12" x2="22" y2="12" /></svg> },
  { label: "Karaoke Area", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg> },
];

export default function Management() {
  const [tab, setTab] = useState("informations");
  const [category, setCategory] = useState("public");
  const [open247, setOpen247] = useState(true);
  const [addCategories, setAddCategories] = useState(0);
  const [amenities, setAmenities] = useState(Array(amenitiesList.length).fill(false));
  const [lifeGuard, setLifeGuard] = useState(true);
  const [paramedic, setParamedic] = useState(false);
  const [actionMsg, setActionMsg] = useState("");
  const [chartMode, setChartMode] = useState("weekly");

  function toggleAmenity(index) {
    setAmenities((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }
  return (
    <div className="mgt-layout">
      <aside className="mgt-sidebar">
        <div className="mgt-sidebar-brand">
          <span className="mgt-sidebar-title">HanaPin</span>
          <span className="mgt-sidebar-sub">MANAGEMENT HUB</span>
        </div>
        <nav className="mgt-sidebar-nav">
          <Link to="/dashboard" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            Overview
          </Link>
          <Link to="/management" className="mgt-nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Bookings
          </Link>
          <Link to="/payment" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="4.5" y1="8" x2="6.5" y2="8" /><line x1="4.5" y1="16" x2="6.5" y2="16" /><line x1="17.5" y1="8" x2="19.5" y2="8" /><line x1="17.5" y1="16" x2="19.5" y2="16" /></svg>
            Payment
          </Link>
          <Link to="/guests" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
        </nav>
        <div className="mgt-sidebar-divider" />
        <div className="mgt-sidebar-footer">
          <Link to="/settings" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Support
          </Link>
        </div>
      </aside>

      <main className="mgt-main">
        <header className="mgt-topbar">
          <h1 className="mgt-topbar-title">Management</h1>
          <div className="mgt-topbar-right">
            <div className="mgt-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <NotificationDropdown />
            <div className="mgt-user-profile">
              <div className="mgt-user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div className="mgt-user-info">
                <span className="mgt-user-name">User</span>
              </div>
            </div>

          </div>
        </header>

        <div className="mgt-content">
          <div className="mgt-linktabs">
            <button
              type="button"
              className={`mgt-linktab${tab === "informations" ? " active" : ""}`}
              onClick={() => setTab("informations")}
            >
              Informations
            </button>
            <button
              type="button"
              className={`mgt-linktab${tab === "sales" ? " active" : ""}`}
              onClick={() => setTab("sales")}
            >
              Sales
            </button>
          </div>

          {tab === "informations" && (
            <div className="mg-form">
              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">1</span>
                  <h3 className="mg-card-title">Resort Profile</h3>
                </div>

                <div className="mg-grid2">
                  <div className="mg-field">
                    <label className="mg-label">Resort Name</label>
                    <input className="mg-input" type="text" placeholder="e.g. Azure Sands Resort" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Year Established</label>
                    <input className="mg-input" type="text" placeholder="YYYY" />
                  </div>
                </div>

                <div className="mg-field">
                  <label className="mg-label">Description</label>
                  <textarea className="mg-textarea" placeholder="Provide a brief overview of the resort&apos;s unique features..." rows={3} />
                </div>

                <div className="mg-grid2">
                  <div className="mg-field">
                    <label className="mg-label">Owner Name</label>
                    <input className="mg-input" type="text" placeholder="Full name of the owner" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Manager Name</label>
                    <input className="mg-input" type="text" placeholder="Full name of the manager" />
                  </div>
                </div>

                <div className="mg-subcard">
                  <div className="mg-field">
                    <label className="mg-label">Category</label>
                    <div className="mg-radio-inline">
                      <label
                        className={`mg-choice${category === "public" ? " selected" : ""}`}
                        onClick={() => setCategory("public")}
                      >
                        <input type="radio" name="mgt-category" checked={category === "public"} onChange={() => setCategory("public")} />
                        <span className="mg-choice-dot" />
                        Public
                      </label>
                      <label
                        className={`mg-choice${category === "private" ? " selected" : ""}`}
                        onClick={() => setCategory("private")}
                      >
                        <input type="radio" name="mgt-category" checked={category === "private"} onChange={() => setCategory("private")} />
                        <span className="mg-choice-dot" />
                        Private
                      </label>
                    </div>
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Female Staff</label>
                    <input className="mg-input" type="text" placeholder="0" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Male Staff</label>
                    <input className="mg-input" type="text" placeholder="0" />
                  </div>
                </div>
              </section>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">2</span>
                  <h3 className="mg-card-title">Location Details</h3>
                </div>

                <div className="mg-loc-grid">
                  <div>
                    <div className="mg-field">
                      <label className="mg-label">Street Address</label>
                      <input className="mg-input" type="text" placeholder="Street / Barangay" />
                    </div>
                    <div className="mg-grid2">
                      <div className="mg-field">
                        <label className="mg-label">City / Municipality</label>
                        <input className="mg-input" type="text" placeholder="City" />
                      </div>
                      <div className="mg-field">
                        <label className="mg-label">Province / State</label>
                        <input className="mg-input" type="text" placeholder="Province" />
                      </div>
                    </div>
                    <div className="mg-grid2">
                      <div className="mg-field">
                        <label className="mg-label">ZIP Code</label>
                        <input className="mg-input" type="text" placeholder="0000" />
                      </div>
                    </div>
                  </div>

                  <div className="mg-map">
                    <MapPinEditor />
                  </div>
                </div>
              </section>

              <div className="mg-split">
                <section className="mg-card">
                  <div className="mg-card-head">
                    <span className="mg-step">3</span>
                    <h3 className="mg-card-title">Contact Details</h3>
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Official Email</label>
                    <input className="mg-input" type="email" placeholder="contact@resort.com" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Phone Number</label>
                    <input className="mg-input" type="text" placeholder="+63 000 000 0000" />
                  </div>
                </section>

                <section className="mg-card">
                  <div className="mg-card-head">
                    <span className="mg-step">4</span>
                    <h3 className="mg-card-title">Operating Schedule</h3>
                  </div>
                  <div className="mg-24row">
                    <span className="mg-24text">Open 24/7</span>
                    <label className={`mg-switch${open247 ? " on" : ""}`}>
                      <input type="checkbox" checked={open247} onChange={() => setOpen247(!open247)} />
                      <span className="mg-switch-track">
                        <span className="mg-switch-knob" />
                      </span>
                    </label>
                  </div>
                  <div className="mg-grid2">
                    <div className="mg-field">
                      <label className="mg-label">Opening</label>
                      <input className="mg-input" type="text" placeholder="--:-- --" disabled={open247} />
                    </div>
                    <div className="mg-field">
                      <label className="mg-label">Closing</label>
                      <input className="mg-input" type="text" placeholder="--:-- --" disabled={open247} />
                    </div>
                  </div>
                </section>
              </div>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">5</span>
                  <h3 className="mg-card-title">Entrance Fees</h3>
                </div>

                <table className="mg-fee-table">
                  <thead>
                    <tr>
                      <th>Guest Type</th>
                      <th>Daytime (8am&ndash;5pm)</th>
                      <th>Overnight (6pm&ndash;7am)</th>
                      <th>Full Day (24h)</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {["Adults", "Children (3-12)", "Senior / PWD"].map((type) => (
                      <tr key={type}>
                        <td className="mg-fee-type">{type}</td>
                        {[0, 1, 2].map((i) => (
                          <td key={i}>
                            <span className="mg-price">
                              <span className="mg-price-sign">&#8369;</span>
                              <input className="mg-price-input" type="text" placeholder="0.00" />
                            </span>
                          </td>
                        ))}
                        <td>
                          <button type="button" className="mg-tool" aria-label="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="mg-card">
                <div className="mg-card-head mg-card-head-accom">
                  <span className="mg-step">6</span>
                  <h3 className="mg-card-title">Accommodation Details</h3>
                  <button type="button" className="mg-add-btn" onClick={() => setAddCategories((n) => n + 1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add Category
                  </button>
                </div>

                <div className="mg-accom-label">Guest Rooms</div>
                <div className="mg-accom-empty">No room types added yet.</div>

                <div className="mg-accom-label">Private Areas</div>
                <div className="mg-accom-empty">No private areas added yet.</div>

                {addCategories > 0 && (
                  <div className="mg-accom-label mg-accom-label-new">New Category</div>
                )}
                {Array.from({ length: addCategories }).map((_, i) => (
                  <div className="mg-accom-placeholder" key={i}>New category #{i + 1} &mdash; click to configure</div>
                ))}
              </section>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">7</span>
                  <h3 className="mg-card-title">Amenities &amp; Facilities</h3>
                </div>

                <div className="mg-amenities-grid">
                  {amenitiesList.map((item, i) => (
                    <button
                      type="button"
                      key={item.label}
                      className={`mg-amenity${amenities[i] ? " selected" : ""}`}
                      onClick={() => toggleAmenity(i)}
                    >
                      <span className="mg-amenity-box">
                        {amenities[i] && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                      </span>
                      <span className="mg-amenity-icon">{item.icon}</span>
                      <span className="mg-amenity-name">{item.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">8</span>
                  <h3 className="mg-card-title">Policies</h3>
                </div>

                <div className="mg-policies-grid">
                  <div className="mg-field">
                    <label className="mg-label">Check-in Time</label>
                    <input className="mg-input" type="text" placeholder="--:-- --" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Check-out Time</label>
                    <input className="mg-input" type="text" placeholder="--:-- --" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Cancellation Policy</label>
                    <textarea className="mg-textarea mg-textarea-tall" placeholder="State your cancellation terms..." rows={6} />
                  </div>
                </div>

                <div className="mg-field">
                  <label className="mg-label">Guest Rules</label>
                  <textarea className="mg-textarea mg-textarea-short" placeholder="List rules guests should follow..." rows={3} />
                </div>
              </section>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">9</span>
                  <h3 className="mg-card-title">Emergency Info</h3>
                </div>

                <div className="mg-emer-grid">
                  <div>
                    <div className="mg-field">
                      <label className="mg-label">Nearest Hospital Contact</label>
                      <input className="mg-input" type="text" placeholder="Hospital name &amp; number" />
                    </div>
                    <div className="mg-field">
                      <label className="mg-label">Local Police Contact</label>
                      <input className="mg-input" type="text" placeholder="Precinct &amp; hotline" />
                    </div>
                  </div>
                  <div>
                    <div className="mg-eme-toggle">
                      <span className="mg-eme-t-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      </span>
                      <span className="mg-eme-t-label">Life Guards on Duty</span>
                      <label className={`mg-switch small${lifeGuard ? " on" : ""}`}>
                        <input type="checkbox" checked={lifeGuard} onChange={() => setLifeGuard(!lifeGuard)} />
                        <span className="mg-switch-track">
                          <span className="mg-switch-knob" />
                        </span>
                      </label>
                    </div>
                    <div className="mg-eme-toggle">
                      <span className="mg-eme-t-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M12 6v12" /><path d="M6 12h12" /></svg>
                      </span>
                      <span className="mg-eme-t-label">On-site Paramedics</span>
                      <label className={`mg-switch small${paramedic ? " on" : ""}`}>
                        <input type="checkbox" checked={paramedic} onChange={() => setParamedic(!paramedic)} />
                        <span className="mg-switch-track">
                          <span className="mg-switch-knob" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mg-card">
                <div className="mg-card-head">
                  <span className="mg-step">10</span>
                  <h3 className="mg-card-title">Social Media &amp; Website</h3>
                </div>

                <div className="mg-grid3">
                  <div className="mg-field">
                    <label className="mg-label">Website URL</label>
                    <input className="mg-input" type="text" placeholder="https://" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Facebook Page</label>
                    <input className="mg-input" type="text" placeholder="facebook.com/" />
                  </div>
                  <div className="mg-field">
                    <label className="mg-label">Instagram Profile</label>
                    <input className="mg-input" type="text" placeholder="@handle" />
                  </div>
                </div>
              </section>

              <div className="mg-actions">
                {actionMsg && <span className="mg-action-msg">{actionMsg}</span>}
                <button
                  type="button"
                  className="mg-btn-secondary"
                  onClick={() => setActionMsg("Changes discarded.")}
                >
                  Discard Changes
                </button>
                <button
                  type="button"
                  className="mg-btn-primary"
                  onClick={() => setActionMsg("Changes saved.")}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {tab === "sales" && (
            <div className="mg-sales">
              <div className="mg-sales-toolbar">
                <div className="mg-date-filter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  <span>0 Days</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <button type="button" className="mg-apply-btn">Apply</button>
              </div>

              <div className="mg-kpis">
                <div className="mg-kpi-card">
                  <div className="mg-kpi-top">
                    <span className="mg-kpi-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="8" cy="9" rx="7" ry="4" /><path d="M15 9v6c0 2.2-3.1 4-7 4s-7-1.8-7-4V9" /><path d="M15 12c0 2.2-3.1 4-7 4" /></svg>
                    </span>
                  </div>
                  <span className="mg-kpi-label">Total Revenue</span>
                  <span className="mg-kpi-value dash">&mdash;</span>
                </div>
                <div className="mg-kpi-card">
                  <div className="mg-kpi-top">
                    <span className="mg-kpi-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    </span>
                  </div>
                  <span className="mg-kpi-label">Avg. Booking</span>
                  <span className="mg-kpi-value dash">&mdash;</span>
                </div>
                <div className="mg-kpi-card">
                  <div className="mg-kpi-top">
                    <span className="mg-kpi-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
                    </span>
                  </div>
                  <span className="mg-kpi-label">Occupancy Rate</span>
                  <span className="mg-kpi-value dash">&mdash;</span>
                </div>
                <div className="mg-kpi-card">
                  <div className="mg-kpi-top">
                    <span className="mg-kpi-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    </span>
                  </div>
                  <span className="mg-kpi-label">Total Bookings</span>
                  <span className="mg-kpi-value dash">&mdash;</span>
                </div>
              </div>

              <div className="mg-charts">
                <div className="mg-chart-card">
                  <div className="mg-chart-head">
                    <div>
                      <h4 className="mg-chart-title">Revenue Trends</h4>
                      <span className="mg-chart-sub">Daily earnings over the last 30 days</span>
                    </div>
                    <div className="mg-pill-toggle">
                      <button type="button" className={`mg-pill${chartMode === "daily" ? " active" : ""}`} onClick={() => setChartMode("daily")}>Daily</button>
                      <button type="button" className={`mg-pill${chartMode === "weekly" ? " active" : ""}`} onClick={() => setChartMode("weekly")}>Weekly</button>
                    </div>
                  </div>

                  <div className="mg-bars-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9aa8b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    <span>No revenue data yet</span>
                  </div>
                </div>

                <div className="mg-chart-card">
                  <div className="mg-chart-head">
                    <div>
                      <h4 className="mg-chart-title">Revenue by Category</h4>
                      <span className="mg-chart-sub">Segmented by service type</span>
                    </div>
                  </div>

                  <div className="mg-donut-empty">
                    <svg viewBox="0 0 100 100" className="mg-donut-svg empty">
                      <circle cx="50" cy="50" r="32" fill="none" stroke="#e5e9eb" strokeWidth="16" />
                    </svg>
                    <span className="mg-donut-empty-label">No data yet</span>
                  </div>
                </div>
              </div>

              <div className="mg-chart-card mg-table-card">
                <div className="mg-table-head">
                  <div>
                    <h4 className="mg-chart-title">Revenue Breakdown by Date</h4>
                    <span className="mg-chart-sub">Detailed daily performance logs</span>
                  </div>
                  <button type="button" className="mg-export-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Export CSV
                  </button>
                </div>

                <table className="mg-rev-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bookings</th>
                      <th>Gross Sales</th>
                      <th>Net Income</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4" className="mg-rev-empty">No sales data available yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
