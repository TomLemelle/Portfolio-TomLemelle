import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6, rotateY: -1, rotateX: 1 }}
      className="glass-card p-6 h-full flex flex-col nature-card-3d"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: "rgba(45,106,79,0.3)" }}
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
              style={{ background: "rgb(82,183,136)" }}
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm" style={{ color: "rgb(28,43,30)" }}>{testimonial.name}</h4>
            <p className="text-xs opacity-60">{testimonial.position}</p>
          </div>
        </div>
        <span style={{ color: "rgb(45,106,79)" }}>
          <Quote size={22} />
        </span>
      </div>

      <p className="italic text-sm opacity-80 mb-4 leading-relaxed flex-1">{testimonial.content}</p>

      <div className="flex items-center gap-1 mt-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-4 h-4"
            style={{ color: star <= testimonial.rating ? "rgb(200,150,40)" : "rgba(28,43,30,0.2)" }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
