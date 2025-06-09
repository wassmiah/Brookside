import React, { useEffect, useState } from 'react';
import './ConsentManager.css';

const ConsentManager = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent was previously given
    const consentStatus = localStorage.getItem('analytics_consent');
    const adConsentStatus = localStorage.getItem('advertising_consent');
    
    if (!consentStatus || !adConsentStatus) {
      setShowBanner(true);
    } else {
      // Update consent states based on stored preferences
      updateConsentStates(consentStatus === 'granted', adConsentStatus === 'granted');
    }
  }, []);

  const updateConsentStates = (analyticsConsent, advertisingConsent) => {
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsConsent ? 'granted' : 'denied',
      'ad_storage': advertisingConsent ? 'granted' : 'denied',
      'ad_user_data': advertisingConsent ? 'granted' : 'denied',
      'ad_personalization': advertisingConsent ? 'granted' : 'denied'
    });
  };

  const handleAccept = () => {
    // Update consent states
    updateConsentStates(true, true);
    localStorage.setItem('analytics_consent', 'granted');
    localStorage.setItem('advertising_consent', 'granted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Update consent states
    updateConsentStates(false, false);
    localStorage.setItem('analytics_consent', 'denied');
    localStorage.setItem('advertising_consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="consent-banner">
      <div className="consent-content">
        <p>
          We use cookies and similar technologies to analyze site traffic, improve your experience, 
          and deliver personalized advertising. By clicking "Accept", you consent to our use of 
          cookies for analytics and advertising purposes.
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Learn more</a>
        </p>
        <div className="consent-buttons">
          <button onClick={handleAccept} className="accept-button">
            Accept
          </button>
          <button onClick={handleDecline} className="decline-button">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentManager; 