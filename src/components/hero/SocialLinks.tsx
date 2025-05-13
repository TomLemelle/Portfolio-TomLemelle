import { Github, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/TomLemelle",
      color: "#3b4990",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/tom-lemelle/",
      color: "#3b4990",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/tomlemelle/?hl=fr",
      color: "#3b4990",
    },
    {
      name: "Malt",
      icon: <ExternalLink size={20} />,
      url: "https://www.malt.fr/profile/tomlemelle",
      color: "#3b4990",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className={`flex items-center space-x-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{
            scale: 1.1,
            backgroundColor: link.color,
            color: "#ffffff",
          }}
          whileTap={{ scale: 0.95 }}
          className="p-2 glass rounded-full hover:shadow-lg transition-all text-text-dark"
          aria-label={link.name}
          style={{
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
