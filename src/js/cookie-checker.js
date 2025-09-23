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
    }
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