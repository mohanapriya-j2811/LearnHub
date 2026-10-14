import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => read("el_users", []));
  const [user, setUser] = useState(() => read("el_user", null));
  // { [email]: { [courseId]: [completedLessonIds] } }
  const [learning, setLearning] = useState(() => read("el_learning", {}));

  useEffect(() => localStorage.setItem("el_users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("el_user", JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem("el_learning", JSON.stringify(learning)), [learning]);

  const register = ({ name, email, password }) => {
    if (users.some((u) => u.email === email))
      return { ok: false, error: "Email already registered" };
    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    setUser({ name, email });
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Invalid email or password" };
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const myCourses = user ? learning[user.email] || {} : {};

  const isEnrolled = (courseId) => courseId in myCourses;

  const enroll = (courseId) => {
    if (!user) return;
    setLearning((prev) => ({
      ...prev,
      [user.email]: { ...(prev[user.email] || {}), [courseId]: prev[user.email]?.[courseId] || [] },
    }));
  };

  const unenroll = (courseId) => {
    if (!user) return;
    setLearning((prev) => {
      const copy = { ...(prev[user.email] || {}) };
      delete copy[courseId];
      return { ...prev, [user.email]: copy };
    });
  };

  const toggleLesson = (courseId, lessonId) => {
    if (!user) return;
    setLearning((prev) => {
      const mine = prev[user.email] || {};
      const done = mine[courseId] || [];
      const updated = done.includes(lessonId)
        ? done.filter((id) => id !== lessonId)
        : [...done, lessonId];
      return { ...prev, [user.email]: { ...mine, [courseId]: updated } };
    });
  };

  const getProgress = (course) => {
    const done = myCourses[course.id] || [];
    return Math.round((done.length / course.lessons.length) * 100);
  };

  return (
    <AppContext.Provider
      value={{
        user, register, login, logout,
        myCourses, isEnrolled, enroll, unenroll, toggleLesson, getProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);