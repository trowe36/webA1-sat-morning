import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import our files:
import "./App.css";
import Volcanos from "./pages/Volcanos";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IndVolcano from "./pages/IndVolcano";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>        
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/volcanos" element={<Volcanos />} />
          <Route path="/indvolcano" element={<IndVolcano />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
