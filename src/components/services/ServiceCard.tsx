import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Service } from "../../types";

interface ServiceCardProps {
  service: Service;
  color: string;
}

const COLOR_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  primary: {
    bg: "rgba(45,106,79,0.15)",
    text: "rgb(45,106,79)",
    dot: "rgb(82,183,136)",
  },
  secondary: {
    bg: "rgba(124,74,30,0.15)",
    text: "rgb(124,74,30)",
    dot: "rgb(180,110,50)",
  },
};

const ServiceCard = ({ service, color }: ServiceCardProps) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const c = COLOR_MAP[color] ?? COLOR_MAP.primary;

  const toggleSection = (index: number) =>
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <motion.div
      variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
      whileHover={{ y: -4, rotateY: -1, rotateX: 1 }}
      className="glass-card remove-full-h p-6 self-start nature-card-3d"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-start gap-4 mb-8">
        <div
          className="p-3 rounded-xl text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${c.text}, ${c.dot})`, boxShadow: `0 4px 14px ${c.text}40` }}
        >
          {service.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2" style={{ color: "rgb(28,43,30)" }}>{service.title}</h3>
          <p className="text-sm opacity-70">{service.description}</p>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        {service.features.map((feature, index) => {
          const isExpanded = expandedSections.includes(index);
          return (
            <div key={index} className="space-y-2">
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between w-full text-left text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ color: c.text }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
                  {feature.title}
                </span>
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={15} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.ul
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 500, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden ml-5 space-y-1"
                  >
                    {feature.items.map((item, i) => (
                      <li key={i} className="text-sm opacity-70 flex items-start gap-2">
                        <span className="text-lg font-bold leading-tight" style={{ color: c.dot }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
