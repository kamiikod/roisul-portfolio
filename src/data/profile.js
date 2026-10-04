// ============================================================
// Semua data pribadi ada di file ini. Ganti sesuai kebutuhan.
// ============================================================

import aboutPhoto from "../assets/hikampppfpa.jpeg";
import sideImage from "../assets/fall.png";
import cert1 from '../assets/certificates/cert-01.png'
import cert2 from '../assets/certificates/cert-02.png'
import cert3 from '../assets/certificates/cert-03.png'


export const profile = {
  name: "Roisul Hikam",
  status: "Student / Junior Developer",
  school: "SMK IDN Bogor",
  // Taruh foto di src/assets (mis. foto.jpg), lalu:
  //   import foto from '../assets/foto.jpg'  -> photo: foto
  // Selama kosong, Hero menampilkan placeholder.
  photo: null,
  // Dipakai tombol "Send Message" (membuka aplikasi email dengan isi form).
  // TODO: ganti dengan email asli.
  email: "roisulhikamidn@gmail.com",
};

// Ganti `image: null` dengan hasil import foto sertifikat, contoh:
//   import cert1 from '../assets/certificate-01.jpg'  ->  image: cert1
export const certificates = [
  { id: "c1", title: "Certificate 01", image: cert1 },
  { id: "c2", title: "Certificate 02", image: cert2 },
  { id: "c3", title: "Certificate 03", image: cert3 },
];

// Kalimat intro. Urutannya dirender apa adanya:
//   { text }  = teks biasa
//   { photo } = chip foto kecil
//   { chip, dark } = chip berbingkai (dark = hitam penuh)
export const about = {
  image: aboutPhoto,
  sideImage,
  segments: [
    { text: "Software developer" },
    { photo: true },
    { text: "from Indonesia, still a student and building" },
    { chip: "real projects" },
    { text: "while looking for an" },
    { chip: "internship", dark: true },
  ],
  facts: [
    { label: "Based in", value: "Indonesia" },
    { label: "Role", value: "Software Developer" },
    { label: "Status", value: "Student" },
    { label: "Open to", value: "Work Opportunities" },
  ],
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/kamiikod",
    handle: "kamiikod",
  },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/kamii.code/", handle: "kamii.code" },
  { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/roisul-hikam-abb795405/", handle: "roisul-hikam" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@RoisulHikamIDN", handle: "@Kamidn" },
];

export const experiences = [
  {
    id: "smk",
    period: "2024 – Now",
    current: true,
    organization: "SMK IDN Bogor",
    role: "Software Developer Student",
    summary:
      "Joined competitions and school events, and earned certificates along the way.",
    showCertificates: true,
  },
  {
    id: "smp",
    period: "2023",
    organization: "SMP Binaqurani",
    role: "OSIS Member",
    summary:
      "Two school years in OSIS: Education division first, then Security.",
  },
];