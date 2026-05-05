import React, { useState } from "react";
import { FaPaintBrush, FaDesktop, FaGlobe, FaMobileAlt, FaArrowRight } from "react-icons/fa";
import './Service.css'


const Service = () => {
  const [active, setActive] = useState("UI/UX Design");

  const services = [
    { title: "Video Editing", icon: <FaPaintBrush /> },
    { title: "UI/UX Design", icon: <FaDesktop />, desc: "User-centered design solutions that combine aesthetics with functionality. I craft intuitive interfaces that users love to interact with." },
    { title: "Web Design", icon: <FaGlobe /> },
    { title: "App Design", icon: <FaMobileAlt /> },
  ];

  return (
    <div className="service-ic" id="service-section">
      <div className="my-quality">
        <h1>My Quality Service</h1>
        <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you</p>
        <p>and your customers.</p>
      </div>

      <div className="design">
        <div className="services-container">
          {services.map((service) => (
            <div
              key={service.title}
              className={`service-card ${active === service.title ? "active" : ""}`}
              onClick={() => setActive(service.title)}
            >
              <div className="icon">{service.icon}</div>
              <div className="content">
                <h3>{service.title}</h3>
                {active === service.title && service.desc && (
                  <p>{service.desc}</p>
                )}
              </div>
              <div className="arrow"><FaArrowRight /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;