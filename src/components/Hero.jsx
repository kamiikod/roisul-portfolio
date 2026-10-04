import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

const ROLE = "Software Designer";

const FONTS = [
  { name: "Bricolage Grotesque", className: "font-default" },
  { name: "Instrument Serif", className: "font-serif" },
  { name: "JetBrains Mono", className: "font-mono" },
];

// Satu siklus animasi kursor (ms, dihitung dari awal siklus).
const TIMELINE = [
  { at: 0, phase: "moving" },
  { at: 1200, phase: "selected", font: 0 },
  { at: 2600, phase: "selected", font: 1 },
  { at: 4200, phase: "selected", font: 2 },
  { at: 5800, phase: "selected", font: 0 }, // balik ke font awal
  { at: 7200, phase: "leaving" },
  { at: 8200, phase: "idle" },
];
const CYCLE = 12000;
const START_DELAY = 2200;

const GRID = 26;
const SPOT = 360;

export default function Hero({ ready = true }) {
  const [phase, setPhase] = useState("idle");
  const [fontIndex, setFontIndex] = useState(0);
  const spotRef = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => {
    if (!ready) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const timers = [];
    const run = () => {
      TIMELINE.forEach((step) => {
        timers.push(
          setTimeout(() => {
            setPhase(step.phase);
            if (step.font !== undefined) setFontIndex(step.font);
          }, step.at),
        );
      });
      timers.push(setTimeout(run, CYCLE));
    };

    timers.push(setTimeout(run, START_DELAY));
    return () => timers.forEach(clearTimeout);
  }, [ready]);

  // Spotlight digeser lewat transform, di-throttle per frame.
  const handlePointerMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = Math.round((clientX - rect.left - SPOT / 2) / GRID) * GRID;
      const y = Math.round((clientY - rect.top - SPOT / 2) / GRID) * GRID;
      if (spotRef.current)
        spotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  return (
    <section
      id="home"
      className={`hero ${ready ? "is-ready" : ""}`}
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
    >
      <div className="hero__dots" aria-hidden="true" />
      <div ref={spotRef} className="hero__spot" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__stage" data-phase={phase}>
          <h1 id="hero-title" className="hero__name">
            <span
              key={fontIndex}
              className={`hero__text ${FONTS[fontIndex].className}`}
            >
              {profile.name}
            </span>
          </h1>

          <div className="hero__select" aria-hidden="true">
            <span className="hero__handle" />
            <span className="hero__handle" />
            <span className="hero__handle" />
            <span className="hero__handle" />
            <span className="hero__tag">{FONTS[fontIndex].name}</span>
          </div>

          <div className="hero__cursor" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M3 2l7.5 19 2.6-7.9L21 10.5z"
                fill="#111111"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hero__cursor-label">Roisul</span>
          </div>
        </div>

        <p className="hero__role" aria-label={ROLE}>
          {ROLE.split("").map((char, i) => (
            <span
              key={i}
              className="hero__letter"
              style={{ "--i": i }}
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>

      <a
        className="hero__scroll"
        href="#experience"
        aria-label="Scroll ke bawah"
      />
    </section>
  );
}
