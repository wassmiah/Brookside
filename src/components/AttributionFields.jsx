import { ATTRIBUTION_KEYS, getAttribution } from "../utils/attribution";

function AttributionFields({ leadType }) {
  const attribution = getAttribution();

  return (
    <div hidden>
      {ATTRIBUTION_KEYS.map((name) => (
        <input
          key={name}
          type="hidden"
          name={name}
          value={attribution[name] || ""}
          readOnly
        />
      ))}
      <input type="hidden" name="lead_type" value={leadType} readOnly />
    </div>
  );
}

export default AttributionFields;
