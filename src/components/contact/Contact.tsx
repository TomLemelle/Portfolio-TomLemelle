import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "../../contexts/TranslationProvider";
import { useRef } from "react";

const Contact = () => {
  const { dictionary } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [70, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const contacts = [
    {
      icon: <MapPin size={20} />,
      label: dictionary.home.contact.location,
      value: "Rouen, France",
      href: undefined,
    },
    {
      icon: <Mail size={20} />,
      label: dictionary.home.contact.email,
      value: "tom.lemelle@gmail.com",
      href: "mailto:tom.lemelle@gmail.com",
    },
    {
      icon: <Phone size={20} />,
      label: dictionary.home.contact.phone,
      value: "+33 7 67 33 83 65, uniquement professionnel",
      href: "tel:+33767338365",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section px-4 md:px-8 relative overflow-hidden"
    >
      {/* Parallax bg */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute bottom-0 right-1/3 w-96 h-96 blob-slow"
          style={{ background: "rgba(100,55,15,0.08)", filter: "blur(100px)" }}
        />
      </motion.div>

      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-4">
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "rgb(180,140,50)" }}
        >
          — Contact
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-14"
        >
          <h2 className="section-title">{dictionary.home.contact.heading}</h2>
          <p
            className="text-lg max-w-xl"
            style={{ color: "rgba(235,229,210,0.55)" }}
          >
            {dictionary.home.contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass-card p-8"
        >
          <h3
            className="text-xl font-semibold mb-8"
            style={{ color: "rgb(235,229,210)" }}
          >
            {dictionary.home.contact.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {contacts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(82,183,136,0.06)",
                  border: "1px solid rgba(82,183,136,0.12)",
                }}
              >
                <div
                  className="p-2.5 rounded-lg flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(82,183,136,0.2), rgba(45,106,60,0.15))",
                    color: "rgb(82,183,136)",
                    border: "1px solid rgba(82,183,136,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "rgba(235,229,210,0.5)" }}
                  >
                    {item.label}
                  </h4>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgb(82,183,136)" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "rgba(235,229,210,0.8)" }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(82,183,136,0.15)" }}
          >
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82683.5211465832!2d1.0376715!3d49.4404591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e0de0a5fb2b081%3A0x40c14484fbcca2f!2sRouen!5e0!3m2!1sen!2sfr!4v1699112034517!5m2!1sen!2sfr"
              width="100%"
              height="360"
              style={{
                border: 0,
                display: "block",
                filter: "invert(90%) hue-rotate(180deg) saturate(0.6)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
