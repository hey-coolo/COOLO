import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. CINEMATIC REVEAL LOADER (Center Cut-Out) ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: 1.6 }} // Fade out container at very end
            onAnimationComplete={onComplete}
        >
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="logo-mask">
                        {/* Solid White Background (Visible) */}
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        
                        {/* Black Shapes (The Holes) */}
                        {/* We group them and scale the GROUP from the center (50 50) */}
                        <motion.g
                            initial={{ scale: 1 }}
                            animate={{ scale: 80 }} // Massive scale to clear screen
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        >
                            {/* The "II" Logo Shapes centered roughly in the 100x100 viewbox */}
                            <rect x="38" y="30" width="8" height="40" rx="4" fill="black" />
                            <rect x="54" y="30" width="8" height="40" rx="4" fill="black" />
                        </motion.g>
                    </mask>
                </defs>

                {/* The Overlay Layer */}
                <rect 
                    x="0" y="0" width="100%" height="100%" 
                    fill="#F7F7F7" 
                    mask="url(#logo-mask)" 
                />
            </svg>
        </motion.div>
    );
};

// --- 2. CINEMATIC IMAGE COMPONENT (Parallax + Scale) ---
// No cheap grayscale hovers. This uses a subtle vertical parallax 
// AND a slow zoom-out effect as you scroll past.
const CinematicImage: React.FC<{ src: string; className?: string; priority?: boolean }> = ({ src, className, priority = false }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Parallax movement (moves slightly faster/slower than scroll)
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
    // Subtle scale breathing (starts zoomed in, settles out)
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

    return (
        <div ref={ref} className={`overflow-hidden relative bg-brand-navy/5 ${className}`}>
            <motion.div style={{ y, scale }} className="w-full h-full origin-center">
                <img 
                    src={src} 
                    className="w-full h-full object-cover transition-opacity duration-700" 
                    alt="" 
                    loading={priority ? "eager" : "lazy"}
                />
            </motion.div>
        </div>
    );
};

// --- 3. STICKY SCROLL SECTION (Editorial Layout) ---
const StickyScrollSection: React.FC<{ 
    title: string; 
    text: string; 
    images: string[]; 
    align?: 'left' | 'right' 
}> = ({ title, text, images, align = 'left' }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="container mx-auto px-6 md:px-8 py-24 relative">
            <div className={`flex flex-col md:flex-row gap-16 md:gap-32 relative ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* STICKY TEXT COLUMN */}
                <div className="md:w-1/3">
                    <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center py-24 md:py-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-8 block border-l-2 border-brand-purple pl-4">
                                {title}
                            </span>
                            <p className="font-body text-xl md:text-3xl leading-tight font-light text-brand-navy">
                                {text}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* SCROLLING IMAGE STREAM (Varied Grid) */}
                <div className="md:w-2/3 flex flex-col gap-16 py-12 md:py-32">
                    {images.map((img, i) => {
                        // Layout Logic:
                        // Image 0: Full Width
                        // Image 1 & 2: Half Width (Side by Side)
                        // Image 3: Full Width...
                        
                        // We wrap index 1 & 2 in a grid row? 
                        // To keep it simple but visually varied, let's alternate Aspect Ratios.
                        const isPortrait = i % 2 !== 0; 
                        
                        return (
                            <CinematicImage 
                                key={i} 
                                src={img} 
                                className={`w-full shadow-2xl ${isPortrait ? 'aspect-[4/5] md:w-3/4 md:self-end' : 'aspect-video md:w-full md:self-start'}`} 
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // Slower parallax for bg
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-brand-navy">
            {/* Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                {/* Gradient Mesh Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/90" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
                        Case Study {project.id.toString().padStart(2, '0')}
                    </span>
                    <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-overlay opacity-90">
                        {project.title}
                    </h1>
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-3 max-w-2xl mx-auto border-t border-brand-offwhite/30 pt-8 gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-offwhite/80">
                        <div>
                            <span className="block text-brand-purple font-bold mb-2">Client</span>
                            {project.client}
                        </div>
                        <div>
                            <span className="block text-brand-purple font-bold mb-2">Role</span>
                            {project.role}
                        </div>
                        <div>
                            <span className="block text-brand-purple font-bold mb-2">Year</span>
                            {project.year}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ProcessGallery: React.FC<{ images: string[] }> = ({ images }) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="py-32 bg-brand-navy text-brand-offwhite relative z-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24 border-b border-brand-offwhite/10 pb-8 flex flex-col md:flex-row justify-between md:items-end gap-8">
                    <h3 className="font-sans text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                        The<br/><span className="text-brand-purple">Mess.</span>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50 text-right">
                        Raw Output // <br/>Archive 01-{images.length}
                    </span>
                </div>
                
                {/* Masonry-ish Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid overflow-hidden"
                        >
                            <img src={img} className="w-full h-auto object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700" alt="" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-screen overflow-hidden group bg-brand-navy z-20">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000 ease-out">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4 block text-brand-yellow">Next Case File</span>
                <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-1000 ease-[0.19,1,0.22,1]">
                    {project.title}
                </h2>
                <div className="mt-12 overflow-hidden">
                    <span className="inline-block font-mono text-sm uppercase tracking-widest border-b border-brand-yellow pb-1 text-brand-yellow transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        Open Dossier
                    </span>
                </div>
            </motion.div>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isRevealing, setIsRevealing] = useState(true); 
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  // Scroll reset & Reveal trigger
  useEffect(() => {
      window.scrollTo(0, 0);
      setIsRevealing(true);
  }, [slug]);

  if (currentIndex === -1) return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy text-brand-offwhite">
          <h1 className="text-4xl font-mono uppercase">Case File Missing</h1>
      </div>
  );
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  const { goal, gap, gamble, gain, processImages } = project.story || {
      goal: project.description,
      gap: "",
      gamble: "",
      gain: "",
      processImages: []
  };

  // --- IMAGE LOGIC ---
  const details = project.detailImages || [];
  // Logic: 
  // Goal: Needs strong intro visuals (2 images)
  // Gap: Needs visuals (2 images or fallback to hero)
  // Gamble: Takes the rest.
  const goalImages = details.slice(0, 2); 
  const gapImages = details.slice(2, 4).length > 0 ? details.slice(2, 4) : [project.imageUrl];
  const gambleImages = details.slice(4);

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        
        {/* Full Screen Hero with Parallax */}
        <ProjectHero project={project} />
        
        {/* 01: THE GOAL (Sticky Left) */}
        <StickyScrollSection 
            title="01 / The Goal" 
            text={goal} 
            images={goalImages.length > 0 ? goalImages : [project.imageUrl]} 
            align="left"
        />

        {/* 02: THE GAP (Sticky Right) */}
        {gap && (
            <StickyScrollSection 
                title="02 / The Gap" 
                text={gap} 
                images={gapImages} 
                align="right"
            />
        )}

        {/* 03: THE GAMBLE (Sticky Left) */}
        {gamble && (
            <StickyScrollSection 
                title="03 / The Gamble" 
                text={gamble} 
                images={gambleImages.length > 0 ? gambleImages : [project.imageUrl]} 
                align="left"
            />
        )}

        {/* 04: THE GAIN (Big Centered Impact) */}
        {gain && (
            <div className="min-h-[60vh] flex items-center justify-center bg-brand-navy text-brand-offwhite">
                <div className="container mx-auto px-6 md:px-8 text-center">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">04 / The Gain</span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9]">
                        {gain}
                    </h2>
                </div>
            </div>
        )}

        {/* PROCESS GALLERY (Masonry) */}
        <ProcessGallery images={processImages} />

        {/* NEXT PROJECT NAV */}
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;