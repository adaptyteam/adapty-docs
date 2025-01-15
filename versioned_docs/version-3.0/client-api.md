---
title: Exporting analytics with API
toc_max_heading_level: 2
---

import Details from '@site/src/components/Details';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetricsFilters from '@site/src/components/reusable/MetricsFilters.md';

Exporting your analytics data to CSV gives you the flexibility to dive deeper into your app’s performance metrics, customize reports, and analyze trends over time. With the Adapty API, you can easily pull detailed analytics into a CSV format, making it convenient to track, share, and refine your data insights as needed.

## Getting started with the API for analytics export

With the analytics export API, you can, for example:

1. **Analyze MRR from Marketing Campaigns**: Measure the impact of last year's marketing campaigns in the USA to see which ones brought in the highest revenue, with weekly tracking. Use the [Retrieve analytics data](client-api#retrieve-analytics-data) method for this.

2. **Track Cohort Retention Over Time**: Follow retention by cohort to spot drop-off points and compare cohorts over time, revealing trends and key moments where engagement strategies could boost retention. Limited to App Store, a specific product, and the USA. Use the [Retrieve cohort data](client-api#retrieve-cohort-data) method for this.

3. **Evaluate Conversion Rates Across Channels**: Analyze conversion rates for key acquisition channels to see which are most effective in driving first-time purchases. This helps prioritize marketing spend on high-performing channels. Use the [Retrieve conversion data](client-api#retrieve-conversion-data) method for this.

4. **Review Churn Rate**: Monitor how quickly users are unsubscribing to uncover churn patterns or gauge the success of retention efforts, focusing on France and a specific product. Use the [Retrieve funnel data](client-api#retrieve-funnel-data) method for this.

5. **Assess LTV by User Segment**: Identify the lifetime value of different user segments to understand which groups bring in the highest revenue over time. Focus on high-value segments like long-term subscribers, and use the results to refine acquisition strategies. Use the [Retrieve LTV data](client-api#retrieve-lifetime-value-ltv-data) method for this.

6. **Check Retention by Country**: Look at retention rates by region to find high-engagement markets and guide localization or regional strategies. Use the [Retrieve retention data](client-api#retrieve-retention-data) method for this.

**What's next**:

