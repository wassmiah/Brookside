import React, { useState } from "react";
import { auth } from "./firebase";

function VerifyEmail() {
  const [resending, setResending] = useState(false);

  const resendEmail = async () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      try {
        setResending(true);
        await user.sendEmailVerification();
        alert("Verification email resent!");
      } catch (error) {
        alert("Failed to resend email: " + error.message);
      } finally {
        setResending(false);
      }
    }
  };

  return (
    <div className="verify-container">
      <h2>Please Verify Your Email</h2>
      <p>We've sent a verification link to your email. Please verify before logging in.</p>
      <button onClick={resendEmail} disabled={resending}>
        {resending ? "Sending..." : "Resend Verification Email"}
      </button>
      <p><a href="/login">Back to Login</a></p>
    </div>
  );
}

export default VerifyEmail;
