import React, { useEffect, useState } from "react";

const STORAGE_KEY = "brookside_cookie_consent";

const ConsentManager = () => {
  const [showBanner, setShowBanner] = useState(false);

  const updateGoogleConsent = (granted) => {
    if (typeof window.gtag !== "function") {
      console.warn("Google Analytics gtag is not available.");
      return;
    }

    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied"
    });
  };

  const updateMetaConsent = (granted) => {
    if (typeof window.fbq !== "function") {
      return;
    }

    if (granted) {
      window.fbq("consent", "grant");
    } else {
      window.fbq("consent", "revoke");
    }
  };

  const applyConsent = (choice) => {
    const granted = choice === "accepted";

    updateGoogleConsent(granted);
    updateMetaConsent(granted);
  };

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);

    if (savedConsent === "accepted") {
      applyConsent("accepted");
      return;
    }

    if (savedConsent === "rejected") {
      applyConsent("rejected");
      return;
    }

    setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");

    applyConsent("accepted");

    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");

    applyConsent("rejected");

    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        right: "20px",
        bottom: "20px",
        zIndex: 99999,
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        fontFamily: "Questrial, sans-serif"
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "18px"
        }}
      >
        Privacy & Cookies
      </h3>

      <p
        style={{
          margin: "0 0 16px",
          lineHeight: "1.5",
          fontSize: "14px"
        }}
      >
        We use cookies and analytics tools to understand website usage and
        improve our services. You can accept or reject optional analytics and
        advertising cookies.
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <button
          type="button"
          onClick={acceptCookies}
          style={{
            border: "none",
            borderRadius: "6px",
            padding: "10px 18px",
            cursor: "pointer",
            background: "#f7a61a",
            color: "#000",
            fontWeight: "600"
          }}
        >
          Accept
        </button>

        <button
          type="button"
          onClick={rejectCookies}
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px 18px",
            cursor: "pointer",
            background: "#fff",
            color: "#222"
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ConsentManager;