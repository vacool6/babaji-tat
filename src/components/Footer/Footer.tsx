import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Babaji Travels</h3>
            <p className="footer-description">
              Providing premium, reliable, and majestic travel experiences
              across the beautiful landscapes of India. Your journey of a
              lifetime begins here.
            </p>
            <p className="footer-copyright">
              © 2024 Babaji Travels. All rights reserved.
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
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li>
                <Phone size={16} style={{ marginRight: '8px', display: 'inline' }} />
                <a href="tel:+919410053567">+91 94100 53567</a>
              </li>
              <li>
                <Phone size={16} style={{ marginRight: '8px', display: 'inline' }} />
                <a href="tel:+917055193596">+91 70551 93596</a>
              </li>
              <li>
                <Mail size={16} style={{ marginRight: '8px', display: 'inline' }} />
                <a href="mailto:babajitravels42@gmail.com">babajitravels42@gmail.com</a>
              </li>
              <li>
                <MapPin size={16} style={{ marginRight: '8px', display: 'inline' }} />
                <span>Haldwani, Nainital, Uttarakhand</span>
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
