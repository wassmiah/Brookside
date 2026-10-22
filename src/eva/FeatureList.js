export default function FeatureList({ items }) {
  return (
    <ul className="eva-check-list">
      {items.map((item) => (
        <li key={item}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10.5 8 14.5 16 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
