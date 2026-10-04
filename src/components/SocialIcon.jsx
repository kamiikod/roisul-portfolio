import { Github, Globe, Instagram, Linkedin, Youtube } from "lucide-react";

const icons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
};

export default function SocialIcon({ id, size = 20 }) {
  const Icon = icons[id] ?? Globe;
  return <Icon size={size} aria-hidden="true" />;
}
