import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { isMobileSdkDocument, getCorrespondingDocId } from '../../lib/sidebarMapping';



export default function SidebarMenu() {
  console.log('SidebarMenu component is rendering - START');
  console.log('SidebarMenu - component is being called');
  
  const router = useHistory();
  const { pathname } = router.location;
  const activeDocContext = useActiveDocContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  console.log('SidebarMenu - router:', router);
  console.log('SidebarMenu - pathname:', pathname);
  console.log('SidebarMenu - activeDocContext:', activeDocContext);
  
  // Debug: log the pathname and active context
  console.log('SidebarMenu pathname:', pathname);
  console.log('Active doc context:', activeDocContext);
  
  // Define platform options with correct paths
  const platforms = [
    { name: 'iOS', path: '/docs/ios-sdk-overview', sidebarId: 'sdkios' },
    { name: 'Android', path: '/docs/android-sdk-overview', sidebarId: 'sdkandroid' },
    { name: 'Flutter', path: '/docs/flutter-sdk-overview', sidebarId: 'sdkflutter' },
    { name: 'React Native', path: '/docs/react-native-sdk-overview', sidebarId: 'sdkreactnative' },
    { name: 'Unity', path: '/docs/unity-sdk-overview', sidebarId: 'sdkunity' },
  ];
  
  // Try to detect current platform from active sidebar
  let currentPlatform = platforms[0]; // Default to iOS
  
  console.log('SidebarMenu - activeDocContext:', activeDocContext);
  console.log('SidebarMenu - activeDocContext.sidebar:', activeDocContext?.sidebar);
  
  if (activeDocContext && activeDocContext.sidebar) {
    const sidebarId = activeDocContext.sidebar;
    console.log('SidebarMenu - detected sidebarId:', sidebarId);
    const detectedPlatform = platforms.find(p => p.sidebarId === sidebarId);
    console.log('SidebarMenu - detected platform:', detectedPlatform);
    if (detectedPlatform) {
      currentPlatform = detectedPlatform;
      console.log('SidebarMenu - using detected platform:', currentPlatform.name);
    }
  }
  
  // Fallback to URL-based detection
  if (currentPlatform === platforms[0]) {
    console.log('SidebarMenu - falling back to URL-based detection');
    console.log('SidebarMenu - pathname:', pathname);
    
    // More specific URL-based detection
    if (pathname.includes('react-native-sdk') || pathname.includes('reactnative')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkreactnative');
      console.log('SidebarMenu - detected React Native from URL');
    } else if (pathname.includes('ios-sdk') || pathname.includes('ios')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkios');
      console.log('SidebarMenu - detected iOS from URL');
    } else if (pathname.includes('android-sdk') || pathname.includes('android')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkandroid');
      console.log('SidebarMenu - detected Android from URL');
    } else if (pathname.includes('flutter-sdk') || pathname.includes('flutter')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkflutter');
      console.log('SidebarMenu - detected Flutter from URL');
    } else if (pathname.includes('unity-sdk') || pathname.includes('unity')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkunity');
      console.log('SidebarMenu - detected Unity from URL');
    } else {
      // Fallback to the old logic
      console.log('SidebarMenu - using old URL detection logic');
      currentPlatform = platforms.find(p => {
        const platformPath = p.name.toLowerCase().replace(' ', '-');
        return pathname.includes(platformPath);
      }) || platforms[0];
    }
  }
  
  console.log('Current platform detected:', currentPlatform.name, 'from sidebar:', activeDocContext?.sidebar);

  const handlePlatformChange = (platform) => {
    // Get the current document ID
    const currentDocId = activeDocContext?.activeDoc?.id;
    
    if (currentDocId) {
      // Try to find the corresponding document in the target platform
      const correspondingDocId = getCorrespondingDocId(currentDocId, platform.sidebarId);
      
      if (correspondingDocId) {
        // Navigate to the corresponding document
        router.push(`/docs/${correspondingDocId}`);
        console.log(`Navigating to corresponding page: ${correspondingDocId}`);
      } else {
        // Fallback to the platform overview page
        router.push(platform.path);
        console.log(`No corresponding page found, falling back to overview: ${platform.path}`);
      }
    } else {
      // If no current document ID, fallback to overview
      router.push(platform.path);
      console.log(`No current document ID, falling back to overview: ${platform.path}`);
    }
  };

  console.log('SidebarMenu - about to return JSX');
  
  // Get the current document ID from activeDocContext
  const currentDocId = activeDocContext?.activeDoc?.id;
  
  console.log('SidebarMenu - currentDocId:', currentDocId);
  console.log('SidebarMenu - activeDocContext:', activeDocContext);
  
  // Check if current document belongs to a mobile SDK sidebar
  const isMobileSdkPage = currentDocId && isMobileSdkDocument(currentDocId);
  
  console.log('SidebarMenu - currentDocId:', currentDocId);
  console.log('SidebarMenu - isMobileSdkPage:', isMobileSdkPage);
  
  // Also check if we're on a platform overview page by URL
  const isOverviewPage = pathname.includes('-sdk-overview');
  console.log('SidebarMenu - isOverviewPage:', isOverviewPage);
  
  // Show switcher if it's a mobile SDK page OR an overview page
  const shouldShowSwitcher = isMobileSdkPage || isOverviewPage;

  // Add/remove CSS class to sidebar container based on switcher visibility
  useEffect(() => {
    console.log('SidebarMenu useEffect - shouldShowSwitcher:', shouldShowSwitcher);
    
    // Find the sidebar container
    const sidebarContainer = document.querySelector('.theme-doc-sidebar-container');
    
    if (sidebarContainer) {
      if (shouldShowSwitcher) {
        sidebarContainer.classList.add('platform-switcher-visible');
        console.log('SidebarMenu - Added platform-switcher-visible class to sidebar container');
      } else {
        sidebarContainer.classList.remove('platform-switcher-visible');
        console.log('SidebarMenu - Removed platform-switcher-visible class from sidebar container');
      }
    } else {
      console.log('SidebarMenu - Sidebar container not found');
    }

    // Cleanup on unmount
    return () => {
      if (sidebarContainer) {
        sidebarContainer.classList.remove('platform-switcher-visible');
        console.log('SidebarMenu - Cleanup: removed platform-switcher-visible class from sidebar container');
      }
    };
  }, [shouldShowSwitcher]);

  // Don't show switcher if not on a mobile SDK page or overview page
  if (!shouldShowSwitcher) {
    console.log('SidebarMenu - not showing (not a mobile SDK page or overview page)');
    return null;
  }
  
  console.log('SidebarMenu - about to render the switcher');
  
  return (
    <div style={{
      width: '100%',
      padding: '24px 16px 8px 16px',
      background: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
      marginBottom: '4px',
      position: 'sticky',
      top: '0',
      zIndex: '10',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
                        <div style={{
                  color: '#495057', 
                  fontWeight: '600', 
                  fontSize: '15px',
                  whiteSpace: 'nowrap'
                }}>
                  Platform:
                </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <button
            style={{
              width: '100%',
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              color: '#495057',
              fontSize: '15px',
              fontWeight: '500',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minWidth: '0'
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
          >
            <span>{currentPlatform.name}</span>
            <svg
              style={{
                width: '12px',
                height: '12px',
                marginLeft: '8px',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              marginTop: '2px',
              padding: '8px'
            }}>
              {platforms.map((platform) => (
                <button
                  key={platform.name}
                  style={{
                    width: '100%',
                    padding: '6px 16px',
                    background: platform.name === currentPlatform.name ? 'var(--ifm-menu-color-background-active)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    color: platform.name === currentPlatform.name ? 'var(--purplePrimary)' : 'var(--textSecondary)',
                    fontWeight: platform.name === currentPlatform.name ? '600' : '400',
                    borderRadius: '8px',
                    margin: '0'
                  }}
                  onClick={() => {
                    handlePlatformChange(platform);
                    setIsDropdownOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (platform.name !== currentPlatform.name) {
                      e.target.style.background = 'var(--ifm-menu-color-background-hover)';
                      e.target.style.color = 'var(--textPrimary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (platform.name !== currentPlatform.name) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--textSecondary)';
                    } else {
                      e.target.style.background = 'var(--ifm-menu-color-background-active)';
                      e.target.style.color = 'var(--purplePrimary)';
                    }
                  }}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
