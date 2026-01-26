import React from 'react';

/**
 * Backward compatibility shim for legacy <Zoom> tags.
 * This component simply wraps its children in a .zoom-wrapper div,
 * which is then picked up by our global glassmorphism script from Zoom.astro.
 */
interface ZoomProps {
    children: React.ReactNode;
}

export default function ZoomShim({ children }: ZoomProps) {
    return (
        <div className="zoom-wrapper">
            {children}
        </div>
    );
}
