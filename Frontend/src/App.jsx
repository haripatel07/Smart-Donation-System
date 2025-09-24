import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./pages/Navbar";
import CategoriesPage from "./pages/CategoriesPage";
import DonationsPage from "./pages/DonationsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import MyDonations from "./pages/MyDonations";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminDonations from "./pages/AdminDonations";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import DonationForm from "./pages/DonationForm";
import AddCategoryForm from "./pages/AddCategoryForm";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserId("");
  };

  // Auth wrapper for protected routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Custom login/signup pages to update auth state
  const LoginWrapper = () => {
    const navigate = useNavigate();
    return <LoginPage onLogin={(uid) => {
      setIsAuthenticated(true);
      setUserId(uid);
      localStorage.setItem("userId", uid);
      navigate("/");
    }} />;
  };
  const SignupWrapper = () => {
    const navigate = useNavigate();
    return <SignupPage onSignup={() => navigate("/login")} />;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/donate" element={<PrivateRoute><DonationForm /></PrivateRoute>} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<SignupWrapper />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/my-donations" element={<PrivateRoute><MyDonations userId={userId} /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/categories" element={<PrivateRoute><AdminCategories /></PrivateRoute>} />
        <Route path="/admin/donations" element={<PrivateRoute><AdminDonations /></PrivateRoute>} />
        <Route path="/admin/add-category" element={<PrivateRoute><AddCategoryForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
