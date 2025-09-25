import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
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
import Footer from "./pages/Footer";
import AdminUsers from "./pages/AdminUsers";



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "user");
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserId("");
    setUserRole("user");
  };

  // Auth wrapper for protected routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Admin wrapper for admin routes
  const AdminRoute = ({ children }) => {
    return isAuthenticated && userRole === "admin" ? children : <Navigate to="/" />;
  };

  // Custom login/signup pages to update auth state
  const LoginWrapper = () => {
    const navigate = useNavigate();
    return <LoginPage onLogin={(uid, role) => {
      setIsAuthenticated(true);
      setUserId(uid);
      setUserRole(role);
      localStorage.setItem("userId", uid);
      localStorage.setItem("userRole", role);
      navigate("/");
    }} />;
  };
  const SignupWrapper = () => {
    const navigate = useNavigate();
    return <SignupPage onSignup={() => navigate("/login")} />;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} userRole={userRole} />
      <div style={{ paddingTop: '80px', flex: 1 }}>
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
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
          <Route path="/admin/donations" element={<AdminRoute><AdminDonations /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/add-category" element={<AdminRoute><AddCategoryForm /></AdminRoute>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
