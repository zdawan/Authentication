import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verifyemail from "./pages/Verifyemail";
import Resetpass from "./pages/Resetpass";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<Verifyemail />} />
        <Route path="/reset-pass" element={<Resetpass />} />
      </Routes>
    </div>
  );
};

export default App;
