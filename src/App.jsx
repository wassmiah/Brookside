import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConsentManager from './components/ConsentManager';
import Home from './pages/Home';
import Career from './pages/Career';
import ContactUs from './pages/ContactUs';
import MeetTheTeam from './pages/MeetTheTeam';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './AdminDashboard';
import LearnHere from './LearnHere';
import EmployeeAccess from './pages/EmployeeAccess';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Brookside Manpower Services Inc. | Top Hospitality Staffing Solutions in Philippines</title>
        <meta name="description" content="Brookside Manpower Services connects skilled talents to leading hospitality companies in Metro Manila. Find your next career opportunity in hotels, resorts, and restaurants." />
        <meta name="keywords" content="Brookside Manpower, hospitality staffing, hotel jobs, restaurant jobs, manpower services, job placement, career opportunities, Metro Manila, Philippines" />
        <meta property="og:title" content="Brookside Manpower Services | Hospitality Staffing Experts" />
        <meta property="og:description" content="Connecting skilled talents to top hospitality companies in Metro Manila. Find your next career opportunity with us." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brooksidemps.com" />
        <meta property="og:image" content="https://brooksidemps.com/logo192.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://brooksidemps.com" />
        
        {/* Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Brookside Manpower Services",
            "url": "https://brooksidemps.com",
            "logo": "https://brooksidemps.com/logo192.png",
            "description": "Connecting skilled talents to top hospitality companies in Metro Manila.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit 604, Tower 2, PITX Building, 1 Kennedy Road, Barangay Tambo",
              "addressLocality": "Parañaque City",
              "addressRegion": "Metro Manila",
              "postalCode": "1700",
              "addressCountry": "PH"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "(02) 7001 9493",
              "contactType": "customer service",
              "email": "inquire@brooksidemanpower.com"
            },
            "sameAs": [
              "https://www.facebook.com/profile.php?id=61560528418956",
              "https://www.linkedin.com/company/brookside-manpower-services",
              "https://www.tiktok.com/@brooksidemps"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/meet-the-team" element={<MeetTheTeam />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee-access" element={<EmployeeAccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learn-here" 
              element={
                <ProtectedRoute>
                  <LearnHere />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <ConsentManager />
      </div>
    </Router>
  );
}

export default App; 