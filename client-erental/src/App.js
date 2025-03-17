import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layouts/LoginPage";
import Dashboard from "./layouts/DashboardPage";
import StayView from "./layouts/StayviewPage";
import Register from "./layouts/RegisterPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stay" element={<StayView />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
