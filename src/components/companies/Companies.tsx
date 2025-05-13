import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "../../contexts/TranslationProvider";

const companies = [
  {
    name: "SafeEat",
    logo: "images/logos/SafeEat-logo.png",
  },
  {
    name: "Citizens",
    logo: "images/logos/citizens-logo.png",
  },
  {
    name: "ADLServices",
    logo: "images/logos/ADLServices-logo.png",
  },
  {
    name: "PICTION",
    logo: "images/logos/PICTION-logo.png",
  },
  {
    name: "Le Comptoir de Mathilde Rouen",
    logo: "images/logos/ComptoirdeMathilde-logo.png",
  },
  {
    name: "ADLCabinet Franqueville-Saint-Pierre",
    logo: "images/logos/ADLCabinet-logo.png",
  },
  {
    name: "Esprit Zen",
    logo: "images/logos/esprit-zen.webp",
  },
  {
    name: "Librairie Rollon Rouen",
    logo: "images/logos/librairie-rollon.png",
  },
];

const Companies = () => {
  const { dictionary } = useTranslation();

  return (
    <section className="py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{dictionary.home.trustedBy.heading}</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.home.trustedBy.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative glass rounded-2xl"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={60}
            slidesPerView={2}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            breakpoints={{
              450: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="companies-swiper py-12"
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-32">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-[75px] w-auto object-contain opacity-90 hover:opacity-100 transition-all hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Companies;
