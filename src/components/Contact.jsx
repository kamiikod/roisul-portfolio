import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { profile, socials } from '../data/profile'
import SectionHeading from './SectionHeading'
import SocialIcon from './SocialIcon'

const emptyForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setSent(false)
  }

  // Belum ada backend: form membuka aplikasi email dengan isi yang sudah terisi.
  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Pesan dari ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nDari: ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setForm(emptyForm)
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact">
        <div>
          <SectionHeading
            id="contact-title"
            title="Contact Me"
            description="Punya kesempatan PKL atau ingin ngobrol soal project? Kirim pesan, saya balas secepatnya."
          />

          <ul className="contact__list">
            <li>
              <a className="contact__item" href={`mailto:${profile.email}`}>
                <span className="contact__icon"><Mail size={20} aria-hidden="true" /></span>
                <span>
                  <strong>Email</strong>
                  <small>{profile.email}</small>
                </span>
              </a>
            </li>
            {socials.map((social) => {
              const content = (
                <>
                  <span className="contact__icon"><SocialIcon id={social.id} /></span>
                  <span>
                    <strong>{social.label}</strong>
                    <small>{social.url ? social.handle || social.url : 'Belum ditambahkan'}</small>
                  </span>
                </>
              )
              return (
                <li key={social.id}>
                  {social.url ? (
                    <a className="contact__item" href={social.url} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div className="contact__item contact__item--empty">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <form className="card form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required value={form.message} onChange={handleChange} />

          <button type="submit" className="btn btn--primary">
            <Send size={18} aria-hidden="true" />
            Send Message
          </button>
          <p className="form__status" role="status">
            {sent && 'Aplikasi email kamu akan terbuka dengan pesan yang sudah terisi. Tinggal kirim.'}
          </p>
        </form>
      </div>
    </section>
  )
}
