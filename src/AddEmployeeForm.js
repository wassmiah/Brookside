// AddEmployeeForm.js
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddEmployeeForm() {
  const [form, setForm] = useState({
    lastName: "",
    givenName: "",
    middleName: "",
    suffix: "",
    gender: "",
    height: "",
    weight: "",
    birthdate: "",
    civilStatus: "",
    mobileNumber: "",
    address: "",
    region: "",
    jobPosition: "",
    startDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "employees"), {
        ...form,
        birthdate: Timestamp.fromDate(new Date(form.birthdate)),
        startDate: Timestamp.fromDate(new Date(form.startDate)),
      });
      alert("Employee added successfully!");
      setForm({
        lastName: "",
        givenName: "",
        middleName: "",
        suffix: "",
        gender: "",
        height: "",
        weight: "",
        birthdate: "",
        civilStatus: "",
        mobileNumber: "",
        address: "",
        region: "",
        jobPosition: "",
        startDate: ""
      });
    } catch (err) {
      alert("Error adding employee: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px", margin: "auto" }}>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          type={key === "birthdate" || key === "startDate" ? "date" : "text"}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
          required
        />
      ))}
      <button type="submit" style={{ padding: "12px", backgroundColor: "#f5a623", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "8px" }}>
        Add Employee
      </button>
    </form>
  );
}

export default AddEmployeeForm;
