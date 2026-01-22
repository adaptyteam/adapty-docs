// Ask AI Indicator Script
// Creates a visual indicator pointing to the AI chat widget

(function() {
  'use strict';

  function createAskAIIndicator() {
    // Check if indicator already exists
    if (document.querySelector('.ask-ai-indicator')) {
      return;
    }

    // Create indicator container
    const indicator = document.createElement('div');
    indicator.className = 'ask-ai-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    
    // Create label
    const label = document.createElement('div');
    label.className = 'ask-ai-indicator__label';
    label.textContent = 'Ask AI';
    
    // Create arrow pointing right
    const arrow = document.createElement('svg');
    arrow.className = 'ask-ai-indicator__arrow';
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('stroke', 'currentColor');
    arrow.setAttribute('stroke-width', '2.5');
    arrow.setAttribute('stroke-linecap', 'round');
    arrow.setAttribute('stroke-linejoin', 'round');
    arrow.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"/>';
    
    indicator.appendChild(label);
    indicator.appendChild(arrow);
    document.body.appendChild(indicator);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAskAIIndicator);
  } else {
    createAskAIIndicator();
  }
})();
