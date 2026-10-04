import { AlertCircle, FolderOpen, RefreshCw } from 'lucide-react'
import { GITHUB_USERNAME } from '../data/projects'
import { useGithubRepos } from '../hooks/useGithubRepos'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'

function ProjectSkeletons() {
  return (
    <div className="project-grid" aria-hidden="true">
      {[0, 1, 2].map((item) => (
        <div key={item} className="card project project--skeleton">
          <span className="skeleton skeleton--title" />
          <span className="skeleton" />
          <span className="skeleton skeleton--short" />
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const { status, projects, error, retry } = useGithubRepos()

  return (
    <section id="projects" className="section section--tint" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          title="Projects"
          description={`Repository publik dari GitHub @${GITHUB_USERNAME}, diambil langsung dari akun saya.`}
        />

        <div aria-live="polite">
          {status === 'loading' && (
            <>
              <p className="sr-only">Memuat project dari GitHub...</p>
              <ProjectSkeletons />
            </>
          )}

          {status === 'error' && (
            <div className="notice notice--error" role="alert">
              <AlertCircle size={22} aria-hidden="true" />
              <div>
                <p className="notice__title">Project belum bisa dimuat</p>
                <p>{error}</p>
              </div>
              <button type="button" className="btn btn--small btn--ghost" onClick={retry}>
                <RefreshCw size={16} aria-hidden="true" />
                Coba lagi
              </button>
            </div>
          )}

          {status !== 'loading' && projects.length > 0 && (
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {status === 'success' && projects.length === 0 && (
            <div className="notice">
              <FolderOpen size={22} aria-hidden="true" />
              <div>
                <p className="notice__title">Belum ada repository publik</p>
                <p>Project akan muncul di sini setelah ada repository publik di GitHub.</p>
              </div>
            </div>
          )}
        </div>

        <p className="projects__more">
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
            Lihat semua di GitHub
            <span className="sr-only"> (buka di tab baru)</span>
          </a>
        </p>
      </div>
    </section>
  )
}
