import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "../../types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "../../contexts/TranslationProvider";

interface ProjectSliderProps {
  projects: Project[];
}

const ProjectSlider = ({ projects }: ProjectSliderProps) => {
  const { dictionary } = useTranslation();
  const swiperRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="project-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <motion.div className="glass-card p-6 h-[400px] flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
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

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full hover:bg-primary/10 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>

                  <p className="text-sm opacity-70 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
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
                </div>
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default ProjectSlider;
