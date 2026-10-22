import { useEvaAudience } from "../context/EvaAudienceContext";

export default function EvaAudienceBar() {
  const { audience, setAudience } = useEvaAudience();
  if (audience === "pending") return null;

  if (audience === "ph") {
    return (
      <div className="eva-audience-bar">
        <span>Viewing the Philippines site.</span>
        <button type="button" onClick={() => setAudience("global")}>Looking to hire a VA?</button>
      </div>
    );
  }

  return (
    <div className="eva-audience-bar">
      <span>Viewing the international client site.</span>
      <button type="button" onClick={() => setAudience("ph")}>Looking to apply or see local services?</button>
    </div>
  );
}
