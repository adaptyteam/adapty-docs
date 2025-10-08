import React, { useEffect, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { isMobileSdkDocument, getCorrespondingDocId } from '../../lib/sidebarMapping';



export default function SidebarMenu() {
  
  const router = useHistory();
  const { pathname } = router.location;
  const activeDocContext = useActiveDocContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  // Debug: log the pathname and active context
  
  // Define platform options with correct paths
  const platforms = [
    { name: 'iOS', path: '/docs/ios-sdk-overview', sidebarId: 'sdkios' },
    { name: 'Android', path: '/docs/android-sdk-overview', sidebarId: 'sdkandroid' },
    { name: 'Flutter', path: '/docs/flutter-sdk-overview', sidebarId: 'sdkflutter' },
    { name: 'React Native', path: '/docs/react-native-sdk-overview', sidebarId: 'sdkreactnative' },
    { name: 'Unity', path: '/docs/unity-sdk-overview', sidebarId: 'sdkunity' },
      { name: 'Kotlin Multiplatform', path: '/docs/kotlin-multiplatform-sdk-overview', sidebarId: 'sdkkmp' },
      { name: 'Capacitor (Beta)', path: '/docs/capacitor-sdk-overview', sidebarId: 'sdkcapacitor' },
  ];
  
  // Try to detect current platform from active sidebar
  let currentPlatform = platforms[0]; // Default to iOS

  
  if (activeDocContext && activeDocContext.sidebar) {
    const sidebarId = activeDocContext.sidebar;
    const detectedPlatform = platforms.find(p => p.sidebarId === sidebarId);
    if (detectedPlatform) {
      currentPlatform = detectedPlatform;
    }
  }
  
  // Fallback to URL-based detection
  if (currentPlatform === platforms[0]) {
    
    // More specific URL-based detection
    if (pathname.includes('react-native-sdk') || pathname.includes('reactnative')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkreactnative');
    } else if (pathname.includes('ios-sdk') || pathname.includes('ios')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkios');
    } else if (pathname.includes('android-sdk') || pathname.includes('android')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkandroid');
    } else if (pathname.includes('flutter-sdk') || pathname.includes('flutter')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkflutter');
    } else if (pathname.includes('unity-sdk') || pathname.includes('unity')) {
      currentPlatform = platforms.find(p => p.sidebarId === 'sdkunity');
    } else if (pathname.includes('capacitor-sdk') || pathname.includes('capacitor')) {
        currentPlatform = platforms.find(p => p.sidebarId === 'sdkcapacitor');
    } else if (pathname.includes('kmp') || pathname.includes('kotlin-multiplatform')) {
        currentPlatform = platforms.find(p => p.sidebarId === 'sdkkmp');
    } else {
      // Fallback to the old logic
      currentPlatform = platforms.find(p => {
        const platformPath = p.name.toLowerCase().replace(' ', '-');
        return pathname.includes(platformPath);
      }) || platforms[0];
    }
  }


  const handlePlatformChange = (platform) => {
    // Get the current document ID
    const currentDocId = activeDocContext?.activeDoc?.id;
    
    if (currentDocId) {
      // Try to find the corresponding document in the target platform
      const correspondingDocId = getCorrespondingDocId(currentDocId, platform.sidebarId);
      
      if (correspondingDocId) {
        // Navigate to the corresponding document
        router.push(`/docs/${correspondingDocId}`);
      } else {
        // Fallback to the platform overview page
        router.push(platform.path);
      }
    } else {
      // If no current document ID, fallback to overview
      router.push(platform.path);
    }
  };

  
  // Get the current document ID from activeDocContext
  const currentDocId = activeDocContext?.activeDoc?.id;

  
  // Check if current document belongs to a mobile SDK sidebar
  const isMobileSdkPage = currentDocId && isMobileSdkDocument(currentDocId);

  
  // Also check if we're on a platform overview page by URL
  const isOverviewPage = pathname.includes('-sdk-overview');
  
  // Show switcher if it's a mobile SDK page OR an overview page
  const shouldShowSwitcher = isMobileSdkPage || isOverviewPage;

  // Add/remove CSS class to sidebar container based on switcher visibility
  useEffect(() => {
    
    // Find the sidebar container
    const sidebarContainer = document.querySelector('.theme-doc-sidebar-container');
    
    if (sidebarContainer) {
      if (shouldShowSwitcher) {
        sidebarContainer.classList.add('platform-switcher-visible');
      } else {
        sidebarContainer.classList.remove('platform-switcher-visible');
      }
    } else {
    }

    // Cleanup on unmount
    return () => {
      if (sidebarContainer) {
        sidebarContainer.classList.remove('platform-switcher-visible');
      }
    };
  }, [shouldShowSwitcher]);

  // Don't show switcher if not on a mobile SDK page or overview page
  if (!shouldShowSwitcher) {
    return null;
  }

  
  return (
    <div style={{
      width: '100%',
      padding: '24px 16px 8px 16px',
      background: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
      position: 'sticky',
      top: '0',
      zIndex: '10',
      flexShrink: 0,
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
