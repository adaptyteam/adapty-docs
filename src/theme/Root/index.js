import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({children}) {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Add script to head
    const script = document.createElement('script');
    script.innerHTML = `
      // Simple script to make parent dropdowns active when children are active
      (function() {
        function updateDropdownStates() {
          const dropdowns = document.querySelectorAll('.navbar__item.dropdown');
          
          dropdowns.forEach(function(dropdown) {
            const activeChild = dropdown.querySelector('.dropdown__link--active');
            
            if (activeChild) {
              dropdown.classList.add('dropdown--has-active-child');
            } else {
              dropdown.classList.remove('dropdown--has-active-child');
            }
          });
        }
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', updateDropdownStates);
        } else {
          updateDropdownStates();
        }
        
        // Run after a short delay to catch any delayed rendering
        setTimeout(updateDropdownStates, 100);
        
        // Run periodically for SPA navigation
        setInterval(updateDropdownStates, 3000);
      })();
    `;
    document.head.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Note: Meta tags for keywords and rank are now handled by the build-time plugin
  // This ensures they are properly injected into the HTML during the build process

  return <>{children}</>;
}