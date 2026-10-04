import { CalendarDays, ImageIcon } from 'lucide-react'
import { certificates, experiences } from '../data/profile'
import SectionHeading from './SectionHeading'

function CertificateGallery() {
  return (
    <ul className="certs" aria-label="Galeri sertifikat">
      {certificates.map((cert) => (
        <li key={cert.id} className="cert">
          <div className="cert__frame">
            {cert.image ? (
              <img src={cert.image} alt={cert.title} loading="lazy" />
            ) : (
              <div className="cert__placeholder">
                <ImageIcon size={26} aria-hidden="true" />
                <span>Foto sertifikat</span>
              </div>
            )}
          </div>
          <p>{cert.title}</p>
        </li>
      ))}
    </ul>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          title="Experience"
          description="Organisasi dan pendidikan yang membentuk cara saya belajar dan bekerja."
        />

        <ol className="timeline">
          {experiences.map((item) => (
            <li key={item.id} className="timeline__item">
              <span className="timeline__dot" aria-hidden="true" />
              <article className="card timeline__card">
                <header className="timeline__head">
                  <div>
                    <h3>{item.organization}</h3>
                    <p className="timeline__role">{item.role}</p>
                  </div>
                  <p className="timeline__period">
                    <CalendarDays size={16} aria-hidden="true" />
                    {item.period}
                  </p>
                </header>
                <ul className="timeline__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {item.id === 'smk' && <CertificateGallery />}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
