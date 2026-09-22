import React from "react";
import "./Eva.css";
import "./TheCEO.css";
import SEO from "../components/SEO";

function TheCEO() {
  return (
    <>
      <SEO
        title="The CEO | EVA"
        description="Meet the EVA CEO and the founding stories of EVA and Brookside."
        keywords="EVA CEO, Marc Catubay, Brookside founders, EVA founders"
        ogImage="/eva-ceo-marc-card.jpg"
        canonicalUrl="/eva/the-ceo"
      />

      <div className="eva-page ceo-page">
        <section className="ceo-portrait" aria-label="EVA CEO">
          <img src="/eva-ceo-marc-card.jpg" alt="Marc Catubay, EVA Chief Executive Officer" />
        </section>

        <section className="ceo-block" id="story">
          <h2>The Story</h2>
          <div className="ceo-placeholder">
            <p className="ceo-tba">TBA</p>
            <p>Marc Catubay’s story will go here.</p>
          </div>
        </section>

        <section className="ceo-block alt" id="founders-eva">
          <h2>EVA Founders</h2>
          <div className="ceo-placeholder">
            <p className="ceo-tba">TBA</p>
            <p>The founding story of EVA will go here.</p>
          </div>
        </section>

        <section className="ceo-block" id="founders-brookside">
          <h2>Brookside Founders</h2>
          <div className="ceo-placeholder">
            <p className="ceo-tba">TBA</p>
            <p>The founding story of Brookside will go here.</p>
          </div>
        </section>

        <section className="ceo-block alt" id="video">
          <h2>Video</h2>
          <div className="ceo-placeholder ceo-placeholder-media">
            <p className="ceo-tba">TBA</p>
            <p>CEO video placeholder.</p>
          </div>
        </section>

        <section className="ceo-block" id="quotes">
          <h2>Quotes</h2>
          <div className="ceo-placeholder">
            <p className="ceo-tba">TBA</p>
            <p>Leadership quotes placeholder.</p>
          </div>
        </section>

        <section className="ceo-block alt" id="timeline">
          <h2>Timeline</h2>
          <div className="ceo-placeholder">
            <p className="ceo-tba">TBA</p>
            <p>Milestones placeholder.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default TheCEO;
