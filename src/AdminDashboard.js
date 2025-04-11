// AdminDashboard.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ gender: "", company: "", branch: "", status: "", search: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employees"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert("Upload handler not implemented yet. Accepts: " + file.name);
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = !filters.search || `${emp.givenName} ${emp.lastName}`.toLowerCase().includes(filters.search.toLowerCase());
    const matchesGender = !filters.gender || emp.gender === filters.gender;
    const matchesCompany = !filters.company || emp.company === filters.company;
    const matchesBranch = !filters.branch || emp.branch === filters.branch;
    const matchesStatus = !filters.status || emp.status === filters.status;
    return matchesSearch && matchesGender && matchesCompany && matchesBranch && matchesStatus;
  });

  const handleEvaluate = (emp) => {
    navigate(`/evaluate/${emp.id}`, { state: emp });
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        <div className="upload-controls">
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} />
          <p>Upload CSV/Excel with field headers</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search name..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })}>
            <option value="">All Companies</option>
            <option value="Wildflour">Wildflour</option>
            <option value="Chungdam">Chungdam</option>
          </select>

          <select value={filters.branch} onChange={(e) => setFilters({ ...filters, branch: e.target.value })}>
            <option value="">All Branches</option>
            <option value="BGC">BGC</option>
            <option value="Salcedo">Salcedo</option>
            <option value="Greenhills">Greenhills</option>
            <option value="Rockwell">Rockwell</option>
            <option value="Podium">Podium</option>
            <option value="Mall of Asia">Mall of Asia</option>
            <option value="Rada">Rada</option>
            <option value="Uptown">Uptown</option>
            <option value="Greenbelt">Greenbelt</option>
            <option value="Alabang">Alabang</option>
            <option value="Quezon City">Quezon City</option>
            <option value="Italian - BGC">Italian - BGC</option>
            <option value="Parqal">Parqal</option>
            <option value="Malate">Malate</option>
          </select>

          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Statuses</option>
            <option value="Probationary">Probationary</option>
            <option value="Regular">Regular</option>
          </select>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Company</th>
              <th>Branch</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>KPI Score</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.givenName} {emp.lastName}</td>
                <td>{emp.jobPosition}</td>
                <td>{emp.gender}</td>
                <td>{emp.company}</td>
                <td>{emp.branch}</td>
                <td>{emp.startDate?.toDate?.().toLocaleDateString?.() || "—"}</td>
                <td>{emp.status ?? "—"}</td>
                <td>{emp.kpiScore ?? "—"}</td>
                <td>{emp.remarks ?? "—"}</td>
                <td>
                  <button className="evaluate-btn" onClick={() => handleEvaluate(emp)}>Evaluate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
