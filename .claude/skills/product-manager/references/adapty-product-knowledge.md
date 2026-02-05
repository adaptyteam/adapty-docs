# Adapty Product Knowledge

## Product Overview

Adapty is an in-app purchase platform for mobile apps that helps grow subscriber bases through:
- Subscription management and analytics
- Paywall A/B testing and optimization
- Integration with attribution and analytics platforms
- Revenue tracking and cohort analysis
- Apple Ads Manager - dedicated Apple Search Ads analytics and management
- Adapty UA (User Acquisition) - built-in attribution without third-party services

## Core User Personas

### 1. Mobile Developers (iOS, Android, React Native, Flutter, Unity)
**Pain points:**
- Complex subscription logic across App Store and Google Play
- Server-side validation and receipt verification
- Handling edge cases (grace periods, billing issues, refunds)
- Integration complexity with multiple SDKs

**What they need:**
- Clear SDK integration steps
- Code examples in their platform
- Troubleshooting for common errors
- Migration paths from other solutions (RevenueCat, etc.)

### 2. Product Managers
**Pain points:**
- Understanding subscription metrics (MRR, churn, LTV)
- Making data-driven pricing decisions
- Coordinating across dev, marketing, and analytics teams
- Balancing feature velocity with technical debt

**What they need:**
- Business impact of features
- Best practices for monetization
- How features connect to their goals
- Time-to-value for new features

### 3. Marketers / Growth Teams
**Pain points:**
- Attribution of subscription revenue to campaigns
- Understanding which paywalls convert better
- Personalizing offers for different user segments
- Tracking user journey from install to purchase
- High cost of attribution services (AppsFlyer, Adjust)
- Complex setup across multiple tools

**What they need:**
- Integration with attribution platforms OR built-in attribution (Adapty UA)
- Apple Search Ads analytics (Apple Ads Manager)
- A/B testing guidance
- Segment creation and targeting
- Event tracking and funnel analysis
- Campaign ROI tracking with subscription revenue

### 4. Data Analysts
**Pain points:**
- Exporting subscription data for custom analysis
- Combining Adapty data with other data sources
- Understanding metrics calculations
- Building custom reports

**What they need:**
- Webhook and API documentation
- Data export options (S3, Google Cloud Storage)
- Metric definitions and formulas
- Integration with BI tools

## Core Product Concepts

### Paywalls
Visual screens that offer subscription products to users. Key aspects:
- Built with Paywall Builder (no-code) or remote config (code-based)
- Can include multiple products, trials, offers
- Support localization and dark mode
- Include fallback paywalls for offline scenarios

**Common misunderstandings:**
- Paywalls ≠ Products (paywall displays products)
- Multiple paywalls can show the same product
- Changing paywall doesn't require app release (if using remote config/Paywall Builder)

### Onboardings
Interactive user onboarding flows that guide users through your app's value proposition before showing paywalls. Key aspects:
- Built with visual editor (no-code)
- Support quizzes, branching logic, and personalization
- Can connect to paywalls at key moments
- Include media, text, buttons, and custom HTML
- Support localization and offline mode

**Terminology note:** "Onboardings" is the correct plural in Adapty - it's okay to use this plural form in documentation.

**Value:** Improve conversion by showing value before asking for payment, personalize experience based on user responses

**Common misunderstandings:**
- Onboardings ≠ Paywalls (though they can lead to paywalls)
- You can use onboardings without paywalls (for pure user education)
- Changes to onboardings don't require app release

### Products
Subscription or one-time purchase items that can be created in Adapty and synced to stores, or created in stores and added to Adapty.
- Can be created in Adapty and pushed to App Store/Google Play
- Can be created in stores first and then added to Adapty
- Must have matching product IDs between Adapty and stores
- Associated with access levels
- Can have offers (trials, promotional pricing)

**Common misunderstandings:**
- You CAN create products in Adapty first and push to stores (not required to create in stores first)
- Deleting in Adapty doesn't delete from stores
- Product changes in stores may take hours to propagate
- Creating in Adapty doesn't automatically create in stores - you must explicitly push

### Placements
Locations in your app where you show paywalls (e.g., home screen, settings, after feature gate).
- Can have multiple audiences with different paywalls
- Support A/B testing
- Have priority ordering for audiences

**Value:** Decouple paywall logic from app code - change offers without app release

### Access Levels
Entitlements that unlock features in your app (e.g., "premium", "pro", "unlimited").
- Products grant access levels when purchased
- App checks access level to unlock features
- Automatically managed by Adapty based on subscription state

**Common misunderstandings:**
- Access levels are YOUR feature names, not store names
- One product can grant multiple access levels
- Multiple products can grant the same access level

### A/B Tests
Compare different paywalls to see which converts better.
- Run at placement level
- Automatically split traffic
- Track revenue, conversion, trial starts
- Can use Growth Autopilot for automatic winner selection

**Value:** Data-driven optimization of pricing and UI

### Integrations
Send subscription events to attribution and analytics platforms.
- Attribution: AppsFlyer, Adjust, Branch, Singular
- Analytics: Amplitude, Mixpanel, Firebase
- Messaging: Braze, OneSignal
- ETL: Webhook, S3, Google Cloud Storage

**Value:** Unified subscription data across tools

### Apple Ads Manager
Dedicated dashboard for Apple Search Ads analytics and campaign management.
- View detailed Apple Ads performance metrics
- Analyze campaign ROI and attribution
- Manage campaigns directly from Adapty
- Track user acquisition costs vs. revenue
- Create segments based on Apple Ads attribution

**Value:** Deep Apple Search Ads insights without leaving Adapty, direct campaign management

**Common use cases:**
- iOS apps running Apple Search Ads campaigns
- Analyzing which keywords drive highest-value subscribers
- Optimizing campaign spend based on LTV data
- Comparing organic vs. paid user behavior

**Common misunderstandings:**
- Apple Ads Manager ≠ Apple Ads / Apple Search Ads (it's Adapty's analytics dashboard for Apple Ads data, not Apple's platform)
- Apple Ads Manager ≠ Apple Search Ads console (it's Adapty's interface, not Apple's)
- Shows Apple Search Ads data only (not other ad networks)
- Requires Apple Search Ads integration to be configured
- You still run campaigns in Apple Search Ads console; Apple Ads Manager shows the analytics

### Adapty UA (User Acquisition)
Built-in attribution platform that eliminates need for third-party attribution services.
- Track user acquisition campaigns
- Attribute installs and subscriptions to campaigns
- Create tracking links for campaigns
- Measure campaign ROI with subscription data
- Integrate with ad platforms (Meta Ads, TikTok for Business)

**Value:** No need for AppsFlyer, Adjust, or other attribution services - attribution built into Adapty

**Key benefits:**
- Direct integration with subscription data (no data export needed)
- Deferred deep linking support
- Campaign performance tracking
- Attribution data in all Adapty analytics
- Lower cost (no separate attribution tool needed)

**Common use cases:**
- Apps that don't want to pay for separate attribution service
- Simple attribution needs focused on subscription revenue
- Apps already using Adapty wanting unified analytics

**When NOT to use:**
- Complex multi-touch attribution requirements
- Need for attribution features Adapty UA doesn't support
- Already heavily invested in another attribution platform

**Common misunderstandings:**
- Adapty UA ≠ Apple Ads Manager (UA is general attribution, Apple Ads Manager is Apple-specific)
- Can replace services like AppsFlyer/Adjust for many use cases
- Works alongside Apple Ads Manager (complementary products)

## Mobile Development Context

### SDK Integration Flow
1. Add dependency (CocoaPods, Gradle, npm, etc.)
2. Configure with API key
3. Identify users
4. Fetch paywalls
5. Present paywalls
6. Handle purchase results
7. Check access levels to gate features

### Common Integration Challenges
- Observer mode vs Full mode decision
- User identification and migration
- Testing purchases (Sandbox, TestFlight)
- Handling edge cases (network failures, receipt validation)
- Proper error handling

### Platform-Specific Considerations

**iOS:**
- StoreKit 1 vs StoreKit 2
- App Store review guidelines for subscriptions
- Family Sharing support
- Offer codes and promotional offers

**Android:**
- Billing Library versions
- Real-time developer notifications (RTDN)
- Deferred purchases
- Google Play billing policies

**Cross-platform (React Native, Flutter, Unity, Capacitor, Kotlin Multiplatform):**
- Platform-specific code requirements
- Debugging across native and JS/Dart layers (or shared Kotlin)
- Build configuration differences
- Platform-specific setup for native modules

**Capacitor:**
- Web + native hybrid framework
- JavaScript/TypeScript API
- Requires native plugin setup (iOS + Android)
- Web view considerations

**Kotlin Multiplatform (KMP):**
- Shared Kotlin code across iOS and Android
- Platform-specific implementations where needed
- iOS framework integration
- Gradle configuration

## Monetization Best Practices

### Paywall Optimization
- Show value before asking for payment
- Offer trials to reduce friction
- Test pricing and trial duration
- Use social proof and urgency carefully
- Clear CTA buttons

### User Onboarding
- Don't show paywall immediately (let users see value first)
- Strategic placement timing (after aha moment, feature gate, content gate)
- Progressive disclosure of features
- Clear value proposition

### Retention & Churn Prevention
- Grace period handling for failed payments
- Win-back campaigns for churned users
- Offer management for different user segments
- Refund prevention strategies

## Documentation Best Practices for Adapty

### For Developers
- Start with "why" (what problem this solves)
- Show minimal working example first
- Include error handling
- Link to SDK reference docs
- Mention platform-specific gotchas

### For Product Managers
- Lead with business impact
- Explain how feature affects metrics
- Show real use cases
- Connect to common workflows
- Include decision frameworks

### For Marketers
- Focus on user-facing impact
- Explain attribution and tracking
- Show campaign setup examples
- Connect to conversion optimization
- Include segmentation guidance

## Common Documentation Gaps

**Missing context:**
- Not explaining when to use a feature vs alternatives
- Assuming knowledge of subscription fundamentals
- Skipping the "why" and jumping to "how"

**Unclear scope:**
- Not specifying which platforms support a feature
- Missing prerequisites or limitations
- Unclear versioning (SDK version, API version)

**Poor onboarding:**
- Starting with advanced features instead of basics
- No quickstart or getting started guide
- Too much information at once

**Lack of troubleshooting:**
- No common errors section
- Missing "what to do if..." guidance
- No debugging tips