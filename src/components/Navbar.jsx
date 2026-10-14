import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>
          🎓 Learn<span>Hub</span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/courses" onClick={close}>Courses</NavLink>
          <NavLink to="/my-learning" onClick={close}>My Learning</NavLink>

          {user ? (
            <div className="nav-user">
              <span>👋 {user.name.split(" ")[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav-user">
              <Link to="/login" className="btn btn-outline btn-sm" onClick={close}>Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={close}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}