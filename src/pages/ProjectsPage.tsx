import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FilterOption, Project, VideoProject } from "../types";
import { useTranslation } from "../contexts/TranslationProvider";
import VideoCard from "../components/VideoCard";

import fr from "../locales/projects/fr.json";
import en from "../locales/projects/en.json";
import it from "../locales/projects/it.json";

import frVideos from "../locales/videos/fr.json";
import enVideos from "../locales/videos/en.json";
import itVideos from "../locales/videos/it.json";

const ProjectsPage = () => {
  const { dictionary, locale } = useTranslation();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoProject[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Chargement des projets selon la langue active
  const allProjects: Record<string, { projects: Project[] }> = { en, fr, it };
  const projects: Project[] = allProjects[locale].projects;

  // Chargement des vidéos selon la langue active
  const allVideos: Record<string, { videos: VideoProject[] }> = {
    en: enVideos,
    fr: frVideos,
    it: itVideos
  };
  const videos: VideoProject[] = allVideos[locale].videos;

  // Catégories traduites dynamiquement
  const categories: FilterOption[] = [
    { value: "all", label: dictionary.projects.filters.all },
    { value: "custom", label: dictionary.projects.filters.custom },
    { value: "webflow", label: dictionary.projects.filters.webflow },
    { value: "mobile", label: dictionary.projects.filters.mobile },
    { value: "game", label: dictionary.projects.filters.game },
    { value: "photography", label: dictionary.projects.filters.photography },
    { value: "videography", label: dictionary.projects.filters.videography },
  ];

  useEffect(() => {
    // Fonction pour trier par date (du plus récent au plus ancien)
    const sortByDate = (items: (Project | VideoProject)[]) => {
      return [...items].sort((a, b) => {
        const dateA = a.sortDate || "0000-00-00";
        const dateB = b.sortDate || "0000-00-00";
        // Tri décroissant (plus récent en premier)
        return dateB.localeCompare(dateA);
      });
    };

    if (activeFilter === "videography") {
      // Si le filtre est "videography", on affiche uniquement les vidéos triées
      setFilteredProjects([]);
      setFilteredVideos(sortByDate(videos) as VideoProject[]);
    } else if (activeFilter === "all") {
      // Si "all", on affiche tous les projets ET toutes les vidéos, triés par date
      setFilteredProjects(sortByDate(projects) as Project[]);
      setFilteredVideos(sortByDate(videos) as VideoProject[]);
    } else {
      // Sinon, on filtre les projets normalement (sans les vidéos) et on trie
      const filtered = projects.filter((project) => project.categories.includes(activeFilter));
      setFilteredProjects(sortByDate(filtered) as Project[]);
      setFilteredVideos([]);
    }
  }, [activeFilter, projects, videos]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 px-4 md:px-8 mt-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {dictionary.projects.heading}
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.projects.description}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === category.value
                  ? "bg-primary text-white"
                  : "bg-white/30 backdrop-blur-sm hover:bg-primary/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Affichage des projets normaux */}
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              key={project.id}
            >
              <Link to={`/projects/${project.id}`}>
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={"/" + project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white font-medium">
                        {dictionary.projects.viewProject}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="opacity-80 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 rounded-full bg-primary text-white text-xs"
                        >
                          {category[0].toUpperCase() +
                            category.slice(1).toLowerCase()}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm opacity-70">{project.date}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Affichage des vidéos après les projets */}
          {filteredVideos.length > 0 &&
            filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
