import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. LOCAL REVEAL LOADER (The "II" Favicon Animation) ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-offwhite"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
        >
            <div className="w-24 h-24 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <motion.rect
                        x="25" y="10" width="15" height="80" rx="7.5"
                        fill="#0F0328"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    />
                    <motion.rect
                        x="60" y="10" width="15" height="80" rx="7.5"
                        fill="#0F0328"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                    />
                </svg>
            </div>
        </motion.div>
    );
};

// --- 2. SMOOTH IMAGE COMPONENT ---
const RevealImage: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`overflow-hidden bg-brand-navy/5 ${className}`}
        >
            <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
        </motion.div>
    );
};

// --- 3. STICKY SCROLL SECTION (Fixed Logic) ---
const StickyScrollSection: React.FC<{ 
    title: string; 
    text: string; 
    images: string[]; 
    align?: 'left' | 'right' 
}> = ({ title, text, images, align = 'left' }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="container mx-auto px-6 md:px-8 py-24 relative">
            <div className={`flex flex-col md:flex-row gap-12 md:gap-24 relative ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                
                {/* STICKY TEXT COLUMN */}
                {/* h-screen + sticky top-0 + justify-center = Centered Sticky Text */}
                <div className="md:w-1/3">
                    <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center py-24 md:py-0">
                        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-black mb-8 block border-l-2 border-brand-purple pl-4">
                            {title}
                        </span>
                        <p className="font-body text-xl md:text-3xl leading-tight font-light text-brand-navy">
                            {text}
                        </p>
                    </div>
                </div>

                {/* SCROLLING IMAGE STREAM */}
                {/* This column flows naturally and gives the section its height */}
                <div className="md:w-2/3 flex flex-col gap-16 md:gap-32 py-12 md:py-32">
                    {images.map((img, i) => (
                        <RevealImage key={i} src={img} className="w-full shadow-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}

const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-brand-navy">
            {/* Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60 grayscale" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
                        Case Study {project.id.toString().padStart(2, '0')}
                    </span>
                    <h1 className="text-[13vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-overlay opacity-90">
                        {project.title}
                    </h1>
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-3 max-w-2xl mx-auto border-t border-brand-offwhite/20 pt-8 gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-offwhite/60">
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
        <div className="py-32 bg-brand-navy text-brand-offwhite">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24 border-b border-brand-offwhite/10 pb-8 flex justify-between items-end">
                    <h3 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.85]">
                        The<br/><span className="text-brand-purple">Mess.</span>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50">Process Archive 01-{images.length}</span>
                </div>
                
                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid bg-brand-offwhite/5"
                        >
                            <img src={img} className="w-full h-auto object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" alt="" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-[80vh] overflow-hidden group bg-brand-navy z-20">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center mix-blend-difference">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4">Next Case File</span>
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">
                {project.title}
            </h2>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isRevealing, setIsRevealing] = useState(true); // State for the Reveal Loader
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  // Scroll to top when slug changes
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

  // Helper to split detailImages into streams
  const details = project.detailImages || [];
  const goalImages = details.slice(0, 2); 
  // Fallback to hero image if gaps are empty, to maintain structure
  const gapImages = details.slice(2, 4).length > 0 ? details.slice(2, 4) : [project.imageUrl];
  const gambleImages = details.slice(4);

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
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

        {/* 04: THE GAIN (Center Impact) */}
        {gain && (
            <div className="py-32 md:py-48 container mx-auto px-6 md:px-8">
                <div className="max-w-5xl mx-auto text-center border-t-2 border-brand-navy pt-24">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">04 / The Gain</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] text-brand-navy">
                        {gain}
                    </h2>
                </div>
            </div>
        )}

        {/* PROCESS GALLERY */}
        <ProcessGallery images={processImages} />

        {/* NEXT PROJECT */}
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;