import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "../../contexts/TranslationProvider";
import { Code2, Camera, Video } from "lucide-react";
import React from "react";

const Services = () => {
  const { dictionary } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const colors = {
    green: "primary",
    blue: "secondary",
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
    <section id="services" className="section px-4 md:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            {dictionary.home.myServices.heading}
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.home.myServices.description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              color={services.length - 1 === idx ? colors.blue : colors.green}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
