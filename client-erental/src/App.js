import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/LoginPage/LoginPage";
import Dashboard from "./components/DashboardPage/DashboardPage";
import StayView from "./components/StayViewPage/StayviewPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stay" element={<StayView />} />
      </Routes>
    </Router>
  );
}

export default App;
