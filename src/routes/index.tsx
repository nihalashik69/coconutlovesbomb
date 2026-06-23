import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Hadiya 🌷" },
      { name: "description", content: "A handmade little birthday letter for Hadiya." },
    ],
  }),
  component: BirthdayExperience,
});

/* =========================================================
   Drop your 6 photos and 1 music file into the /public folder
   ========================================================= */
const GALLERY: { src: string; caption: string }[] = [
  { src: "/photo1.jpg", caption: "Inshallah i get to look at u all my life🌷" },
  { src: "/photo2.jpg", caption: "my bombb" },
  { src: "/photo3.jpg", caption: "my ellaam ellaam" },
  { src: "/photo4.jpg", caption: "my treasure" },
  { src: "/photo5.jpg", caption: "forever yours" },
  { src: "/photo6.jpg", caption: "🥥💗💣" },
];

// Your music file goes here
const AUDIO_SRC = "/music.mp3";

type Scene = "seed" | "messages" | "bomb" | "gallery" | "stars";

function BirthdayExperience() {
  const [scene, setScene] = useState<Scene>("seed");
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {scene === "seed" && <SeedScene key="seed" onDone={() => setScene("messages")} />}
        {scene === "messages" && <MessagesScene key="msg" onDone={() => setScene("bomb")} />}
        {scene === "bomb" && <BombScene key="bomb" onDone={() => setScene("gallery")} />}
        {scene === "gallery" && <GalleryScene key="gal" onDone={() => setScene("stars")} />}
        {scene === "stars" && <StarsScene key="stars" />}
      </AnimatePresence>
      <MusicButton />
      <TulipCorner />
    </div>
  );
}

/* ---------- Persistent UI ---------- */

function MusicButton() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const a = new Audio(AUDIO_SRC);
    a.loop = true;
    a.volume = 0.5;
    ref.current = a;
    return () => { a.pause(); ref.current = null; };
  }, []);
  const toggle = () => {
    const a = ref.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-3 right-3 z-50 grid h-11 w-11 place-items-center rounded-full bg-white/70 backdrop-blur-md shadow-md ring-1 ring-black/5 transition hover:scale-105 active:scale-95"
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3d3530"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#3d3530"><path d="M7 5v14l12-7z"/></svg>
      )}
    </button>
  );
}

function TulipCorner() {
  return (
    <div className="fixed bottom-3 right-3 z-50 pointer-events-none">
      <TulipSVG size={28} />
    </div>
  );
}

function TulipSVG({ size = 80, bloom = 1 }: { size?: number; bloom?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" fill="none">
      <motion.path
        d="M50 130 Q50 90 50 70"
        stroke="#7ba87a" strokeWidth="3.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: bloom }} transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path
        d="M50 100 Q30 85 25 100 Q35 105 50 100"
        fill="#7ba87a"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: bloom, opacity: bloom }}
        style={{ transformOrigin: "50px 100px" }} transition={{ duration: 0.6, delay: 1 }}
      />
      <motion.path
        d="M50 110 Q70 95 75 110 Q65 115 50 110"
        fill="#7ba87a"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: bloom, opacity: bloom }}
        style={{ transformOrigin: "50px 110px" }} transition={{ duration: 0.6, delay: 1.2 }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0, y: 10 }}
        animate={{ scale: bloom, opacity: bloom, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 80 }}
        style={{ transformOrigin: "50px 65px" }}
      >
        <path d="M35 65 Q35 40 50 35 Q65 40 65 65 Q60 72 50 72 Q40 72 35 65 Z" fill="#e8728c"/>
        <path d="M40 62 Q40 42 50 38 Q50 55 50 70 Q44 70 40 62 Z" fill="#d85a78"/>
        <path d="M60 62 Q60 42 50 38 Q50 55 50 70 Q56 70 60 62 Z" fill="#f088a0"/>
      </motion.g>
    </svg>
  );
}

/* ---------- Scene 1: Seed ---------- */

function SeedScene({ onDone }: { onDone: () => void }) {
  const [tapped, setTapped] = useState(false);
  useEffect(() => {
    if (!tapped) return;
    const t = setTimeout(onDone, 7500);
    return () => clearTimeout(t);
  }, [tapped, onDone]);

  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6"
      style={{ background: "#f2ede2" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Particles />
      <div className="relative flex flex-col items-center text-center">
        {!tapped ? (
          <motion.button
            onClick={() => setTapped(true)}
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="grid h-20 w-20 place-items-center rounded-full"
            >
              <svg width="46" height="46" viewBox="0 0 60 60">
                <ellipse cx="30" cy="32" rx="14" ry="18" fill="#6b4f3a"/>
                <ellipse cx="26" cy="26" rx="3" ry="5" fill="#8a6b53" opacity="0.6"/>
              </svg>
            </motion.div>
            <p className="font-hand text-3xl text-[#3d3530]">Tap me 🌷</p>
          </motion.button>
        ) : (
          <div className="flex flex-col items-center">
            <TulipSVG size={170} bloom={1} />
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1.2 }}
              className="mt-6 max-w-xs font-hand text-2xl leading-snug text-[#3d3530] sm:text-3xl"
            >
              For the girl who makes my karall bloooom like a beautiful tulip
            </motion.p>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function Particles() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 0.4) % 6;
        const size = 4 + (i % 4);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#e8728c]/40"
            style={{ left: `${left}%`, top: "100%", width: size, height: size }}
            animate={{ y: ["0vh", "-110vh"], opacity: [0, 1, 0] }}
            transition={{ duration: 10 + (i % 5), repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Scene 2: Messages ---------- */

const MESSAGES = [
  "You entered my life asking for ende kidneyy....",
  "(kinda wierd cuz i was already ready to give u my karal from the day onee😛)",
  "my super",
  "my adipoliest",
  "my extremely smart",
  "and diabolically crazzyy aaaya Haaadiyaaaaaaa",
  "im soooo soooooooo deeply in love with uuuu muthhee",
  "(soooo in love that i want to pootal myself in a cage with u and throw us in a deeeeep lake so no one can separate myself from you)",
  "im exaccctly where i want to be rn (#obsessed #obsessessionnn #illnevergiveuspace)",
  "myyyy onee and onlyyy.... myyy ellaaam ellaaaammmm",
  "myyyy HAAAAAADIIYAAAAAAA 💗💗💗💣💣💣",
];

function MessagesScene({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const next = () => {
    if (i >= MESSAGES.length - 1) onDone();
    else setI(i + 1);
  };
  return (
    <motion.section
      onClick={next}
      className="relative flex min-h-[100dvh] w-full cursor-pointer items-center justify-center px-6"
      style={{ background: "#f2ede2" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <Particles />
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-hand max-w-[22ch] text-center text-3xl leading-snug text-[#3d3530] sm:max-w-[28ch] sm:text-4xl md:text-5xl"
        >
          {MESSAGES[i]}
        </motion.p>
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 2 }}
        className="absolute bottom-10 text-xs text-[#6b5d54]"
      >
        tap anywhere ✨
      </motion.p>
    </motion.section>
  );
}

/* ---------- Transition: Bomb ---------- */

function BombScene({ onDone }: { onDone: () => void }) {
  const [exploded, setExploded] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setExploded(true), 2200);
    const t2 = setTimeout(onDone, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6"
      style={{ background: "#f2ede2" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {!exploded && (
            <motion.div
              key="bomb"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.1, 1], rotate: [-20, 6, -3, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <svg width="160" height="180" viewBox="0 0 160 180">
                <motion.g animate={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 0.4, repeat: Infinity }} style={{ transformOrigin: "80px 110px" }}>
                  <circle cx="80" cy="110" r="55" fill="#2b2b2b"/>
                  <ellipse cx="62" cy="92" rx="12" ry="8" fill="#4a4a4a" opacity="0.7"/>
                  <rect x="74" y="48" width="12" height="14" rx="2" fill="#3d3530"/>
                  <path d="M80 48 Q70 30 85 18 Q75 28 95 12" stroke="#8a6b53" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </motion.g>
                <motion.circle
                  cx="95" cy="14" r="6" fill="#ffb84d"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
                <motion.circle
                  cx="95" cy="14" r="10" fill="#ff6a3d" opacity="0.5"
                  animate={{ scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </svg>
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-hand mt-3 text-center text-2xl text-[#3d3530]"
              >
                Bombbbb was here 💣
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {exploded && (
          <>
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, #ffd28a 0%, #f4a8b8 50%, transparent 70%)" }}
            />
            <Confetti />
          </>
        )}
      </div>
    </motion.section>
  );
}

function Confetti() {
  const bits = Array.from({ length: 40 });
  const colors = ["#e8728c", "#f4a8b8", "#7ba87a", "#ffd28a", "#3d3530"];
  return (
    <div className="pointer-events-none absolute inset-0">
      {bits.map((_, i) => {
        const angle = (i / bits.length) * Math.PI * 2;
        const dist = 120 + (i % 5) * 40;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const isPetal = i % 3 === 0;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ x, y: y + 200, opacity: 0, rotate: 360 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              width: isPetal ? 12 : 6,
              height: isPetal ? 16 : 6,
              borderRadius: isPetal ? "50% 50% 50% 50% / 60% 60% 40% 40%" : 2,
              background: colors[i % colors.length],
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Scene 3: Gallery ---------- */

function GalleryScene({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full flex-col items-center px-5 pb-24 pt-14"
      style={{ background: "#f2ede2" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="font-hand mb-10 max-w-[20ch] text-center text-4xl leading-tight text-[#3d3530] sm:text-5xl"
      >
        My Favorite Memories With Yooouuuuuu
      </motion.h2>

      <div className="grid w-full max-w-md grid-cols-2 gap-5 sm:max-w-2xl sm:grid-cols-3">
        {GALLERY.map((p, i) => {
          const tilt = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));
          const offset = i % 3 === 0 ? "mt-6" : i % 3 === 1 ? "mt-0" : "mt-10";
          return (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: tilt }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              className={`${offset} float-slow group relative block bg-white p-2 pb-8 shadow-[0_8px_24px_rgba(61,53,48,0.15)] ring-1 ring-black/5`}
              style={{ ["--tilt" as string]: `${tilt}deg` }}
            >
              <div className="aspect-square w-full overflow-hidden bg-[#e8e0cc]">
                <img src={p.src} alt={p.caption} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <span className="font-hand absolute bottom-1 left-0 right-0 text-center text-base text-[#6b5d54]">
                {p.caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        onClick={onDone}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
        className="font-hand mt-14 rounded-full bg-[#3d3530] px-8 py-3 text-lg text-[#f2ede2] shadow-md transition hover:scale-105 active:scale-95"
      >
        keep going, my love ✨
      </motion.button>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white p-3 pb-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={GALLERY[open].src} alt="" className="max-h-[70vh] max-w-[80vw] object-contain" />
              <p className="font-hand mt-3 text-center text-2xl text-[#6b5d54]">{GALLERY[open].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ---------- Final Scene: Stars ---------- */

const FINAL_MESSAGES = [
  "Happppyyyyy Happppppppyyyyy Happiesssttt Birthhhdayyyyyyy My Loveeeeeee, Endeeee swannddaaammm Haaaadiyaaaaaa <3<3<3",
  "From day oneeee to untill foreverrr",
  "🥥💗💣",
];

function StarsScene() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= FINAL_MESSAGES.length - 1) return;
    const t = setTimeout(() => setI(i + 1), 4500);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <motion.section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden px-6 py-16"
      style={{ background: "linear-gradient(180deg, #0a0e2a 0%, #1a1f4a 60%, #2d1b3d 100%)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
    >
      <Stars />
      <ShootingStars />
      <DriftingPetals />

      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 1.4 }}
            className="font-hand max-w-[22ch] text-center text-3xl leading-snug text-[#f5ead2] drop-shadow-[0_2px_12px_rgba(255,200,150,0.3)] sm:max-w-[30ch] sm:text-4xl md:text-5xl"
          >
            {FINAL_MESSAGES[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      <Silhouette />
    </motion.section>
  );
}

function Stars() {
  const stars = Array.from({ length: 80 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 71) % 85;
        const size = 1 + (i % 3);
        const dur = 2 + (i % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${left}%`, top: `${top}%`,
              width: size, height: size,
              animation: `twinkle ${dur}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function ShootingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[120px] rounded-full bg-gradient-to-r from-transparent via-white to-white"
          style={{
            top: `${10 + i * 15}%`,
            right: "-150px",
            animation: `shoot 4s ease-in ${i * 5 + 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function DriftingPetals() {
  const petals = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 67) % 100;
        const dur = 12 + (i % 6);
        const delay = (i * 1.3) % 10;
        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: "-5%",
              width: 10, height: 14,
              background: "#f4a8b8",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.7,
              animation: `drift ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Silhouette() {
  return (
    <div className="relative z-10 w-full max-w-md">
      <svg viewBox="0 0 400 160" className="w-full">
        {/* ground */}
        <path d="M0 150 Q200 130 400 150 L400 160 L0 160 Z" fill="#0a0a1a"/>
        {/* girl */}
        <g fill="#0a0a1a">
          <circle cx="170" cy="90" r="14"/>
          <path d="M170 100 Q150 110 145 145 L195 145 Q190 110 170 100 Z"/>
          <path d="M156 100 Q140 120 138 145 L150 145 Q150 120 160 105 Z"/>
        </g>
        {/* boy */}
        <g fill="#0a0a1a">
          <circle cx="215" cy="85" r="15"/>
          <path d="M215 96 Q195 108 192 145 L242 145 Q238 108 215 96 Z"/>
          <path d="M200 105 Q188 118 184 130 Q188 132 195 122 Z"/>
        </g>
        {/* connection - head leaning */}
        <path d="M183 92 Q192 87 200 90" stroke="#0a0a1a" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );
}
