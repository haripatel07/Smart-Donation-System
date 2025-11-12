import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { validateLogin } from "../utils/validateForm";
import "../styles/LoginPage.css";

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLogin(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok && data.token && data.user) {
        localStorage.setItem("token", data.token);
        onLogin(data.user._id, data.user.role);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="var(--primary-color)"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="var(--primary-color)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="var(--primary-color)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your Smart Donation account</p>
        </div>

        <Card className="login-card" shadow="lg" rounded="2xl">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                label="Email Address"
                value={form.email}
                onChange={handleChange}
                error={error && error.includes("email") ? error : ""}
                fullWidth
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                error={error && !error.includes("email") ? error : ""}
                fullWidth
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>

            <div className="form-footer">
              <p className="form-footer-text">
                Don't have an account?{" "}
                <Link to="/signup" className="form-link">
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </Card>

        <div className="login-footer">
          <p className="login-footer-text">
            By signing in, you agree to our{" "}
            <a href="#" className="login-footer-link">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="login-footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
