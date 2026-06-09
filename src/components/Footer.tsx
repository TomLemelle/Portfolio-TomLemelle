import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "./hero/SocialLinks";
import { useTranslation } from "../contexts/TranslationProvider";
import { motion } from "framer-motion";

const Footer = () => {
  const { dictionary } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "rgb(8,14,10)", borderTop: "1px solid rgba(82,183,136,0.12)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold gradient-text-forest">Tom Lemelle</span>
              <Leaf size={14} style={{ color: "rgb(82,183,136)" }} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(235,229,210,0.45)" }}>
              {dictionary.home.footer.slogan}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "rgb(82,183,136)" }}>
              {dictionary.home.footer.quickLinks.heading}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: dictionary.home.footer.quickLinks.home, to: "/" },
                { label: dictionary.home.footer.quickLinks.projects, to: "/projects" },
                { label: dictionary.home.footer.quickLinks.services, to: "/#services" },
                { label: dictionary.home.footer.quickLinks.testimonials, to: "/#testimonials" },
                { label: dictionary.home.footer.quickLinks.contact, to: "/#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="flex items-center gap-2 transition-colors group"
                    style={{ color: "rgba(235,229,210,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgb(82,183,136)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(235,229,210,0.5)")}
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "rgba(82,183,136,0.5)" }}
                      whileHover={{ scale: 2 }}
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "rgb(180,140,50)" }}>
              {dictionary.home.footer.contact.heading}
            </h4>
            <p className="text-sm mb-1" style={{ color: "rgba(235,229,210,0.5)" }}>Rouen, France</p>
            <p className="text-sm mb-5" style={{ color: "rgba(235,229,210,0.5)" }}>tom.lemelle@gmail.com</p>
            <SocialLinks dark />
          </div>
        </div>

        <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid rgba(82,183,136,0.1)" }}>
          <p className="text-xs" style={{ color: "rgba(235,229,210,0.3)" }}>
            &copy; {currentYear} Tom Lemelle. {dictionary.home.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
