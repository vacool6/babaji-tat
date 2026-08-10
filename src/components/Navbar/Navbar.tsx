import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    // Exact match for home
    if (path === "/" && location.pathname === "/") return true;

    // For other paths, check if current path starts with it (excluding home)
    if (path !== "/" && location.pathname.startsWith(path)) return true;

    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">Babaji Tour & Travel</span>
          </Link>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
          </li>
          {/* <li>
            <Link to="/" className={isActive("/cabs") ? "active" : ""}>
              Cabs
            </Link>
          </li> */}
          <li>
            <Link
              to="/tour-packages"
              className={isActive("/tour-packages") ? "active" : ""}
            >
              Tour Packages
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
