import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "../../contexts/TranslationProvider";
import { Code2, Camera, Video } from "lucide-react";
import React, { useRef } from "react";

const Services = () => {
  const { dictionary } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const services = [
    {
      id: 1,
      title: dictionary.home.myServices.webDevelopment.heading,
      description: dictionary.home.myServices.webDevelopment.description,
      icon: React.createElement(Code2, { size: 24 }),
      features: [
        {
          title: dictionary.home.myServices.webDevelopment.custom.title,
          items: [
            dictionary.home.myServices.webDevelopment.custom.react,
            dictionary.home.myServices.webDevelopment.custom.nextjs,
            dictionary.home.myServices.webDevelopment.custom.vuejs,
            dictionary.home.myServices.webDevelopment.custom.nodejs,
            dictionary.home.myServices.webDevelopment.custom.adonisjs,
          ],
        },
        {
          title: dictionary.home.myServices.webDevelopment.webflow.title,
          items: [
            dictionary.home.myServices.webDevelopment.webflow.webflow,
            dictionary.home.myServices.webDevelopment.webflow.cms,
            dictionary.home.myServices.webDevelopment.webflow.responsive,
          ],
        },
        {
          title: dictionary.home.myServices.webDevelopment.mobile.title,
          items: [
            dictionary.home.myServices.webDevelopment.mobile.reactNative,
            dictionary.home.myServices.webDevelopment.mobile.crossPlatform,
            dictionary.home.myServices.webDevelopment.mobile.store,
          ],
        },
        {
          title: dictionary.home.myServices.webDevelopment.devops.title,
          items: [
            dictionary.home.myServices.webDevelopment.devops.docker,
            dictionary.home.myServices.webDevelopment.devops.cicd,
            dictionary.home.myServices.webDevelopment.devops.infrastructure,
          ],
        },
      ],
    },
    {
      id: 2,
      title: dictionary.home.myServices.photography.heading,
      description: dictionary.home.myServices.photography.description,
      icon: React.createElement(Camera, { size: 24 }),
      features: [
        {
          title: dictionary.home.myServices.photography.portrait.title,
          items: [
            dictionary.home.myServices.photography.portrait.headshots,
            dictionary.home.myServices.photography.portrait.environmental,
            dictionary.home.myServices.photography.portrait.group,
          ],
        },
        {
          title: dictionary.home.myServices.photography.corporate.title,
          items: [
            dictionary.home.myServices.photography.corporate.team,
            dictionary.home.myServices.photography.corporate.office,
            dictionary.home.myServices.photography.corporate.events,
            dictionary.home.myServices.photography.corporate.product,
          ],
        },
      ],
    },
    {
      id: 3,
      title: dictionary.home.myServices.videography.heading,
      description: dictionary.home.myServices.videography.description,
      icon: React.createElement(Video, { size: 24 }),
      features: [
        {
          title: dictionary.home.myServices.videography.corporate.title,
          items: [
            dictionary.home.myServices.videography.corporate.presentations,
            dictionary.home.myServices.videography.corporate.demonstrations,
            dictionary.home.myServices.videography.corporate.interviews,
            dictionary.home.myServices.videography.corporate.event,
          ],
        },
        {
          title: dictionary.home.myServices.videography.storyTelling.title,
          items: [
            dictionary.home.myServices.videography.storyTelling.stories,
            dictionary.home.myServices.videography.storyTelling.behind,
            dictionary.home.myServices.videography.storyTelling.testimonials,
            dictionary.home.myServices.videography.storyTelling.narratives,
          ],
        },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section px-4 md:px-8 relative overflow-hidden"
    >
      {/* Parallax bg texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(45,106,60,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-80 h-80 blob"
          style={{ background: "rgba(82,183,136,0.06)", filter: "blur(70px)" }}
        />
      </motion.div>

      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-4">
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "rgb(82,183,136)" }}
        >
          — Services
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-14"
        >
          <h2 className="section-title text-white">
            {dictionary.home.myServices.heading}
          </h2>
          <p
            className="text-lg max-w-xl"
            style={{ color: "rgba(235,229,210,0.55)" }}
          >
            {dictionary.home.myServices.description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              color={idx === services.length - 1 ? "secondary" : "primary"}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
