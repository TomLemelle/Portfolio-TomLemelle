import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import LanguageSwitcher from "./Translation/LanguageSwitcher";

const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-32 h-32 md:w-48 md:h-48"
  >
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.007 7.007 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 14.5 2h-5a.5.5 0 0 0-.5.42l-.36 2.54c-.6.24-1.15.56-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.53a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.48.38 1.03.7 1.63.94l.36 2.54c.04.24.25.42.5.42h5c.25 0 .46-.18.5-.42l.36-2.54c.6-.24 1.15-.56 1.63-.94l2.39.96c.23.09.5 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsLoading(true);
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-secondary overflow-hidden">
          {/* Text behind the gear */}
          <div className="absolute text-white text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Tom Lemelle
            </h1>
            <p className="text-lg md:text-xl mt-2">
              Developer & Photographer
            </p>
          </div>

          {/* Overlay mask that reveals text */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary to-secondary z-20"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Gear icon */}
          <motion.div
            className="absolute z-30"
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            >
              <GearIcon />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Main content - hidden during loading */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <LanguageSwitcher />
          <main className="flex-grow overflow-visible">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
