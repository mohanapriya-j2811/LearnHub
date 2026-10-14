import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { courses } from "../data/courses";
import { useApp } from "../context/AppContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isEnrolled, enroll, unenroll, myCourses, toggleLesson, getProgress } = useApp();

  const course = courses.find((c) => c.id === Number(id));

  if (!course)
    return (
      <div className="container center section">
        <h2>Course not found</h2>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );

  const enrolled = isEnrolled(course.id);
  const done = myCourses[course.id] || [];
  const progress = getProgress(course);

  const handleEnroll = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    enroll(course.id);
  };

  return (
    <>
      <section className="detail-hero" style={{ background: course.color }}>
        <div className="container">
          <span className="tag tag-white">{course.category}</span>
         <h1 className="detail-title">
  <img className="detail-icon" src={course.image} alt="" />
  {course.title}
</h1>
          <p>{course.description}</p>
          <div className="meta meta-white">
            <span>👨‍🏫 {course.instructor}</span>
            <span>⭐ {course.rating}</span>
            <span>👥 {course.students.toLocaleString()} students</span>
            <span>📊 {course.level}</span>
          </div>
        </div>
      </section>

      <div className="container detail-layout">
        <div className="detail-main">
          <h2>Course Content</h2>
          <ul className="lesson-list">
            {course.lessons.map((l) => {
              const completed = done.includes(l.id);
              return (
                <li key={l.id} className={completed ? "completed" : ""}>
                  {enrolled ? (
                    <label>
                      <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => toggleLesson(course.id, l.id)}
                      />
                      <span>{l.id}. {l.title}</span>
                    </label>
                  ) : (
                    <span>🔒 {l.id}. {l.title}</span>
                  )}
                  <small>{l.duration}</small>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="detail-side card">
          <div className="card-body">
            <h3>{enrolled ? "Your Progress" : "Start Learning"}</h3>
            {enrolled ? (
              <>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <p>
                  {done.length}/{course.lessons.length} lessons ({progress}%)
                </p>
                {progress === 100 && <p className="success">🎉 Course completed!</p>}
                <button className="btn btn-outline btn-block" onClick={() => unenroll(course.id)}>
                  Unenroll
                </button>
              </>
            ) : (
              <>
                <p className="muted">Free enrollment • Lifetime access</p>
                <button className="btn btn-primary btn-block" onClick={handleEnroll}>
                  Enroll Now
                </button>
                {!user && <small className="muted">Login required to enroll</small>}
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}