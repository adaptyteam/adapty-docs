import { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

export function useScrollTracker() {
    const location = useLocation();
    const [scrollMarkers, setScrollMarkers] = useState({
        25: false,
        50: false,
        75: false
    });

    useEffect(() => {
        // Reset markers when page changes
        setScrollMarkers({
            25: false,
            50: false,
            75: false
        });

        const handleScroll = () => {
            // Get scroll position and page height
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollPosition = window.scrollY;
            const scrollPercentage = (scrollPosition / documentHeight) * 100;

            // Check each threshold
            Object.keys(scrollMarkers).forEach(threshold => {
                if (!scrollMarkers[threshold] && scrollPercentage >= parseInt(threshold)) {
                    // Mark this threshold as tracked
                    setScrollMarkers(prev => ({
                        ...prev,
                        [threshold]: true
                    }));

                    // Send event to GA4 using Docusaurus's format
                    if (window.gtag) {
                        window.gtag('event', 'scroll', {
                            'event_category': 'User Engagement',
                            'event_label': `${threshold}%`,
                            'value': parseInt(threshold),
                            'page_path': location.pathname,
                            'page_title': document.title,
                            'percent_scrolled': parseInt(threshold)
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