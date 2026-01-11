// pages/UnsubscribePage.tsx
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnsubscribePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');

    try {
      await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      // Always show success even if email wasn't found (Privacy/Security best practice)
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('success');
    }
  };

  return (
    <div className="bg-brand-offwhite min-h-screen pt-48 flex flex-col items-center justify-center px-8">
      <AnimatedSection>
        <div className="max-w-lg w-full border-2 border-brand-navy p-12 bg-white text-center shadow-[8px_8px_0px_0px_#0F0328]">
          
          {status === 'success' ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                    👋
                </div>
                <h1 className="text-4xl font-black uppercase text-brand-navy mb-4">You're Out.</h1>
                <p className="font-body text-brand-navy/60 mb-8">
                    No hard feelings. Your email has been scrubbed from the list.
                </p>
                <Link to="/" className="font-mono text-xs uppercase font-bold tracking-widest border-b-2 border-brand-purple text-brand-purple hover:text-brand-navy hover:border-brand-navy transition-all">
                    Return to Studio
                </Link>
            </motion.div>
          ) : (
            <>
                <span className="font-mono text-xs uppercase tracking-widest text-brand-navy/40 font-bold block mb-6">
                    Preferences
                </span>
                <h1 className="text-5xl font-black uppercase text-brand-navy leading-none mb-6">
                    Too Much<br/>Noise?
                </h1>
                <p className="font-body text-lg text-brand-navy/70 mb-12">
                    We get it. Enter your email below to opt-out of all future studio updates and resources.
                </p>

                <form onSubmit={handleUnsubscribe} className="space-y-6">
                    <input 
                        type="email" 
                        required
                        placeholder="confirm@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-navy/5 border-b-2 border-brand-navy/20 p-4 font-mono text-center text-sm focus:outline-none focus:border-brand-red transition-colors placeholder-brand-navy/30 text-brand-navy"
                    />
                    <button 
                        type="submit"
                        disabled={status === 'processing'}
                        className="w-full bg-brand-navy text-brand-offwhite font-mono uppercase font-bold py-4 hover:bg-brand-red transition-colors disabled:opacity-50"
                    >
                        {status === 'processing' ? 'Removing...' : 'Unsubscribe Me'}
                    </button>
                </form>
            </>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default UnsubscribePage;