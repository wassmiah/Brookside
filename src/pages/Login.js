import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import "./Login.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const findUserByUsername = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data().email;
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let email = identifier;
      if (!identifier.includes("@")) {
        const resolvedEmail = await findUserByUsername(identifier);
        if (!resolvedEmail) {
          showToast("Username not found.");
          setLoading(false);
          return;
        }
        email = resolvedEmail;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        navigate("/verify-email");
        setLoading(false);
        return;
      }

      let userRef = doc(db, "users", user.uid);
      let userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        userRef = doc(db, "users", user.email);
        userSnap = await getDoc(userRef);
      }

      if (userSnap.exists()) {
        const role = userSnap.data().role;
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/learn-here");
        }
      } else {
        showToast("User role not found. Contact admin.");
      }
    } catch (err) {
      showToast("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Brookside</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        <a href="/forgot-password" style={{ color: '#40b4ff', textDecoration: 'underline', fontSize: '0.98rem' }}>Forgot Password?</a>
      </p>
      <p>New user? <a href="/register">Create an account</a></p>
    </div>
  );
}

export default Login;
