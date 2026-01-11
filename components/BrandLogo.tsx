import React from 'react';

interface BrandLogoProps {
  className?: string;
  color?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-32", color = "#0F0328" }) => {
  // Logic: The Header passes specific hex codes. 
  // If the requested color is Light (White/#F7F7F7), load the Light SVG.
  // Otherwise, load the Dark (Navy) SVG.
  
  const isLight = color === '#F7F7F7' || color === '#ffffff' || color === 'white';
  const logoSrc = isLight 
    ? '/assets/logos/logo-light.svg' 
    : '/assets/logos/logo-dark.svg';

  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoSrc} 
        alt="COOLO" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default BrandLogo;