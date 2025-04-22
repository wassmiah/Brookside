import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import "./EmployeeProfile.css";

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const empRef = doc(db, "employees", id);
        const empSnap = await getDoc(empRef);

        if (empSnap.exists()) {
          const empData = empSnap.data();
          setEmployee({ id: empSnap.id, ...empData });

          const evalRef = collection(db, "employees", id, "evaluations");
          const evalSnap = await getDocs(evalRef);
          const evals = evalSnap.docs.map(doc => doc.data());

          setEvaluations(evals.sort((a, b) => new Date(b.evaluatedAt) - new Date(a.evaluatedAt)));
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p>Loading employee profile...</p>
      </div>
    );
  }

  if (!employee) {
    return <div className="profile-error">Employee not found.</div>;
  }

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{employee.givenName} {employee.middleName} {employee.lastName} {employee.suffix}</h2>
      <p><strong>Position:</strong> {employee.jobPosition}</p>
      <p><strong>Status:</strong> {employee.status}</p>
      <p><strong>Company:</strong> {employee.company}</p>
      <p><strong>Branch:</strong> {employee.branch}</p>
      <p><strong>Gender:</strong> {employee.gender}</p>
      <p><strong>Birthdate:</strong> {employee.birthdate}</p>
      <p><strong>Mobile:</strong> {employee.mobileNumber}</p>
      <p><strong>Address:</strong> {employee.address}</p>

      <h3>Evaluation History</h3>
      {evaluations.length === 0 ? (
        <p>No evaluations yet.</p>
      ) : (
        <ul className="evaluation-list">
          {evaluations.map((evalItem, idx) => (
            <li key={idx}>
              <strong>Evaluation No. {evalItem.instance}: </strong>  
              Score: {evalItem.kpiScore} —  
              Remarks: {evalItem.remarks}
              <br />
              <small>Evaluated at: {new Date(evalItem.evaluatedAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeProfile;
