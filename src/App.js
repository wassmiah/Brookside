import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Career from "./career";
import Home from "./Home";
import MeetTheTeam from "./MeetTheTeam";
import LearnHere from "./LearnHere";
import AdminDashboard from "./AdminDashboard";
import EmployeeEvaluation from "./EmployeeEvaluation";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="navbar">
        <img src="/logo.png" alt="Company Logo" className="navbar-logo" />
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/meet-the-team">Meet the Team</Link>
          <Link to="/career">Apply Now</Link>
          {/* Go to login first, then protect LearnHere */}
          <Link to={location.pathname === "/LearnHere" ? "/LearnHere" : "/login"}>Learn Here</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/career" element={<Career />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/evaluate/:id" element={<EmployeeEvaluation />} />
        <Route path="/LearnHere" element={
          <ProtectedRoute>
            <LearnHere />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
