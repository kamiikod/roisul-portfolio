import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project }) {
  const { name, description, stack, repo, demo } = project

  return (
    <article className="card project">
      <h3 className="project__name">{name}</h3>
      <p className="project__desc">{description || 'Belum ada deskripsi untuk project ini.'}</p>

      {stack.length > 0 && (
        <ul className="project__stack" aria-label="Teknologi">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}

      <div className="project__links">
        <a className="btn btn--small btn--primary" href={repo} target="_blank" rel="noopener noreferrer">
          <Github size={16} aria-hidden="true" />
          GitHub
          <span className="sr-only"> (buka di tab baru)</span>
        </a>
        {demo && (
          <a className="btn btn--small btn--ghost" href={demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} aria-hidden="true" />
            Live Demo
            <span className="sr-only"> (buka di tab baru)</span>
          </a>
        )}
      </div>
    </article>
  )
}
