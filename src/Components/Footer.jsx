import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Quick Links</h2>
            <Link to="/home">Home</Link>
            <Link to="/service">Service</Link>
            <Link to="/work">Work</Link>
            <Link to="/experince">Experience</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
             
            
                 <a href="https://www.instagram.com/sultan_codes?igsh=MTI2NXJ6bjQ4d2ZyMw==" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
            

              <a href="https://www.linkedin.com/in/sultan-codes" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </a>

         <a href="https://www.youtube.com/@sultancodees" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} /> YouTube
        </a>
            
            </div>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: sultancodes12@gmail.com</p>
            <p>Phone: +91  7549095608</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Sultan Codes. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
