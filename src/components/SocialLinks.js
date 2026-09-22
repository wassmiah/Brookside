import { SOCIALS } from "../data/socials";

function SocialLinks({ className = "", linkClassName = "", showLabels = false }) {
  return (
    <div className={className}>
      {SOCIALS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={`Brookside on ${item.name}`}
        >
          <i className={item.icon} aria-hidden="true"></i>
          {showLabels ? <span>{item.name}</span> : null}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
