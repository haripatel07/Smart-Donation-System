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
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 8L10.89 4.26C11.2187 4.10222 11.5813 4.10222 11.91 4.26L19.8 8M3 8L3 16C3 16.5304 3.21071 17.0391 3.58579 17.4142C3.96086 17.7893 4.46957 18 5 18H19C19.5304 18 20.0391 17.7893 20.4142 17.4142C20.7893 17.0391 21 16.5304 21 16V8M3 8L10.89 11.74C11.2187 11.8978 11.5813 11.8978 11.91 11.74L19.8 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
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
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.8954 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
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
