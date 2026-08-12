import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Babaji Tour & Travel</h3>
            <p className="footer-description">
              Providing premium, reliable, and majestic travel experiences
              across the beautiful landscapes of India. Your journey of a
              lifetime begins here.
            </p>
            <p className="footer-copyright">
              © 2024 Babaji Tour & Travel. All rights reserved.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cabs">Cabs</Link>
              </li>
              <li>
                <Link to="/packages">Tour Packages</Link>
              </li>
              <li>
                <Link to="/destinations">Destinations</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Legal & Support</h4>
            <ul className="footer-links">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
