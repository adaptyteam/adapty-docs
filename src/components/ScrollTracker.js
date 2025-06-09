import { useEffect, useState, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export function useScrollTracker() {
    const location = useLocation();
    const markers = useRef({
        25: false,
        50: false,
        75: false
    });

    useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) {
            return;
        }

        // Reset markers when page changes
        markers.current = {
            25: false,
            50: false,
            75: false
        };

        const sendScrollEvent = (threshold) => {
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'scroll_depth', {
                    'event_category': 'Scroll Tracking',
                    'event_label': location.pathname,
                    'value': threshold,
                    'percent_scrolled': threshold
                });
            }
        };

        const calculateScrollPercentage = () => {
            const contentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollHeight = Math.max(1, contentHeight - viewportHeight); // Prevent division by zero
            const scrollPosition = Math.max(0, Math.min(window.scrollY, scrollHeight));
            return Math.round((scrollPosition / scrollHeight) * 100);
        };

        const handleScroll = () => {
            const scrollPercentage = calculateScrollPercentage();

            // Check each threshold
            [25, 50, 75].forEach(threshold => {
                if (!markers.current[threshold] && scrollPercentage >= threshold) {
                    markers.current[threshold] = true;
                    sendScrollEvent(threshold);
                }
            });
        };

        // Check initial scroll position
        setTimeout(handleScroll, 100);

        // Add scroll listener with throttling
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [location.pathname]); // Remove scrollMarkers dependency

    return null;
}

// Component that uses the hook
export default function ScrollTracker() {
    useScrollTracker();
    return null;
}