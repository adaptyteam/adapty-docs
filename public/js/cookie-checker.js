// Cookie checker script
// Loads Front Chat when A_Sesion=1 cookie is present

(function() {
  'use strict';

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
      window.FrontChat('init', {chatId: '8c29a73497848bcc146ce8fa79bf4c57', useDefaultLauncher: true});
      window.frontChatInitialized = true;
      
      // Show Ask AI pointer after Front Chat is fully loaded and visible
      setTimeout(() => {
        waitForChatButton();
      }, 2000);
      
      // Fallback: also show pointer after 5 seconds regardless
      setTimeout(() => {
        if (!document.querySelector('.ask-ai-pointer')) {
          createAskAIPointer();
        }
      }, 5000);
    }
  }

  // Function to wait for Front Chat button to be visible
  function waitForChatButton() {
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds total (20 * 500ms)
    
    const checkForButton = () => {
      attempts++;
      
      // Look for Front Chat button with multiple selectors
      const chatButton = document.querySelector('[class*="fc-"]') || 
                        document.querySelector('[class*="front"]') || 
                        document.querySelector('[class*="chat"]') ||
                        document.querySelector('iframe[src*="frontapp.com"]') ||
                        document.querySelector('iframe[src*="front"]') ||
                        document.querySelector('div[style*="position: fixed"][style*="bottom"]') ||
                        document.querySelector('div[style*="z-index"]');
      
      if (chatButton) {
        // Chat button is visible, now show our pointer
        createAskAIPointer();
      } else if (attempts < maxAttempts) {
        // Keep checking every 500ms
        setTimeout(checkForButton, 500);
      } else {
        // Fallback: show pointer even if chat button not detected
        createAskAIPointer();
      }
    };
    
    checkForButton();
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

  // Function to create Ask AI pointer
  function createAskAIPointer() {
    // Check if pointer already exists
    if (document.querySelector('.ask-ai-pointer')) {
      return;
    }

    // Create the pointer element
    const pointer = document.createElement('div');
    pointer.className = 'ask-ai-pointer';
    pointer.innerHTML = `
      <div class="ask-ai-text">
        <div class="ask-ai-line">Ask</div>
        <div class="ask-ai-line">AI</div>
      </div>
    `;

    // Add styles
    pointer.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 90px;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      animation: askAiFadeIn 1s ease-out forwards;
    `;

    // Add CSS styles for the text
    if (!document.querySelector('#ask-ai-styles')) {
      const style = document.createElement('style');
      style.id = 'ask-ai-styles';
      style.textContent = `
        .ask-ai-text {
          background: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 27px;
          line-height: 1.2;
          color: #000000;
          text-align: center;
          white-space: nowrap;
        }
        
        .ask-ai-line {
          display: block;
        }
        
        @keyframes askAiFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(pointer);
  }

  // Function to remove Ask AI pointer
  function removeAskAIPointer() {
    const pointer = document.querySelector('.ask-ai-pointer');
    if (pointer) {
      pointer.style.opacity = '0';
      pointer.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => {
        if (pointer && pointer.parentNode) {
          pointer.parentNode.removeChild(pointer);
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
      // Remove Ask AI pointer when cookies are not present
      removeAskAIPointer();
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