import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import Service from "./Components/Service";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Activity from "./Components/Activity";

/* Single-page home: all sections stacked */
function HomePage() {
  return (
    <>
      <Main />
      <Service />
      <Activity />
      <Contact />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<Service />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
