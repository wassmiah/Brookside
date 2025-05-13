import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { showToast } from '../utils/toast';
import './SecondaryNav.css';

function SecondaryNav() {
  const [user, loading] = useAuthState(auth);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setIsLoading(false);
    };

    fetchUserRole();
  }, [user]);

  const handleNavigation = async (path) => {
    if (!user) {
      showToast('Please login to access this feature');
      navigate('/login');
      return;
    }

    if (path === '/admin-dashboard' && userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (path === '/LearnHere' && (userRole === 'user' || userRole === 'admin')) {
      navigate('/LearnHere');
    } else {
      showToast('You do not have access to this section');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      showToast('Logged out successfully');
      navigate('/');
    } catch (error) {
      showToast('Error logging out');
    }
  };

  if (loading || isLoading) {
    return (
      <nav className="secondary-nav">
        <div className="secondary-nav-container">
          <div className="secondary-nav-links">
            <div className="secondary-nav-loading">
              <i className="fas fa-spinner fa-spin"></i> Loading...
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="secondary-nav">
      <div className="secondary-nav-container">
        {user && (
          <div className="user-info">
            <span className="user-role">
              {userRole === 'admin' ? 'Employee' : 'Brookie'}
            </span>
          </div>
        )}
        <div className="secondary-nav-links">
          {user ? (
            <>
              <button 
                onClick={() => {
                  if (!userRole) return;
                  handleNavigation('/LearnHere');
                }}
                className={`secondary-nav-link ${(userRole === 'user' || userRole === 'admin') ? 'active' : ''}`}
                disabled={!userRole}
              >
                <i className="fas fa-graduation-cap"></i> Learn Here
              </button>
              {userRole === 'admin' && (
                <button
                  onClick={() => {
                    if (userRole !== 'admin') return;
                    handleNavigation('/admin-dashboard');
                  }}
                  className={`secondary-nav-link ${userRole === 'admin' ? 'active' : ''}`}
                  disabled={userRole !== 'admin'}
                >
                  <i className="fas fa-user-tie"></i> Employee Access
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="secondary-nav-link logout"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="secondary-nav-link"
            >
              <i className="fas fa-sign-in-alt"></i> Login to Access
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default SecondaryNav; 