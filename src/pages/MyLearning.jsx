import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useApp } from "../context/AppContext";
import CourseCard from "../components/CourseCard";

export default function MyLearning() {
  const { user, myCourses, getProgress } = useApp();

  const enrolledCourses = courses.filter((c) => c.id in myCourses);
  const completed = enrolledCourses.filter((c) => getProgress(c) === 100).length;
  const inProgress = enrolledCourses.length - completed;

  return (
    <div className="container section">
      <h1 className="page-title">My Learning</h1>
      <p className="muted">Welcome back, {user.name}!</p>

      <div className="stats stats-small">
        <div><h2>{enrolledCourses.length}</h2><p>Enrolled</p></div>
        <div><h2>{inProgress}</h2><p>In Progress</p></div>
        <div><h2>{completed}</h2><p>Completed</p></div>
      </div>

      {enrolledCourses.length ? (
        <div className="grid">
          {enrolledCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>📚 You haven't enrolled in any course yet.</p>
          <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
        </div>
      )}
    </div>
  );
}