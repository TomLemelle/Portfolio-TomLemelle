import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectSlider from "./ProjectSlider";
import { Project } from "../../types";
import { useTranslation } from "../../contexts/TranslationProvider";
import { useRef } from "react";

import fr from "../../locales/projects/fr.json";
import en from "../../locales/projects/en.json";
import it from "../../locales/projects/it.json";

const allProjects: Record<string, { projects: Project[] }> = { en, fr, it };

const Projects = () => {
  const { dictionary, locale } = useTranslation();
  const projects: Project[] = allProjects[locale].projects;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const titleX = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="projects" className="section px-4 md:px-8 relative overflow-hidden">

      {/* Parallax blob */}
      <motion.div
        style={{ y: bgY }}
        className="absolute pointer-events-none"
        aria-hidden
      >
        <div className="absolute top-20 right-0 w-96 h-96 blob" style={{ background: "rgba(45,106,60,0.08)", filter: "blur(80px)" }} />
      </motion.div>

      {/* Section label */}
      <motion.div
        style={{ x: titleX, opacity: titleOpacity }}
        className="max-w-7xl mx-auto mb-4"
      >
        <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "rgb(82,183,136)" }}>
          — Portfolio
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14"
        >
          <h2 className="section-title">{dictionary.home.myProjects.heading}</h2>
          <p className="text-lg max-w-xl" style={{ color: "rgba(235,229,210,0.55)" }}>
            {dictionary.home.myProjects.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <ProjectSlider projects={projects} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/projects" className="inline-flex items-center gap-2 btn-outline group">
            {dictionary.home.myProjects.secondaryButton}
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight size={18} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
