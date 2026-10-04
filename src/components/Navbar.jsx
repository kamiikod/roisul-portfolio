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
    <header className="navbar">
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
