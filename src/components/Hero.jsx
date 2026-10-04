import { ArrowDown, Mail } from 'lucide-react'
import { profile } from '../data/profile'

function ProfilePhoto() {
  if (profile.photo) {
    return <img src={profile.photo} alt={`Foto ${profile.name}`} className="hero__photo-img" />
  }

  return (
    <div className="hero__photo-placeholder" role="img" aria-label="Placeholder foto profil">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="46" r="20" />
        <path d="M20 112c0-22 18-38 40-38s40 16 40 38z" />
      </svg>
      <span>Taruh foto kamu di sini</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__status">
            <span className="hero__dot" aria-hidden="true" />
            {profile.status}
          </p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero__lead">
            Siswa {profile.school} yang suka membuat sesuatu dengan kode. Saya belajar lewat project,
            lomba, dan kegiatan sekolah, dan sekarang sedang mencari tempat PKL untuk belajar langsung
            di dunia kerja.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              <ArrowDown size={18} aria-hidden="true" />
              View My Projects
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Mail size={18} aria-hidden="true" />
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo">
            <ProfilePhoto />
          </div>
          <pre className="hero__code" aria-hidden="true">
            <code>
              <span className="tok-k">const</span> <span className="tok-v">roisul</span> = {'{'}
              {'\n'}  role: <span className="tok-s">"Junior Developer"</span>,
              {'\n'}  school: <span className="tok-s">"{profile.school}"</span>,
              {'\n'}  lookingFor: <span className="tok-s">"PKL"</span>,
              {'\n'}{'}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
