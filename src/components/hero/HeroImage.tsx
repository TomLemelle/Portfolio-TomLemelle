import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl -z-10 scale-95 opacity-60"
        style={{ background: "linear-gradient(135deg, rgba(45,106,79,0.5), rgba(124,74,30,0.4))" }}
      />

      {/* Gradient border frame — bark/moss gradient */}
      <div
        className="relative p-[2px] rounded-3xl"
        style={{ background: "linear-gradient(135deg, rgb(82,183,136), rgba(255,255,255,0.15) 50%, rgb(124,74,30))" }}
      >
        <motion.div
          className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] rounded-[22px] overflow-hidden"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/images/face.jpg"
            alt="Tom Lemelle"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
          {/* Forest floor gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,31,18,0.45) 0%, transparent 50%)" }}
          />
        </motion.div>
      </div>

      {/* Corner leaf-like accent dots */}
      <div
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2"
        style={{ background: "rgb(82,183,136)", borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 0 12px rgba(82,183,136,0.6)" }}
      />
      <div
        className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
        style={{ background: "rgb(124,74,30)", boxShadow: "0 0 10px rgba(124,74,30,0.5)" }}
      />
    </div>
  );
};

export default HeroImage;
