import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { id: "hero-section", label: "Home" },
    { id: "service-section", label: "Services" },
    { id: "activity-section", label: "Activity" },
    { id: "contact-section", label: "Contact" },
  ];

  const handleClick = (id) => {
    setMenuOpen(false);
    // If not on homepage, navigate there first then scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar-glass" id="main-nav">
      <a
        href="#"
        className="nav-brand"
        onClick={(e) => { e.preventDefault(); handleClick("hero-section"); }}
      >
        <span className="brand-highlight">SULTAN</span>_CODES
      </a>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        id="nav-hamburger"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Desktop Links */}
      <div className="nav-links-desktop">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="nav-link"
            onClick={(e) => { e.preventDefault(); handleClick(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-links-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <a
                  href={`#${link.id}`}
                  className="nav-link-mobile"
                  onClick={(e) => { e.preventDefault(); handleClick(link.id); }}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
