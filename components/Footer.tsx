import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  const links = {
    index: [
      { name: 'Work', path: '/work' },
      { name: 'Studio', path: '/about' },
      { name: 'Team', path: '/team' },
      { name: 'Journal', path: '/journal' },
    ],
    services: [
      { name: 'Clarity', path: '/clarity' },
      { name: 'Design Power', path: '/design-power' },
      { name: 'Partnership', path: '/partnership' },
      { name: 'FAQ', path: '/faq' },
    ],
    social: [
      { name: 'Instagram', url: 'https://instagram.com/coolo.co' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/coolo' },
      { name: 'Email', url: 'mailto:hey@coolo.co.nz' },
    ]
  };

  return (
    <footer className="bg-brand-navy text-brand-offwhite relative z-50 overflow-hidden pt-24 md:pt-32">
      
      {/* 1. MASSIVE CTA SECTION */}
      <div className="container mx-auto px-6 md:px-8 mb-24 md:mb-32">
        <span className="font-mono text-brand-purple uppercase tracking-[0.3em] text-xs font-bold mb-8 block">
            Signal The Unit
        </span>
        <Link 
            to="/contact" 
            className="group block relative border-t border-b border-brand-offwhite/10 py-12 md:py-24 hover:bg-brand-offwhite/5 transition-colors duration-500"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] group-hover:text-brand-yellow transition-colors duration-300">
                    Start The<br/>Project.
                </h2>
                <div className="mt-8 md:mt-0 w-16 h-16 md:w-32 md:h-32 rounded-full border border-brand-offwhite/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-500 group-hover:rotate-45">
                    <svg className="w-6 h-6 md:w-10 md:h-10 text-brand-offwhite group-hover:text-brand-navy transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </Link>
      </div>

      {/* 2. THE NAVIGATION GRID */}
      <div className="container mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-32">
        
        {/* Col 1: Index */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Index</h4>
            <ul className="space-y-4">
                {links.index.map(link => (
                    <li key={link.name}>
                        <Link to={link.path} className="font-sans text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 2: Services */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Services</h4>
            <ul className="space-y-4">
                {links.services.map(link => (
                    <li key={link.name}>
                        <Link to={link.path} className="font-sans text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 3: Network */}
        <div>
            <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">Network</h4>
            <ul className="space-y-4">
                {links.social.map(link => (
                    <li key={link.name}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-sans text-2xl font-bold uppercase tracking-tight hover:text-brand-yellow transition-colors">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        {/* Col 4: Studio Info */}
        <div className="flex flex-col justify-between h-full">
            <div>
                <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-6">HQ</h4>
                <p className="font-mono text-xs leading-relaxed opacity-60">
                    Mount Maunganui,<br/>New Zealand.<br/>Earth.
                </p>
            </div>
            <div className="mt-8 md:mt-0">
                <h4 className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold mb-2">Time</h4>
                <TimeDisplay />
            </div>
        </div>
      </div>

      {/* 3. BIG LOGO ANCHOR */}
      <div className="border-t border-brand-offwhite/10">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                  {/* Footer Logo - Adjusted size as requested */}
                  <div className="w-full md:w-auto">
                        {/* Passing white color ensures the correct SVG loads on the dark footer.
                           Adjust the w-48 or w-64/96 to change massive logo size.
                        */}
                      <div className="w-48 md:w-96 opacity-100 mb-8 md:mb-0">
                        <BrandLogo color="#F7F7F7" className="w-full h-auto" />
                      </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col md:items-end gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                          &copy; {new Date().getFullYear()} COOLO Studio. All Rights Reserved.
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                          System V2.0_Alpha
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  );
};

// Simple Time Component
const TimeDisplay = () => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Pacific/Auckland' }));
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Pacific/Auckland' }));
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return <div className="font-mono text-sm font-bold opacity-80">{time} NZT</div>;
}

export default Footer;