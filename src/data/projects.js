export const GITHUB_USERNAME = 'kamiikod'

// Project diambil otomatis dari GitHub API (repo publik, bukan fork).
// Gunakan `projectOverrides` untuk memperbaiki tampilan repo tertentu.
// Kunci = nama repo persis di GitHub. Contoh:
//
// export const projectOverrides = {
//   'nama-repo': {
//     description: 'Deskripsi singkat yang lebih jelas.',
//     stack: ['React', 'Vite'],
//     demo: 'https://contoh.vercel.app',
//     hidden: false, // true = sembunyikan dari daftar
//   },
// }
export const projectOverrides = {}

// Cadangan bila GitHub API tidak bisa diakses (offline / rate limit).
// Isi manual dengan project yang benar-benar ada. Contoh bentuk data:
// { id: 'nama-repo', name: 'Nama Project', description: '...', stack: ['HTML', 'CSS'], repo: 'https://github.com/kamiikod/nama-repo', demo: '' }
export const manualProjects = []
