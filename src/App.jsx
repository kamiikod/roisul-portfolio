import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import Loader from "./components/Loader";
import { initLenis, lockScroll, unlockScroll } from "./lib/lenis";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  // 'loading' -> 'exiting' -> 'done'. Loader dilewati kalau reduce motion aktif.
  const [stage, setStage] = useState(() =>
    prefersReducedMotion() ? "done" : "loading",
  );
  const handleTyped = useCallback(() => setStage("exiting"), []);

  // Urutan effect penting: Lenis harus dibuat sebelum scroll dikunci.
  useEffect(() => initLenis(), []);

  useEffect(() => {
    if (stage === "loading") lockScroll();
    else unlockScroll();
  }, [stage]);

  useEffect(() => {
    if (stage !== "exiting") return undefined;
    const timer = setTimeout(() => setStage("done"), 600);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <>
      {stage !== "done" && (
        <Loader exiting={stage === "exiting"} onTyped={handleTyped} />
      )}
      <Navbar />
      <main>
        <Hero ready={stage !== "loading"} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
