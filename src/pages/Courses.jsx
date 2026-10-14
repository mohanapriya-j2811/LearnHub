import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { courses, categories } from "../data/courses";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return courses.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <div className="container section">
      <h1 className="page-title">All Courses</h1>

      <input
        type="text"
        className="input search"
        placeholder="🔍 Search by course or instructor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="muted">{filtered.length} course(s) found</p>

      {filtered.length ? (
        <div className="grid">
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="empty">😕 No courses match your search.</div>
      )}
    </div>
  );
}