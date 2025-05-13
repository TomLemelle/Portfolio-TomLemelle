import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <div className="relative">
      <motion.div className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] rounded-2xl glass overflow-hidden animate-float">
        <img
          src="/images/face.jpg"
          alt="Tom Lemelle"
          loading="eager"
          className="w-full h-full object-cover object-center will-change-transform translate-z-0"
        />
      </motion.div>
    </div>
  );
};

export default HeroImage;
