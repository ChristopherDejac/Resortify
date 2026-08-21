import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="nav-left">
          <span className="logo-text">HanaPin</span>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-link active">Explore</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
        </div>
        <div className="nav-right">
          <Link to="/establishment-type" className="nav-link get-started">Get Started</Link>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Discover Your Perfect Escape<br />in Montalban</h1>
          <p>Geo-based search for the best private resorts and eco-tourism sites in Rizal.</p>
        </div>
      </div>
      <section className="features">
        <h2 className="features-title">Why Travel with HanaPin?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0b7a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <h3 className="feature-heading">Smart Discovery</h3>
            <p className="feature-desc">Automatically detects your location to find the closest retreats and hidden gems.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0b7a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className="feature-heading">Verified Listings</h3>
            <p className="feature-desc">Up-to-date amenities, pricing, and availability verified by our local team.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0b7a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 className="feature-heading">Fast Reservations</h3>
            <p className="feature-desc">Instant SMS and email confirmation for every booking within minutes.</p>
          </div>
        </div>
      </section>
      <section className="hero-split">
        <div className="hero-left">
          <div className="hero-image-wrapper">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1518495979420-0f9fe2da6f82?q=80&w=2070&auto=format&fit=crop"
              alt="Forest pathway in Montalban"
            />
          </div>
          <div className="stats-card">
            <span className="stats-number">100+</span>
            <span className="stats-text">Verified Resorts &amp; Eco-sites in Montalban</span>
          </div>
        </div>
        <div className="hero-right">
          <h2 className="hero-heading">The Hidden Beauty of Montalban</h2>
          <p className="hero-paragraph">
            Montalban, Rizal is more than just a gateway to the mountains; it's a sanctuary for those seeking peace away from the metro's bustle. From the majestic limestone formations of Wawa Dam to the sprawling private resorts tucked into the Sierra Madre foothills, our local tourism industry offers a unique blend of adventure and relaxation.
          </p>
          <p className="hero-paragraph">
            HanaPin was born from a love for these natural landscapes, aiming to connect travelers with small-scale, high-quality retreats that are often missed on larger platforms. We prioritize sustainable tourism and local economic growth in every booking.
          </p>
        </div>
      </section>
      <section className="testimonials">
        <h2 className="testimonials-title">What Our Travelers Say</h2>
        <div className="testimonials-divider" />
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <p className="testimonial-text">"Finding a private resort for our team building used to take hours. With HanaPin, I found Sierra Vista in seconds, and it was even better than the photos!"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">RL</div>
              <div>
                <span className="testimonial-name">Rico L.</span>
                <span className="testimonial-subtitle">Manila Traveler</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <p className="testimonial-text">"The SMS confirmation was instant. I loved the geo-search feature because it showed me resorts I didn't even know existed right in my backyard."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">MT</div>
              <div>
                <span className="testimonial-name">Maria T.</span>
                <span className="testimonial-subtitle">Quezon City Resident</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="#0D7660" stroke="#0D7660" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="#0D7660" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <p className="testimonial-text">"Authentic listings and great support. HanaPin makes Montalban feel like a world-class travel destination. Highly recommended for family trips."</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JC</div>
              <div>
                <span className="testimonial-name">Jason C.</span>
                <span className="testimonial-subtitle">Adventure Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="team">
        <h2 className="team-title">Meet the Developers</h2>
        <div className="team-divider" />
        <div className="team-grid">
          <div className="team-card">
            <img
              className="team-photo"
              src=""
              alt="John Christopher Dejac"
            />
            <span className="team-name">John Christopher Dejac</span>
            <span className="team-role">Frontend Developer</span>
          </div>
          <div className="team-card">
            <img
              className="team-photo"
              src=""
              alt="Marry Ann Nedia"
            />
            <span className="team-name">Marry Ann Nedia</span>
            <span className="team-role">Backend Developer</span>
          </div>
          <div className="team-card">
            <img
              className="team-photo"
              src=""
              alt="Marie Cris Reboltan"
            />
            <span className="team-name">Marie Cris Reboltan</span>
            <span className="team-role">UI/UX Designer</span>
          </div>
          <div className="team-card">
            <img
              className="team-photo"
              src=""
              alt="John Christopher Caballero"
            />
            <span className="team-name">John Christopher Caballero</span>
            <span className="team-role">Documentation Lead</span>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">HanaPin</span>
            <p className="footer-desc">&copy; 2026 HanaPin Montalban. Discover the hidden gems of Rizal.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <a href="/login" className="footer-link">Resort Management</a>
            <a href="/login" className="footer-link">Local Tourism Info</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Policy</h4>
            <a href="/login" className="footer-link">Privacy Policy</a>
            <a href="/login" className="footer-link">Terms of Service</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <a href="/login" className="footer-link">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
