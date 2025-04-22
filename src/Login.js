
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { showToast } from "./utils/toast";
import "./Login.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
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
    try {
      let email = identifier;
      if (!identifier.includes("@")) {
        const resolvedEmail = await findUserByUsername(identifier);
        if (!resolvedEmail) {
          showToast("Username not found.");
          return;
        }
        email = resolvedEmail;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        navigate("/verify-email");
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
          navigate("/LearnHere");
        }
      } else {
        showToast("User role not found. Contact admin.");
      }
    } catch (err) {
      showToast("Login failed: " + err.message);
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
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/register">Create an account</a></p>
    </div>
  );
}

export default Login;
