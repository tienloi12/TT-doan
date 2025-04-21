import React, { useEffect } from "react";
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
import OrderDetail from "./layouts/OrderDetailPage";
import RentPage from "./layouts/RentPage";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/actions/LoginActions";
import PaymentPage from "./layouts/PaymentPage";
import BillPage from "./layouts/BillPage";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
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
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/rent" element={<RentPage />} /> 
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/bill" element={<BillPage />} />
      </Routes>
    </Router>
  );
}

export default App;
