import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layouts/LoginPage";
import Dashboard from "./layouts/DashboardPage";
import StayView from "./layouts/StayviewPage";
import Register from "./layouts/RegisterPage";
import RentalAvailability from "./layouts/AvailabilityPage";
import InUsePage from "./layouts/InUsePage";
import InformationPage from "./layouts/InformationPage";
import NotificationPage from "./layouts/NotificationPage";
import ForgotPasswordPage from "./layouts/ForgotPasswordPage";
import ProfilePage from "./layouts/ProfilePage";
import UpdateProfile from "./layouts/UpdateProfilePage";
import ProductList from "./layouts/ProductPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stay" element={<StayView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/availability" element={<RentalAvailability />} />
        <Route path="/inuse" element={<InUsePage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/Users/profile/:username" element={<ProfilePage />} />
        <Route path="/Users/update-profile/:username" element={<UpdateProfile />} />
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
