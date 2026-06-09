import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { MenuIcon, X, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../contexts/TranslationProvider";

const Navbar = () => {
  const { dictionary } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
          if (rect.top <= 100 && rect.bottom >= 100) currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") navigate("/", { state: { scrollTo: id } });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { name: dictionary.nav.home, path: "/", internal: false },
    { name: dictionary.nav.projects, path: "/projects", internal: false },
    { name: dictionary.nav.services, path: "services", internal: true },
    { name: dictionary.nav.testimonials, path: "testimonials", internal: true },
    { name: dictionary.nav.contact, path: "contact", internal: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-5 left-4 right-4 z-50 transition-all duration-300"
    >
      <div
        className="max-w-7xl mx-auto rounded-2xl backdrop-blur-md border shadow-lg px-6 py-4 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(13, 31, 18, 0.85)"
            : "rgba(240, 234, 214, 0.75)",
          borderColor: scrolled ? "rgba(82,183,136,0.3)" : "rgba(45,106,79,0.25)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(13,31,18,0.4)"
            : "0 4px 24px rgba(45,106,79,0.1)",
        }}
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
            <span style={{ color: scrolled ? "rgb(82,183,136)" : "rgb(45,106,79)" }}>Tom</span>
            <span style={{ color: scrolled ? "rgb(82,183,136)" : "rgb(45,106,79)" }}>Lemelle</span>
            <span className="relative ml-1">
              <Leaf
                size={14}
                className="absolute top-[-5px] -left-1 transition-transform duration-500 ease-in-out group-hover:rotate-[30deg]"
                style={{ color: scrolled ? "rgb(82,183,136)" : "rgb(45,106,79)" }}
              />
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isRouteActive = location.pathname === link.path;
              const isSectionActive = link.internal && location.pathname === "/" && activeSection === link.path;
              const isActive = isRouteActive || isSectionActive;
              const textColor = scrolled
                ? isActive ? "rgb(82,183,136)" : "rgba(255,255,255,0.8)"
                : isActive ? "rgb(45,106,79)" : "rgb(28,43,30)";

              return link.internal ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path)}
                  className="relative px-2 py-1 text-sm font-medium transition-all"
                  style={{ color: textColor }}
                >
                  {link.name}
                  <span
                    className="absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? "100%" : "0%",
                      opacity: isActive ? 1 : 0,
                      background: "rgb(82,183,136)",
                    }}
                  />
                </button>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  className="relative px-2 py-1 text-sm font-medium transition-all"
                  style={{ color: textColor }}
                >
                  {({ isActive: navActive }) => (
                    <>
                      {link.name}
                      <span
                        className="absolute left-0 -bottom-0.5 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          width: navActive ? "100%" : "0%",
                          opacity: navActive ? 1 : 0,
                          background: "rgb(82,183,136)",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full backdrop-blur-md border transition-colors"
            style={{
              background: "rgba(45,106,79,0.15)",
              borderColor: "rgba(45,106,79,0.3)",
              color: scrolled ? "white" : "rgb(28,43,30)",
            }}
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </motion.button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-2 mx-4 p-4 rounded-xl backdrop-blur-md border"
          style={{ background: "rgba(13,31,18,0.9)", borderColor: "rgba(82,183,136,0.25)" }}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.internal && activeSection === link.path);
              return link.internal ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.path)}
                  className="px-4 py-2 text-center rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: isActive ? "rgb(82,183,136)" : "rgba(255,255,255,0.8)",
                    background: isActive ? "rgba(82,183,136,0.15)" : "transparent",
                  }}
                >
                  {link.name}
                </button>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center rounded-xl text-sm font-medium transition-all"
                  style={({ isActive: a }) => ({
                    color: a ? "rgb(82,183,136)" : "rgba(255,255,255,0.8)",
                    background: a ? "rgba(82,183,136,0.15)" : "transparent",
                  })}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
