import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isUsernameTaken = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (await isUsernameTaken(username)) {
        showToast("Username is already taken. Please choose another one.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName,
        username,
        role: "user",
      });

      showToast("Registration successful. Please verify your email.");
      navigate("/verify-email");
    } catch (error) {
      showToast("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container section-partition">
      <h2>Register to Brookside</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-input-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>

        <div className="password-input-wrapper">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setConfirmPasswordVisible((prev) => !prev)}
          >
            <i className={`fas ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
          </span>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
      </form>
      <p>Already registered? <a href="/employee-access">Login here</a></p>
    </div>
  );
}

export default Register;
