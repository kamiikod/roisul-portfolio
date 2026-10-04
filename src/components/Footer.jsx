import { profile, socials } from '../data/profile'
import SocialIcon from './SocialIcon'

export default function Footer() {
  const activeSocials = socials.filter((social) => social.url)

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="footer__role">Student • Junior Developer</p>
        </div>

        {activeSocials.length > 0 && (
          <ul className="footer__social" aria-label="Media sosial">
            {activeSocials.map((social) => (
              <li key={social.id}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (buka di tab baru)`}>
                  <SocialIcon id={social.id} />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="footer__copy">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
