import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. LOADER: BIG SOLID LOGO -> SMALL -> FADE OUT ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-offwhite"
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
        >
            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 60 }} 
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    className="w-24 h-24 relative"
                >
                    <div className="absolute left-[25px] top-[10px] w-[15px] h-[80px] bg-brand-navy rounded-[7.5px]" />
                    <div className="absolute right-[25px] top-[10px] w-[15px] h-[80px] bg-brand-navy rounded-[7.5px]" />
                </motion.div>
            </div>
        </motion.div>
    );
};

// --- 2. IMAGE COMPONENTS ---

// High-Impact Expanding Image (Scroll-Jacked)
const ExpandingImage: React.FC<{ src: string }> = ({ src }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.95, 1.05]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="h-[120vh] w-full relative mb-24 flex items-center justify-center">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div style={{ scale, opacity }} className="w-full h-full md:w-[95%] md:h-[90%]">
                    <img src={src} className="w-full h-full object-cover shadow-2xl" alt="" />
                </motion.div>
            </div>
        </div>
    );
};

// Standard Stream Image (Clean Parallax)
const StreamImage: React.FC<{ src: string }> = ({ src }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <div ref={ref} className="w-full aspect-[4/3] overflow-hidden relative mb-12 bg-brand-navy/5">
            <motion.div style={{ y, scale: 1.1 }} className="w-full h-full">
                <img src={src} className="w-full h-full object-cover" alt="" />
            </motion.div>
        </div>
    );
};

// --- 3. THE "MODO" HEADER ---
const ProjectHeader: React.FC<{ project: any }> = ({ project }) => {
    return (
        <div className="pt-48 pb-24 container mx-auto px-6 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                {/* Meta Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-navy/10 pb-8 mb-12 gap-8">
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold">
                        Case Study 0{project.id}
                    </span>
                    <div className="flex gap-8 md:gap-16 font-mono text-[10px] uppercase tracking-widest text-brand-navy/60">
                        <div><span className="block text-brand-navy font-bold mb-1">Client</span>{project.client}</div>
                        <div><span className="block text-brand-navy font-bold mb-1">Role</span>{project.role}</div>
                        <div><span className="block text-brand-navy font-bold mb-1">Year</span>{project.year}</div>
                    </div>
                </div>

                {/* Massive Title */}
                <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-navy mb-24">
                    {project.title}
                </h1>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="w-full aspect-video overflow-hidden"
            >
                <img src={project.imageUrl} className="w-full h-full object-cover" alt="Hero" />
            </motion.div>
        </div>
    );
};

// --- 4. THE NARRATIVE STREAM (Sticky Left, Scroll Right) ---
const NarrativeStream: React.FC<{ project: any }> = ({ project }) => {
    const { goal, gap, gamble, gain } = project.story || {};
    const images = project.detailImages || [];

    return (
        <div className="container mx-auto px-6 md:px-8 pb-32">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 relative">
                
                {/* LEFT: Sticky Context */}
                <div className="lg:w-1/3">
                    <div className="lg:sticky lg:top-32 space-y-24">
                        <div className="space-y-8">
                            <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block">01 / The Brief</span>
                            <p className="font-body text-xl md:text-2xl leading-relaxed text-brand-navy font-light">{goal}</p>
                        </div>
                        {gap && (
                            <div className="space-y-8">
                                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block">02 / The Friction</span>
                                <p className="font-body text-xl md:text-2xl leading-relaxed text-brand-navy font-light">{gap}</p>
                            </div>
                        )}
                        {gamble && (
                            <div className="space-y-8">
                                <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold block">03 / The Pivot</span>
                                <p className="font-body text-xl md:text-2xl leading-relaxed text-brand-navy font-light">{gamble}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Visual Stream */}
                <div className="lg:w-2/3 pt-12 lg:pt-0">
                    {images.map((img: string, i: number) => {
                        // Rhythm: Every 2nd image is an "Expander" for impact
                        if (i % 2 === 0) {
                            return <ExpandingImage key={i} src={img} />;
                        }
                        return <StreamImage key={i} src={img} />;
                    })}
                </div>
            </div>
        </div>
    );
};

// --- 5. FOOTER / NEXT PROJECT ---
const NextProject: React.FC<{ project: any }> = ({ project }) => (
    <Link to={`/work/${project.slug}`} className="block relative h-[80vh] overflow-hidden group bg-brand-navy">
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-brand-offwhite z-10 p-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] mb-8 text-brand-yellow">Next Case File</span>
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform duration-1000">
                {project.title}
            </h2>
        </div>
    </Link>
);

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isRevealing, setIsRevealing] = useState(true); 
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

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

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        <ProjectHeader project={project} />
        <NarrativeStream project={project} />
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;