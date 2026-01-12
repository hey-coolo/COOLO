import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const QA_SECTIONS = [
    {
        title: "The Vibe Check",
        questions: [
            { q: "Are you an Agency?", a: "Please, no. Agencies have timesheets and burnout. We are a Studio. Just two humans (Franco & Ariana) doing deep work without the corporate fluff." },
            { q: "Can I text you on Sunday?", a: "You can try. But we're probably surfing. We protect our peace so we can be obsessed with your project on Monday." },
            { q: "Why the 90s aesthetic?", a: "It was the last time the world felt real. We bring that analog soul—tactile, honest, raw—into the digital work we do." }
        ]
    },
    {
        title: "The Money Talk",
        questions: [
            { q: "Why no 'Cheap' option?", a: "Cheap builds expensive problems. We build engines that last for years, not stickers that peel off in a month." },
            { q: "Do you take equity?", a: "If the idea is world-changing, maybe. But generally, our landlord prefers cash." },
            { q: "What if I hate the design?", a: "Impossible. We don't do 'Ta-Da' reveals. We collaborate early and often. By the time we render, you've already approved the direction." }
        ]
    },
    {
        title: "The Process",
        questions: [
            { q: "Will you just design what I ask?", a: "No. We design what you need. If you want a 'Yes Man', hire a junior. You hire us to challenge you and make you look better than you imagined." },
            { q: "Do you use AI?", a: "Only for the boring stuff. We use robots to code so we can spend more time being human." },
            { q: "Webflow or Wordpress?", a: "Webflow. Always. Wordpress is a headache. Webflow is a superpower." }
        ]
    }
];

const FAQPage: React.FC = () => {
  return (
    <div className="bg-brand-offwhite min-h-screen font-sans text-brand-navy selection:bg-brand-purple selection:text-white">
      <Header />
      
      <main className="pt-32 pb-24 px-8 container mx-auto max-w-5xl">
        
        {/* HEADER */}
        <header className="mb-24">
            <h1 className="text-[12vw] md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                The <br/> Truth.
            </h1>
            <p className="text-xl md:text-2xl font-body max-w-2xl text-brand-navy/70">
                You have questions. We have honest answers. <br/>
                No corporate jargon. No sales fluff. Just the raw data.
            </p>
        </header>

        {/* QUESTIONS GRID */}
        <div className="space-y-32">
            {QA_SECTIONS.map((section, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <h2 className="font-mono text-brand-purple uppercase tracking-widest text-sm font-bold sticky top-32">
                            0{i+1} / {section.title}
                        </h2>
                    </div>
                    
                    <div className="lg:col-span-8 space-y-16">
                        {section.questions.map((item, j) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: j * 0.1 }}
                                key={j}
                                className="border-l-2 border-brand-navy/10 pl-8"
                            >
                                <h3 className="text-3xl font-black uppercase mb-4 italic">{item.q}</h3>
                                <p className="font-body text-xl leading-relaxed text-brand-navy/80">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* FINAL CTA */}
        <div className="mt-32 p-12 bg-brand-navy text-brand-offwhite text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Still confused?</h2>
            <p className="font-body text-xl mb-8 opacity-70">If your question is too weird for this list, just email us.</p>
            <a href="mailto:hey@coolo.co.nz" className="inline-block border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-4 font-mono uppercase font-bold transition-all">
                Ask a Weird Question
            </a>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default QAPage;