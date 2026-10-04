import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Project" },
  { id: "contact", label: "Contact" },
];

// Experience ada di bawah Hero, jadi dihitung sebagai bagian "Home".
const sectionToLink = {
  home: "home",
  experience: "home",
  projects: "projects",
  contact: "contact",
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [expanded, setExpanded] = useState(true);

  // Expand selama hero masih mengisi sebagian besar layar.
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const update = () => {
      const { bottom } = hero.getBoundingClientRect();
      setExpanded(bottom > window.innerHeight * 0.4);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(sectionToLink[entry.target.id]);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.keys(sectionToLink).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar ${expanded ? "navbar--expanded" : ""}`}>
      <nav aria-label="Navigasi utama">
        <ul className="navbar__links">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? "is-active" : ""}
                aria-current={active === link.id ? "page" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
