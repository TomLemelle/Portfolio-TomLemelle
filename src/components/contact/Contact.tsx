import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "../../contexts/TranslationProvider";

const Contact = () => {
  const { dictionary } = useTranslation();

  return (
    <section
      id="contact"
      className="section px-4 md:px-8 bg-gradient-to-br from-primary/5 to-secondary/5"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{dictionary.home.contact.heading}</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            {dictionary.home.contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 h-full">
            <h3 className="text-2xl font-semibold mb-6">
              {dictionary.home.contact.title}
            </h3>

            <div className="flex justify-start items-center gap-8">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {dictionary.home.contact.location}
                  </h4>
                  <p className="opacity-80">Rouen, France</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {dictionary.home.contact.email}
                  </h4>
                  <a
                    href="mailto:hello@tomlemelle.com"
                    className="opacity-80 hover:text-primary transition-colors"
                  >
                    hello@tomlemelle.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {dictionary.home.contact.phone}
                  </h4>
                  <a
                    href="tel:+33612345678"
                    className="opacity-80 hover:text-primary transition-colors"
                  >
                    +33 6 12 34 56 78
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82683.5211465832!2d1.0376715!3d49.4404591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e0de0a5fb2b081%3A0x40c14484fbcca2f!2sRouen!5e0!3m2!1sen!2sfr!4v1699112034517!5m2!1sen!2sfr"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
