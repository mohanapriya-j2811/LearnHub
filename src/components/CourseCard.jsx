import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function CourseCard({ course }) {
  const { isEnrolled, getProgress } = useApp();
  const enrolled = isEnrolled(course.id);

  return (
    <div className="card course-card">
      <div className="card-banner" style={{ background: course.color }}>
  <img src={course.image} alt={course.title} loading="lazy" />
</div>
      <div className="card-body">
        <div className="tags">
          <span className="tag">{course.category}</span>
          <span className="tag tag-light">{course.level}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="muted">By {course.instructor}</p>
        <div className="meta">
          <span>⭐ {course.rating}</span>
          <span>👥 {course.students.toLocaleString()}</span>
          <span>📚 {course.lessons.length} lessons</span>
        </div>

        {enrolled && (
          <div className="progress-wrap">
            <div className="progress">
              <div className="progress-bar" style={{ width: `${getProgress(course)}%` }} />
            </div>
            <small>{getProgress(course)}% completed</small>
          </div>
        )}

        <Link to={`/courses/${course.id}`} className="btn btn-primary btn-block">
          {enrolled ? "Continue Learning" : "View Course"}
        </Link>
      </div>
    </div>
  );
}