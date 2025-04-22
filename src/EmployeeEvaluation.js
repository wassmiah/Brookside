import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "./EmployeeEvaluation.css";

const FOH_POSITIONS = ["Receptionist", "Waitstaff", "Cashier", "Barista", "Bartender"];
const BOH_POSITIONS = ["Line Cook", "Kitchen Helper", "Steward", "Commissary", "Pastry Chef"];

const KPI_CRITERIA = {
  FOH: [
    { label: "Attendance (0 absence in 2 months)", weight: 20 },
    { label: "Tardiness (≤2 in 2 months)", weight: 20 },
    { label: "Guest Engagement / Transaction Accuracy / Reservation Accuracy", weight: 15 },
    { label: "Team Dynamics / Professionalism", weight: 15 },
    { label: "Grooming & Demeanor (see checklist below)", weight: 30, disabled: true }
  ],
  BOH: [
    { label: "Personal Hygiene (checklist applied)", weight: 20 },
    { label: "Food Handling / Sanitation / Ingredient Prep", weight: 30 },
    { label: "Attendance (0 absence in 2 months)", weight: 15 },
    { label: "Tardiness (≤2 in 2 months)", weight: 15 },
    { label: "Team Dynamics / Professionalism", weight: 20 },
    { label: "Grooming & Demeanor (see checklist below)", weight: 30, disabled: true }
  ]
};

function EmployeeEvaluation() {
  const { state: employee } = useLocation();
  const navigate = useNavigate();
  const isFOH = FOH_POSITIONS.includes(employee?.jobPosition);
  const isBOH = BOH_POSITIONS.includes(employee?.jobPosition);
  const gender = employee?.gender;

  const groomingChecklist = isBOH
    ? [
        "Wearing hairnet, completely covered without loose hair",
        ...(gender === "Male" ? ["Facial hair is clean-shaven"] : []),
        "Proper uniform including apron must be clean and free of stains",
        "Footwear is clean and appropriate",
        "Short and clean well-maintained nails, well trimmed",
        "No false nails",
        "No nail polish",
        "No excessive accessories (Wedding band for married allowed)",
        "Clean, pleasant fragrance, generally fresh"
      ]
    : gender === "Male"
    ? [
        "Hair color is natural black/dark brown",
        "Hair is well-trimmed and styled with hair wax or pomade",
        "Facial hair is neatly trimmed or clean-shaven",
        "Nails are short, well-trimmed, clean",
        "Minimal, professional accessories only (e.g. name tag, apron, wedding band)",
        "Uniform is clean, well-maintained, no wrinkles, stains, or damage",
        "Footwear is clean and appropriate",
        "Clean and pleasant fragrance; overall fresh hygiene",
        "Maintains excellent posture",
        "Interacts professionally"
      ]
    : [
        "Hair color is natural black/dark brown",
        "Hair is in a neat, tidy bun or well-styled with no visible issues",
        "Make up is fresh and clean (no long falsies)",
        "Nails are short, well-trimmed, clean",
        "No loud polish or false nails",
        "Minimal, professional accessories only (e.g. name tag, apron, wedding band)",
        "Uniform is clean, well-maintained, no wrinkles, stains, or damage",
        "Footwear is clean and appropriate",
        "Clean and pleasant fragrance; overall fresh hygiene",
        "Maintains excellent posture",
        "Interacts professionally"
      ];

  const kpiList = isFOH ? KPI_CRITERIA.FOH : KPI_CRITERIA.BOH;
  const [scores, setScores] = useState(Array(kpiList.length).fill(false));
  const [checklist, setChecklist] = useState(Array(groomingChecklist.length).fill(false));
  const [remarks, setRemarks] = useState("");

  const handleToggle = (index) => {
    const newScores = [...scores];
    newScores[index] = !newScores[index];
    setScores(newScores);
  };

  const handleCheckToggle = (index) => {
    const newCheck = [...checklist];
    newCheck[index] = !newCheck[index];
    setChecklist(newCheck);
  };

  const groomingChecked = checklist.filter(Boolean).length;
  const groomingPercent = (groomingChecked / groomingChecklist.length) * 100;
  const groomingScore = groomingPercent >= 90 ? 30 : 0;
  const groomingStatus = groomingPercent >= 90 ? "PASSED" : "FAILED";

  const baseScore = scores.reduce((acc, checked, i) => acc + (checked ? kpiList[i].weight : 0), 0);
  const total = baseScore + groomingScore;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const confirm = window.confirm(`Submit this evaluation?\nTotal Score: ${total}%`);
    if (!confirm) return;

    try {
      const evaluationsRef = collection(db, "employees", employee.id, "evaluations");

      const existing = await getDocs(evaluationsRef);
      const instance = existing.docs.length + 1;

      await addDoc(evaluationsRef, {
        instance,
        kpiScore: total,
        remarks,
        groomingChecklist: groomingChecklist.map((item, i) => ({ item, passed: checklist[i] })),
        evaluatedAt: new Date().toISOString()
      });

      alert("Evaluation submitted successfully.");
      navigate(-1);
    } catch (error) {
      console.error("Error saving evaluation:", error);
      alert("Failed to save evaluation. Try again.");
    }
  };

  return (
    <div className="evaluation-container">
      <h2>Evaluation: {employee?.givenName} {employee?.lastName}</h2>
      <p><strong>Position:</strong> {employee?.jobPosition}</p>
      <p><strong>Department:</strong> {isFOH ? "FOH" : "BOH"}</p>

      <form className="evaluation-form">
        {kpiList.map((kpi, idx) => (
          <label key={idx} className="kpi-item">
            <input
              type="checkbox"
              disabled={kpi.disabled}
              checked={kpi.disabled ? groomingScore > 0 : scores[idx]}
              onChange={() => !kpi.disabled && handleToggle(idx)}
            />
            {kpi.label} — <em>{kpi.weight}%</em>
          </label>
        ))}
      </form>

      <div className="evaluation-checklist">
        <h4>Grooming & Hygiene Checklist</h4>
        <ul>
          {groomingChecklist.map((item, idx) => (
            <li key={idx}>
              <label className="kpi-item">
                <input type="checkbox" checked={checklist[idx]} onChange={() => handleCheckToggle(idx)} />
                {item}
              </label>
            </li>
          ))}
        </ul>
        <p><strong>Checklist Status:</strong> {groomingStatus} ({groomingChecked}/{groomingChecklist.length}) — <strong>{groomingPercent.toFixed(0)}%</strong></p>
      </div>

      <div className="evaluation-result">
        <p><strong>Total Score:</strong> {total}%</p>
        <textarea
          className="remarks-box"
          placeholder="Enter remarks here..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={4}
        ></textarea>
      </div>

      <div className="evaluation-actions">
        <button className="back-button" onClick={handleBack}>⬅ Back</button>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default EmployeeEvaluation;
