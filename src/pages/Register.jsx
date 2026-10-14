import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return setError("All fields are required");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm) return setError("Passwords do not match");

    const res = register(form);
    if (!res.ok) return setError(res.error);
    navigate("/my-learning");
  };

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account 🚀</h2>
        <p className="muted">Join and start learning today</p>
        {error && <div className="alert">{error}</div>}

        <label>Full Name</label>
        <input className="input" name="name" value={form.name}
          onChange={handleChange} placeholder="Your name" />

        <label>Email</label>
        <input className="input" type="email" name="email" value={form.email}
          onChange={handleChange} placeholder="you@example.com" />

        <label>Password</label>
        <input className="input" type="password" name="password" value={form.password}
          onChange={handleChange} placeholder="Min 6 characters" />

        <label>Confirm Password</label>
        <input className="input" type="password" name="confirm" value={form.confirm}
          onChange={handleChange} placeholder="Re-enter password" />

        <button className="btn btn-primary btn-block" type="submit">Register</button>
        <p className="center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}