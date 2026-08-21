import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

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

export default function RegistrationPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [category, setCategory] = useState({ private: false, public: true });
  const [amenities, setAmenities] = useState(
    Array(17).fill(false).map((_, i) => i === 0 || i === 3)
  );
  const [declarations, setDeclarations] = useState([false, false]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleSectionClick(index) {
    setActiveSection(index);
    document.getElementById(`reg-section-${index}`)?.scrollIntoView({ behavior: "smooth" });
  }

  function toggleCategory(type) {
    setCategory((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  function toggleAmenity(index) {
    setAmenities((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  function toggleDeclaration(index) {
    setDeclarations((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div className="regp-page">
      <nav className="regp-nav">
        <Link to="/" className="regp-logo">HanaPin</Link>
      </nav>

      <div className="regp-content">
        <aside className="regp-sidebar">
          <span className="regp-sidebar-label">SECTIONS</span>
          <div className="regp-sidebar-list">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`regp-section-btn ${activeSection === index ? "selected" : ""}`}
                onClick={() => handleSectionClick(index)}
              >
                <span className="regp-section-num">{index + 1}</span>
                <span className="regp-section-name">{section}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="regp-main">
          <div className="regp-banner">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80"
              alt="Resort"
            />
            <div className="regp-banner-overlay">
              <h2 className="regp-banner-title">Public Resort Onboarding</h2>
              <p className="regp-banner-sub">Complete the detailed data collection for official registry and management analytics.</p>
            </div>
          </div>

          {/* Section 1: Resort Profile */}
          <div className="regp-form-card" id="reg-section-0">
            <div className="regp-form-header">
              <div className="regp-step-badge light">1</div>
              <h3 className="regp-form-title">Resort Profile</h3>
            </div>
            <div className="regp-field">
              <label className="regp-label">Resort Name</label>
              <input className="regp-input" type="text" placeholder="e.g. Azure Sands Lagoon Resort" />
            </div>
            <div className="regp-field">
              <label className="regp-label">Description</label>
              <textarea className="regp-textarea" placeholder="Provide a brief overview of the resort's unique features..." rows={4} />
            </div>
            <div className="regp-field">
              <label className="regp-label">Resort Category</label>
              <div className="regp-radio-group">
                <label className={`regp-radio-card ${category.private ? "selected" : ""}`} onClick={() => toggleCategory("private")}>
                  <input type="checkbox" checked={category.private} onChange={() => toggleCategory("private")} />
                  <span className="regp-radio-dot" />
                  <span className="regp-radio-label">Private Resort</span>
                </label>
                <label className={`regp-radio-card ${category.public ? "selected" : ""}`} onClick={() => toggleCategory("public")}>
                  <input type="checkbox" checked={category.public} onChange={() => toggleCategory("public")} />
                  <span className="regp-radio-dot" />
                  <span className="regp-radio-label">Public Resort</span>
                </label>
              </div>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Category</label>
                <div className="regp-select">
                  <select className="regp-input">
                    <option>Beach Resort</option>
                  </select>
                  <svg className="regp-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              <div className="regp-field">
                <label className="regp-label">Year Established</label>
                <input className="regp-input" type="text" placeholder="YYYY" />
              </div>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Business Permit #</label>
                <input className="regp-input" type="text" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Contact Person &amp; Position</label>
                <input className="regp-input" type="text" placeholder="Full Name, Role" />
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="regp-form-card" id="reg-section-1">
            <div className="regp-form-header">
              <div className="regp-step-badge light">2</div>
              <h3 className="regp-form-title">Location Details</h3>
            </div>
            <div className="regp-row-split">
              <div className="regp-field regp-field-wide">
                <label className="regp-label">Address / Street</label>
                <input className="regp-input" type="text" />
              </div>
              <div className="regp-field regp-field-narrow">
                <label className="regp-label">Barangay</label>
                <input className="regp-input" type="text" />
              </div>
            </div>
            <div className="regp-row-thirds">
              <div className="regp-field">
                <label className="regp-label">City/Municipality</label>
                <input className="regp-input" type="text" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Province</label>
                <input className="regp-input" type="text" />
              </div>
              <div className="regp-field">
                <label className="regp-label">ZIP Code</label>
                <input className="regp-input" type="text" />
              </div>
            </div>
            <div className="regp-map">
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

          {/* Section 3: Contact Details */}
          <div className="regp-form-card" id="reg-section-2">
            <div className="regp-form-header">
              <div className="regp-step-badge light">3</div>
              <h3 className="regp-form-title">Contact Details</h3>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Official Email</label>
                <input className="regp-input" type="email" placeholder="contact@resort.com" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Phone Number</label>
                <input className="regp-input" type="text" placeholder="+63 000 000 0000" />
              </div>
            </div>
          </div>

          {/* Section 4: Operating Schedule */}
          <div className="regp-form-card" id="reg-section-3">
            <div className="regp-form-header">
              <div className="regp-step-badge light">4</div>
              <h3 className="regp-form-title">Operating Schedule</h3>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Opening Hours</label>
                <input className="regp-input" type="text" placeholder="--:-- --" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Closing Hours</label>
                <input className="regp-input" type="text" placeholder="--:-- --" />
              </div>
            </div>
          </div>

          {/* Section 5: Entrance Fees */}
          <div className="regp-form-card" id="reg-section-4">
            <div className="regp-form-header">
              <div className="regp-step-badge light">5</div>
              <h3 className="regp-form-title">Entrance Fees</h3>
            </div>
            <div className="regp-row-thirds">
              <div className="regp-field">
                <label className="regp-label">Adult Fee</label>
                <input className="regp-input" type="text" placeholder="0.00" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Child Fee</label>
                <input className="regp-input" type="text" placeholder="0.00" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Senior/PWD Fee</label>
                <input className="regp-input" type="text" placeholder="0.00" />
              </div>
            </div>
          </div>

          {/* Section 6: Accommodation Details */}
          <div className="regp-form-card" id="reg-section-5">
            <div className="regp-form-header">
              <div className="regp-step-badge light">6</div>
              <h3 className="regp-form-title">Accommodation Details</h3>
            </div>
            <p className="regp-description">List available room types and capacities.</p>
            <button className="regp-add-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Add Room Type
            </button>
          </div>

          {/* Section 7: Amenities */}
          <div className="regp-form-card" id="reg-section-6">
            <div className="regp-form-header">
              <div className="regp-step-badge light">7</div>
              <h3 className="regp-form-title">Amenities &amp; Facilities</h3>
            </div>
            <div className="regp-amenities-grid">
              {[
                "Swimming Pool", "Water Slides", "Function Hall", "Free Wi-Fi",
                "Parking Area", "On-site Dining", "Gym / Fitness", "Spa Services",
                "Pet Friendly", "BBQ Area", "Karaoke Area", "Garden Area",
                "Sports Court", "Play Ground", "Resort Store", "Comfort Rooms", "Shower Area",
              ].map((name, i) => (
                <div
                  key={i}
                  className={`regp-amenity-card ${amenities[i] ? "selected" : ""}`}
                  onClick={() => toggleAmenity(i)}
                >
                  <div className="regp-amenity-check">
                    {amenities[i]
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
                  </div>
                  <span className="regp-amenity-label">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Pricing */}
          <div className="regp-form-card" id="reg-section-7">
            <div className="regp-form-header">
              <div className="regp-step-badge light">8</div>
              <h3 className="regp-form-title">Pricing</h3>
            </div>
            <p className="regp-description">Upload your seasonal rate sheet or define standard pricing tiers.</p>
            <button className="regp-add-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
              Upload Rate Sheet
            </button>
          </div>

          {/* Section 9: Policies */}
          <div className="regp-form-card" id="reg-section-8">
            <div className="regp-form-header">
              <div className="regp-step-badge light">9</div>
              <h3 className="regp-form-title">Policies</h3>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Check-in Time</label>
                <input className="regp-input" type="text" placeholder="--:-- --" />
              </div>
              <div className="regp-field">
                <label className="regp-label">Check-out Time</label>
                <input className="regp-input" type="text" placeholder="--:-- --" />
              </div>
            </div>
            <div className="regp-field">
              <label className="regp-label">Cancellation Policy</label>
              <textarea className="regp-textarea" rows={4} />
            </div>
          </div>

          {/* Section 10: Emergency Info */}
          <div className="regp-form-card" id="reg-section-9">
            <div className="regp-form-header">
              <div className="regp-step-badge light">10</div>
              <h3 className="regp-form-title">Emergency Info</h3>
            </div>
            <div className="regp-row">
              <div className="regp-field">
                <label className="regp-label">Local Emergency Contact</label>
                <input className="regp-input" type="text" placeholder="Police/Hospital Number" />
              </div>
              <div className="regp-field">
                <label className="regp-label">On-site Safety Officer</label>
                <input className="regp-input" type="text" placeholder="Name &amp; Contact" />
              </div>
            </div>
          </div>

          {/* Section 11: Legal Declaration */}
          <div className="regp-form-card" id="reg-section-10">
            <div className="regp-form-header">
              <div className="regp-step-badge legal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M6 18h12" /><path d="M6 6h12" /><path d="M8 10h8" /><path d="M8 14h8" /></svg>
              </div>
              <h3 className="regp-form-title">Legal Declaration</h3>
            </div>
            <div
              className={`regp-declaration-card ${declarations[0] ? "selected" : ""}`}
              onClick={() => toggleDeclaration(0)}
            >
              <div className="regp-declaration-check">
                {declarations[0]
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
              </div>
              <p className="regp-declaration-text">I certify that all information provided is accurate and I am authorized to register this resort.</p>
            </div>
            <div
              className={`regp-declaration-card ${declarations[1] ? "selected" : ""}`}
              onClick={() => toggleDeclaration(1)}
            >
              <div className="regp-declaration-check">
                {declarations[1]
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><circle cx="12" cy="12" r="10" /></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>}
              </div>
              <p className="regp-declaration-text">I agree to the <strong className="regp-link">HanaPin Partner Terms and Conditions</strong> and <strong className="regp-link">Privacy Policy</strong>.</p>
            </div>
          </div>

          <button className="regp-submit-btn" type="button" onClick={() => setShowModal(true)}>
            Submit Registration
          </button>

          <div className="regp-spacer" />
        </main>
      </div>

      {showModal && (
        <div className="regp-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="regp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="regp-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0B7A53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="regp-modal-title">Registration Submitted!</h3>
            <p className="regp-modal-text">Your resort registration has been saved successfully. You can now manage your resort from the dashboard.</p>
            <div className="regp-modal-actions">
              <button className="regp-modal-btn primary" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </button>
              <button className="regp-modal-btn secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="regp-footer">
        <div className="regp-footer-inner">
          <div className="regp-footer-left">
            <span className="regp-footer-brand">HanaPin</span>
            <p className="regp-footer-tagline">Discover the heart of Montalban.</p>
          </div>
          <div className="regp-footer-center">
            <a href="/login" className="regp-footer-link">Privacy Policy</a>
            <a href="/login" className="regp-footer-link">Terms of Service</a>
            <a href="/login" className="regp-footer-link">Partner with Us</a>
            <a href="/login" className="regp-footer-link">Contact</a>
          </div>
          <div className="regp-footer-right">
            <p className="regp-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
