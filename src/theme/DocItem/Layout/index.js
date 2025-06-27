import React, { useEffect } from 'react';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';
import ArticleButtons from '@site/src/components/ArticleButtons';
import { createRoot } from 'react-dom/client';

export default function DocItemLayout(props) {
  console.log('DocItemLayout props:', props);
  console.log('DocItemLayout props keys:', Object.keys(props));

  // Try different ways to get the current URL
  const currentUrl = props.content?.metadata?.permalink?.replace(/\/$/, '') || 
                   props.metadata?.permalink?.replace(/\/$/, '') ||
                   window.location.pathname.replace(/\/$/, '') || '';

  console.log('DocItemLayout rendered with:', { 
    currentUrl, 
    content: props.content?.metadata,
    permalink: props.content?.metadata?.permalink,
    hasContent: !!props.content,
    hasMetadata: !!props.content?.metadata,
    windowLocation: window.location.pathname
  });

  useEffect(() => {
    console.log('useEffect triggered with currentUrl:', currentUrl);
    if (!currentUrl) {
      console.log('No currentUrl, skipping button injection');
      return;
    }

    const injectButtons = () => {
      console.log('Attempting to inject buttons...');
      
      // Find the markdown container
      const markdownContainer = document.querySelector('.theme-doc-markdown');
      console.log('Markdown container found:', !!markdownContainer);
      
      if (!markdownContainer) {
        console.log('No markdown container found');
        return;
      }

      // Check if buttons already exist
      if (markdownContainer.querySelector('.article-buttons-container')) {
        console.log('Buttons already exist, skipping');
        return;
      }

      // Find the first paragraph or heading after the title
      const title = markdownContainer.querySelector('h1');
      console.log('Title found:', !!title);
      
      if (!title) {
        console.log('No title found');
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

      console.log('Buttons injected successfully');
    };

    // Try immediately and after a delay
    injectButtons();
    const timeoutId = setTimeout(() => {
      console.log('Retrying button injection after timeout...');
      injectButtons();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const existingButtons = document.querySelector('.article-buttons-container');
      if (existingButtons) {
        existingButtons.remove();
      }
    };
  }, [currentUrl]);

  return <OriginalDocItemLayout {...props} />;
} 