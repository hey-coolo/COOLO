import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 1. PRELOADER (DO NOT TOUCH) ---
const ProjectReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.4, ease: "easeOut" }} 
            onAnimationComplete={onComplete}
        >
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="logo-mask">
                        <rect x="0" y="0" width="100" height="100" fill="black" />
                        <g transform="translate(50 50)">
                            <motion.g
                                initial={{ scale: 60 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            >
                                <rect x="-12" y="-40" width="10" height="80" rx="5" fill="white" />
                                <rect x="2" y="-40" width="10" height="80" rx="5" fill="white" />
                                <motion.rect 
                                    x="-2" y="-40" width="4" height="80" fill="white"
                                    initial={{ scaleX: 1 }}
                                    animate={{ scaleX: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </motion.g>
                        </g>
                    </mask>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="#F7F7F7" mask="url(#logo-mask)" />
            </svg>
        </motion.div>
    );
};

// --- 2. HERO SECTION (DO NOT TOUCH) ---
const ProjectHero: React.FC<{ project: any }> = ({ project }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); 
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-brand-navy">
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <img src={project.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/90" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    <span className="font-mono text-brand-yellow uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
                        Case Study {project.id.toString().padStart(2, '0')}
                    </span>
                    <h1 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-brand-offwhite mb-12 mix-blend-overlay opacity-90">
                        {project.title}
                    </h1>
                    
                    <div className="grid grid-cols-3 max-w-2xl mx-auto border-t border-brand-offwhite/30 pt-8 gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-brand-offwhite/80">
                        <div><span className="block text-brand-purple font-bold mb-2">Client</span>{project.client}</div>
                        <div><span className="block text-brand-purple font-bold mb-2">Role</span>{project.role}</div>
                        <div><span className="block text-brand-purple font-bold mb-2">Year</span>{project.year}</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// --- 3. MODAL (NO CRASH VERSION) ---
const ImageModal: React.FC<{ src: string | null; onClose: () => void }> = ({ src, onClose }) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {src && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[99999] bg-brand-navy/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="relative w-full h-full flex items-center justify-center pointer-events-none"
                    >
                        <div 
                            className="relative flex flex-col items-center pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={src} 
                                className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10" 
                                alt="Full Resolution" 
                            />
                            <div className="w-full mt-6 flex justify-center">
                                <button 
                                    onClick={onClose}
                                    className="font-mono text-[11px] uppercase tracking-widest text-brand-yellow font-black border-b-2 border-brand-yellow pb-1 hover:text-brand-offwhite hover:border-brand-offwhite transition-all"
                                >
                                    CLOSE_VIEW [ESC]
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

// --- 4. NEW STRUCTURE COMPONENTS ---

const ProjectBrief: React.FC<{ project: any }> = ({ project }) => {
    const MetaRow = ({ label, value }: { label: string, value: string }) => (
        <div className="flex justify-between items-baseline border-b border-brand-navy/10 py-3 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 font-bold">{label}</span>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold text-right">{value}</span>
        </div>
    );

    return (
        <section className="py-24 md:py-32 bg-brand-offwhite relative z-20">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-4">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-brand-navy leading-[0.9] lg:sticky lg:top-32"
                        >
                            {project.title}
                        </motion.h2>
                    </div>
                    <div className="lg:col-span-8 flex flex-col gap-16">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }} 
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                        >
                            <MetaRow label="Client" value={project.client || "Internal"} />
                            <MetaRow label="Year" value={project.year.toString()} />
                            <MetaRow label="Scope" value={project.role} />
                            <MetaRow label="Sector" value={project.category} />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="font-body text-xl md:text-2xl text-brand-navy/80 leading-relaxed font-light space-y-8 max-w-3xl"
                        >
                            <p>{project.description}</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// STRATEGIC LOGIC: Combines Goal/Gap/Gamble into one seamless text flow
const StrategicLogic: React.FC<{ story: any }> = ({ story }) => {
    if (!story) return null;
    const { goal, gap, gamble } = story;

    return (
        <section className="py-24 bg-brand-offwhite border-t border-brand-navy/10">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        { title: "The Goal", text: goal },
                        { title: "The Gap", text: gap },
                        { title: "The Gamble", text: gamble }
                    ].map((item, i) => item.text && (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-4"
                        >
                            <span className="font-mono text-brand-purple text-xs font-bold uppercase tracking-widest border-b-2 border-brand-purple pb-1 inline-block">
                                0{i + 1} / {item.title}
                            </span>
                            <p className="font-body text-lg text-brand-navy/80 leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// THE OUTPUT: Polished Images (Full Width / Grid)
const OutputGallery: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-24">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-12">
                    <h3 className="text-4xl font-black uppercase tracking-tight text-brand-navy">The Output</h3>
                </div>
                <div className="space-y-8 md:space-y-12">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="w-full bg-brand-navy/5 cursor-zoom-in relative group"
                            onClick={() => onImageClick(img)}
                        >
                            <img 
                                src={img} 
                                alt={`Output ${i}`} 
                                className="w-full h-auto shadow-xl block transition-transform duration-700 group-hover:scale-[1.01]" 
                            />
                            <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/10 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// BIG QUOTE (DO NOT TOUCH)
const QuoteBlock: React.FC<{ text: string }> = ({ text }) => (
    <section className="py-32 bg-brand-offwhite border-t border-brand-navy/10">
        <div className="container mx-auto px-8 max-w-5xl text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className="font-sans font-black text-3xl md:text-6xl text-brand-navy uppercase leading-tight italic opacity-90">
                    "{text}"
                </p>
            </motion.div>
        </div>
    </section>
);

// HUMANS BEHIND THE MACHINE: Process Images
const ProcessArchive: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;
    
    return (
        <section className="py-32 bg-brand-offwhite border-t border-brand-navy/10">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end pb-8 border-b border-brand-navy/10">
                    <div>
                        <h3 className="text-brand-navy font-black text-5xl md:text-8xl uppercase tracking-tighter opacity-10 leading-none">
                            Process
                        </h3>
                        <p className="font-mono text-brand-navy text-xs uppercase tracking-widest -mt-4 ml-2 font-bold">
                            Humans behind the machine
                        </p>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2">
                        Sketches / Moodboards / Raw Data
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <motion.div 
                            key={i} 
                            className="break-inside-avoid group cursor-zoom-in relative bg-brand-navy/5"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onImageClick(img)}
                        >
                            <img 
                                src={img} 
                                alt="Process" 
                                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 ease-out border border-transparent group-hover:border-brand-purple/20 block" 
                            />
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-brand-purple text-brand-offwhite text-[10px] font-mono px-2 py-1 font-bold">RAW_FILE</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// OUTCOME SECTION (Fixed logic)
const ResultsSection: React.FC<{ gain: string }> = ({ gain }) => {
    if (!gain) return null;
    return (
        <section className="py-40 bg-brand-navy text-brand-offwhite relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />
             <div className="container mx-auto px-6 md:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-12 block">
                        Final Status
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-tight max-w-5xl mx-auto text-brand-offwhite">
                        "{gain}"
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

// --- 6. NEXT PROJECT (DO NOT TOUCH) ---
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

// --- MAIN COMPONENT ---
const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isRevealing, setIsRevealing] = useState(true); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  
  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);

  useEffect(() => {
      window.scrollTo(0, 0);
      setIsRevealing(true);
  }, [slug]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (currentIndex === -1) return (
      <div className="min-h-screen flex items-center justify-center bg-brand-navy text-brand-offwhite">
          <h1 className="text-4xl font-mono uppercase">Case File Missing</h1>
      </div>
  );
  
  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  
  // Safe Destructuring
  const { goal, gap, gamble, gain, processImages } = project.story || {
      goal: "", gap: "", gamble: "", gain: "", processImages: []
  };

  const polishedImages = project.detailImages || [project.imageUrl];

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        
        {/* 1. Hero */}
        <ProjectHero project={project} />
        
        {/* 2. Brief & Data */}
        <ProjectBrief project={project} />

        {/* 3. Strategic Text (Replaces rigid Goal/Gap phases) */}
        <StrategicLogic story={project.story} />

        {/* 4. Polished Output (All detail images) */}
        <OutputGallery images={polishedImages} onImageClick={setSelectedImage} />

        {/* 5. Quote Break */}
        <QuoteBlock text="Logic determines the path. Design builds the vehicle." />

        {/* 6. Human/Process (Sketches) */}
        {processImages && processImages.length > 0 && (
            <ProcessArchive images={processImages} onImageClick={setSelectedImage} />
        )}

        {/* 7. Outcome */}
        <ResultsSection gain={gain} />
    
        {/* 8. Footer Nav */}
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;