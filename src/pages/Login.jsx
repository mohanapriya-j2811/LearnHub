import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError("All fields are required");
    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate(location.state?.from || "/my-learning", { replace: true });
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="muted">Login to continue learning</p>
        {error && <div className="alert">{error}</div>}

        <label>Email</label>
        <input className="input" type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="you@example.com" />

        <label>Password</label>
        <input className="input" type="password" name="password" value={form.password}
          onChange={handleChange} placeholder="••••••••" />

        <button className="btn btn-primary btn-block" type="submit">Login</button>
        <p className="center">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}