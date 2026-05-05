import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const contacts = [
    { icon: <FaEnvelope />, label: "Email:", value: "sultancodes12@gmail.com" },
    { icon: <FaPhone />, label: "Phone:", value: "+91 7549095608" },
    { icon: <FaMapMarkerAlt />, label: "Location:", value: "Delhi, India" },
  ];

  return (
    <section className="contact" id="contact-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1>Let's Work <span className="gradient-text">Together</span> !</h1>
        <p>I design products that are more than pretty. I make them shippable and usable.</p>
      </motion.div>

      <div className="contact-layout">
        {/* Left: Info + Social */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="contact-container">
            {contacts.map((item, index) => (
              <div className="contact-item" key={index}>
                <span className="contact-icon">{item.icon}</span>
                <span className="contact-text">
                  <strong>{item.label}</strong> {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="nav-links">
            <a href="https://www.instagram.com/sultan_codes?igsh=MTI2NXJ6bjQ4d2ZyMw==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
            <a href="https://www.youtube.com/@sultancodees" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} /> YouTube
            </a>
            <a href="https://www.linkedin.com/in/sultan-codes" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="contact-input"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <input type="text" placeholder="Your Name" id="contact-name" />
          <input type="email" placeholder="Your Email" id="contact-email" />
          <input type="text" placeholder="Subject" id="contact-subject" />
          <input type="text" placeholder="Tell me about your project" id="contact-message" />
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ marginTop: '8px' }}
          >
            Send Message 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
