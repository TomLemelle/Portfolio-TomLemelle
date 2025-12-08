import { motion } from "framer-motion";
import { VideoProject } from "../types";

interface VideoCardProps {
  video: VideoProject;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full flex flex-col"
    >
      {/* YouTube Player intégré */}
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Contenu de la carte */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
        <p className="opacity-80 mb-4">{video.description}</p>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-full bg-primary text-white text-xs"
            >
              {category[0].toUpperCase() + category.slice(1).toLowerCase()}
            </span>
          ))}
        </div>

        {/* Date et lien YouTube */}
        <div className="flex justify-between items-center">
          {video.date && <p className="text-sm opacity-70">{video.date}</p>}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Voir sur YouTube
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
