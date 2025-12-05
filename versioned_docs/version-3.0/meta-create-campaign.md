---
title: "Advertise your app in Meta Ads"
metadataTitle: "Advertise your app in Meta Ads | Adapty Docs"
keywords: ['meta ads', 'meta campaign']
---
import ZoomImage from '@site/src/components/ZoomImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@site/src/components/Details';

In this step-by-step guide, you will learn how to create and set up ads for your app in Meta, so you can optimize them and track their performance easily.

## How ads in Meta are structured

When advertising on Meta Ads, you need to configure three hierarchical levels:

- **Campaign**: Campaigns define your advertising objectives.
- **Ad set**: Ad sets specify your target audience and placements—determining where and to whom your ads will be displayed. Each campaign can contain multiple ad sets.
- **Ads**: Ads are the actual creatives that users see and interact with. Each ad set can contain several ads; however, it is recommended to limit this to no more than five ads per ad set for optimal performance.

<ZoomImage id="meta-campaigns.png" />

## Step 1. Create Meta Ads Manager Account

To get started with Meta Ads, you need to have a Facebook Business page because you can't run ads from your personal one. 

So, you need to link your business page to your Meta Ads business portfolio:

1. Go to [business.facebook.com](business.facebook.com). If you don't have a business page in the business portfolio yet, you need to add it. Click **Go to settings**.
   <ZoomImage id="meta-ads-settings.webp" />

2. Go to **Account > Pages** from the left sidebar. Click **Add** and select **Add an existing Facebook page** or **Create a new Facebook page**. See the [guide on creating a business page](https://www.facebook.com/business/help/473994396650734) if you don't have one yet.

   <ZoomImage id="add-page-meta.png" />

3. Optionally, attach your Instagram account on the **Account > Instagram accounts** page in the settings.

Once you've connected your business page, you're ready to move further.

## Step 2. Add Meta pixel

You will need a Meta pixel to connect your campaign data to revenue and get better results.

Before you connect data and create a pixel, you will need:
- A business page – add it to your business portfolio in [**Settings > Accounts > Pages**](https://business.facebook.com/latest/settings/pages)
- A business manager account – you must have full control over the business portfolio
- A business email – set in [**Settings > Business info**](https://business.facebook.com/latest/settings/business_info)
- An ad account – add it to your business portfolio in [**Settings > Accounts > Ad accounts**](https://business.facebook.com/latest/settings/ad_accounts)

When you're ready, create a pixel:
1. Go to [**Events Manager**](https://www.facebook.com/events_manager2). Click **Connect data**.
   <ZoomImage id="connect-data.webp" />
2. Select **Web** as a data source type.
   <ZoomImage id="new-data-source.webp" />
3. Give your dataset a name and click **Create**.
   <ZoomImage id="new-dataset.webp" />
4. For [Adapty User Acquisition](adapty-user-acquisition.md)), you won't need to complete the full installation of the pixel. So, when asked about the integration, you can just click **Cancel** in the setup window, and your pixel will still appear on the list.
5. When your dataset appears on the list, you can proceed with creating a campaign.

## Step 3. Create campaign

To create a campaign in Meta Ads Manager:

1. Go to [Meta Ads Manager](https://adsmanager.facebook.com/adsmanager/manage). On the **Campaign** tab, click **Create**.

   <ZoomImage id="meta-new-campaign.webp" />

2. Select **Sales** as a campaign objective and click **Continue**.
   
   <ZoomImage id="meta-objective.webp" />

3. Name your campaign in the **Campaign name** section.
4. In the **Budget** section, in **Budget strategy**, select how you want to control the budget:
   - **Campaign budget**: The easiest option if you are not sure which opportunities would work best. If you select this, Meta Ads will automatically detect top performers to allocate more budget on better-performing ad sets.
   
     Then, select whether you need **Daily** or **Lifetime** budget and enter the limit in your currency. **Daily** budget allows you more flexibility while you are still learning, so you can start with smaller amounts and gradually adjust them on the go. Or, you can select **Schedule budget increase** and set rules to automatically increase the budget by value amount or percentage.
     <ZoomImage id="daily-budget.webp" />
   - **Ad set budget**: Select this option if you want to manually define which audiences will get more or less campaign budget. If not completely sure, you can select **Share some of your budget with other ad sets** to allow Meta to automatically adjust ad set budgets by up to 20% if it benefits the ad performance.
     <ZoomImage id="ad-set-budget.webp" />
5. In **Campaign bid strategy**, select the best option for your goals:
   - **Highest volume (default)**: The easiest option to get started. If you select this, you let Meta optimize the click cost to get the best results for your budget.
   - **Cost per result goal**: Aim for a certain cost per result if you know your benchmarks.
   - **Bid cap**: Set the highest cost you are ready to bid.
   <ZoomImage id="campaign-bid.webp" />
6. Adapty lets you conduct comprehensive [A/B tests](ab-tests.md). However, you can also enable A/B tests in Meta Ads if needed. Read more about A/B tests in Meta Ads Manager [here](https://www.facebook.com/business/help/1159714227408868).
7. Now, it's time to add the first ad set to your campaign. Click **Next** to proceed.

## Step 4. Create ad set

To create an ad set:
1. Give your ad set a name in the **Ad set name** field.
2. In the **Conversion location** dropdown, select **Website**. 
   <ZoomImage id="conversion-location.webp" />
3. In the **Performance goal** field, select **Maximize number of landing page views** if you have a landing page or **Maximize number of link clicks** if you use a smart link navigating users directly to the store.

   <ZoomImage id="performance-goal.webp" />

4. In the **Dataset** field, select the dataset you've created on [Step 2](#step-2-add-meta-pixel).
5. Select a **Conversion event**. In our case, it is probably going to be **Purchase** or **Start trial**. Don't worry if you see a warning that your dataset doesn't have any events yet – that just means that your dataset is new.
   <ZoomImage id="conversion-event.webp" />

6. If, when setting up the campaign, you have selected **Ad set budget**, select whether you need **Daily** or **Lifetime** budget and enter the limit in your currency. **Daily** budget allows you more flexibility while you are still learning, so you can start with smaller amounts and gradually adjust them on the go. 
   
   Set the start and, if applicable, end dates for the ad set. For example, if you want to advertise a promotional offer in your app, it is crucial to align the ad set timeframe with the offer.

   <ZoomImage id="ad-set-money.webp" />

7. In the **Audience controls** section, set the audience settings:
    - **Location**: Locations can be as broad or narrow as you need them to be. You can limit **Locations** in the ad set to work with the region specifics in your ads.
    - **Minimum age**: Select the minimum age of users that will see your ad. For some ads, it may be legally required. You can't select a minimum age below 18 globally or 20 in Thailand.
    - **Language**: Set **Language** only if it is not the most common language in selected countries. For example, you won't need to select **English** in the United States, but, if you target Spanish-speaking people living there, you might want to select **Spanish**.

   <ZoomImage id="meta-audience.webp" width="500px" />

8. By default, Meta automatically finds smaller groups of people to whom your ad will be relevant. However, if you add an audience suggestion, you can guide Meta towards people you think are likely to respond. In the **Advantage+ audience** section, you can adjust:
    - **Age**: Set a specific age range to target, so you better match specific of different age groups.
    - **Gender**: Show your ad to all users or target them by their gender.
    - **Detailed targeting**: This setting allows you the most specific control over the audience for your ad and/or app. Here, you can form groups based on **Demographics**, **Interests**, or **Behaviors**. Depending on what your app is doing, for example, you can focus on different professions, fans of specific music bands, parents of newborns, or those who tend to shop online a lot.
    :::note
    The **Detailed targeting** settings apply with the **Or** operator. If you want to apply conditions with the **And** operator, click **Define further** and select new conditions.
    :::
    <ZoomImage id="advantage-audience.webp" />
9. In the **Placements** section, you can select where your ad will appear. By default, the **Advantage+** setting is selected, letting Meta allocate your ad set's budget across multiple placements based on where they're likely to perform best. We recommend you to use this option if you are not sure where to place your ad. If you want to select specific placements manually, select **Manual placements** and customize them. Read more [here](https://www.facebook.com/business/help/965529646866485).

   <ZoomImage id="meta-placements.webp" width="500px" />
10. **Recommended**: Targeting by device helps you optimize your spending. In the **Placements** section, click **Show more settings**. In the **Devices and operating system** subsection, select which devices, operating systems, and OS versions should be included in your audience. This ensures your ads are shown only to relevant users. For example, desktop users won't see your ad, and users with old OS versions that your app doesn't support will be excluded.
    <ZoomImage id="meta-devices.webp" width="500px" />
11. When you're ready, click **Next** to proceed.

## Step 5. Create ads

To create an ad in Meta Ads Manager:

1. Give your ad a name in the **Ad name** field.
2. In the **Identity** section, select the Facebook page that will be used for posting ads. If you have a separate Instagram account for your app and have connected it in Meta Business Suite at [Step 1](#step-1-create-meta-ads-manager-account), select it in the **Instagram account** dropdown. Otherwise – select **Use Facebook page**, so Instagram ads are posted using the Facebook page.
   <ZoomImage id="meta-identity.webp" width="500px" />
3. In **Ad setup**, select how you want to post your ad. When advertising apps, we recommend selecting **Create ad**, so your post will redirect users to your app instead of the Facebook page. In the **Format** field, select an option depending on how many creatives you have and how you want to display them.
   <ZoomImage id="meta-ad-setup.webp" width="500px" />
4. In the **Destination** section, keep **Website** selected as **Main destination**. In the **Website URL** field, paste `https://api-ua.adapty.io/api/v1/attribution/click`. In [Adapty User Acquisition](adapty-user-acquisition.md), [create a web campaign](ua-facebook.md) and paste the **Click link** content after `https://api-ua.adapty.io/api/v1/attribution/click` to the **URL parameters** field in the **Tracking** section.
   <ZoomImage id="meta-destination.webp" width="700px" />
5. In the **Ad creative** section, click **Set up creative** and select **Image ad** or **Video ad**. This will open a new window prompting you to upload media files, crop them, and add texts.
   <ZoomImage id="meta-creative.webp" width="500px" />
6. If you want to automatically translate your ad texts, in the **Languages** section, click **Add languages**. Then, add a primary language – it will automatically pull texts from your creative. Then, add translation languages for automatic translation.
   <ZoomImage id="meta-languages.webp" width="500px" />
7. When ready, click **Publish** to launch your ad.

## What's next

To activate your ad, you will need to add a payment method if you haven't done it before.

Then, you can [explore how the campaign affects your app revenue in the Adapty User Acquisition dashboard](adapty-user-acquisition.md).

Not using Adapty User Acquisition yet? [Book a call with us](https://calendly.com/tnurutdinov-adapty/30min) to learn how it can help you track and optimize your ad campaigns.
