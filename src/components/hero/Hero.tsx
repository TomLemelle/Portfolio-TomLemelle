import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import SocialLinks from "./SocialLinks";
import { useTranslation } from "../../contexts/TranslationProvider";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: number;
}

const Hero: React.FC = () => {
  const { dictionary } = useTranslation();

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isMouseMoving, setIsMouseMoving] = useState<boolean>(false);
  const [, setTick] = useState(0); // pour forcer le rerender
  const particlesRef = useRef<Particle[]>([]);

  // Initialisation des particules avec des positions aléatoires
  useEffect(() => {
    if (typeof window !== "undefined") {
      particlesRef.current = Array(25)
        .fill(null)
        .map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 0.6 + Math.random() * 0.6,
          color: Math.floor(Math.random() * 3), // 0, 1, ou 2 pour la couleur
        }));
    }
  }, []);

  // Animation continue des particules (mouvement aléatoire)
  useEffect(() => {
    let animationFrameId: number;

    const animateParticles = () => {
      particlesRef.current = particlesRef.current.map((particle) => {
        let newX = particle.x + (Math.random() - 0.5) * 2; // déplacement léger
        let newY = particle.y + (Math.random() - 0.5) * 2;

        // Garder les particules dans les limites
        newX = Math.max(10, Math.min(window.innerWidth - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - 10, newY));

        return {
          ...particle,
          x: newX,
          y: newY,
        };
      });

      setTick((tick) => tick + 1); // forcer React à redessiner
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Gestion du mouvement de la souris avec throttling
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 20;
    let mouseTimeout: number | undefined;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();

      if (currentTime - lastTime > throttleDelay) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsMouseMoving(true);
        lastTime = currentTime;

        updateParticlePositions(e.clientX, e.clientY);

        clearTimeout(mouseTimeout);
        mouseTimeout = window.setTimeout(() => {
          setIsMouseMoving(false);
        }, 100);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
        clearTimeout(mouseTimeout);
      }
    };
  }, []);

  // Fonction pour mettre à jour les positions des particules (repoussées par la souris)
  const updateParticlePositions = (mouseX: number, mouseY: number): void => {
    if (typeof window === "undefined") return;

    particlesRef.current = particlesRef.current.map((particle) => {
      const distanceX = mouseX - particle.x;
      const distanceY = mouseY - particle.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const repulsionForce =
        distance < 300 ? Math.min(600 / (distance + 20), 3) : 0;

      const magnitude = distance > 0 ? distance : 1;
      const directionX = distance > 0 ? -distanceX / magnitude : 0;
      const directionY = distance > 0 ? -distanceY / magnitude : 0;

      let newX = particle.x + directionX * repulsionForce * 8;
      let newY = particle.y + directionY * repulsionForce * 8;

      newX = Math.max(10, Math.min(window.innerWidth - 10, newX));
      newY = Math.max(10, Math.min(window.innerHeight - 10, newY));

      return {
        ...particle,
        x: newX,
        y: newY,
      };
    });
  };

  // Fonction helper pour déterminer la classe de couleur
  const getColorClass = (colorIndex: number): string => {
    switch (colorIndex) {
      case 0:
        return "bg-primary";
      case 1:
        return "bg-secondary";
      default:
        return "bg-white";
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center mt-16 lg:mt-0">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        {/* Big glowing blobs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-secondary opacity-30 blur-3xl" />

        {/* Glowing particles */}
        {particlesRef.current.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${getColorClass(particle.color)}`}
            style={{
              width: `${particle.size}rem`,
              height: `${particle.size}rem`,
              opacity: 0.4,
              filter: "blur(0.5px)",
              zIndex: -1,
              left: 0,
              top: 0,
              transform: `translate(${particle.x}px, ${particle.y}px)`,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {dictionary.home.hero.heading}{" "}
              <span className="text-primary">Tom Lemelle</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="text-secondary">
                {dictionary.home.hero.firstSubHeading}
              </span>{" "}
              &&nbsp;
              <span className="text-primary">
                {dictionary.home.hero.secondSubHeading}
              </span>
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-lg">
              {dictionary.home.hero.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                {dictionary.home.hero.primaryButton}
              </a>
              <a href="#projects" className="btn-outline">
                {dictionary.home.hero.secondaryButton}
              </a>
            </div>

            <SocialLinks className="mt-8" />
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
