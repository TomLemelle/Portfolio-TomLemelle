import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import LanguageSwitcher from "./Translation/LanguageSwitcher";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsLoading(true);
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => setIsLoading(false), 2800);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "rgb(13,24,16)" }}>

      {/* ── Persistent animated forest background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Deep forest base gradient */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(18,58,26,0.6) 0%, transparent 70%)" }} />

        {/* Organic blob 1 — moss */}
        <motion.div
          className="absolute blob"
          style={{ width: 600, height: 600, top: "10%", left: "-10%", background: "rgba(45,106,60,0.12)", filter: "blur(80px)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Organic blob 2 — bark */}
        <motion.div
          className="absolute blob-slow"
          style={{ width: 500, height: 500, bottom: "20%", right: "-8%", background: "rgba(100,55,15,0.1)", filter: "blur(80px)" }}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Organic blob 3 — accent */}
        <motion.div
          className="absolute blob"
          style={{ width: 350, height: 350, top: "50%", left: "40%", background: "rgba(60,140,90,0.07)", filter: "blur(60px)" }}
          animate={{ x: [0, 20, -20, 0], y: [0, -30, 10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fine grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(82,183,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(82,183,136,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>

      {/* ── Loader ── */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ zIndex: 9999, background: "rgb(8,16,10)" }}
          exit={{ opacity: 0 }}
        >
          {/* Leaf spin */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-24 h-24 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
            transition={{ scale: { duration: 0.5 }, rotate: { duration: 2, repeat: Infinity, ease: "linear" } }}
          >
            <path
              d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10 Z"
              fill="none"
              stroke="rgb(82,183,136)"
              strokeWidth="2"
            />
            <path d="M50 10 C50 50, 50 50, 50 90" stroke="rgba(82,183,136,0.4)" strokeWidth="1" fill="none" />
            <path d="M20 35 C50 50, 50 50, 80 65" stroke="rgba(82,183,136,0.3)" strokeWidth="1" fill="none" />
            <path d="M20 65 C50 50, 50 50, 80 35" stroke="rgba(82,183,136,0.3)" strokeWidth="1" fill="none" />
          </motion.svg>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ color: "rgb(235,229,210)" }}
          >
            Tom <span style={{ color: "rgb(82,183,136)" }}>Lemelle</span>
          </motion.h1>

          <motion.p
            className="mt-2 text-sm tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ color: "rgba(235,229,210,0.5)" }}
          >
            Developer & Photographer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{ background: "rgb(82,183,136)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {!isLoading && (
        <div className="flex flex-col min-h-screen relative" style={{ zIndex: 1 }}>
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
