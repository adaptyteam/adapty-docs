import React, { useState } from 'react';
import styles from './styles.module.css';

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 115.77 122.88" style={{marginRight: 8, verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg"><g><path d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z"/></g></svg>
  );
}

function MarkdownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 471 289.85" style={{marginRight: 8, verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg"><path d="M437,289.85H34a34,34,0,0,1-34-34V34A34,34,0,0,1,34,0H437a34,34,0,0,1,34,34V255.88A34,34,0,0,1,437,289.85ZM34,22.64A11.34,11.34,0,0,0,22.64,34V255.88A11.34,11.34,0,0,0,34,267.2H437a11.34,11.34,0,0,0,11.33-11.32V34A11.34,11.34,0,0,0,437,22.64Z"/><path d="M67.93,221.91v-154h45.29l45.29,56.61L203.8,67.93h45.29v154H203.8V133.6l-45.29,56.61L113.22,133.6v88.31Zm283.06,0-67.94-74.72h45.29V67.93h45.29v79.26h45.29Z"/></svg>
  );
}

export default function ArticleButtons({ articleUrl }) {
  const [copied, setCopied] = useState(false);
  

  // Helper function to determine the markdown URL
  const getMarkdownUrl = () => {
    
    // Normalize the articleUrl to handle both full URLs and pathnames
    const normalizedUrl = articleUrl.replace(/\/$/, '');
    
    // Check if the current URL is the docs root path
    if (normalizedUrl === 'http://localhost:3000/docs' || 
        normalizedUrl === 'https://adapty.io/docs') {
      return normalizedUrl + '/what-is-adapty.md';
    }
    
    // For all other URLs, append .md as before
    return `${normalizedUrl}.md`;
  };

  const handleCopyMarkdown = async () => {
    try {
      const markdownUrl = getMarkdownUrl();
      const response = await fetch(markdownUrl);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  const handleViewMarkdown = () => {
    const markdownUrl = getMarkdownUrl();
    window.open(markdownUrl, '_blank');
  };

  return (
    <div className={styles.buttonRow}>
      <button 
        className={styles.button}
        onClick={handleCopyMarkdown}
      >
        <ClipboardIcon />
        {copied ? 'Copied!' : 'Copy for LLM'}
      </button>
      <span className={styles.divider} />
      <button 
        className={styles.button}
        onClick={handleViewMarkdown}
      >
        <MarkdownIcon />
        View as Markdown
      </button>
    </div>
  );
} 