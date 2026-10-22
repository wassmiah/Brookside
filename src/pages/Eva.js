import EvaGlobal from "./EvaGlobal";
import EvaPhilippines from "./EvaPhilippines";
import { useEvaAudience } from "../context/EvaAudienceContext";

export default function Eva() {
  const { audience } = useEvaAudience();
  if (audience === "pending") {
    return <div className="eva-audience-pending" aria-busy="true" />;
  }
  return audience === "ph" ? <EvaPhilippines /> : <EvaGlobal />;
}
