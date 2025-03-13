import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/LearnHere");
      })
      .catch((err) => {
        alert("Login failed: " + err.message);
      });
  };

  return (
    <>
    <div className="navbar">
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact Us</a>
          <a href="/meet-the-team">Meet the Team</a>
          <a href="/LearnHere">Learn Here</a>
          <a href="/career">Apply Now</a>
        </div>
      </div>
      
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
