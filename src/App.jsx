import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyLearning from "./pages/MyLearning";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route
            path="/my-learning"
            element={
              <ProtectedRoute>
                <MyLearning />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div className="container center">
                <h2>404 - Page not found</h2>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}