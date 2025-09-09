import React, { useEffect } from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import ArticleButtons from '@site/src/components/ArticleButtons';
import { createRoot } from 'react-dom/client';

export default function DocItemLayout(props) {

  useEffect(() => {
    // Get the full current URL inside useEffect to ensure we're on the client side
    const currentUrl = window.location.href.replace(/\/$/, '');

    if (!currentUrl) {
      return;
    }

    const injectButtons = () => {
      
      // Find the markdown container
      const markdownContainer = document.querySelector('.theme-doc-markdown');
      
      if (!markdownContainer) {
        return;
      }

      // Check if buttons already exist
      if (markdownContainer.querySelector('.article-buttons-container')) {
        return;
      }

      // Find the first paragraph or heading after the title
      const title = markdownContainer.querySelector('h1');
      
      if (!title) {
        return;
      }

      // Create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'article-buttons-container';
      buttonContainer.style.cssText = `
        margin-top: 8px !important;
        margin-bottom: 8px !important;
        padding: 0 !important;
        display: flex;
        justify-content: flex-start;
      `;

      // Remove margin-bottom from the previous sibling (h1) if present
      if (title && title.style) {
        title.style.marginBottom = '0px';
      }

      // Insert after the title
      title.parentNode.insertBefore(buttonContainer, title.nextSibling);

      // Render the buttons
      const root = createRoot(buttonContainer);
      root.render(<ArticleButtons articleUrl={currentUrl} />);

    };

    // Try immediately and after a delay
    injectButtons();
    const timeoutId = setTimeout(() => {
      injectButtons();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const existingButtons = document.querySelector('.article-buttons-container');
      if (existingButtons) {
        existingButtons.remove();
      }
    };
  }, []); // Remove currentUrl dependency since we calculate it inside

  return <OriginalDocItemLayout {...props} />;
} 