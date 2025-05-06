import React from 'react';
import Details from '@theme/MDXComponents/Details';
import styles from './Collapse.module.css';

/**
 * Collapse component for Docusaurus
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be collapsed
 * @param {string} [props.title="Collapse"] - Title for the collapse section
 * @param {string} [props.className=""] - Additional CSS class names
 */
export default function Collapse(props) {
    const {
        children,
        title = "Collapse",
        className = ""
    } = props;

    return (
        <Details className={`${styles.collapseContainer} ${className}`}>
            <summary className={styles.collapseTitle}>{title}</summary>
            <div className={styles.collapseContent}>{children}</div>
        </Details>
    );
}