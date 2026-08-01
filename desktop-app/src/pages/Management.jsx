import { useState } from "react";
import { Link } from "react-router-dom";
import "./Management.css";

const sections = [
  "Resort Profile",
  "Location Details",
  "Contact Details",
  "Operating Schedule",
  "Entrance Fees",
  "Accommodation Details",
  "Amenities",
  "Pricing",
  "Policies",
  "Emergency Info",
  "Legal Declaration",
];

export default function Management() {
  const [activeSection, setActiveSection] = useState(0);
  const [category, setCategory] = useState({ private: false, public: true });
  const [amenities, setAmenities] = useState([true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false]);

  function handleSectionClick(index) {
    setActiveSection(index);
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleCategory(type) {
    setCategory(prev => ({ ...prev, [type]: !prev[type] }));
  }

  function toggleAmenity(index) {
    setAmenities(prev => prev.map((v, i) => i === index ? !v : v));
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            Management
          </Link>
          <Link to="/media-gallery" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            Media Gallery
          </Link>
          <Link to="/bookings" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            Manage Booking
          </Link>
          <Link to="/guests" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            Guest Reviews
          </Link>
          <div style={{ flex: 1 }} />
          <Link to="/settings" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </Link>
          <Link to="/" className="mgt-nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" /></svg>
            Logout
          </Link>
        </nav>
      </aside>

      <div className="mgt-sections-panel">
        <span className="mgt-sections-label">SECTIONS</span>
        <div className="mgt-sections-list">
          {sections.map((section, index) => (
              <button key={index} className={`mgt-section-item ${activeSection === index ? "selected" : ""}`} onClick={() => handleSectionClick(index)}>
              <span className="mgt-section-number">{index + 1} {section}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="mgt-main">
        <header className="mgt-topbar">
          <div className="mgt-topbar-right">
            <div className="mgt-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9aabba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search..." />
            </div>
            <button className="mgt-icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1a2a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </button>

          </div>
        </header>

        <div className="mgt-content">
          <div className="mgt-banner">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
              alt="Resort"
            />
            <div className="mgt-banner-overlay">
              <h2 className="mgt-banner-title">Public Resort Onboarding</h2>
              <p className="mgt-banner-sub">Complete the detailed data collection for official registry and management analytics.</p>
            </div>
          </div>

          <div className="mgt-form-card" id="section-0">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">1</div>
              <h3 className="mgt-form-title">Resort Profile</h3>
            </div>

            <div className="mgt-field">
              <label className="mgt-label">Resort Name</label>
              <input className="mgt-input" type="text" placeholder="e.g. Azure Sands Lagoon Resort" />
            </div>

            <div className="mgt-field">
              <label className="mgt-label">Description</label>
              <textarea className="mgt-textarea" placeholder="Provide a brief overview of the resort&apos;s unique features..." rows={4} />
            </div>

            <div className="mgt-field">
              <label className="mgt-label">Resort Category</label>
              <div className="mgt-radio-group">
                <label className={`mgt-radio-card ${category.private ? "selected" : ""}`} onClick={() => toggleCategory("private")}>
                  <input type="checkbox" checked={category.private} onChange={() => toggleCategory("private")} />
                  <span className="mgt-radio-dot" />
                  <span className="mgt-radio-label">Private Resort</span>
                </label>
                <label className={`mgt-radio-card ${category.public ? "selected" : ""}`} onClick={() => toggleCategory("public")}>
                  <input type="checkbox" checked={category.public} onChange={() => toggleCategory("public")} />
                  <span className="mgt-radio-dot" />
                  <span className="mgt-radio-label">Public Resort</span>
                </label>
              </div>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Category</label>
                <div className="mgt-select">
                  <select className="mgt-input">
                    <option>Beach Resort</option>
                  </select>
                  <svg className="mgt-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Year Established</label>
                <input className="mgt-input" type="text" placeholder="YYYY" />
              </div>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Business Permit #</label>
                <input className="mgt-input" type="text" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Contact Person &amp; Position</label>
                <input className="mgt-input" type="text" placeholder="Full Name, Role" />
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-1">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">2</div>
              <h3 className="mgt-form-title">Location Details</h3>
            </div>

            <div className="mgt-row-split">
              <div className="mgt-field mgt-field-wide">
                <label className="mgt-label">Address / Street</label>
                <input className="mgt-input" type="text" />
              </div>
              <div className="mgt-field mgt-field-narrow">
                <label className="mgt-label">Barangay</label>
                <input className="mgt-input" type="text" />
              </div>
            </div>

            <div className="mgt-row-thirds">
              <div className="mgt-field">
                <label className="mgt-label">City/Municipality</label>
                <input className="mgt-input" type="text" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Province</label>
                <input className="mgt-input" type="text" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">ZIP Code</label>
                <input className="mgt-input" type="text" />
              </div>
            </div>

            <div className="mgt-map">
              <iframe
                title="Location Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=120.9%2C14.6%2C121.2%2C14.8&layer=mapnik"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: 16 }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="mgt-form-card" id="section-2">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">3</div>
              <h3 className="mgt-form-title">Contact Details</h3>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Official Email</label>
                <input className="mgt-input" type="email" placeholder="contact@resort.com" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Phone Number</label>
                <input className="mgt-input" type="text" placeholder="+63 000 000 0000" />
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-3">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">4</div>
              <h3 className="mgt-form-title">Operating Schedule</h3>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Opening Hours</label>
                <input className="mgt-input" type="text" placeholder="--:-- --" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Closing Hours</label>
                <input className="mgt-input" type="text" placeholder="--:-- --" />
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-4">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">5</div>
              <h3 className="mgt-form-title">Entrance Fees</h3>
            </div>

            <div className="mgt-row-thirds">
              <div className="mgt-field">
                <label className="mgt-label">Adult Fee</label>
                <input className="mgt-input" type="text" placeholder="0.00" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Child Fee</label>
                <input className="mgt-input" type="text" placeholder="0.00" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Senior/PWD Fee</label>
                <input className="mgt-input" type="text" placeholder="0.00" />
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-5">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">6</div>
              <h3 className="mgt-form-title">Accommodation Details</h3>
            </div>

            <p className="mgt-description">List available room types and capacities.</p>

            <button className="mgt-add-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Add Room Type
            </button>
          </div>

          <div className="mgt-form-card" id="section-6">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">7</div>
              <h3 className="mgt-form-title">Amenities &amp; Facilities</h3>
            </div>

            <div className="mgt-amenities-grid">
              <div className={`mgt-amenity-card ${amenities[0] ? "selected" : ""}`} onClick={() => toggleAmenity(0)}>
                <div className="mgt-amenity-check">
                  {amenities[0]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-7 17h14a10 10 0 0 0-7-17z" /><path d="M12 12v7" /><path d="M8 17h8" /><path d="M5 19h14" /></svg>
                <span className="mgt-amenity-label">Swimming Pool</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[1] ? "selected" : ""}`} onClick={() => toggleAmenity(1)}>
                <div className="mgt-amenity-check">
                  {amenities[1]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c3-2 7-2 10 0s7 0 10 0" /><path d="M2 19c3-2 7-2 10 0s7 0 10 0" /><path d="M2 11c3-2 7-2 10 0s7 0 10 0" /><path d="M12 2v9" /></svg>
                <span className="mgt-amenity-label">Water Slides</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[2] ? "selected" : ""}`} onClick={() => toggleAmenity(2)}>
                <div className="mgt-amenity-check">
                  {amenities[2]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                <span className="mgt-amenity-label">Function Hall</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[3] ? "selected" : ""}`} onClick={() => toggleAmenity(3)}>
                <div className="mgt-amenity-check">
                  {amenities[3]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></svg>
                <span className="mgt-amenity-label">Free Wi-Fi</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[4] ? "selected" : ""}`} onClick={() => toggleAmenity(4)}>
                <div className="mgt-amenity-check">
                  {amenities[4]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="12" rx="2" /><path d="M7 21h10" /><path d="M12 15v6" /></svg>
                <span className="mgt-amenity-label">Parking Area</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[5] ? "selected" : ""}`} onClick={() => toggleAmenity(5)}>
                <div className="mgt-amenity-check">
                  {amenities[5]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" /></svg>
                <span className="mgt-amenity-label">On-site Dining</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[6] ? "selected" : ""}`} onClick={() => toggleAmenity(6)}>
                <div className="mgt-amenity-check">
                  {amenities[6]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5a5 5 0 0 1 7 0L12 8l-1.5-1.5a5 5 0 0 1 7 7L12 18l-5.5-5.5a5 5 0 0 1 0-7z" /></svg>
                <span className="mgt-amenity-label">Gym / Fitness</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[7] ? "selected" : ""}`} onClick={() => toggleAmenity(7)}>
                <div className="mgt-amenity-check">
                  {amenities[7]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-5 0-9-4-9-9 0-6 9-13 9-13s9 7 9 13c0 5-4 9-9 9z" /><path d="M9 12l2 2 4-4" /></svg>
                <span className="mgt-amenity-label">Spa Services</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[8] ? "selected" : ""}`} onClick={() => toggleAmenity(8)}>
                <div className="mgt-amenity-check">
                  {amenities[8]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <span className="mgt-amenity-label">Pet Friendly</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[9] ? "selected" : ""}`} onClick={() => toggleAmenity(9)}>
                <div className="mgt-amenity-check">
                  {amenities[9]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="20" height="12" rx="2" /><circle cx="8" cy="14" r="1" /><circle cx="16" cy="14" r="1" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
                <span className="mgt-amenity-label">BBQ Area</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[10] ? "selected" : ""}`} onClick={() => toggleAmenity(10)}>
                <div className="mgt-amenity-check">
                  {amenities[10]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                <span className="mgt-amenity-label">Karaoke Area</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[11] ? "selected" : ""}`} onClick={() => toggleAmenity(11)}>
                <div className="mgt-amenity-check">
                  {amenities[11]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22V12l10-9 10 9v10" /><path d="M12 2v20" /><path d="M6 22v-4a6 6 0 0 1 12 0v4" /></svg>
                <span className="mgt-amenity-label">Garden Area</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[12] ? "selected" : ""}`} onClick={() => toggleAmenity(12)}>
                <div className="mgt-amenity-check">
                  {amenities[12]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" /><path d="M12 6v6l4 2" /></svg>
                <span className="mgt-amenity-label">Sports Court</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[13] ? "selected" : ""}`} onClick={() => toggleAmenity(13)}>
                <div className="mgt-amenity-check">
                  {amenities[13]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M4 12h16" /><path d="M12 4v16" /></svg>
                <span className="mgt-amenity-label">Play Ground</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[14] ? "selected" : ""}`} onClick={() => toggleAmenity(14)}>
                <div className="mgt-amenity-check">
                  {amenities[14]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="6" x2="15" y2="6" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
                <span className="mgt-amenity-label">Resort Store</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[15] ? "selected" : ""}`} onClick={() => toggleAmenity(15)}>
                <div className="mgt-amenity-check">
                  {amenities[15]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><circle cx="12" cy="12" r="2" /></svg>
                <span className="mgt-amenity-label">Comfort Rooms</span>
              </div>
              <div className={`mgt-amenity-card ${amenities[16] ? "selected" : ""}`} onClick={() => toggleAmenity(16)}>
                <div className="mgt-amenity-check">
                  {amenities[16]
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l4-4m0 0l4 4m-4-4v-8a4 4 0 0 1 4-4h4" /><path d="M16 20l4-4m0 0l-4-4" /></svg>
                <span className="mgt-amenity-label">Shower Area</span>
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-7">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">8</div>
              <h3 className="mgt-form-title">Pricing</h3>
            </div>

            <p className="mgt-description">Upload your seasonal rate sheet or define standard pricing tiers.</p>

            <button className="mgt-add-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
              Upload Rate Sheet
            </button>
          </div>

          <div className="mgt-form-card" id="section-8">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">9</div>
              <h3 className="mgt-form-title">Policies</h3>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Check-in Time</label>
                <input className="mgt-input" type="text" placeholder="--:-- --" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">Check-out Time</label>
                <input className="mgt-input" type="text" placeholder="--:-- --" />
              </div>
            </div>

            <div className="mgt-field">
              <label className="mgt-label">Cancellation Policy</label>
              <textarea className="mgt-textarea" rows={4} />
            </div>
          </div>

          <div className="mgt-form-card" id="section-9">
            <div className="mgt-form-header">
              <div className="mgt-step-badge light">10</div>
              <h3 className="mgt-form-title">Emergency Info</h3>
            </div>

            <div className="mgt-row">
              <div className="mgt-field">
                <label className="mgt-label">Local Emergency Contact</label>
                <input className="mgt-input" type="text" placeholder="Police/Hospital Number" />
              </div>
              <div className="mgt-field">
                <label className="mgt-label">On-site Safety Officer</label>
                <input className="mgt-input" type="text" placeholder="Name &amp; Contact" />
              </div>
            </div>

            <div className="mgt-row">
              <div className="mgt-amenity-card">
                <div className="mgt-amenity-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-7 17h14a10 10 0 0 0-7-17z" /><path d="M12 12v7" /><path d="M8 17h8" /><path d="M5 19h14" /></svg>
                <span className="mgt-amenity-label">Life Guards on Duty</span>
              </div>
              <div className="mgt-amenity-card">
                <div className="mgt-amenity-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
                </div>
                <svg className="mgt-amenity-icon" viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M12 6v12" /><path d="M6 12h12" /></svg>
                <span className="mgt-amenity-label">Paramedics Available</span>
              </div>
            </div>
          </div>

          <div className="mgt-form-card" id="section-10">
            <div className="mgt-form-header">
              <div className="mgt-step-badge legal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M6 18h12" /><path d="M6 6h12" /><path d="M8 10h8" /><path d="M8 14h8" /></svg>
              </div>
              <h3 className="mgt-form-title">Legal Declaration</h3>
            </div>

            <div className="mgt-declaration-card">
              <div className="mgt-declaration-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
              </div>
              <p className="mgt-declaration-text">I certify that all information provided is accurate and I am authorized to register this resort.</p>
            </div>

            <div className="mgt-declaration-card">
              <div className="mgt-declaration-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
              </div>
              <p className="mgt-declaration-text">I agree to the <strong className="mgt-link">HanaPin Partner Terms and Conditions</strong> and <strong className="mgt-link">Privacy Policy</strong>.</p>
            </div>
          </div>

          <div className="mgt-content-bottom" />
        </div>

      </main>
    </div>
  );
}
