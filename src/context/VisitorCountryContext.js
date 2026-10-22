import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { shouldShowEvaPricing } from "../config/evaPricing";
import { detectVisitorCountry } from "../utils/visitorCountry";

const VisitorCountryContext = createContext({
  country: "",
  status: "loading",
  showEvaPricing: false,
});

export function VisitorCountryProvider({ children }) {
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    detectVisitorCountry().then((code) => {
      if (!active) return;
      setCountry(code);
      setStatus("ready");
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      country,
      status,
      showEvaPricing: status === "ready" && shouldShowEvaPricing(country),
    }),
    [country, status]
  );

  return (
    <VisitorCountryContext.Provider value={value}>
      {children}
    </VisitorCountryContext.Provider>
  );
}

export function useVisitorCountry() {
  return useContext(VisitorCountryContext);
}
