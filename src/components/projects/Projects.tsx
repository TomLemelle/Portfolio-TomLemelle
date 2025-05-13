import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectSlider from "./ProjectSlider";
import { Project } from "../../types";
import { useTranslation } from "../../contexts/TranslationProvider";

import fr from "../../locales/projects/fr.json";
import en from "../../locales/projects/en.json";
import it from "../../locales/projects/it.json";

const allProjects: Record<string, { projects: Project[] }> = { en, fr, it };

const Projects = () => {
  const { dictionary, locale } = useTranslation();

  const projects: Project[] = allProjects[locale].projects;

  return (
    <section id="projects" className="section px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            {dictionary.home.myProjects.heading}
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.home.myProjects.description}
          </p>
        </motion.div>

        <ProjectSlider projects={projects} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 btn-outline group hover:bg-white"
          >
            {dictionary.home.myProjects.secondaryButton}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
