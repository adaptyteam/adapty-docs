# Adapty Mail — Documentation Plan

## Overview

New top-level section in `tutorial.json` following the same pattern as **Apple Ads Manager** and **Adapty UA**: a landing article with `CustomDocCardList`, then a Get Started guide, then topic articles organized into categories.

**Total articles: 13** (1 landing + 12 topic articles)  
**File prefix:** `mail-`  
**Folder:** `src/content/docs/version-3.0/`

---

## Sidebar structure (tutorial.json)

Add this block after the Adapty UA section:

```json
{
  "type": "category",
  "label": "Adapty Mail",
  "link": {
    "type": "doc",
    "id": "adapty-mail"
  },
  "collapsible": false,
  "collapsed": true,
  "items": [
    {
      "type": "doc",
      "id": "mail-get-started",
      "label": "Get started"
    },
    {
      "type": "category",
      "label": "Setup",
      "items": [
        {
          "type": "doc",
          "id": "mail-collect-emails",
          "label": "Collect user emails"
        },
        {
          "type": "doc",
          "id": "mail-sending-domain",
          "label": "Set up your sending domain"
        },
        {
          "type": "doc",
          "id": "mail-checkout",
          "label": "Set up checkout"
        }
      ]
    },
    {
      "type": "category",
      "label": "Email campaigns",
      "items": [
        {
          "type": "doc",
          "id": "mail-create-campaign",
          "label": "Create a campaign"
        },
        {
          "type": "doc",
          "id": "mail-email-purposes",
          "label": "Email purposes"
        },
        {
          "type": "doc",
          "id": "mail-email-layouts",
          "label": "Email layouts"
        },
        {
          "type": "doc",
          "id": "mail-tone-presets",
          "label": "Tone presets"
        },
        {
          "type": "doc",
          "id": "mail-audience-segments",
          "label": "Audience and segments"
        },
        {
          "type": "doc",
          "id": "mail-launch-campaign",
          "label": "Launch a campaign"
        },
        {
          "type": "doc",
          "id": "mail-suppression",
          "label": "Unsubscribe and suppression"
        }
      ]
    },
    {
      "type": "category",
      "label": "Analytics",
      "items": [
        {
          "type": "doc",
          "id": "mail-analytics",
          "label": "Campaign analytics"
        },
        {
          "type": "doc",
          "id": "mail-ab-testing",
          "label": "A/B testing"
        }
      ]
    }
  ]
}
```

**Structural decisions:**
- Domain warm-up → section within `mail-sending-domain`, not a separate article (single concept, ~200 words)
- Regenerating emails → section within `mail-create-campaign` (it's a post-generation action, not a standalone workflow)
- "Checkout & Paywall" renamed to "Set up checkout" (action-oriented, consistent with our heading style)

---

## Articles

---

### 1. `adapty-mail.mdx` — Adapty Mail (landing)

**Pattern:** mirrors `adapty-ads-manager.mdx` and `adapty-user-acquisition.mdx`  
**Audience:** anyone evaluating or starting with the product

**Frontmatter:**
```yaml
title: "Adapty Mail"
description: "AI-generated email campaigns that turn trial users into paid subscribers."
metadataTitle: "Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email campaigns', 'trial conversion']
```

**Structure:**

```
[CustomDocCardList with: mail-get-started, mail-collect-emails, mail-sending-domain, mail-create-campaign, mail-analytics]

Intro paragraph (no heading):
  - What Adapty Mail is: turns Adapty user data into AI-generated email sequences
    that convert trial users into paid subscribers
  - How it connects to the broader Adapty ecosystem (uses profile data, tracks revenue)

## Why Adapty Mail?
  - Problem: you have trial users with emails, but sending targeted email campaigns
    requires copy, design, sending infrastructure, and attribution — all hard to set up
  - Solution: paste your App Store link → get a full email sequence in 2 minutes,
    sent from your domain, with personalized checkout links and purchase attribution

## How it works
  Three steps, presented as a numbered list or flow:
  1. Collect emails — your app passes user emails + IDs to Adapty via SDK
  2. Generate a sequence — AI analyzes your App Store listing and produces
     3–15 emails: copy, design, hero images, personalized checkout links
  3. Launch — Adapty segments your audience and sends via your verified domain;
     revenue from email clicks is attributed back to specific emails

## Requirements
  :::important callout listing:
  - Adapty account [QUESTION FOR PM: which plan?]
  - Email collection set up in your app (see mail-collect-emails)
  - A domain you control (for DNS setup)
  - FunnelFox account (for checkout)
  - Stripe account (for payment processing)
  :::

## Get started
  Short paragraph → link to mail-get-started
```

---

### 2. `mail-get-started.mdx` — Get started with Adapty Mail

**Pattern:** mirrors `adapty-ads-manager-get-started.mdx` — actual inline steps, not a link hub  
**Audience:** developer or technical founder doing initial setup  
**Goal:** complete self-contained setup walkthrough; the three Setup section articles are deep-reference companions, not prerequisites for reading this one

**Frontmatter:**
```yaml
title: "Get started with Adapty Mail"
description: "Set up Adapty Mail and launch your first email campaign."
metadataTitle: "Get started with Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email campaigns', 'get started']
```

**Structure:**

```
Intro paragraph:
  "In this guide, you will set up Adapty Mail and launch your first email campaign.
  The setup has three parts: passing user emails to Adapty via SDK, verifying your
  sending domain, and configuring your checkout funnel. Once those are done, you
  can generate and launch a campaign."

:::note
  Adapty Mail requires a FunnelFox account for checkout and Stripe for payment
  processing. [QUESTION FOR PM: link to FunnelFox signup or explain provisioning]
:::

## Before you start
  - Your app already sends revenue events to Adapty (Adapty SDK installed).
    If not: link to quickstart guide or observer mode docs.
  - You have access to your domain's DNS settings.
  - You have a FunnelFox account and a Stripe account.

## 1. Pass user emails to Adapty
  Adapty Mail needs two pieces of data per user: a stable identifier and their
  email address. If you already call Adapty.identify() in your app, you only
  need to add the email step.

  ### Identify your users
  Call Adapty.identify() with a stable user ID (backend ID, Firebase UID, or similar):
  - [iOS](identifying-users)
  - [Android](android-identifying-users)
  - [React Native](react-native-identifying-users)
  - [Flutter](flutter-identifying-users)
  - [Unity](unity-identifying-users)
  - [Kotlin Multiplatform](kmp-identifying-users)
  - [Capacitor](capacitor-identifying-users)

  ### Pass the email
  After the user provides their email, pass it to Adapty via updateProfile:
  - [iOS](setting-user-attributes)
  - [Android](android-setting-user-attributes)
  - [React Native](react-native-setting-user-attributes)
  - [Flutter](flutter-setting-user-attributes)
  - [Unity](unity-setting-user-attributes)
  - [Kotlin Multiplatform](kmp-setting-user-attributes)
  - [Capacitor](capacitor-setting-user-attributes)

  If your app doesn't collect emails yet, see [Collect user emails](mail-collect-emails)
  for five strategies, from existing auth to onboarding gates.

## 2. Set up your sending domain
  Adapty Mail sends from your own domain. You add DNS records once — all campaigns
  use the same verified domain.

  1. In Adapty Mail, go to **Settings → Domain**
  2. Enter your root domain (e.g., yourapp.com — not a subdomain) and click **Continue**
  3. Adapty generates two sending subdomains and shows the required DNS records
  4. In your domain registrar, add the 10 DNS records shown (5 per subdomain):
     - 3 CNAME records (DKIM) per subdomain
     - 1 MX record (Mail-From) per subdomain
     - 1 TXT record (SPF) per subdomain
  5. Optionally add a DMARC TXT record on your root domain (recommended)
  6. Return to **Settings → Domain** and click **Verify**

  Verification typically completes within **10–30 minutes**. The window expires
  after 7 days — if it lapses, restart from step 1.

  :::note
  DNS changes can take up to 48 hours to propagate, though most registrars
  update within minutes.
  :::

  [SCREENSHOT: DNS records table in Adapty Mail UI]
  [SCREENSHOT: verification status]

  For details on each record type and domain warm-up, see
  [Set up your sending domain](mail-sending-domain).

## 3. Set up checkout
  Each email contains a unique checkout link per recipient. The funnel is powered
  by FunnelFox and connected to your Stripe account.

  [NOTE FOR ELINA: test the setup flow in Settings → Checkout and document the
  exact steps here — funnel creation or linking, Stripe connection, and publishing.
  Screenshots of each step needed.]

  For details on the checkout funnel anatomy and how personalization works, see
  [Set up checkout](mail-checkout).

## 4. Create and launch your first campaign
  1. In Adapty Mail, go to **Campaigns → Create**
  2. Paste your App Store link
  3. Select a tone preset and optionally set an email count (3–15)
  4. Click **Generate** — the AI produces your sequence in under 2 minutes
  5. Preview each email; regenerate any that don't fit
  6. Click **Launch**

  See [Create a campaign](mail-create-campaign) and [Launch a campaign](mail-launch-campaign)
  for full details.

## Learn more
  - [Collect user emails](mail-collect-emails) — strategies for getting email coverage if your app doesn't collect them yet
  - [Set up your sending domain](mail-sending-domain) — DNS record details, warm-up tiers, troubleshooting
  - [Set up checkout](mail-checkout) — checkout funnel anatomy and personalization
  - [Campaign analytics](mail-analytics) — track delivery, engagement, and revenue
  - [A/B testing](mail-ab-testing) — test multiple sequence versions
```

---

### 3. `mail-collect-emails.mdx` — Collect user emails

**Audience:** developer  
**Role:** deep-reference companion to Get started. Readers arrive here from the "Learn more" link when their app doesn't already collect emails. The minimal SDK steps live in Get started; this article covers strategies, coverage verification, and edge cases.

**Frontmatter:**
```yaml
title: "Collect user emails for Adapty Mail"
description: "Learn how to pass user emails and identifiers to Adapty so campaigns can reach your users."
metadataTitle: "Collect User Emails | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email collection', 'updateProfile', 'identify']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail needs two pieces of data for each user: their email (for delivery)
  and their customer_user_id (for personalized checkout links and purchase attribution).
  Both must reach Adapty before you launch a campaign.

## Identify your users
  Each user must be identified with a stable ID before their email is passed.
  Call Adapty.identify() with a backend user ID, Firebase UID, or similar.
  
  Link to existing SDK docs for identify:
  - [iOS](identifying-users)
  - [Android](android-identifying-users)
  - [React Native](react-native-identifying-users)
  - [Flutter](flutter-identifying-users)
  - [Unity](unity-identifying-users)
  - [Kotlin Multiplatform](kmp-identifying-users)
  - [Capacitor](capacitor-identifying-users)

## Pass the email to Adapty
  After obtaining the user's email, pass it via updateProfile with the email parameter.
  
  Link to existing SDK docs for updateProfile:
  - [iOS](setting-user-attributes)
  - [Android](android-setting-user-attributes)
  - [React Native](react-native-setting-user-attributes)
  - [Flutter](flutter-setting-user-attributes)
  - [Unity](unity-setting-user-attributes)
  - [Kotlin Multiplatform](kmp-setting-user-attributes)
  - [Capacitor](capacitor-setting-user-attributes)

## Email collection strategies
  Intro: most apps don't collect emails by default. Here are five ways to do it,
  roughly ordered from easiest to most effort.

  ### Apps with existing authentication
    If users sign up with email/password, Firebase, Supabase, social login, or magic
    links — you already have their email. Pass it to Adapty after login.

  ### Email gate before the paywall
    Add an email prompt immediately before showing the paywall. Reported conversion:
    70–90%. Works best for apps with high paywall engagement.

  ### FunnelFox checkout (web)
    Users who reach checkout via email provide their email on the web, without any
    in-app code. This covers users who come from campaigns before an email gate exists.

  ### Onboarding step
    Add an email input to your multi-step onboarding, ideally after users have invested
    time (e.g., after completing a quiz or setting goals). Higher completion than early gates.

  ### Server-side API import
    For users migrating from another email platform or re-engaging a historical list.
    Use Adapty's server-side API to import profiles with emails.
    [QUESTION FOR PM: link to the correct API endpoint in api.json sidebar]

## Verify your email coverage
  After implementing collection, check coverage in the Adapty dashboard:
  - Go to **Customers → Profiles**
  - Filter by profiles that have an email set
  - Target: at least 30–50% email coverage among your active users
  
  :::tip
  Launch campaigns as soon as you hit 30% coverage — you don't need to wait
  for 100%. New users who provide emails later are automatically enrolled.
  :::

## Users without an email
  Users without an email on their Adapty profile are excluded from campaign
  delivery and don't appear in campaign analytics until they provide one.
```

---

### 4. `mail-sending-domain.mdx` — Set up your sending domain

**Audience:** developer or technical founder  
**Role:** deep-reference companion to Get started. Readers arrive here when they want the full DNS record explanation, the complete warm-up tier table, or need to troubleshoot verification. The minimal setup steps live in Get started.

**Frontmatter:**
```yaml
title: "Set up your sending domain for Adapty Mail"
description: "Add DNS records and verify your domain so Adapty Mail can send emails on your behalf."
metadataTitle: "Sending Domain Setup | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'sending domain', 'DNS', 'DKIM', 'SPF', 'email deliverability']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail sends from your own domain — not from a shared address — so your
  sender reputation stays under your control. You set this up once and it applies
  to all your campaigns.

## Requirements
  :::important
  - Submit your root domain (e.g., yourapp.com), not a subdomain
  - The domain must have active NS records
  - One domain per Adapty project; a domain cannot be shared across projects
  :::

## Add your domain
  1. In Adapty Mail, go to **Settings → Domain**
  2. Enter your root domain and click **Continue**
  3. Review the DNS records preview and click **Confirm**

  Adapty automatically creates two sending subdomains:
  `mail.yourapp.com` and `email.yourapp.com` — each with independent
  SES identity and authentication.

  [SCREENSHOT: domain entry field and preview]

## Add DNS records
  You must add 10 DNS records to your domain registrar (5 per subdomain).
  Add all records before initiating verification.

  :::note
  DNS changes can take up to 48 hours to propagate, though most registrars
  update within minutes.
  :::

  For each subdomain, add:

  | Type  | Purpose           | Count | Notes                                      |
  |-------|-------------------|-------|--------------------------------------------|
  | CNAME | DKIM              | 3     | Cryptographic signatures proving email integrity |
  | MX    | Mail-From         | 1     | Bounce handling                            |
  | TXT   | SPF (Mail-From)   | 1     | Sender authorization                       |

  Additionally, add one optional record on your root domain:

  | Type | Purpose | Notes                                      |
  |------|---------|---------------------------------------------|
  | TXT  | DMARC   | Recommended for enhanced security; optional |

  [SCREENSHOT: DNS records table in the Adapty Mail UI — the exact values to copy]

## Verify your domain
  After adding all DNS records:
  1. Return to **Settings → Domain** in Adapty Mail
  2. Click **Verify**

  Adapty checks your DNS records automatically every 5 minutes.
  Verification typically completes within **10–30 minutes**.

  :::important
  The verification window expires after **7 days**. If you don't verify within
  that time, you'll need to restart the domain setup.
  :::

  [SCREENSHOT: verification status — pending and verified states]

## Domain warm-up
  When you first send from a new domain, email providers like Gmail and Yahoo
  don't have reputation data for it yet. Sending too much volume too quickly
  triggers spam filters.

  Adapty Mail manages warm-up automatically — no configuration required.

  ### How warm-up works
  Sending volume increases gradually across 14 tiers as your deliverability
  metrics stay healthy:

  | Tier | Daily limit |
  |------|-------------|
  | 1    | 200 emails  |
  | 2    | 500 emails  |
  | ...  | ...         |
  | 14   | 30,000 emails |

  [QUESTION FOR PM: get the full tier table with daily limits for all 14 tiers]

  The system advances your domain automatically when:
  - Bounce rates stay below safe thresholds
  - Spam complaint rates are minimal
  - Delivery rates remain strong

  If metrics degrade, tier advancement pauses or reverses until reputation recovers.

  ### Impact on launch by audience size
  | Audience size       | Effect at launch                          |
  |---------------------|-------------------------------------------|
  | Under 200 users     | Full audience reached on day one           |
  | 200 – 2,000 users   | Delivery spreads over several days         |
  | 2,000+ users        | Delivery spreads over 1–2 weeks            |

  :::tip
  Launch your first campaign immediately after DNS verification completes.
  The sooner you start sending, the sooner you advance through tiers and
  reach full daily capacity.
  :::
```

---

### 5. `mail-checkout.mdx` — Set up checkout

**Audience:** developer or technical founder  
**Role:** deep-reference companion to Get started. Readers arrive here for checkout funnel anatomy, personalization details, and customization options. The minimal setup steps (connect FunnelFox, link Stripe, publish) live in Get started.

**Frontmatter:**
```yaml
title: "Set up checkout for Adapty Mail"
description: "Connect FunnelFox and Stripe to give your email campaigns a personalized web checkout."
metadataTitle: "Checkout Setup | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'checkout', 'funnelfox', 'stripe', 'paywall']
```

**Structure:**

```
Intro paragraph:
  Each email Adapty Mail sends contains a unique checkout link for that recipient.
  When users click, they land on a web checkout funnel that identifies them by their
  profile, presents your offer, and processes payment via Stripe.
  The funnel is generated by FunnelFox and connected to Adapty Mail in Settings.

## Requirements
  - A FunnelFox account [QUESTION FOR PM: link to FunnelFox signup or provisioning info]
  - A Stripe account with your subscription products configured

## Set up your checkout funnel

  [NOTE FOR ELINA: please test the setup flow in Settings → Checkout and document
  the exact steps here. Key things to capture:
  - How to create or link a FunnelFox funnel
  - How to connect your Stripe account
  - What "Publish" does and when it's required
  - Any settings or options available during setup
  Screenshots of each step are needed.]

## What the checkout looks like
  When a user clicks a checkout link, they go through a four-screen funnel:

  **1. Email confirmation**
  Greets the user by name or email. Confirms their identity before proceeding.

  **2. Main conversion page**
  A full-page sales presentation with:
  - Benefit-driven headline
  - Urgency badge (without false pricing)
  - Call-to-action button
  - Emoji benefit cards (3–6)
  - Feature descriptions (3–8)
  - Plan selector with timer
  - User reviews (3–5)
  - FAQ section (3–6 questions)
  - Guarantee language

  **3. Payment success**
  A celebratory message with next steps and an AI-generated image.

  **4. Payment failed**
  A supportive "try again" message that encourages retry without friction.

  [SCREENSHOT: example checkout screens]

## How personalization works
  Every email contains a unique checkout URL with the recipient's customer_user_id
  and email address embedded as parameters. When a purchase completes, Adapty
  attributes the revenue to the specific email that drove the conversion.
  This data appears in [Campaign analytics](mail-analytics).
```

---

### 6. `mail-create-campaign.mdx` — Create a campaign

**Audience:** marketer or PM  
**Goal:** generate an email sequence and review/refine it before launching

**Frontmatter:**
```yaml
title: "Create a campaign in Adapty Mail"
description: "Generate an AI-powered email sequence from your App Store listing and refine it before launch."
metadataTitle: "Create a Campaign | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email campaign', 'create campaign', 'AI email generation']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail generates your entire email sequence from your App Store listing —
  no copywriting or design work required. Provide an App Store link, choose a tone,
  and the AI produces a ready-to-send campaign in under 2 minutes.

## Generate a campaign
  1. In Adapty Mail, go to **Campaigns → Create**
  2. Paste your App Store link
  3. Select a [tone preset](mail-tone-presets) — options are generated specifically
     for your app's category and brand voice
  4. Optionally, set the number of emails (3–15; the AI defaults to ~7)
  5. Click **Generate**

  While generating, the AI runs six steps automatically:
  - Analyzes your app's name, description, category, and screenshots
  - Extracts brand colors, logo, and typography from your Adapty project metadata
  - Builds a color palette, dark mode version, and reusable HTML components
  - Determines email count, purposes, timing, and layout for the sequence
  - Generates copy for each email: 3 subject line variants, headline, body, CTA
  - Creates a matching hero image for each email and formats for major email clients

  The full process completes in under 2 minutes.

  [SCREENSHOT: campaign creation form — App Store link input, tone selector, email count]

## Review your emails
  After generation, preview each email in the sequence. For each email you can see:
  - Subject line options (3 variants — all are tested when you launch; see [A/B testing](mail-ab-testing))
  - Headline and body copy
  - Hero image
  - CTA text
  - Layout and purpose

  [SCREENSHOT: email preview screen]

## Regenerate an email
  If an individual email doesn't fit — mismatched image, off-tone copy, weak subject
  lines — you can regenerate it without affecting the rest of the sequence.

  To regenerate an email:
  1. In the campaign preview, open the email you want to change
  2. Click **Regenerate**
  3. The AI generates new copy and a new hero image for that email

  **What stays the same:**
  - The email's position in the sequence
  - The delay timing before it sends
  - The design system (color palette, typography, dark mode)

  **What changes:**
  - All copy (subjects, headline, body, CTA)
  - The hero image
  - Possibly the email purpose and layout, based on the new content

  :::note
  The AI is aware of the surrounding sequence when regenerating. The new email
  is written to fit with what comes before and after it.
  :::

## What's next
  When you're satisfied with your campaign, launch it: [Launch a campaign](mail-launch-campaign).
  
  To understand what drives the AI's choices, see:
  - [Email purposes](mail-email-purposes) — the 13 purpose types and how they're sequenced
  - [Email layouts](mail-email-layouts) — the 6 layout templates and when each is used
  - [Tone presets](mail-tone-presets) — how voice style affects every email
```

---

### 7. `mail-email-purposes.mdx` — Email purposes

**Audience:** marketer  
**Goal:** reference article explaining the 13 purpose types, how the AI selects them, and their special behaviors

**Frontmatter:**
```yaml
title: "Email purposes in Adapty Mail"
description: "Learn about the 13 email purpose types Adapty Mail uses to structure conversion sequences."
metadataTitle: "Email Purposes | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email purposes', 'email sequence', 'email types']
```

**Structure:**

```
Intro paragraph:
  Each email in a sequence has a purpose — the role it plays in guiding the user
  toward a purchase. The AI assigns purposes automatically, choosing a combination
  designed to maximize engagement for your app's category.

## Available purposes
  Two format types: standard (with hero images) and non-standard (text-first, no hero image).

  | Purpose             | Format      | Description                                           |
  |---------------------|-------------|-------------------------------------------------------|
  | Welcome             | Standard    | Creates a positive first impression                   |
  | Product Discovery   | Standard    | Highlights key features with cards                    |
  | Offer               | Standard    | Promotes a deal or incentive                          |
  | Educational         | Standard    | Provides valuable domain knowledge (3–5 body paragraphs) |
  | Reminder            | Standard    | References an incomplete user action                  |
  | Social Proof        | Standard    | Includes testimonials and statistics                  |
  | Final Chance        | Standard    | Creates urgency with a deadline                       |
  | Story Testimonial   | Standard    | Features a realistic success story (AI-invented name and results) |
  | Re-engagement       | Standard    | Targets inactive users warmly                         |
  | Upsell              | Standard    | Compares feature tiers                                |
  | Personal Coach Letter | Non-standard | First-person from a named individual; no hero image |
  | Fake Transactional  | Non-standard | Mimics a system notification; higher open rates       |
  | System Notification | Non-standard | Account-alert style; minimal formatting              |

## Diversity rules
  To avoid repetitive sequences, the AI enforces these constraints:
  - A 7-email sequence must use at least **4 different purposes**
  - **Consecutive emails cannot share the same purpose**
  - Every sequence must include **at least 1 non-standard format**
  - Purpose selection is influenced by your **app category**

## Purpose-specific behaviors
  **Non-standard formats** (Personal Coach Letter, Fake Transactional, System Notification)
  omit hero images entirely and use Layout C (text-first). See [Email layouts](mail-email-layouts).

  **Educational and Story Testimonial** allow extended body copy (3–5 paragraphs)
  instead of the standard 1–2.

  **Story Testimonial** is unique: the AI invents a realistic first name and specific
  results (e.g., "Maria lost 12 lbs in 6 weeks") to create an authentic-feeling
  testimonial. The content is fictional and generated per campaign.
```

---

### 8. `mail-email-layouts.mdx` — Email layouts

**Audience:** marketer  
**Goal:** reference article for the 6 layout templates, when each is used, and technical compatibility notes

**Frontmatter:**
```yaml
title: "Email layouts in Adapty Mail"
description: "The six email layout templates Adapty Mail uses and when each one is selected."
metadataTitle: "Email Layouts | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'email layouts', 'email design', 'email templates']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail uses six layout templates, each suited to different email purposes
  and content types. The AI selects layouts automatically based on the email's
  purpose and position in the sequence.

## Layout types

  **Layout A — Classic Stack**
  The default. Works for any purpose.
  Structure: header → hero image (full-width) → headline → body → CTA → footer

  **Layout B — CTA Above Fold**
  Best for urgency and re-engagement. Places the CTA before the body copy
  to capture readers who scan without scrolling.
  Structure: header → hero image → CTA → headline → body → CTA → footer

  **Layout C — Text First**
  No hero image. Required for Personal Coach Letter, Fake Transactional,
  and System Notification purposes. Conveys a personal, direct feel.
  Structure: header → headline → body → CTA → footer

  **Layout D — Side-by-Side Hero**
  Editorial feel. Image on the left, headline on the right. Uses portrait
  images (3:4 ratio).
  Structure: header → [image 50% | headline 50%] → body → CTA → footer

  **Layout E — Inverted Hero**
  Body text alongside imagery. Uses portrait images (3:4 ratio).
  Structure: header → headline → [body 55% | image 45%] → CTA → footer

  **Layout F — Card Grid**
  Best for showcasing 4+ distinct features. Uses a 2-column card grid.
  Structure: header → hero image → headline → [card | card] grid → CTA → footer

  [SCREENSHOT: one example of each layout — even if small/thumbnail]

## Layout selection rules
  - The AI selects layouts based on email purpose and sequence position
  - Consecutive emails in a sequence cannot use the same layout
  - Every sequence uses at least 2 different layouts

## Responsive behavior
  Multi-column layouts (D, E, F) automatically collapse to a single column
  on screens narrower than 620px (most mobile devices).

## Email client support
  All layouts are tested and compatible with:
  Gmail, Apple Mail, Outlook, Yahoo Mail, Samsung Mail — in both light and dark mode.
```

---

### 9. `mail-tone-presets.mdx` — Tone presets

**Audience:** marketer  
**Goal:** explain what tone presets are, how they affect emails, and how to choose between them

**Frontmatter:**
```yaml
title: "Tone presets in Adapty Mail"
description: "Understand how tone presets shape the voice of your email campaigns in Adapty Mail."
metadataTitle: "Tone Presets | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'tone presets', 'email voice', 'copywriting']
```

**Structure:**

```
Intro paragraph:
  A tone preset defines the voice of your entire email sequence — how assertive,
  warm, or data-driven the copy feels. Adapty Mail generates tone options specifically
  for your app's category and brand, so they fit the context your users expect.

## How presets are created
  When you paste your App Store link, the AI analyzes your app's category, description,
  and positioning and generates several tone presets tailored to your audience.
  Each preset includes:
  - A short label (e.g., "Warm Coach", "Bold & Urgent", "Data-Driven")
  - A description of what the tone feels like
  - An internal prompt that guides the AI copywriter

  Presets are generated once per campaign creation. To get different options,
  re-analyze your app by starting a new campaign.

## Select a tone
  On the campaign creation screen, a tone carousel shows all available presets.
  Select one before clicking **Generate** — the chosen tone influences subject lines,
  headlines, body copy, and CTA text across every email in the sequence.

  The email layout, hero images, and design system are not affected by tone selection.

## Tone comparison
  The same sequence structure sounds very different across tones:

  | Element       | Warm Coach                      | Bold & Urgent                  |
  |---------------|---------------------------------|--------------------------------|
  | Subject line  | "Your journey starts here"      | "Last chance — expires tonight"|
  | Headline      | "We're here for you"            | "Don't wait. Start now."       |
  | Body copy     | Supportive, empathetic, patient | Short, FOMO-driven, high energy|
  | CTA           | "Take the first step"           | "Lock in your plan"            |

## Tips
  - Run the same campaign with different tones as separate A/B variants to find
    which voice resonates best with your audience. See [A/B testing](mail-ab-testing).
  - If none of the generated presets feel right, start a new campaign — each
    generation can produce different options.
```

---

### 10. `mail-audience-segments.mdx` — Audience and segments

**Audience:** marketer or PM  
**Goal:** explain how audience targeting works — where users come from, what filters are available, how enrollment and exclusion work

**Frontmatter:**
```yaml
title: "Audience and segments in Adapty Mail"
description: "Learn how Adapty Mail targets recipients, applies segment filters, and enrolls users automatically."
metadataTitle: "Audience and Segments | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'audience', 'segments', 'email targeting']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail pulls your audience directly from Adapty — no CSV uploads or list
  management. When you launch a campaign, the system selects eligible users,
  applies your segment filters, and enrolls them automatically.

## Default targeting
  By default, campaigns target users who have an email on their profile but no
  active subscription. This is the highest-value audience for conversion: users
  who have already shown interest (they gave you their email or started a trial)
  but haven't paid yet.

## Segment types
  You can narrow or expand the default audience using three types of filters:

  | Filter type         | Examples                                              |
  |---------------------|-------------------------------------------------------|
  | Subscription status | Trial, active subscriber, expired, never subscribed   |
  | User events         | Completed onboarding, reached paywall, opened app N times |
  | User properties     | Country, language, app version                        |

  [QUESTION FOR PM: are these filters available at campaign creation, or only in a
  separate "Segments" configuration? Is there a segment builder UI? Confirm the
  exact filter options available in the current product.]

## Automatic enrollment
  When a user meets your segment criteria, they are automatically enrolled
  in the campaign starting from the first email, with the configured delays applied.
  
  This means users who match criteria after launch (e.g., a new trial user) are
  enrolled as they qualify — you don't need to re-launch to add new users.

## Limits
  A user can only be in one active sequence per campaign at a time. If a user
  is already mid-sequence in a campaign, starting the same campaign again will
  not interrupt their current sequence.

## Suppression
  Some users are automatically excluded from delivery. See
  [Unsubscribe and suppression](mail-suppression) for a full explanation.
```

---

### 11. `mail-launch-campaign.mdx` — Launch a campaign

**Audience:** marketer  
**Goal:** explain what happens at launch, how timing works, and how to control a live campaign

**Frontmatter:**
```yaml
title: "Launch a campaign in Adapty Mail"
description: "Launch your Adapty Mail campaign to send emails to your audience and track results in real time."
metadataTitle: "Launch a Campaign | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'launch campaign', 'send emails', 'email delivery']
```

**Structure:**

```
Intro paragraph:
  Once your emails are ready, launching sends the first email in the sequence
  to your audience and schedules the rest. The campaign runs automatically
  from there — you can monitor it in Analytics or stop it at any point.

## Launch a campaign
  To launch a campaign:
  1. In Adapty Mail, open your campaign and click **Launch**

  When you click Launch, Adapty:
  1. Fetches all users with emails from your Adapty project
  2. Removes invalid, bounced, and previously unsubscribed addresses
  3. Applies your segment filters to the remaining audience
  4. Generates a personalized checkout URL for each recipient
  5. Sends the first email via AWS SES from your verified domain
  6. Schedules the remaining emails with the configured delays

  [SCREENSHOT: launch confirmation screen or campaign overview after launch]

## Email timing
  Each email in the sequence sends after a delay from the previous one.
  Delays are set by the AI during generation based on your app category
  and the email's purpose, but you can adjust them before launch.

  | Parameter      | Value              |
  |----------------|--------------------|
  | Minimum delay  | 1 minute           |
  | Typical range  | 4 hours – 3 days   |

  [SCREENSHOT: delay settings in campaign editor]

## Monitor a live campaign
  After launch, go to **Analytics** to track performance in real time.
  See [Campaign analytics](mail-analytics) for a full breakdown of available metrics.

  Purchases made via checkout links are attributed to the specific email that
  drove the click, so you can see which emails in the sequence generate revenue.

## Stop a campaign
  To stop a campaign, open it and click **Stop**.
  
  - Users currently mid-sequence stop receiving subsequent emails
  - Users who already received emails are not affected
  - The campaign can be relaunched to start again with a fresh audience pull

  :::note
  Stopping a campaign is different from a user unsubscribing. Stopped campaigns
  use the `stop_condition` reason code; individual suppressions are tracked separately.
  See [Unsubscribe and suppression](mail-suppression).
  :::
```

---

### 12. `mail-suppression.mdx` — Unsubscribe and suppression

**Audience:** marketer, with compliance relevance for legal/ops  
**Goal:** explain how users exit campaigns involuntarily or voluntarily, and what compliance guarantees the system provides

**Frontmatter:**
```yaml
title: "Unsubscribe and suppression in Adapty Mail"
description: "Learn how Adapty Mail handles unsubscribes, bounces, and complaints to protect sender reputation and meet compliance requirements."
metadataTitle: "Unsubscribe and Suppression | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'unsubscribe', 'suppression', 'GDPR', 'CAN-SPAM', 'bounce', 'email compliance']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail automatically removes users from delivery when they unsubscribe
  or when their email causes a deliverability event (bounce, complaint). This
  protects your sender reputation and keeps campaigns CAN-SPAM and GDPR compliant.

## Unsubscribe
  Every email sent by Adapty Mail includes an unsubscribe link in the footer.
  The link uses an encrypted token tied to the user's profile_id — no login required.

  When a user clicks unsubscribe:
  - They are immediately added to the suppression list with the `unsubscribe` reason
  - All remaining emails in their sequence are cancelled
  - They are excluded from all future campaign sends
  
  :::important
  Suppression is permanent. A suppressed user will not receive emails from any
  Adapty Mail campaign unless manually removed from the suppression list.
  [QUESTION FOR PM: is there a UI to manually restore suppressed users?]
  :::

## Automatic suppression events
  Adapty Mail also suppresses users automatically based on events from AWS SES:

  | Event     | Reason code  | What it means                                 |
  |-----------|--------------|-----------------------------------------------|
  | Bounce    | `bounce`     | The email address is invalid or inactive       |
  | Complaint | `complaint`  | The user marked the email as spam              |
  | Reject    | `reject`     | SES rejected the message before sending        |
  | Throttle  | `throttle`   | Sending rate exceeded domain safety limits     |

  For all four events, the same outcome applies: remaining sequence emails
  are cancelled, and the user is excluded from future campaigns.

## Impact on analytics
  Suppressed users:
  - Do not count toward the active audience in campaign analytics
  - Are tracked separately so you can see suppression rates over time
  - Stop appearing in delivery metrics after suppression

## Compliance
  Adapty Mail's suppression system meets these requirements:
  - **CAN-SPAM**: mandatory unsubscribe mechanism in every email, one-click processing
  - **GDPR**: persistent suppression records, no re-enrollment without new consent

  The encrypted unsubscribe token requires no authentication — users don't need
  to be logged in to opt out.
```

---

### 13. `mail-analytics.mdx` — Campaign analytics

**Audience:** marketer or PM  
**Goal:** explain what metrics are available, how to filter and read them, and how revenue is attributed

**Frontmatter:**
```yaml
title: "Campaign analytics in Adapty Mail"
description: "Track email delivery, engagement, and revenue across your Adapty Mail campaigns."
metadataTitle: "Campaign Analytics | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'analytics', 'email metrics', 'revenue attribution', 'campaign performance']
```

**Structure:**

```
Intro paragraph:
  The Analytics dashboard shows real-time performance across all your campaigns.
  Metrics are organized into three categories: delivery, engagement, and revenue.

## Delivery metrics
  | Metric          | What it shows                                         |
  |-----------------|-------------------------------------------------------|
  | Emails sent     | Total emails dispatched across all sequences           |
  | Delivered       | Emails that reached the inbox                          |
  | Bounced         | Emails that failed delivery (see mail-suppression)     |
  | Spam complaints | Recipients who marked your email as spam               |

## Engagement metrics
  | Metric          | What it shows                                         |
  |-----------------|-------------------------------------------------------|
  | Open rate       | Share of delivered emails that were opened (pixel-based) |
  | Click rate      | Share of delivered emails with at least one link click |
  | Unsubscribes    | Recipients who opted out                               |

## Revenue metrics
  | Metric              | What it shows                                     |
  |---------------------|---------------------------------------------------|
  | Checkout completions | Purchases completed via email checkout links      |
  | Revenue             | Total revenue attributed to email-driven purchases |
  | Per-email revenue   | Revenue breakdown by individual email in the sequence |

  Revenue is attributed using the customer_user_id embedded in each checkout link.
  When a purchase completes in FunnelFox, Adapty matches it to the email that
  generated the click.

## Filter and analyze
  Use the controls at the top of the Analytics page to filter:
  - **Campaign version** — compare different sequence versions
  - **Individual email** — see metrics for a specific email in the sequence
  - **Date range** — set a custom period or use presets

## Compare versions
  If you're running multiple versions of a campaign, see [A/B testing](mail-ab-testing)
  for how to read version-level comparisons and deploy a winner.

  [SCREENSHOT: Analytics dashboard overview]
  [SCREENSHOT: per-email breakdown view]
```

---

### 14. `mail-ab-testing.mdx` — A/B testing

**Audience:** marketer  
**Goal:** explain how to test multiple campaign versions, what gets tested automatically (subject lines), and how to read results

**Frontmatter:**
```yaml
title: "A/B testing in Adapty Mail"
description: "Test multiple email campaign versions in Adapty Mail to find the highest-converting approach."
metadataTitle: "A/B Testing | Adapty Mail | Adapty Docs"
keywords: ['adapty mail', 'A/B testing', 'campaign optimization', 'email testing']
```

**Structure:**

```
Intro paragraph:
  Adapty Mail lets you test multiple sequence versions against each other to find
  the combination of copy, tone, length, and timing that converts best for your audience.

## What you can test
  Each sequence version can differ in:
  - Email copy (subjects, headlines, body, CTA)
  - Hero images (AI-generated per version)
  - Tone preset
  - Sequence length (number of emails)
  - Delay timing between emails

## Subject line testing
  Subject line testing happens automatically within every campaign — no setup required.
  
  Every email is generated with **3 subject line variants**. When the campaign runs,
  Adapty tests all three and continues sending the best-performing variant to the
  remaining audience.
  
  Subject line results are visible per-email in the Analytics dashboard.

## Create multiple versions

  [NOTE FOR ELINA: please test how to create a second version of a campaign in the
  Adapty Mail UI — is it a "Duplicate" button? A "New version" option? Document
  the exact steps and take screenshots.]

## How the test runs
  1. Audience is split randomly across active versions
  2. Each version runs independently — same timing, independent metrics
  3. Delivery, engagement, and revenue are tracked per version
  4. The Analytics dashboard shows statistical significance for each comparison

## Read results
  In **Analytics**, switch to the version comparison view to see side-by-side:
  - Open rate per version
  - Click rate per version
  - Conversion rate per version
  - Revenue per version

  A statistical significance indicator shows when a result is reliable enough
  to act on.

  [SCREENSHOT: version comparison view in Analytics]

## Deploy a winner
  When you've identified the best-performing version:
  1. Open the version comparison in Analytics
  2. Click **Deploy winner**

  Adapty sends the winning version to all remaining recipients in the audience
  who haven't received any version yet.

  [QUESTION FOR PM: does deploying a winner stop the other versions for users
  who are already mid-sequence in a losing version?]
```

---

## Screenshots needed

This section tracks every screenshot placeholder in the plan. Coordinate with the product team or take these during QA access.

| Article                    | Screenshot description                                          |
|----------------------------|-----------------------------------------------------------------|
| `mail-sending-domain`      | Domain entry field and DNS preview                              |
| `mail-sending-domain`      | DNS records table in Adapty Mail UI (exact CNAME/MX/TXT values)|
| `mail-sending-domain`      | Verification status (pending and verified states)               |
| `mail-checkout`            | Checkout setup steps in Settings → Checkout (multiple steps)    |
| `mail-checkout`            | Example checkout screen(s) — at least the main conversion page  |
| `mail-create-campaign`     | Campaign creation form (App Store link, tone selector, count)   |
| `mail-create-campaign`     | Email preview screen                                            |
| `mail-email-layouts`       | One example of each layout A–F (thumbnails acceptable)          |
| `mail-launch-campaign`     | Launch confirmation or campaign overview post-launch            |
| `mail-launch-campaign`     | Delay settings in campaign editor                               |
| `mail-analytics`           | Analytics dashboard overview                                    |
| `mail-analytics`           | Per-email breakdown view                                        |
| `mail-ab-testing`          | Version comparison view in Analytics                            |

---

## Content to source from product team

| Article              | What's needed                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| `mail-checkout`      | Full checkout setup steps (FunnelFox funnel creation, Stripe connection, publish) |
| `mail-ab-testing`    | Steps to create a second campaign version (UI flow)                           |
| `mail-sending-domain`| Complete 14-tier warm-up table with all daily limits                          |

---

## Notes for Elina

- **`mail-checkout`**: Please test the full setup flow in Settings → Checkout and document the steps. See the placeholder in the article plan.
- **`mail-ab-testing`**: Please find and document how to create a second version of a campaign in the UI. See the placeholder in that article.
- **SDK article IDs for identify/updateProfile**: Verify the correct article IDs to link in `mail-collect-emails`. The UA and ASA guides reference `initial-customization` and `setting-user-attributes` — confirm these are the right targets for Mail's audience.

---

## Questions for PM

1. **Adapty plan requirement**: Which Adapty plan tier includes Adapty Mail access? Is it available on all plans, or is it a paid add-on? This belongs in the landing article and get-started prerequisites.

2. **FunnelFox provisioning**: Do users need to sign up for FunnelFox independently, or is it automatically provisioned when they enable Adapty Mail? If separate, what's the signup flow and is there a dedicated URL?

3. **Segment builder UI**: In `mail-audience-segments` — are segment filters applied at campaign creation in a segment builder, or is there a separate Segments section? What are the exact filter options available in the current product?

4. **Suppression list management**: Is there a UI to view and manually remove users from the suppression list? If yes, this needs to be documented in `mail-suppression`.

5. **A/B test winner deployment**: When you deploy a winning version, what happens to users who are already mid-sequence in a losing version? Do they continue receiving the losing version, or are they switched?

6. **Email coverage threshold**: The existing docs say to target 30–50% email coverage before launching. Is this an official recommendation from the product team or a guideline from the existing docs? Should we include it?

7. **Stripe requirements**: Are there specific Stripe plan requirements or setup steps (e.g., webhook configuration) on the Stripe side that users need to complete before the checkout works?

8. **Campaign editing**: Can users edit a campaign after launch (e.g., change delays, add/remove emails)? Or is the campaign locked after launch? This needs a brief mention in `mail-create-campaign` or `mail-launch-campaign`.
