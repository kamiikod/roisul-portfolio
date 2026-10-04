import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Smooth scroll via Lenis. Mengembalikan fungsi cleanup.
// Jika pengguna memilih "reduce motion", Lenis tidak dijalankan
// dan browser memakai scroll bawaan.
export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  let frame = requestAnimationFrame(function raf(time) {
    lenis.raf(time)
    frame = requestAnimationFrame(raf)
  })

  // Semua link anchor (#projects, #contact, dll) di seluruh halaman
  // ikut di-scroll lewat Lenis, termasuk tombol di Hero.
  const onClick = (event) => {
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const target = id === 'home' || id === '' ? 0 : document.getElementById(id)
    if (target === null) return
    event.preventDefault()
    lenis.scrollTo(target, { offset: 0 })
  }
  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    cancelAnimationFrame(frame)
    lenis.destroy()
  }
}