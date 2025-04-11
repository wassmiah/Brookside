import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "./components/Navbar";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email === "admin@brookside.com") {
          navigate("/admin-dashboard");
        } else {
          navigate("/LearnHere");
        }
      })
      .catch((err) => {
        alert("Login failed: " + err.message);
      });
  };
  

  return (
    <>
    {/* Nav Section */}
    <Navbar/>
      
    <div className="login-container">
      <h2>Login to Brookside</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
