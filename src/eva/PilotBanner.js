import BookingCta from "./BookingCta";

export default function PilotBanner({ pilot }) {
  return (
    <aside className="eva-pilot" aria-label="Pilot offer">
      <div className="eva-pilot-copy">
        <h3>{pilot.title}</h3>
        <p>{pilot.summary}</p>
      </div>
      <BookingCta interest={pilot.id} className="eva-btn eva-btn-primary">
        {pilot.cta}
      </BookingCta>
    </aside>
  );
}
