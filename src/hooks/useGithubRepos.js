import { useCallback, useEffect, useState } from 'react'
import { GITHUB_USERNAME, manualProjects, projectOverrides } from '../data/projects'

const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`

function toProject(repo) {
  const override = projectOverrides[repo.name] ?? {}
  const stack = override.stack ?? [repo.language, ...(repo.topics ?? [])].filter(Boolean)

  return {
    id: repo.id,
    name: repo.name,
    description: override.description ?? repo.description ?? '',
    stack,
    repo: repo.html_url,
    demo: override.demo ?? repo.homepage ?? '',
    hidden: override.hidden ?? false,
  }
}

export function useGithubRepos() {
  const [state, setState] = useState({ status: 'loading', projects: [], error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState((prev) => ({ ...prev, status: 'loading', error: '' }))

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (response.status === 403) throw new Error('Batas permintaan GitHub API sedang penuh. Coba lagi beberapa menit lagi.')
        if (!response.ok) throw new Error(`GitHub API mengembalikan status ${response.status}.`)
        return response.json()
      })
      .then((repos) => {
        const projects = repos
          .filter((repo) => !repo.fork && repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
          .map(toProject)
          .filter((project) => !project.hidden)
        setState({ status: 'success', projects, error: '' })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        const message = error.message.includes('GitHub')
          ? error.message
          : 'Tidak bisa terhubung ke GitHub. Periksa koneksi internet kamu.'
        setState({ status: 'error', projects: manualProjects, error: message })
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  return { ...state, retry }
}
