import Hero from "../components/hero/Hero";
import Projects from "../components/projects/Projects";
import Services from "../components/services/Services";
import Testimonials from "../components/testimonials/Testimonials";
import Contact from "../components/contact/Contact";
import { motion } from "framer-motion";
import Companies from "../components/companies/Companies";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Companies />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
    </motion.div>
  );
};

export default HomePage;
