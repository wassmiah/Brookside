// App.js
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import NotFound from './NotFound';
import Eva from './pages/Eva';
import EvaInquiry from './pages/EvaInquiry';
import TheCEO from './pages/TheCEO';
import './App.css';

const isEvaSubdomain = () =>
  typeof window !== 'undefined' && window.location.hostname === 'eva.brooksidemps.com';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const onEvaSubdomain = isEvaSubdomain();
  const isCeoPage =
    location.pathname === "/the-ceo" || location.pathname === "/eva/the-ceo";
  const isEvaPage =
    location.pathname === '/eva' ||
    location.pathname.startsWith('/eva/') ||
    location.pathname === '/inquiry' ||
    isCeoPage ||
    (onEvaSubdomain && (location.pathname === '/' || location.pathname === ''));

  // On eva subdomain: redirect /eva and /eva/inquiry to clean URLs
  useEffect(() => {
    if (onEvaSubdomain) {
      if (location.pathname === '/eva') {
        navigate('/', { replace: true });
      } else if (location.pathname === '/eva/inquiry') {
        navigate('/inquiry', { replace: true });
      } else if (location.pathname === '/eva/the-ceo') {
        navigate('/the-ceo', { replace: true });
      }
      return;
    }
    if (location.pathname === '/the-ceo') {
      navigate('/eva/the-ceo', { replace: true });
    }
  }, [location.pathname, navigate, onEvaSubdomain]);

  // Scroll to top on route change
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* SEO / meta tags */}
      <Helmet>
        <title>Brookside | Talent and Workforce Solutions</title>
        <meta name="description" content="Brookside matches quality talent to businesses that need the right fit — workforce solutions, specialized professionals, and online staffing through EVA." />
        <meta name="keywords" content="Brookside, talent solutions, workforce solutions, staffing solutions, specialized talent, EVA, Philippines" />
        <meta property="og:title" content="Brookside | The Right People. The Right Fit." />
        <meta property="og:description" content="A modern talent and workforce company. Quality people matched to your brand, operations, and culture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brooksidemps.com" />
        <meta property="og:image" content="https://brooksidemps.com/logo192.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://brooksidemps.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Brookside Manpower Services",
            "url": "https://brooksidemps.com",
            "logo": "https://brooksidemps.com/logo192.png",
            "description": "Talent and workforce solutions. Matching quality people to the right fit.",
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
        {!isEvaPage && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={onEvaSubdomain ? <Eva /> : <Home />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/meet-the-team" element={<MeetTheTeam />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee-access" element={<EmployeeAccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/learn-here" element={<ProtectedRoute><LearnHere /></ProtectedRoute>} />
            <Route path="/eva" element={<Eva />} />
            <Route path="/eva/the-ceo" element={<TheCEO />} />
            <Route path="/the-ceo" element={<TheCEO />} />
            <Route path="/eva/inquiry" element={<EvaInquiry />} />
            <Route path="/inquiry" element={<EvaInquiry />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isEvaPage && <Footer />}
        <ConsentManager />
      </div>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
