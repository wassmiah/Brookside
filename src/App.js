import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Career from "./career";
import Home from "./Home";
import MeetTheTeam from "./MeetTheTeam";
import LearnHere from "./LearnHere";
import Register from "./Register";
import AdminDashboard from "./AdminDashboard";
import EmployeeEvaluation from "./EmployeeEvaluation";
import EmployeeProfile from "./EmployeeProfile";
import Login from "./Login";
import ContactUs from "./ContactUs";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar?.classList.add("sticky");
      } else {
        navbar?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/career" element={<Career />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/LearnHere" element={
          <ProtectedRoute>
            <LearnHere />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/evaluate/:id" element={
          <ProtectedRoute requireAdmin>
            <EmployeeEvaluation />
          </ProtectedRoute>
        } />

        <Route path="/employee/:id" element={
          <ProtectedRoute requireAdmin>
            <EmployeeProfile />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
