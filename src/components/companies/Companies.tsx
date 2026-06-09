import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "../../contexts/TranslationProvider";
import { useRef } from "react";

const companies = [
  { name: "Somelia", logo: "images/logos/somelia-logo.png" },
  { name: "SafeEat", logo: "images/logos/SafeEat-logo.png" },
  { name: "Citizens", logo: "images/logos/citizens-logo.png" },
  { name: "ADLServices", logo: "images/logos/ADLServices-logo.png" },
  { name: "PICTION", logo: "images/logos/PICTION-logo.png" },
  { name: "Le Comptoir de Mathilde Rouen", logo: "images/logos/ComptoirdeMathilde-logo.png" },
  { name: "ADLCabinet Franqueville-Saint-Pierre", logo: "images/logos/ADLCabinet-logo.png" },
  { name: "Esprit Zen", logo: "images/logos/esprit-zen.webp" },
  { name: "Librairie Rollon Rouen", logo: "images/logos/librairie-rollon.png" },
];

const Companies = () => {
  const { dictionary } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 overflow-hidden relative">

      {/* Subtle separator line */}
      <div className="max-w-7xl mx-auto mb-14">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(82,183,136,0.15)" }} />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "rgba(82,183,136,0.6)" }}
          >
            Ils m'ont fait confiance
          </motion.span>
          <div className="flex-1 h-px" style={{ background: "rgba(82,183,136,0.15)" }} />
        </div>
      </div>

      <motion.div
        style={{ y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative rounded-2xl px-6 py-8"
        aria-hidden="false"
        style2={{}}
      >
        {/* Glow border */}
        <div className="absolute inset-0 rounded-2xl" style={{ border: "1px solid rgba(82,183,136,0.12)", background: "rgba(18,38,22,0.3)", backdropFilter: "blur(8px)" }} />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          slidesPerView={2}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          breakpoints={{ 450: { slidesPerView: 1 }, 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }}
          className="companies-swiper py-8 relative z-10"
        >
          {companies.map((company, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-24">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-[60px] w-auto object-contain transition-all duration-300"
                  style={{ opacity: 0.5, filter: "brightness(0) invert(1)" }}
                  onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; (e.target as HTMLImageElement).style.filter = "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(90deg)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = "0.5"; (e.target as HTMLImageElement).style.filter = "brightness(0) invert(1)"; }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Companies;
