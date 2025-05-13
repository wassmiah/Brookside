import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoute({ children, requireAdmin = false }) {
  const [user, loading] = useAuthState(auth);
  const [isAllowed, setIsAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        if (!requireAdmin) {
          setIsAllowed(true);
        } else {
          const ref = doc(db, "users", user.uid);
          const userDoc = await getDoc(ref);
          if (userDoc.exists() && userDoc.data()?.role === "admin") {
            setIsAllowed(true);
          }
        }
      }
      setChecking(false);
    };

    if (user) {
      checkAccess();
    } else {
      setChecking(false);
    }
  }, [user, requireAdmin]);

  if (loading || checking) return <p>Loading...</p>;

  if (!user || !isAllowed) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
