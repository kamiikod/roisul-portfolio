import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const REVEAL = 1200; // durasi nama terungkap (ms), samakan dengan CSS
const START_DELAY = 400; // jeda sebelum mulai (ms)
const END_PAUSE = 500; // jeda setelah selesai (ms)
const FONT_TIMEOUT = 2000; // batas tunggu font (ms)

export default function Loader({ exiting, onTyped }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    // Tunggu font utama siap supaya nama tidak loncat ganti font di hero.
    const fontReady = Promise.race([
      Promise.resolve(document.fonts?.load('800 1em "Bricolage Grotesque"')),
      new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT)),
    ]).catch(() => {});

    fontReady.then(() => {
      if (cancelled) return;
      timers.push(setTimeout(() => setStarted(true), START_DELAY));
      timers.push(setTimeout(onTyped, START_DELAY + REVEAL + END_PAUSE));
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onTyped]);

  return (
    <div className={`loader ${exiting ? "is-exiting" : ""}`} role="status">
      <span className="sr-only">Memuat portfolio</span>

      <div className="container loader__inner" aria-hidden="true">
        <div className="loader__name">
          <span className={`loader__line ${started ? "is-playing" : ""}`}>
            <span className="loader__text">{profile.name}</span>
            <span className="loader__cursor">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M3 2l7.5 19 2.6-7.9L21 10.5z"
                  fill="#111111"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="loader__cursor-label">Roisul</span>
            </span>
          </span>
        </div>

        {/* Pengganti tempat role, supaya posisi nama sama persis dengan di hero */}
        <p className="hero__role loader__role">Software Designer</p>
      </div>
    </div>
  );
}
