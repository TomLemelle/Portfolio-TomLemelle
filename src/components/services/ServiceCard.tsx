import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Service } from "../../types";

interface ServiceCardProps {
  service: Service;
  color: string;
}

const ServiceCard = ({ service, color }: ServiceCardProps) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
      className="glass-card remove-full-h p-6 self-start"
    >
      <div className="flex items-start gap-4 mb-8">
        <div className={`p-3 rounded-xl bg-${color} text-white`}>
          {service.icon}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-sm opacity-80">{service.description}</p>
        </div>
      </div>

      {/* Features collapsible list */}
      <div className="mt-auto space-y-4">
        {service.features.map((feature, index) => {
          const isExpanded = expandedSections.includes(index);

          return (
            <div key={index} className="space-y-2">
              <button
                onClick={() => toggleSection(index)}
                className={`flex items-center justify-between w-full text-left text-${color} font-medium hover:opacity-80 transition-opacity`}
              >
                {feature.title}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.ul
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 500, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden ml-4 space-y-1"
                  >
                    {feature.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm opacity-80 flex items-start gap-2"
                      >
                        <span
                          className={`text-${color} text-lg font-bold leading-tight`}
                        >
                          •
                        </span>
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
