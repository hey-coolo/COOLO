import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ImageOverlay } from '../components/ImageOverlay';

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

// --- 3. NEW COMPONENTS FOR FLOW ---

// New: Brief / Overview Section
const ProjectBrief: React.FC<{ text: string; tags: string[] }> = ({ text, tags }) => (
    <section className="py-24 md:py-32 bg-brand-offwhite relative z-20">
        <div className="container mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
                <div className="md:w-1/4 pt-2">
                    <span className="font-mono text-brand-purple uppercase tracking-widest text-xs font-bold mb-6 block border-b border-brand-purple/20 pb-2 w-full">
                        Project Data
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="font-mono text-[10px] uppercase border border-brand-navy/20 px-2 py-1 text-brand-navy/60 font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="md:w-3/4">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-sans text-3xl md:text-5xl font-bold uppercase leading-tight text-brand-navy"
                    >
                        {text}
                    </motion.p>
                </div>
            </div>
        </div>
    </section>
);

// New: Zoomable Image Wrapper
const ZoomableImage: React.FC<{ src: string; onClick: (src: string) => void }> = ({ src, onClick }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 0.99 }}
        className="w-full bg-brand-navy/5 relative group cursor-zoom-in overflow-hidden"
        onClick={() => onClick(src)}
    >
        <img 
            src={src} 
            alt="Detail" 
            className="w-full h-auto shadow-2xl block transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/10 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="bg-brand-offwhite text-brand-navy font-mono text-[9px] uppercase font-bold px-3 py-1 tracking-widest border border-brand-navy">
                View Source [+]
            </span>
        </div>
    </motion.div>
);

// Modified: Flexible Story Block (Replaces rigid EditorialSection)
const StoryBlock: React.FC<{ 
    label: string; 
    title: string; 
    text: string; 
    images: string[];
    inverted?: boolean;
    onImageClick: (src: string) => void;
}> = ({ label, title, text, images, inverted = false, onImageClick }) => {
    if (!text) return null;

    return (
        <section className="py-24 border-t border-brand-navy/5">
            <div className="container mx-auto px-6 md:px-8">
                <div className={`flex flex-col ${inverted ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24`}>
                    
                    {/* Text Side */}
                    <div className="md:w-1/3 flex flex-col pt-8 md:sticky md:top-32 md:h-fit">
                        <motion.div
                            initial={{ opacity: 0, x: inverted ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-2 h-2 bg-brand-purple rounded-full"></span>
                                <span className="font-mono text-brand-navy/40 text-xs uppercase tracking-widest font-bold">
                                    {label}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8 uppercase tracking-tight leading-[0.9]">
                                {title}
                            </h2>
                            <p className="font-body text-lg md:text-xl text-brand-navy/80 leading-relaxed">
                                {text}
                            </p>
                        </motion.div>
                    </div>

                    {/* Image Side */}
                    <div className="md:w-2/3 flex flex-col gap-16">
                        {images && images.map((img, i) => (
                            <ZoomableImage key={i} src={img} onClick={onImageClick} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// New: Text/Quote Insert
const QuoteBlock: React.FC<{ text: string }> = ({ text }) => (
    <section className="py-32 bg-brand-offwhite">
        <div className="container mx-auto px-8 max-w-5xl text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border-y border-brand-navy/10 py-16"
            >
                <p className="font-sans font-black text-3xl md:text-6xl text-brand-navy uppercase leading-tight italic opacity-90">
                    "{text}"
                </p>
            </motion.div>
        </div>
    </section>
);

// --- 4. RESULTS SECTION (DO NOT TOUCH THE BIG QUOTE) ---
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
                        04 / The Outcome
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-tight max-w-5xl mx-auto text-brand-offwhite">
                        "{gain}"
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

// --- 5. PROCESS ARCHIVE (Replaced MasonryGallery) ---
const ProcessArchive: React.FC<{ images: string[]; onImageClick: (src: string) => void }> = ({ images, onImageClick }) => {
    if (!images || images.length === 0) return null;
    
    return (
        <section className="py-32 bg-brand-offwhite">
            <div className="container mx-auto px-6 md:px-8">
                <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-brand-navy/10 pb-8">
                    <div>
                        <h3 className="text-brand-navy font-black text-5xl md:text-8xl uppercase tracking-tighter opacity-10 leading-none">
                            Process
                        </h3>
                        <p className="font-mono text-brand-navy text-xs uppercase tracking-widest -mt-4 ml-2 font-bold">
                            Humans behind the machine
                        </p>
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-brand-navy/40 mb-2">
                        Sketches / Moodboards / Exploration
                    </div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <div key={i} className="break-inside-avoid">
                            <ZoomableImage src={img} onClick={onImageClick} />
                        </div>
                    ))}
                </div>
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For Lightbox
  
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
  
  // Destructure story with defaults, handling cases where story parts might be missing
  const { goal, gap, gamble, gain, processImages } = project.story || {
      goal: "",
      gap: "",
      gamble: "",
      gain: "",
      processImages: []
  };

  // Dynamic Image Chunking for Story Flow
  const details = project.detailImages || [];
  const allVisuals = details.length > 0 ? details : [project.imageUrl];
  
  // Logic: Distribute images based on which story sections exist
  const storySections = [goal, gap, gamble].filter(Boolean);
  const visualsPerSection = Math.ceil(allVisuals.length / (storySections.length || 1));
  
  let visualCursor = 0;
  const getVisuals = () => {
      const slice = allVisuals.slice(visualCursor, visualCursor + visualsPerSection);
      visualCursor += visualsPerSection;
      return slice;
  };

  return (
    <>
      <AnimatePresence>
        {isRevealing && <ProjectReveal onComplete={() => setIsRevealing(false)} />}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
            <ImageOverlay src={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      <div className="bg-brand-offwhite text-brand-navy min-h-screen selection:bg-brand-purple selection:text-white">
        
        <ProjectHero project={project} />
        
        {/* NEW: Project Brief / Description */}
        <ProjectBrief text={project.description} tags={project.tags} />

        {/* Dynamic Story Flow */}
        <div className="flex flex-col">
            {goal && (
                <StoryBlock 
                    label="Phase 01" 
                    title="The Goal" 
                    text={goal} 
                    images={getVisuals()} 
                    onImageClick={setSelectedImage}
                />
            )}

            {gap && (
                <StoryBlock 
                    label="Phase 02" 
                    title="The Gap" 
                    text={gap} 
                    images={getVisuals()} 
                    inverted={true}
                    onImageClick={setSelectedImage}
                />
            )}

            {/* Optional Quote Insert between Gap and Gamble */}
            <QuoteBlock text="Logic determines the path. Design builds the vehicle." />

            {gamble && (
                <StoryBlock 
                    label="Phase 03" 
                    title="The Gamble" 
                    text={gamble} 
                    images={getVisuals().length > 0 ? getVisuals() : [project.imageUrl]} 
                    onImageClick={setSelectedImage}
                />
            )}
        </div>

        <ResultsSection gain={gain} />

        {/* Enhanced Process Section */}
        {processImages && processImages.length > 0 && (
            <ProcessArchive images={processImages} onImageClick={setSelectedImage} />
        )}
    
        <NextProject project={nextProject} />
      </div>
    </>
  );
};

export default ProjectPage;