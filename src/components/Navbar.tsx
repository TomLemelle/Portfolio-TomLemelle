import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, X, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../contexts/TranslationProvider";

const Navbar = () => {
  const { dictionary } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["services", "testimonials", "contact"];
      let currentSection = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = `#${id}`;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: dictionary.nav.home, path: "/" },
    { name: dictionary.nav.projects, path: "/projects" },
    { name: dictionary.nav.services, path: "/#services" },
    { name: dictionary.nav.testimonials, path: "/#testimonials" },
    { name: dictionary.nav.contact, path: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-5 left-4 right-4 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto rounded-2xl glass backdrop-blur-md border border-white/20 shadow-lg px-6 py-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2 group"
          >
            <span className="text-primary">Tom</span>
            <span className="text-primary">Lemelle</span>
            <span className="logo-container relative group">
              <Settings
                size={15}
                className="tom-settings-icon text-black absolute top-[-6px] -left-1 transition-transform duration-400 ease-in-out group-hover:rotate-[360deg]"
              />
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = link.path.startsWith("#")
                ? activeSection === link.path
                : window.location.pathname === link.path;

              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`relative px-2 py-1 text-sm font-medium transition-all hover:text-primary ${
                    isActive ? "text-primary" : "text-text-dark"
                  }`}
                >
                  {link.name}

                  {/* Barre verte animée */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden p-2 glass rounded-full"
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-2 mx-4 p-4 glass-dark rounded-xl"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = link.path.startsWith("#")
                ? activeSection === link.path
                : window.location.pathname === link.path;

              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-text-light text-center rounded-md transition-all ${
                    isActive ? "bg-primary/30" : "hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
