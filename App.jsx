import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Students from "./pages/Students.jsx";
import Contact from "./pages/Contact.jsx";

// BrowserRouter lets us move between pages without reloading the browser
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="card"><h2>Page not found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
