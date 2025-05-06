import React from 'react';
import Details from '@theme/MDXComponents/Details';

/**
 * Collapse component for Docusaurus
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be collapsed
 * @param {string} [props.title="Collapse"] - Title for the collapse section
 * @param {string} [props.elementName="details"] - HTML element name for the collapsible container
 */
export default function Collapse(props) {
    const {
        children,
        title = "Collapse",
        elementName = "details"
    } = props;

    return (
        <Details as={elementName}>
            <summary>{title}</summary>
            {children}
        </Details>
    );
}