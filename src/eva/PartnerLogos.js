import { PARTNERS } from "../data/partners";

export default function PartnerLogos({ partners = PARTNERS }) {
  return (
    <ul className="eva-partner-grid">
      {partners.map((partner) => (
        <li key={partner.name}>
          <div className={partner.dark ? "eva-partner-logo is-dark" : "eva-partner-logo"}>
            <img src={partner.logo} alt="" width="140" height="70" loading="lazy" decoding="async" />
          </div>
          <p>{partner.name}</p>
        </li>
      ))}
    </ul>
  );
}
