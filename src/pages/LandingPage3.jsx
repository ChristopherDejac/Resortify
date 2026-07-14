import { Link, useNavigate } from "react-router-dom";
import "./LandingPage3.css";

export default function LandingPage3() {
  const navigate = useNavigate();

  return (
    <div className="lp3-page">
      <nav className="lp3-nav">
        <div className="nav-left">
          <Link to="/" className="logo-text">HanaPin</Link>
        </div>
      </nav>

      <section className="lp3-hero">
        <div className="lp3-hero-overlay" />
        <div className="lp3-card">
          <h1 className="lp3-card-title">Choose Your Establishment Type</h1>
          <p className="lp3-card-desc">
            Select the type of tourism establishment you want to register to begin the registration process
          </p>

          <div className="lp3-options">
            <div
              className="lp3-option"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/register?type=resort")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/register?type=resort")}
            >
              <h2 className="lp3-option-title">Resort</h2>
              <p className="lp3-option-desc">
                A resort is a tourism establishment that provides recreational facilities and amenities, such as swimming pools or nature attractions, where guests can relax, enjoy activities, and may also stay overnight.
              </p>
            </div>

            <div
              className="lp3-option"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/register?type=mabuhay")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/register?type=mabuhay")}
            >
              <h2 className="lp3-option-title">Mabuhay Accommodation</h2>
              <p className="lp3-option-desc">
                A Mabuhay Accommodation is a tourism establishment that primarily provides safe, comfortable, and affordable lodging for travelers, with overnight stay as its main service rather than recreation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp3-footer">
        <div className="lp3-footer-inner">
          <div className="lp3-footer-left">
            <span className="lp3-footer-brand">HanaPin</span>
            <p className="lp3-footer-tagline">Discover the heart of Montalban.</p>
          </div>
          <div className="lp3-footer-center">
            <a href="/login" className="lp3-footer-link">Privacy Policy</a>
            <a href="/login" className="lp3-footer-link">Terms of Service</a>
            <a href="/login" className="lp3-footer-link">Partner with Us</a>
            <a href="/login" className="lp3-footer-link">Contact</a>
          </div>
          <div className="lp3-footer-right">
            <p className="lp3-footer-copy">&copy; 2024 HanaPin Montalban. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
