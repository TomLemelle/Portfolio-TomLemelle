import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Calendar } from "lucide-react";
import { Project } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "../contexts/TranslationProvider";

import fr from "../locales/projects/fr.json";
import en from "../locales/projects/en.json";
import it from "../locales/projects/it.json";

const allProjects: Record<string, { projects: Project[] }> = { en, fr, it };

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { dictionary, locale } = useTranslation();

  useEffect(() => {
    const projects = allProjects[locale].projects;
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) setProject(foundProject);
    setLoading(false);
  }, [id, locale]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-4 md:px-8 flex items-center justify-center mt-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            {dictionary.detailedProject.notFound}
          </h1>
          <p className="mb-8">
            {dictionary.detailedProject.notFoundExplanation}
          </p>
          <Link to="/projects" className="btn-primary">
            {dictionary.detailedProject.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 px-4 md:px-8 mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} />
          {dictionary.detailedProject.back}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 rounded-full bg-primary text-white text-sm"
              >
                {category[0].toUpperCase() + category.slice(1).toLowerCase()}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            {project.date && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{project.date}</span>
              </div>
            )}

            {project.client && (
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium">
                  {dictionary.detailedProject.client}
                </span>
                <span>{project.client}</span>
              </div>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Globe size={16} className="text-primary" />
                <span>{dictionary.detailedProject.visitProject}</span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="h-[500px] glass rounded-xl overflow-hidden"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={"/" + image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8">
              <div className="prose prose-h1:text-4xl prose-h1:font-bold max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card remove-full-h p-6 sticky top-28">
              <h3 className="text-xl font-semibold mb-4">
                {dictionary.detailedProject.technologies}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="py-2 px-3 rounded-lg bg-white/20 flex items-center gap-2"
                  >
                    <a href={tech.url} target="_blank">
                      <span className="px-3 py-1 rounded-full bg-primary text-white text-sm cursor-pointer">
                        {tech.name[0].toUpperCase() +
                          tech.name.slice(1).toLowerCase()}
                      </span>
                    </a>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {dictionary.detailedProject.similar}
              </h3>
              <p className="mb-4 opacity-80">
                {dictionary.detailedProject.interested}
              </p>
              <a href="/#contact" className="btn-primary w-full text-center">
                {dictionary.detailedProject.primaryButton}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
