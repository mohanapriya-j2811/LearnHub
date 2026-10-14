import { Link } from "react-router-dom";
import { courses, categories } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const featured = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Learn New Skills, Anytime, Anywhere</h1>
            <p>
              Explore top courses in web development, data science, design and more.
              Enroll today and track your progress every step of the way.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-light">Browse Courses</Link>
              <Link to="/register" className="btn btn-outline-light">Join Free</Link>
            </div>
          </div>
          <div className="hero-art">🎓</div>
        </div>
      </section>

      <section className="container stats">
        <div><h2>{courses.length}+</h2><p>Courses</p></div>
        <div><h2>50K+</h2><p>Students</p></div>
        <div><h2>20+</h2><p>Instructors</p></div>
        <div><h2>4.7</h2><p>Avg Rating</p></div>
      </section>

      <section className="container section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="cat-grid">
          {categories.filter((c) => c !== "All").map((c) => (
            <Link key={c} to={`/courses?category=${encodeURIComponent(c)}`} className="cat-box">
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Top Rated Courses</h2>
        <div className="grid">
          {featured.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </>
  );
}