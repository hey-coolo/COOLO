import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-F2Q9NS5TVW';

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    if (!window.gtag) return;
    
    // Send page view on route change
    // @ts-ignore
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};