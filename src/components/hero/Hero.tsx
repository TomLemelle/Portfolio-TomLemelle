import { useState, useRef, useEffect, MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroImage from "./HeroImage";
import SocialLinks from "./SocialLinks";
import { useTranslation } from "../../contexts/TranslationProvider";

// ── Canvas particles ──────────────────────────────────────
const COLORS = [
  "rgba(82,183,136,0.8)",
  "rgba(45,106,60,0.6)",
  "rgba(180,140,50,0.5)",
  "rgba(140,210,160,0.4)",
];

const Particles = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; ci: number }[]>([]);
  const animRef = useRef<number>();
  const mRef = useRef({ x: mouseX, y: mouseY });

  useEffect(() => { mRef.current = { x: mouseX, y: mouseY }; }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    pRef.current = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 0.5,
      ci: Math.floor(Math.random() * COLORS.length),
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mRef.current;
      pRef.current.forEach((p) => {
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200 && d > 0) { const f = ((200 - d) / 200) * 0.8; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[p.ci];
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animRef.current!); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// ── 3D Tilt card ──────────────────────────────────────
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const [rx, setRx] = useState(0), [ry, setRy] = useState(0);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRx(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -10);
    setRy(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => { setRx(0); setRy(0); }}
      animate={{ rotateX: rx, rotateY: ry }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

// ── Typing effect ──────────────────────────────────────
const Typing = ({ texts }: { texts: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const t = texts[idx];
    const id = setTimeout(
      () => {
        if (!del) {
          if (text.length < t.length) setText(t.slice(0, text.length + 1));
          else setTimeout(() => setDel(true), 2000);
        } else {
          if (text.length > 0) setText(text.slice(0, -1));
          else { setDel(false); setIdx((p) => (p + 1) % texts.length); }
        }
      },
      del ? 45 : 95
    );
    return () => clearTimeout(id);
  }, [text, del, idx, texts]);
  return (
    <span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block w-0.5 h-7 bg-current align-middle"
      />
    </span>
  );
};

// ── Scroll-linked text reveal ──────────────────────────────────────
const reveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── HERO ──────────────────────────────────────
const Hero: React.FC = () => {
  const { dictionary } = useTranslation();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const color = useMotionValue("rgb(45,106,60)");

  // Animated gradient color
  useEffect(() => {
    animate(color, ["rgb(45,106,60)", "rgb(82,183,136)", "rgb(100,55,15)", "rgb(45,106,60)"], {
      ease: "easeInOut", duration: 14, repeat: Infinity, repeatType: "mirror",
    });
  }, [color]);

  const bgImage = useMotionTemplate`radial-gradient(ellipse 90% 70% at 65% 45%, ${color}50, transparent 70%)`;

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="relative min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center mt-16 lg:mt-0 overflow-hidden"
      style={{ backgroundImage: bgImage }}
    >
      {/* Absolute dark base */}
      <div className="absolute inset-0 -z-10" style={{ background: "rgb(8,14,10)" }} />

      <Particles mouseX={mouse.x} mouseY={mouse.y} />

      {/* Vertical vein lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <path d="M0 300 Q 200 200 400 350 T 800 300 T 1200 320 T 1600 300" stroke="rgb(82,183,136)" strokeWidth="1.5" fill="none" />
        <path d="M0 500 Q 300 400 600 520 T 1200 480 T 1600 500" stroke="rgb(82,183,136)" strokeWidth="1" fill="none" />
        <path d="M300 0 Q 280 200 320 400 T 300 800" stroke="rgb(82,183,136)" strokeWidth="1" fill="none" />
        <path d="M900 0 Q 920 300 880 600 T 900 900" stroke="rgb(180,140,50)" strokeWidth="1" fill="none" />
      </svg>

      {/* Content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left ── */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div custom={0} variants={reveal} initial="hidden" animate="visible">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: "rgba(82,183,136,0.12)", border: "1px solid rgba(82,183,136,0.3)" }}>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "rgb(82,183,136)" }}
                />
                <span className="text-sm" style={{ color: "rgba(235,229,210,0.7)" }}>Disponible pour vos projets</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div custom={1} variants={reveal} initial="hidden" animate="visible">
              <h1 className="font-extrabold tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
                <span style={{ color: "rgba(235,229,210,0.9)" }}>{dictionary.home.hero.heading} </span>
                <span className="gradient-text-forest">Tom Lemelle</span>
              </h1>
            </motion.div>

            {/* Typing subtitle */}
            <motion.div custom={2} variants={reveal} initial="hidden" animate="visible">
              <h2 className="font-semibold" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "rgb(82,183,136)" }}>
                <Typing texts={[dictionary.home.hero.firstSubHeading, dictionary.home.hero.secondSubHeading]} />
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div custom={3} variants={reveal} initial="hidden" animate="visible">
              <p className="text-lg max-w-lg leading-relaxed" style={{ color: "rgba(235,229,210,0.55)" }}>
                {dictionary.home.hero.description}
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div custom={4} variants={reveal} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                {dictionary.home.hero.primaryButton}
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline"
              >
                {dictionary.home.hero.secondaryButton}
              </motion.a>
            </motion.div>

            {/* Social */}
            <motion.div custom={5} variants={reveal} initial="hidden" animate="visible">
              <SocialLinks className="mt-1" dark />
            </motion.div>
          </div>

          {/* ── Right: image ── */}
          <motion.div
            custom={6}
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end relative"
          >
            <TiltCard>
              <HeroImage />
            </TiltCard>

            {/* Stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-4"
              style={{ background: "rgba(8,14,10,0.85)", border: "1px solid rgba(82,183,136,0.25)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-2xl font-bold" style={{ color: "rgb(235,229,210)" }}>+50</div>
              <div className="text-xs" style={{ color: "rgb(82,183,136)" }}>Projets livrés</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="absolute -top-4 -right-4 rounded-2xl px-5 py-4"
              style={{ background: "rgba(8,14,10,0.85)", border: "1px solid rgba(180,140,50,0.3)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-2xl font-bold" style={{ color: "rgb(235,229,210)" }}>3+</div>
              <div className="text-xs" style={{ color: "rgb(180,140,50)" }}>Années exp.</div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, rgb(13,24,16), transparent)" }} />
    </motion.section>
  );
};

export default Hero;
