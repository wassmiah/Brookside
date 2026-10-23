import BookingCta from "./BookingCta";
import FeatureList from "./FeatureList";

export default function PricingCards({ plans }) {
  return (
    <div className="eva-pricing-grid">
      {plans.map((plan) => (
        <article key={plan.id} className={plan.featured ? "eva-price-card is-featured" : "eva-price-card"}>
          <h3 className="eva-plan-name">
            {plan.name}
            {plan.hours ? <span className="eva-plan-hours">{plan.hours}</span> : null}
          </h3>
          <p className="eva-price">
            <span>{plan.price}</span>
            <small>{plan.period}</small>
          </p>
          <FeatureList items={plan.features} />
          <BookingCta interest={plan.id} className={plan.featured ? "eva-btn eva-btn-primary" : "eva-btn eva-btn-secondary"}>
            {plan.cta}
          </BookingCta>
        </article>
      ))}
    </div>
  );
}
