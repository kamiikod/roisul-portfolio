import { Fragment, useEffect, useRef, useState } from "react";
import { about, socials } from "../data/profile";
import SocialIcon from "./SocialIcon";

export default function About() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const links = socials.filter((social) => social.url);

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
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="section intro"
      aria-label="About Roisul Hikam"
    >
      <div
        ref={ref}
        className={`container intro__inner ${shown ? "is-shown" : ""}`}
      >
        <div className="intro__main">
          <p className="intro__text">
            {about.segments.map((segment, i) => (
              <Fragment key={i}>
                {segment.photo ? (
                  <span className="intro__photo" aria-hidden="true">
                    {about.image && <img src={about.image} alt="" />}
                  </span>
                ) : segment.chip ? (
                  <span
                    className={`intro__chip ${segment.dark ? "intro__chip--dark" : ""}`}
                  >
                    {segment.chip}
                  </span>
                ) : (
                  <span>{segment.text}</span>
                )}{" "}
              </Fragment>
            ))}
          </p>

          <dl className="intro__facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {links.length > 0 && (
            <ul className="intro__social" aria-label="Social media">
              {links.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon id={social.id} size={18} />
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {about.sideImage && (
          <figure className="intro__art">
            <img
              src={about.sideImage}
              alt="Icon of a person falling"
              loading="lazy"
            />
          </figure>
        )}
      </div>
    </section>
  );
}
