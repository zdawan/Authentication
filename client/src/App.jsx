import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VEmail from "./pages/VEmail";
import RPass from "./pages/RPass";

const App = () => {
  return (
    // Routes for routing
    // More info see Readme.md
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<VEmail />} />
        <Route path="/reset-pass" element={<RPass />} />
      </Routes>
    </div>
  );
};

// Add last edited pass time stamp on db and ui

export default App;
