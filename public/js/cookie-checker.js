// Cookie checker script
// Loads Front Chat when A_Sesion=1 cookie is present

(function() {
  'use strict';

  // Temporarily disabled - skip entire script execution
  return;

  // Function to get cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }


  // Function to initialize Front Chat
  function initFrontChat() {
    // Check if Front Chat is already initialized
    if (window.FrontChat && !window.frontChatInitialized) {
      window.FrontChat('init', {chatId: '8c29a73497848bcc146ce8fa79bf4c57', useDefaultLauncher: false});
      window.frontChatInitialized = true;
      
      // Create custom Ask AI button after Front Chat is initialized
      // Temporarily disabled
      // setTimeout(() => {
      //   createCustomAskAIButton();
      // }, 1000);
    }
  }

  // Function to create custom Ask AI button
  function createCustomAskAIButton() {
    // Check if button already exists
    if (document.querySelector('.custom-ask-ai-button')) {
      return;
    }

    // Create the button element
    const button = document.createElement('div');
    button.className = 'custom-ask-ai-button';
    button.innerHTML = `
      <div class="ask-ai-text">
        <div class="ask-ai-line">Ask</div>
        <div class="ask-ai-line">AI</div>
      </div>
    `;

    // Add click handler to open Front chat
    button.addEventListener('click', () => {
      if (window.FrontChat) {
        window.FrontChat('show');
      }
    });

    // Add styles
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      cursor: pointer;
      opacity: 0;
      animation: askAiFadeIn 1s ease-out forwards;
    `;

    // Add CSS styles for the button
    if (!document.querySelector('#custom-ask-ai-styles')) {
      const style = document.createElement('style');
      style.id = 'custom-ask-ai-styles';
      style.textContent = `
        .custom-ask-ai-button {
          background: #6720ff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(103, 32, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .custom-ask-ai-button:hover {
          background: #7e41ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(103, 32, 255, 0.4);
        }
        
        .custom-ask-ai-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(103, 32, 255, 0.3);
        }
        
        .ask-ai-text {
          padding: 16px 40px;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1.2;
          color: #ffffff;
          text-align: center;
          white-space: nowrap;
        }
        
        .ask-ai-line {
          display: block;
        }
        
        @keyframes askAiFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(button);
  }

  // Function to load Front Chat script
  function loadFrontChatScript() {
    // Check if script is already loaded
    if (document.querySelector('script[src*="chat-assets.frontapp.com"]')) {
      initFrontChat();
      return;
    }

    // Load the Front Chat script
    const script = document.createElement('script');
    script.src = 'https://chat-assets.frontapp.com/v1/chat.bundle.js';
    script.async = true;
    script.onload = initFrontChat;
    script.onerror = () => console.error('Failed to load Front Chat script');
    document.head.appendChild(script);
  }

  // Function to remove custom Ask AI button
  function removeCustomAskAIButton() {
    const button = document.querySelector('.custom-ask-ai-button');
    if (button) {
      button.style.opacity = '0';
      button.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => {
        if (button && button.parentNode) {
          button.parentNode.removeChild(button);
        }
      }, 300);
    }
  }

  // Function to check cookie and initialize Front Chat
  function checkCookieAndInitChat() {
    const sessionCookie = getCookie('A_Sesion');
    const rlSessionCookie = getCookie('rl_session');
    
    // Check for authorization - A_Sesion=1 is primary, rl_session as backup
    if (sessionCookie === '1' || (rlSessionCookie && rlSessionCookie.length > 10)) {
      // Load and initialize Front Chat when cookies are present
      loadFrontChatScript();
    } else {
      // Reset Front Chat initialization flag when cookies are not present
      window.frontChatInitialized = false;
      // Remove custom Ask AI button when cookies are not present
      removeCustomAskAIButton();
    }
  }

  // Run check when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCookieAndInitChat);
  } else {
    checkCookieAndInitChat();
  }

  // Set up periodic checking (every 5 seconds) to handle dynamic cookie changes
  setInterval(checkCookieAndInitChat, 5000);

  // Also check when window gains focus (in case cookies were set in another tab)
  window.addEventListener('focus', checkCookieAndInitChat);

  // Export function for manual testing
  window.checkCookieAndInitChat = checkCookieAndInitChat;
})();