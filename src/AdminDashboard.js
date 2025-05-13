import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";


function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ gender: "", company: "", branch: "", status: "", search: "" });
  const [sortOrder, setSortOrder] = useState("desc");
  const [pendingUpload, setPendingUpload] = useState([]);
  const [uploadType, setUploadType] = useState("");
  const [fileName, setFileName] = useState("");
  const [logs, setLogs] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Successfully logged out.");
        navigate("/login");
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  };
  
  const fetchEmployees = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "employees"));
    const data = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const empData = { id: docSnap.id, ...docSnap.data() };
      const evaluationsRef = collection(db, "employees", docSnap.id, "evaluations");
      const evaluationsSnap = await getDocs(evaluationsRef);
      const evaluations = evaluationsSnap.docs.map(doc => doc.data());
  
      if (evaluations.length > 0) {
        const latestEval = evaluations.sort((a, b) => new Date(b.evaluatedAt) - new Date(a.evaluatedAt))[0];
        empData.latestEvaluation = latestEval;
      }
  
      return empData;
    }));
  
    setEmployees(data);
    setLoading(false);
  };
  
  

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const fileExt = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      let data;

      if (fileExt === "csv") {
        const parsed = Papa.parse(target.result, { header: true, skipEmptyLines: true });
        data = parsed.data;
      } else if (fileExt === "xlsx" || fileExt === "xls") {
        const workbook = XLSX.read(target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(worksheet);
      } else {
        return alert("Unsupported file format. Please upload CSV or Excel.");
      }

      if (!data.length) return alert("Empty file!");

      const firstRow = data[0];
      const isEmployeeData = "givenName" in firstRow && "lastName" in firstRow;
      const isEvaluationData = "employeeId" in firstRow && "kpiScore" in firstRow;

      if (isEmployeeData) {
        setUploadType("employee");
        setPendingUpload(data);
      } else if (isEvaluationData) {
        setUploadType("evaluation");
        setPendingUpload(data);
      } else {
        alert("Unrecognized file format.");
      }
    };

    if (fileExt === "csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const confirmUpload = async () => {
    const confirmed = window.confirm(`Proceed to upload ${pendingUpload.length} ${uploadType} records?`);
    if (!confirmed) return;

    let log = [];
    try {
      if (uploadType === "employee") {
        for (const row of pendingUpload) {
          try {
            const ref = doc(db, "employees", row.id);
            await setDoc(ref, row);
            log.push(`✅ Uploaded employee: ${row.givenName} ${row.lastName}`);
          } catch (err) {
            log.push(`❌ Failed to upload employee: ${row.givenName} ${row.lastName}`);
          }
        }
        alert("Employee upload complete.");
      } else if (uploadType === "evaluation") {
        for (const row of pendingUpload) {
          try {
            const evalRef = collection(db, "employees", row.employeeId, "evaluations");
            await addDoc(evalRef, {
              instance: Number(row.instance),
              kpiScore: Number(row.kpiScore),
              remarks: row.remarks,
              evaluatedAt: row.evaluatedAt,
              groomingChecklist: row.groomingChecklist
                ? JSON.parse(row.groomingChecklist.replace(/'/g, '"'))
                : []
            });
            log.push(`✅ Uploaded evaluation for ID: ${row.employeeId}`);
          } catch (err) {
            log.push(`❌ Failed to upload evaluation for ID: ${row.employeeId}`);
          }
        }
        alert("Evaluation upload complete.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error during upload. Check the console.");
    } finally {
      setLogs(log);
      setPendingUpload([]);
      setUploadType("");
      setFileName("");
      fileInputRef.current.value = null;
      await fetchEmployees(); // Auto-refresh table
    }
  };

  const generateCSVWithHeader = (data, filename = "employees-download.csv") => {
    const timestamp = new Date().toLocaleString();
    const headerNote = [
      ["Time and Date Downloaded", timestamp],
      ["Company", "Brookside Manpower Services"]
    ];

    const fields = [
      "lastName", "givenName", "middleName", "suffix", "gender", "height", "weight", "birthdate",
      "civilStatus", "mobileNumber", "address", "region", "jobPosition", "startDate", "status",
      "company", "branch", "kpiScore", "remarks"
    ];

    const csv = Papa.unparse({ fields, data });
    const blobContent = `${Papa.unparse(headerNote)}\n\n${csv}`;
    const blob = new Blob([blobContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = !filters.search || `${emp.givenName} ${emp.lastName}`.toLowerCase().includes(filters.search.toLowerCase());
    const matchesGender = !filters.gender || emp.gender === filters.gender;
    const matchesCompany = !filters.company || emp.company === filters.company;
    const matchesBranch = !filters.branch || emp.branch === filters.branch;
    const matchesStatus = !filters.status || emp.status === filters.status;
    return matchesSearch && matchesGender && matchesCompany && matchesBranch && matchesStatus;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const scoreA = a.latestEvaluation?.kpiScore || 0;
    const scoreB = b.latestEvaluation?.kpiScore || 0;
    return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
  });
  

  const handleEvaluate = (emp) => {
    navigate(`/evaluate/${emp.id}`, { state: emp });
  };

  return (
    <>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <button className="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>


        <div className="upload-controls">
          <input type="file" accept=".xlsx,.xls,.csv" ref={fileInputRef} onChange={handleUpload} />
          {fileName && <p>📄 File: {fileName}</p>}
          {pendingUpload.length > 0 && (
            <div>
              <button onClick={confirmUpload}>
                ✅ Confirm Upload of {pendingUpload.length} {uploadType} rows
              </button>
              <button
                onClick={() => {
                  setPendingUpload([]);
                  setUploadType("");
                  setFileName("");
                  fileInputRef.current.value = null;
                }}
              >
                ❌ Cancel Upload
              </button>
            </div>
          )}
          <p>Upload Employee or Evaluation CSV/Excel</p>
        </div>

        {logs.length > 0 && (
          <div className="upload-logs">
            <h4>Upload Log</h4>
            <ul style={{ maxHeight: 200, overflowY: "auto", fontFamily: "monospace" }}>
              {logs.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="filters">
          <input type="text" placeholder="Search name..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
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
            <option value="Parqal">Parqal</option>
            <option value="Malate">Malate</option>
          </select>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Statuses</option>
            <option value="Probationary">Probationary</option>
            <option value="Regular">Regular</option>
          </select>
        </div>

        <div className="export-controls">
          <button onClick={() => generateCSVWithHeader(filteredEmployees)}>Export Filtered CSV</button>
          <button onClick={() => generateCSVWithHeader(employees)}>Export All CSV</button>
        </div>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : (
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
                <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} style={{ cursor: "pointer" }}>
                  KPI Score {sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.givenName} {emp.lastName}</td>
                  <td>{emp.jobPosition}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.company}</td>
                  <td>{emp.branch}</td>
                  <td>{emp.startDate?.toDate?.().toLocaleDateString?.() || emp.startDate || "—"}</td>
                  <td>{emp.status ?? "—"}</td>
                  <td>{emp.latestEvaluation?.kpiScore ?? "—"}</td>
                  <td>{emp.latestEvaluation?.remarks ?? "—"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="evaluate-btn" onClick={() => handleEvaluate(emp)}>
                        Evaluate
                      </button>
                      <button className="view-btn" onClick={() => navigate(`/employee/${emp.id}`)}>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
