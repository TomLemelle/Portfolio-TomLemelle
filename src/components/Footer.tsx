import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "./hero/SocialLinks";
import { useTranslation } from "../contexts/TranslationProvider";

const Footer = () => {
  const { dictionary } = useTranslation();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 relative">
              <span className="text-primary">Tom</span>{" "}
              <span className="text-primary">Lemelle</span>
              <span className="logo-container relative group ml-2">
                <Settings
                  size={15}
                  className="tom-settings-icon text-black absolute top-[10px] -left-1 transition-transform duration-400 ease-in-out group-hover:rotate-[360deg]"
                />
              </span>
            </h3>
            <p className="mb-4 opacity-80">{dictionary.home.footer.slogan}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {dictionary.home.footer.quickLinks.heading}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  {dictionary.home.footer.quickLinks.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-primary transition-colors"
                >
                  {dictionary.home.footer.quickLinks.projects}
                </Link>
              </li>
              <li>
                <Link
                  to="/#services"
                  className="hover:text-primary transition-colors"
                >
                  {dictionary.home.footer.quickLinks.services}
                </Link>
              </li>
              <li>
                <Link
                  to="/#testimonials"
                  className="hover:text-primary transition-colors"
                >
                  {dictionary.home.footer.quickLinks.testimonials}
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="hover:text-primary transition-colors"
                >
                  {dictionary.home.footer.quickLinks.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              {dictionary.home.footer.contact.heading}
            </h4>
            <p className="mb-2">Rouen, France</p>
            <p className="mb-4">tom.lemelle@gmail.com</p>

            <div className="mt-4">
              <SocialLinks className="space-x-4 mt-4" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p>
            &copy; {currentYear} Tom Lemelle. {dictionary.home.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
