// ============================================================
// Semua data pribadi ada di file ini. Ganti sesuai kebutuhan.
// ============================================================

export const profile = {
  name: 'Roisul Hikam',
  status: 'Student / Junior Developer',
  school: 'SMK IDN Bogor',
  // Taruh foto di src/assets (mis. foto.jpg), lalu:
  //   import foto from '../assets/foto.jpg'  -> photo: foto
  // Selama kosong, Hero menampilkan placeholder.
  photo: null,
  // Dipakai tombol "Send Message" (membuka aplikasi email dengan isi form).
  // TODO: ganti dengan email asli.
  email: 'your-email@example.com',
}

// Kosongkan `url` bila belum ada; item akan tampil sebagai "belum ditambahkan".
export const socials = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/kamiikod', handle: 'kamiikod' },
  { id: 'linkedin', label: 'LinkedIn', url: '', handle: '' },
  { id: 'instagram', label: 'Instagram', url: '', handle: '' },
]

export const experiences = [
  {
    id: 'smk',
    organization: 'SMK IDN Bogor',
    period: '2024 - Present',
    role: 'Student',
    points: [
      'Mengikuti beberapa lomba dan kegiatan yang berkaitan dengan bidang yang saya pelajari.',
      'Mendapatkan sertifikat dari lomba dan kegiatan tersebut.',
    ],
  },
  {
    id: 'smp',
    organization: 'SMP Binaqurani',
    period: '2023',
    role: 'OSIS Member',
    points: [
      'Bagian Pendidikan selama 1 tahun pelajaran.',
      'Dipindahkan ke bagian Keamanan selama 1 tahun pelajaran.',
      'Belajar bertanggung jawab atas tugas organisasi dan bekerja sama dalam tim.',
    ],
  },
]

// Ganti `image: null` dengan hasil import foto sertifikat, contoh:
//   import cert1 from '../assets/certificate-01.jpg'  ->  image: cert1
export const certificates = [
  { id: 'c1', title: 'Certificate 01', image: null },
  { id: 'c2', title: 'Certificate 02', image: null },
  { id: 'c3', title: 'Certificate 03', image: null },
]
