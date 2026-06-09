import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "../../contexts/TranslationProvider";
import { useRef } from "react";

import fr from "../../locales/testimonials/fr.json";
import it from "../../locales/testimonials/it.json";
import en from "../../locales/testimonials/en.json";
import { Testimonial } from "../../types";

const Testimonials = () => {
  const { dictionary, locale } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const allT: Record<string, { testimonials: Testimonial[] }> = { fr, it, en };
  const testimonials = allT[locale].testimonials;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section ref={sectionRef} id="testimonials" className="section px-4 md:px-8 relative overflow-hidden">

      {/* Parallax blob */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-0 w-80 h-80 blob-slow" style={{ background: "rgba(100,55,15,0.07)", filter: "blur(80px)", transform: "translateY(-50%)" }} />
      </motion.div>

      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-4">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "rgb(180,140,50)" }}>
          — Témoignages
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-14"
        >
          <h2 className="section-title">{dictionary.home.testimonials.heading}</h2>
          <p className="text-lg max-w-xl" style={{ color: "rgba(235,229,210,0.55)" }}>
            {dictionary.home.testimonials.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
            modules={[Pagination, Autoplay, Navigation]}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="testimonial-swiper py-8"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
