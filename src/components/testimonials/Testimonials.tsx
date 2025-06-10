import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "../../contexts/TranslationProvider";

import fr from "../../locales/testimonials/fr.json";
import it from "../../locales/testimonials/it.json";
import en from "../../locales/testimonials/en.json";
import { Testimonial } from "../../types";

const Testimonials = () => {
  const { dictionary, locale } = useTranslation();

  const allTestimonials: Record<string, { testimonials: Testimonial[] }> = {
    fr,
    it,
    en,
  };
  const testimonials: Testimonial[] = allTestimonials[locale].testimonials;

  return (
    <section id="testimonials" className="section px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            {dictionary.home.testimonials.heading}
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.home.testimonials.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Pagination, Autoplay, Navigation]}
            //autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-swiper py-8"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
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
