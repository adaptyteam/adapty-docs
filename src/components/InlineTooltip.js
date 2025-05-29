import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './InlineTooltip.module.css';

const InlineTooltip = ({ children, tooltip, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    // Calculate tooltip position
    const calculatePosition = () => {
        if (!triggerRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // Position tooltip above the trigger element
        const top = triggerRect.top + scrollTop - 10; // 10px gap
        const left = triggerRect.left + scrollLeft + triggerRect.width / 2;

        setPosition({ top, left });
    };

    // Handle mouse enter with slight delay to prevent flickering
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            calculatePosition();
            setIsVisible(true);
        }, 150);
    };

    // Handle mouse leave with delay to allow moving to tooltip
    const handleMouseLeave = (e) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // Check if mouse moved to tooltip
            if (tooltipRef.current && e.relatedTarget && tooltipRef.current.contains(e.relatedTarget)) {
                return;
            }
            setIsVisible(false);
        }, 200);
    };

    // Handle tooltip mouse events
    const handleTooltipMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleTooltipMouseLeave = () => {
        setIsVisible(false);
    };

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target) &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', () => setIsVisible(false), true);
            window.addEventListener('resize', () => setIsVisible(false));
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', () => setIsVisible(false), true);
            window.removeEventListener('resize', () => setIsVisible(false));
        };
    }, [isVisible]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Handle close button
    const handleClose = (e) => {
        e.stopPropagation();
        setIsVisible(false);
    };

    // Determine which content to show in tooltip and trigger
    const tooltipContent = children;
    const triggerContent = tooltip;

    // Tooltip content with close button
    const tooltipElement = (
        <div
            ref={tooltipRef}
            className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}
            style={{
                position: 'absolute',
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%) translateY(-100%)',
            }}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
        >
            <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close tooltip"
            >
                ×
            </button>
            <div className={styles.tooltipContent}>
                {tooltipContent}
            </div>
            <div className={styles.arrow}></div>
        </div>
    );

    return (
        <>
            <span
                ref={triggerRef}
                className={`${styles.trigger} ${className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                aria-describedby={isVisible ? 'tooltip' : undefined}
            >
                {triggerContent}
            </span>

            {/* Hidden content for SEO - screen readers and search engines can access this */}
            <span className={styles.hiddenContent} aria-hidden="true">
                {tooltipContent}
            </span>

            {/* Portal for tooltip */}
            {typeof document !== 'undefined' && isVisible &&
                createPortal(tooltipElement, document.body)
            }
        </>
    );
};

export default InlineTooltip;