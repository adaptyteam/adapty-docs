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
          <div className="primary-card-content">
            <div className="primary-card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
            <div className="primary-card-text">
              <h3>Quickstart guide</h3>
              <p className="primary-card-description">
                Connect Adapty to your store accounts, configure your products, and let Adapty purchases in your app.
              </p>
            </div>
          </div>
          <a href="/docs/quickstart" className="primary-card-button">
            Set up Adapty in my app
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
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
                Create paywall tests, launch them to real users, and track the best price, duration, and trial period.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Analytics Card */}
          <a href="/docs/analytics-charts" className="action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Explore revenue & churn analytics</h3>
              <p className="action-card-description">
                Check your Adapty dashboard and get Slack/email alerts on subscriptions, renewals, and churn.
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
              <h3 className="action-card-title">Connect Amplitude, AppsFlyer, and webhooks</h3>
              <p className="action-card-description">
                Send events to the 3rd party analytics and attribution tools your team already uses.
              </p>
            </div>
            <div className="action-card-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>

          {/* Offers Card */}
          <a href="/docs/offers-and-upsell-flows" className="action-card">
            <div className="action-card-icon" style={{ background: 'linear-gradient(135deg, #FECACA 0%, #FCA5A5 100%)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="action-card-content">
              <h3 className="action-card-title">Create offers & upsell flows</h3>
              <p className="action-card-description">
                Cut churn by offering discounts to cancels & create sticky upgrade for your current subscribers.
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
          <a href="/docs/sdk-installation-ios" className="platform-card">
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
          <a href="/docs/sdk-installation-android" className="platform-card">
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
          <a href="/docs/sdk-installation-reactnative" className="platform-card">
            <div className="platform-card-icon" style={{ color: '#61DAFB' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2"/>
                <path d="M12 2c2.4 0 4.7.6 6.5 1.7 2.1 1.3 3.3 3.1 3.3 5.3s-1.2 4-3.3 5.3c-1.8 1.1-4.1 1.7-6.5 1.7s-4.7-.6-6.5-1.7C3.4 13 2.2 11.2 2.2 9s1.2-4 3.3-5.3C7.3 2.6 9.6 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 22c-2.4 0-4.7-.6-6.5-1.7-2.1-1.3-3.3-3.1-3.3-5.3s1.2-4 3.3-5.3c1.8-1.1 4.1-1.7 6.5-1.7s4.7.6 6.5 1.7c2.1 1.3 3.3 3.1 3.3 5.3s-1.2 4-3.3 5.3c-1.8 1.1-4.1 1.7-6.5 1.7z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
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
          <a href="/docs/sdk-installation-flutter" className="platform-card">
            <div className="platform-card-icon" style={{ color: '#02569B' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
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
        </div>
      </section>
    </div>
  );
};

export default Homepage;
