// AdminDashboard.js (with KPI score and remarks)
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { db } from "./firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ gender: "", company: "", branch: "", startMonth: "", startYear: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employees"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsed = XLSX.utils.sheet_to_json(sheet);

    for (let emp of parsed) {
      const birth = new Date(emp.birthdate);
      const start = new Date(emp.startDate);
      await addDoc(collection(db, "employees"), {
        ...emp,
        birthdate: isNaN(birth) ? Timestamp.now() : Timestamp.fromDate(birth),
        startDate: isNaN(start) ? Timestamp.now() : Timestamp.fromDate(start),
      });
    }
    alert("Upload successful. Refresh to view new records.");
  };

  const filteredEmployees = employees.filter(emp => {
    const startDate = emp.startDate?.toDate?.();
    const matchesGender = !filters.gender || emp.gender === filters.gender;
    const matchesCompany = !filters.company || emp.company === filters.company;
    const matchesBranch = !filters.branch || emp.branch === filters.branch;
    const matchesMonth = !filters.startMonth || (startDate && startDate.getMonth() + 1 === parseInt(filters.startMonth));
    const matchesYear = !filters.startYear || (startDate && startDate.getFullYear() === parseInt(filters.startYear));
    return matchesGender && matchesCompany && matchesBranch && matchesMonth && matchesYear;
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

          <select value={filters.startMonth} onChange={(e) => setFilters({ ...filters, startMonth: e.target.value })}>
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Start Year"
            value={filters.startYear}
            onChange={(e) => setFilters({ ...filters, startYear: e.target.value })}
            style={{ width: '120px' }}
          />
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
                <td>{emp.startDate?.toDate?.().toLocaleDateString()}</td>
                <td>{emp.kpiScore ?? "—"}</td>
                <td>{emp.remarks ?? "—"}</td>
                <td>
                  <button className="evaluate-btn" onClick={() => handleEvaluate(emp)}>
                    Evaluate <FaCheck style={{ marginLeft: "6px" }} />
                  </button>
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