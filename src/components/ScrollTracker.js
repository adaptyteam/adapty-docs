import { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export function useScrollTracker() {
    const location = useLocation();
    const [scrollMarkers, setScrollMarkers] = useState({
        25: false,
        50: false,
        75: false
    });

    useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }

        // Reset markers when page changes
        setScrollMarkers({
            25: false,
            50: false,
            75: false
        });

        const handleScroll = () => {
            // Get scroll position and page height
            const contentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollHeight = contentHeight - viewportHeight;
            const scrollPosition = Math.max(0, Math.min(window.scrollY, scrollHeight));
            const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);

            // Check each threshold
            Object.keys(scrollMarkers).forEach(threshold => {
                const thresholdNum = parseInt(threshold);
                if (!scrollMarkers[threshold] && scrollPercentage >= thresholdNum) {
                    // Mark this threshold as tracked
                    setScrollMarkers(prev => ({
                        ...prev,
                        [threshold]: true
                    }));

                    // Send event to GA4 using exact Docusaurus format
                    if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'scroll', {
                            percent_scrolled: thresholdNum
                        });
                    }
                }
            });
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname, scrollMarkers]); // Reset on page change
}

// Component that uses the hook
export default function ScrollTracker() {
    useScrollTracker();
    return null; // This component doesn't render anything
}