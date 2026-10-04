import { useEffect, useRef, useState } from "react";
import { certificates, experiences } from "../data/profile";
import SectionHeading from "./SectionHeading";

function CertificateStack() {
  return (
    <ul
      className="stack"
      style={{ "--count": certificates.length }}
      tabIndex={0}
      aria-label="Certificates"
    >
      {certificates.map((cert, i) => (
        <li
          key={cert.id}
          className="stack__card"
          style={{ "--i": i, zIndex: certificates.length - i }}
        >
          {cert.image ? (
            <img src={cert.image} alt={cert.title} loading="lazy" />
          ) : (
            <span className="stack__empty">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  // Muncul sekali saat masuk layar.
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="section exp"
      aria-labelledby="experience-title"
    >
      <div ref={ref} className={`container ${shown ? "is-shown" : ""}`}>
        <SectionHeading id="experience-title" title="Experience" />

        <ol className="exp__list">
          {experiences.map((item, i) => (
            <li key={item.id} className="exp__row" style={{ "--r": i }}>
              <p className="exp__period">
                {item.current && (
                  <span className="exp__live" aria-hidden="true" />
                )}
                {item.period}
              </p>

              <div>
                <h3 className="exp__org">{item.organization}</h3>
                <p className="exp__role">{item.role}</p>
                <p className="exp__summary">{item.summary}</p>
              </div>

              {item.showCertificates && <CertificateStack />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
