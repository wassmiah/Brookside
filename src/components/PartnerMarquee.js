import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PartnerMarquee.css";

const PartnerCard = ({ partner }) => (
  <div className={`partner-marquee-card${partner.dark ? " partner-marquee-card--dark-logo" : ""}`} title={partner.description || partner.name}>
    <div className="partner-marquee-logo">
      <img
        src={partner.logo}
        alt={partner.name}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextElementSibling?.classList.add("is-active");
        }}
      />
      <div className="partner-marquee-placeholder">
        <span>{partner.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}</span>
      </div>
    </div>
    <h4 className="partner-marquee-name">{partner.name}</h4>
    {partner.description ? <span className="partner-marquee-cat">{partner.description}</span> : null}
  </div>
);

function PartnerMarquee({ partners }) {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const offsetRef = useRef(0);
  const dragStartRef = useRef({ x: 0, offset: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );
  const desktopSpeed = 0.45;
  const mobileTabletSpeed = 0.65;

  const getLoopDistance = useCallback(() => {
    const firstSet = firstSetRef.current;
    if (!firstSet) return 0;
    return firstSet.scrollWidth || firstSet.getBoundingClientRect().width || 0;
  }, []);

  const normalizeOffset = useCallback((raw) => {
    const loop = getLoopDistance();
    if (loop <= 0) return 0;
    return ((raw % loop) + loop) % loop;
  }, [getLoopDistance]);

  const applyOffset = useCallback((raw) => {
    const track = trackRef.current;
    if (!track) return;
    const next = normalizeOffset(raw);
    offsetRef.current = next;
    track.style.transform = `translate3d(-${next}px, 0, 0)`;
  }, [normalizeOffset]);

  useEffect(() => {
    applyOffset(offsetRef.current);
  }, [partners.length, applyOffset]);

  useEffect(() => {
    const handleResize = () => setIsSmallViewport(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId;
    const tick = () => {
      if (!isDragging) {
        applyOffset(offsetRef.current + (isSmallViewport ? mobileTabletSpeed : desktopSpeed));
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging, isSmallViewport, applyOffset]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observed = firstSetRef.current;
    if (!observed) return;
    const ro = new ResizeObserver(() => {
      if (isDragging) return;
      requestAnimationFrame(() => applyOffset(offsetRef.current));
    });
    ro.observe(observed);
    return () => ro.disconnect();
  }, [isDragging, applyOffset]);

  const handlePointerDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = { x, offset: offsetRef.current };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    applyOffset(dragStartRef.current.offset - (x - dragStartRef.current.x));
  };

  const handlePointerUp = () => {
    if (isDragging) setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;
    const forceRelease = () => setIsDragging(false);
    window.addEventListener("mouseup", forceRelease);
    window.addEventListener("touchend", forceRelease);
    window.addEventListener("touchcancel", forceRelease);
    return () => {
      window.removeEventListener("mouseup", forceRelease);
      window.removeEventListener("touchend", forceRelease);
      window.removeEventListener("touchcancel", forceRelease);
    };
  }, [isDragging]);

  const nudge = (dir) => applyOffset(offsetRef.current + dir * 120);

  if (!partners || partners.length === 0) return null;

  return (
    <div className="partner-marquee">
      <div className="partner-marquee-nav">
        <button type="button" className="partner-marquee-btn" onClick={() => nudge(-1)} aria-label="Scroll partners left">‹</button>
        <button type="button" className="partner-marquee-btn" onClick={() => nudge(1)} aria-label="Scroll partners right">›</button>
      </div>
      <div
        className="partner-marquee-viewport"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onTouchCancel={handlePointerUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div ref={trackRef} className="partner-marquee-track">
          <div ref={firstSetRef} className="partner-marquee-set">
            {partners.map((partner, idx) => (
              <div key={`${partner.name}-a-${idx}`} className="partner-marquee-item">
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
          <div className="partner-marquee-set" aria-hidden>
            {partners.map((partner, idx) => (
              <div key={`${partner.name}-b-${idx}`} className="partner-marquee-item">
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerMarquee;
