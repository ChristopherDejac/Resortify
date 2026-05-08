import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-overlay" />
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0a4b7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="logo-text">RESORTIFY</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">REGISTER</Link>
          <Link to="/login" className="nav-link nav-link-login">LOGIN</Link>
        </div>
      </nav>
      <div className="landing-content">
        <h1>Luxury Redefined.<br />Welcome to RESORITY.</h1>
        <p>You can explore the many resort around the Montalban.</p>
        <Link to="/login" className="landing-cta">Explore Stays</Link>
      </div>
    </div>
  );
}
