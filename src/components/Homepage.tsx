import React from 'react';
import './Homepage.css';

const Homepage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <p className="hero-text">
          Adapty is a powerful and adaptable in-app purchase platform that helps you grow your subscriber base. Whether you're just starting or already have millions of users, Adapty makes it easy to set up the best subscription prices, test different approaches, and see what works best for your app's success.
        </p>
      </div>

      {/* Get Started Section */}
        <section className="get-started-section">
          <div className="primary-card">
            <div className="primary-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
            <div className="primary-card-content">
              <div className="primary-card-text">
                <h3>Quickstart guide</h3>
                <p className="primary-card-description">
                  Connect Adapty to your store accounts, configure your products, and let Adapty handle purchases in your app.
                </p>
              </div>
              <a href="/docs/quickstart" className="primary-card-button">
                Set up Adapty in my app
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

      {/* Step 2 Section */}
      <section className="step2-section">
        <h2 className="section-title">What do you want to do next?</h2>
        
        <div className="action-cards-grid">
          {/* A/B Testing Card */}
          <a href="/docs/ab-tests" className="action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Run your first A/B test</h3>
              <p className="action-card-description">
                Create A/B tests, launch them to your users, and track your top-performing variations.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Analytics Card */}
          <a href="/docs/charts" className="action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Explore revenue & churn analytics</h3>
              <p className="action-card-description">
                Review detailed metrics related to your app monetization.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Integrations Card */}
          <a href="/docs/events" className="action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="14" y="3" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="14" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="14" width="7" height="7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Connect integrations</h3>
              <p className="action-card-description">
                Send events to the third party analytics and attribution services your team already uses.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Paywall builder Card */}
          <a href="/docs/adapty-paywall-builder" className="action-card">
            <div className="action-card-icon" style={{background: 'linear-gradient(135deg, #FECACA 0%, #FCA5A5 100%)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                   stroke="#DC2626">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Design paywalls in the no-code builder</h3>
              <p className="action-card-description">
                Create paywalls in minutes with the Adapty Paywall Builder. Make changes to your paywalls without releasing a new version of your app.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Platform SDKs Section */}
      <section className="platforms-section">
        <h2 className="section-title">SDKs for every platform</h2>

        <div className="platform-cards-grid">
          {/* iOS */}
          <a href="/docs/ios-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">iOS</h3>
              <p className="platform-card-description">Guide for integrating Adapty with iOS</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Android */}
          <a href="/docs/android-sdk-overview" className="platform-card">
            <div className="platform-card-icon" style={{ color: '#3DDC84' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.5 11.5 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.08 11.35 2.5 14.2 2.5 17.5h19c0-3.3-1.58-6.15-3.9-8.02zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">Android</h3>
              <p className="platform-card-description">Guide for integrating Adapty with Android</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* React Native */}
          <a href="/docs/react-native-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="40" height="40" viewBox="0 0 65 65" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M42.3254 15.9862C42.9508 16.3462 43.4486 17.07 43.7073 18.2759C43.966 19.4818 43.959 21.0671 43.6567 22.948C43.5405 23.6707 43.382 24.4296 43.1819 25.2183C41.4262 24.8222 39.5125 24.5225 37.4894 24.3361C36.3159 22.6828 35.0988 21.1805 33.8767 19.8628C34.4618 19.2958 35.0419 18.7794 35.6117 18.3178C37.0946 17.1164 38.4682 16.3175 39.6452 15.938C40.8223 15.5584 41.6999 15.6263 42.3254 15.9862ZM31.2872 19.8628C30.702 19.2958 30.122 18.7794 29.5523 18.3178C28.0693 17.1164 26.6956 16.3176 25.5187 15.938C24.3416 15.5584 23.464 15.6263 22.8386 15.9862C22.2131 16.3462 21.7154 17.07 21.4566 18.2759C21.1978 19.4818 21.205 21.0671 21.5073 22.948C21.6233 23.6707 21.782 24.4296 21.982 25.2183C23.7378 24.8222 25.6515 24.5225 27.6744 24.3361C28.848 22.6828 30.0651 21.1805 31.2872 19.8628ZM32.5819 18.5374C31.9582 17.9329 31.3368 17.3796 30.7227 16.8821C29.1369 15.5973 27.5612 14.6522 26.0899 14.1778C24.6187 13.7033 23.1493 13.6711 21.9106 14.3841C20.672 15.0969 19.9652 16.3816 19.6418 17.8889C19.3183 19.3964 19.3515 21.2292 19.6748 23.2407C19.7999 24.0196 19.9698 24.8326 20.1831 25.6734C19.3461 25.9096 18.5548 26.1695 17.8156 26.4509C15.9064 27.1775 14.2976 28.0653 13.1498 29.0982C12.0019 30.1311 11.2393 31.3837 11.2393 32.8094C11.2393 34.2352 12.0019 35.4878 13.1498 36.5206C14.2976 37.5536 15.9064 38.4414 17.8156 39.168C18.5548 39.4494 19.3461 39.7092 20.1831 39.9455C19.9698 40.7861 19.7999 41.5992 19.6748 42.3781C19.3515 44.3895 19.3183 46.2225 19.6418 47.7299C19.9652 49.2372 20.672 50.5219 21.9106 51.2348C23.1493 51.9477 24.6187 51.9155 26.0899 51.441C27.5612 50.9666 29.1369 50.0215 30.7227 48.7367C31.3368 48.2392 31.9582 47.686 32.5819 47.0815C33.2056 47.686 33.8272 48.2392 34.4411 48.7367C36.0269 50.0215 37.6027 50.9666 39.074 51.441C40.5451 51.9155 42.0146 51.9477 43.2533 51.2348C44.4919 50.5219 45.1987 49.2372 45.5222 47.7299C45.8456 46.2225 45.8124 44.3895 45.4892 42.3781C45.364 41.5992 45.1941 40.7861 44.9807 39.9455C45.8178 39.7092 46.6091 39.4494 47.3483 39.168C49.2574 38.4414 50.8663 37.5536 52.0142 36.5206C53.1619 35.4878 53.9246 34.2352 53.9246 32.8094C53.9246 31.3837 53.1619 30.1311 52.0142 29.0982C50.8663 28.0653 49.2574 27.1775 47.3483 26.4509C46.6091 26.1695 45.8178 25.9096 44.9807 25.6734C45.1941 24.8326 45.364 24.0196 45.4892 23.2407C45.8124 21.2292 45.8456 19.3964 45.5222 17.8889C45.1987 16.3816 44.4919 15.0969 43.2533 14.3841C42.0146 13.6711 40.5451 13.7033 39.074 14.1778C37.6027 14.6522 36.0269 15.5973 34.4411 16.8821C33.8272 17.3796 33.2056 17.9329 32.5819 18.5374ZM42.6744 27.0008C41.4757 26.7338 40.1933 26.5124 38.8443 26.3437C39.2845 27.0296 39.7158 27.7363 40.1359 28.4617C40.5562 29.1873 40.9544 29.9129 41.3302 30.6359C41.8582 29.387 42.3069 28.1692 42.6744 27.0008ZM42.3968 32.8094C43.2464 30.9697 43.943 29.1678 44.4767 27.4538C45.2619 27.6755 46.0005 27.9182 46.6863 28.1792C48.4716 28.8586 49.8524 29.6452 50.7706 30.4716C51.6889 31.2979 52.0687 32.0895 52.0687 32.8094C52.0687 33.5294 51.6889 34.3209 50.7706 35.1473C49.8524 35.9736 48.4716 36.7602 46.6863 37.4397C46.0005 37.7007 45.2619 37.9433 44.4767 38.1649C43.943 36.4511 43.2464 34.6492 42.3968 32.8094ZM40.3455 32.8094C39.8 31.6804 39.194 30.5353 38.5287 29.3868C37.8635 28.2383 37.1718 27.1424 36.4637 26.107C35.2102 26.0134 33.9124 25.9641 32.5819 25.9641C31.2515 25.9641 29.9537 26.0134 28.7001 26.107C27.9921 27.1424 27.3003 28.2383 26.6352 29.3868C25.9699 30.5353 25.3638 31.6804 24.8183 32.8094C25.3638 33.9384 25.9699 35.0835 26.6352 36.2321C27.3003 37.3806 27.9921 38.4765 28.7001 39.5119C29.9537 39.6054 31.2515 39.6547 32.5819 39.6547C33.9124 39.6547 35.2102 39.6054 36.4637 39.5119C37.1718 38.4765 37.8635 37.3806 38.5287 36.2321C39.194 35.0835 39.8 33.9384 40.3455 32.8094ZM38.8443 39.2752C39.2845 38.5892 39.7158 37.8825 40.1359 37.1571C40.5562 36.4316 40.9544 35.7059 41.3302 34.9829C41.8582 36.2319 42.3069 37.4497 42.6744 38.618C41.4757 38.885 40.1933 39.1064 38.8443 39.2752ZM35.0678 41.4486C34.2519 41.4857 33.4224 41.5047 32.5819 41.5047C31.7416 41.5047 30.912 41.4857 30.0961 41.4486C30.9171 42.5289 31.7507 43.5253 32.5819 44.4266C33.4132 43.5253 34.2468 42.5289 35.0678 41.4486ZM33.8767 45.756C35.0988 44.4384 36.3159 42.936 37.4894 41.2828C39.5125 41.0963 41.4262 40.7967 43.1819 40.4005C43.382 41.1892 43.5405 41.9481 43.6567 42.6708C43.959 44.5518 43.966 46.137 43.7073 47.3429C43.4486 48.5489 42.9508 49.2726 42.3254 49.6325C41.6999 49.9925 40.8223 50.0605 39.6452 49.6808C38.4682 49.3012 37.0946 48.5025 35.6116 47.301C35.0419 46.8394 34.4618 46.3231 33.8767 45.756ZM31.2872 45.756C30.0651 44.4384 28.848 42.9361 27.6744 41.2828C25.6515 41.0963 23.7378 40.7967 21.982 40.4005C21.782 41.1892 21.6233 41.9481 21.5073 42.6708C21.205 44.5518 21.1978 46.137 21.4566 47.3429C21.7154 48.5489 22.2131 49.2726 22.8386 49.6325C23.464 49.9925 24.3416 50.0605 25.5187 49.6808C26.6956 49.3012 28.0693 48.5025 29.5523 47.301C30.122 46.8394 30.702 46.3231 31.2872 45.756ZM22.4895 38.618C23.6882 38.885 24.9705 39.1064 26.3195 39.2752C25.8794 38.5892 25.4481 37.8825 25.0279 37.1571C24.6078 36.4316 24.2095 35.7059 23.8337 34.9829C23.3058 36.2319 22.8569 37.4497 22.4895 38.618ZM23.8337 30.6359C24.2095 29.9129 24.6078 29.1873 25.0279 28.4617C25.4481 27.7363 25.8794 27.0296 26.3195 26.3437C24.9705 26.5124 23.6882 26.7338 22.4895 27.0008C22.8569 28.1692 23.3058 29.3869 23.8337 30.6359ZM22.767 32.8094C21.9175 34.6492 21.2209 36.4511 20.6872 38.1649C19.9021 37.9433 19.1635 37.7007 18.4775 37.4397C16.6924 36.7602 15.3116 35.9736 14.3933 35.1473C13.475 34.3209 13.0951 33.5294 13.0951 32.8094C13.0951 32.0895 13.475 31.2979 14.3933 30.4716C15.3116 29.6452 16.6924 28.8586 18.4775 28.1792C19.1635 27.9182 19.9021 27.6755 20.6872 27.4538C21.2209 29.1678 21.9175 30.9697 22.767 32.8094ZM30.0961 24.1701C30.912 24.1331 31.7416 24.1141 32.5819 24.1141C33.4224 24.1141 34.2519 24.1331 35.0678 24.1701C34.2468 23.0899 33.4132 22.0935 32.5819 21.1922C31.7507 22.0935 30.9171 23.0899 30.0961 24.1701ZM36.385 32.8093C36.385 34.9039 34.6817 36.6019 32.5805 36.6019C30.4793 36.6019 28.776 34.9039 28.776 32.8093C28.776 30.7146 30.4793 29.0166 32.5805 29.0166C34.6817 29.0166 36.385 30.7146 36.385 32.8093Z" fill="#61DAFB"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">React Native</h3>
              <p className="platform-card-description">Guide for integrating Adapty with React Native</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Flutter */}
          <a href="/docs/flutter-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="40" height="40" viewBox="0 0 65 65" fill="none">
                <path d="M46.7554 30.7551H34.7614L24.2676 41.2526L30.2631 47.2492L46.7554 30.7551Z" fill="#54C5F8"/>
                <path d="M21.2422 38.2482L15.2441 32.2494L34.7351 12.7559H46.7291L21.2422 38.2482Z" fill="#54C5F8"/>
                <path d="M30.2422 47.2532L34.7406 51.7522H46.7345L36.2404 41.2566L30.2422 47.2532Z" fill="#065B9D"/>
                <path d="M30.2422 47.2532L39.1373 44.1739L36.2404 41.2566L30.2422 47.2532Z" fill="url(#paint0_linear_flutter)"/>
                <path d="M30.2458 35.2583L24.249 41.2558L30.2458 47.2534L36.2426 41.2558L30.2458 35.2583Z" fill="#32B9F6"/>
                <defs>
                  <linearGradient id="paint0_linear_flutter" x1="31.9917" y1="48.412" x2="36.4591" y2="43.9452" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1A237E" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#1A237E" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">Flutter</h3>
              <p className="platform-card-description">Guide for integrating Adapty with Flutter</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/docs/unity-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="38" height="38" viewBox="0 0 64 65" fill="none">
                <path d="M33.5917 19.5381L40.0769 23.2809C40.31 23.4123 40.3185 23.7767 40.0769 23.9081L32.3709 28.3589C32.1378 28.4945 31.8622 28.486 31.646 28.3589L23.94 23.9081C23.7027 23.781 23.6985 23.408 23.94 23.2809L30.421 19.5381V12.2092L13.873 21.7634V40.8716V40.7826V40.8716L20.2184 37.2094V29.7238C20.2142 29.4567 20.5278 29.2659 20.761 29.4101L28.467 33.8607C28.7001 33.9963 28.8315 34.238 28.8315 34.4881V43.3852C28.8357 43.6522 28.5221 43.843 28.289 43.6989L21.8037 39.9561L15.4583 43.6183L32.0064 53.1724L48.5543 43.6183L42.209 39.9561L35.7237 43.6989C35.4948 43.8388 35.1726 43.6565 35.1811 43.3852V34.4881C35.1811 34.221 35.3295 33.9836 35.5457 33.8607L43.2517 29.4101C43.4806 29.2702 43.8027 29.4482 43.7942 29.7238V37.2094L50.1396 40.8716V21.7634L33.5917 12.2092V19.5381Z" fill="#111111"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">Unity</h3>
              <p className="platform-card-description">Guide for integrating Adapty with Unity</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/docs/kmp-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <defs>
                  <radialGradient id="kmp_gradient" cx="0" cy="0" r="1" gradientTransform="rotate(135 20.814 11.259) scale(61.5)" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#37BCFD"/>
                    <stop offset="0.58" stopColor="#7F52FF"/>
                    <stop offset="1" stopColor="#C711E1"/>
                  </radialGradient>
                </defs>
                <path fill="url(#kmp_gradient)" d="M0 22.563V.083l22.48 22.48H0Zm0 2.874V48h.057L22.62 25.437H0Zm25.99-3.428L48 0H3.981l22.01 22.01Zm.03 4.094L4.121 48h43.794L26.02 26.103Z"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">Kotlin Multiplatform</h3>
              <p className="platform-card-description">Guide for integrating Adapty with Kotlin Multiplatform</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/docs/capacitor-sdk-overview" className="platform-card">
            <div className="platform-card-icon">
              <svg width="32" height="32" viewBox="0 0 128 128" fill="none">
                <path fill="#53b9ff" d="M19.93 27.059.156 46.859l30.496 30.59L0 108.191l19.715 19.813L50.43 97.25l30.547 30.531 19.777-19.8Zm0 0"/>
                <path fill="#119eff" d="M70.258 77.45 50.43 97.25l30.547 30.531 19.777-19.8Zm0 0"/>
                <path fillOpacity=".2" d="M70.258 77.45 50.43 97.25l7.633 7.59Zm0 0"/>
                <path fill="#53b9ff" d="M97.285 50.492 128 19.738 108.215 0 77.512 30.691 46.957.156 27.184 19.957l80.82 80.922 19.777-19.8Zm0 0"/>
                <path fill="#119eff" d="m57.68 50.492 19.828-19.8L46.957.155 27.184 19.957Zm0 0"/>
                <path fillOpacity=".2" d="m57.68 50.492 19.828-19.8-7.633-7.594Zm0 0"/>
              </svg>
            </div>
            <div className="platform-card-content">
              <h3 className="platform-card-title">Capacitor</h3>
              <p className="platform-card-description">Guide for integrating Adapty with Capacitor</p>
            </div>
            <svg className="platform-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
