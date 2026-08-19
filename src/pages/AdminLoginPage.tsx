import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Shield } from "lucide-react";
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials (in production, this should be handled securely via Supabase Auth)
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store session in localStorage
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("adminLoginTime", Date.now().toString());
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-background">
        <div className="admin-login-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-shield-icon">
              <Shield size={48} />
              <div className="shield-glow" />
            </div>
            <h1 className="admin-login-title">
              Admin Portal
              <span className="title-glow" />
            </h1>
            <p className="admin-login-subtitle">
              Secure Access to Booking Management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username" className="admin-form-label">
                <User size={18} />
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                <Lock size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="admin-login-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p className="security-notice">
              🔒 This area is protected and monitored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
