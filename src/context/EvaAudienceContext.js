import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { detectVisitorCountry } from "../utils/visitorCountry";

const STORAGE_KEY = "eva-audience";
/** ISO codes that see the local EVA site. Update this list to change who gets the Philippines view. */
export const EVA_LOCAL_COUNTRIES = ["PH"];
const EvaAudienceContext = createContext({
  audience: "pending",
  setAudience: () => {},
});

function pathOverride(pathname) {
  if (/\/ph\/?$/.test(pathname)) return "ph";
  if (/\/global\/?$/.test(pathname)) return "global";
  return "";
}

export function EvaAudienceProvider({ children }) {
  const location = useLocation();
  const [audience, setAudienceState] = useState("pending");

  const setAudience = useCallback((next) => {
    sessionStorage.setItem(STORAGE_KEY, next);
    document.body.dataset.evaView = next;
    setAudienceState(next);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("view");
    const fromPath = pathOverride(location.pathname);
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const override = query === "ph" || query === "global" ? query : fromPath || (stored === "ph" || stored === "global" ? stored : "");

    if (override) {
      sessionStorage.setItem(STORAGE_KEY, override);
      document.body.dataset.evaView = override;
      setAudienceState(override);
      return undefined;
    }

    let active = true;
    detectVisitorCountry().then((code) => {
      if (!active) return;
      const next = EVA_LOCAL_COUNTRIES.includes(code) ? "ph" : "global";
      document.body.dataset.evaView = next;
      setAudienceState(next);
    });
    return () => {
      active = false;
    };
  }, [location.pathname, location.search]);

  return (
    <EvaAudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </EvaAudienceContext.Provider>
  );
}

export function useEvaAudience() {
  return useContext(EvaAudienceContext);
}
