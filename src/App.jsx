import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initLenis } from './lib/lenis'

export default function App() {
  useEffect(() => initLenis(), [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}