import { Link } from "react-router-dom";
import "./LandingPage2.css";

export default function LandingPage2() {
  return (
    <div className="how-page">
      <nav className="how-nav">
        <div className="nav-left">
          <Link to="/" className="logo-text">HanaPin</Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-link">Explore</Link>
          <Link to="/how-it-works" className="nav-link active">How It Works</Link>
        </div>
        <div className="nav-right">
          <Link to="/establishment-type" className="nav-link get-started">Get Started</Link>
        </div>
      </nav>

      <section className="how-hero">
        <div className="how-hero-overlay" />
        <div className="how-hero-content">
          <h1 className="how-title">How HanaPin Works</h1>
          <p className="how-subtitle">We bridge the gap between soulful travelers and the hidden coastal treasures of Montalban, Rizal. Discover a world where serenity meets accessibility.</p>
          <div className="how-pills">
            <span className="how-pill">📍 Montalban, Rizal</span>
            <span className="how-pill">🛡️ Vetted Resorts</span>
          </div>
        </div>
      </section>

      <section className="how-platform">
        <div className="platform-grid">
          <div className="platform-col">
            <div className="platform-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h2 className="platform-heading">For Travelers</h2>
            <div className="platform-step">
              <span className="step-num">01</span>
              <div>
                <h3 className="step-label">Discover</h3>
                <p className="step-desc">Use our geo-based search to find stunning locations in Montalban. Whether it's a mountainside retreat or a riverside escape, find it instantly.</p>
              </div>
            </div>
            <div className="platform-step">
              <span className="step-num">02</span>
              <div>
                <h3 className="step-label">Filter</h3>
                <p className="step-desc">Refine your stay by amenities—infinity pools, Wi-Fi, or panoramic views.</p>
              </div>
            </div>
            <div className="platform-step">
              <span className="step-num">03</span>
              <div>
                <h3 className="step-label">Book &amp; Explore</h3>
                <p className="step-desc">Secure your spot with integrated payments and get connected with certified local guides for a truly immersive experience.</p>
              </div>
            </div>
          </div>
          <div className="platform-col">
            <div className="platform-icon platform-icon--green">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h2 className="platform-heading">For Resort Owners</h2>
            <div className="platform-step">
              <span className="step-num">01</span>
              <div>
                <h3 className="step-label">List</h3>
                <p className="step-desc">Onboard your property in minutes. Upload photos, set your pricing tiers, and go live with a fully optimized listing.</p>
              </div>
            </div>
            <div className="platform-step">
              <span className="step-num">02</span>
              <div>
                <h3 className="step-label">Manage</h3>
                <p className="step-desc">Access powerful analytics. Monitor booking trends, track revenue, and manage reservations from a single dashboard.</p>
              </div>
            </div>
            <div className="platform-step">
              <span className="step-num">03</span>
              <div>
                <h3 className="step-label">Grow</h3>
                <p className="step-desc">Leverage our marketing reach to attract more guests. Get featured in curated collections and reach travelers actively exploring Montalban.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-showcase">
        <div className="showcase-grid">
          <div className="showcase-card">
            <img
              className="showcase-image"
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury resort with infinity pool and mountain view"
            />
          </div>
          <div className="showcase-card">
            <img
              className="showcase-image"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              alt="Analytics dashboard on tablet with workspace"
            />
          </div>
        </div>
      </section>

      <section className="how-cta">
        <div className="how-cta-inner">
          <h2 className="how-cta-title">Ready to Start Your Journey?</h2>
          <p className="how-cta-text">Whether you're planning your next escape or looking to share your property with the world, HanaPin is your partner in discovery.</p>
          <Link to="/establishment-type" className="how-cta-primary">Get Started</Link>
        </div>
      </section>

      <footer className="how-footer">
        <div className="how-footer-inner">
          <div className="how-footer-left">
            <span className="how-footer-brand">HanaPin</span>
            <p className="how-footer-tagline">Empowering travelers to find authentic coastal experiences in Rizal.</p>
          </div>
          <div className="how-footer-right">
            <div className="how-footer-links">
              <a href="/login" className="how-footer-link">Privacy Policy</a>
              <a href="/login" className="how-footer-link">Terms of Service</a>
              <a href="/login" className="how-footer-link">Contact Support</a>
              <a href="/login" className="how-footer-link">About Us</a>
            </div>
            <p className="how-footer-copy">&copy; 2026 HanaPin Discovery Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
