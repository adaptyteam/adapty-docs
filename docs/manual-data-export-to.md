---
title: "Manual data export to Google Cloud Storage"
description: "Discover the steps to manually export subscription events and paywall views from Adapty to Google Cloud Storage, giving you control over data export timing and intervals for detailed analysis."
metadataTitle: "How to Manually Export Data to Google Cloud Storage Using Adapty"
---

In addition to the automatic event data export to Google Cloud Storage, Adapty also offers on-demand file export functionality. This feature allows you to export subscription events or paywall views for a specific time interval to your Google Cloud bucket upon request. Adapty will save one export file per day for the days you select, giving you greater control over the data and timing of your exports. 

The data will be exported using the same credentials and to the same folder you [set up for the automatic export](google-cloud-setup).

To export subscription events or paywall views to Amazon S3 on-demand:

1. Open [**Integrations** -> **Google Cloud Storage**](https://app.adapty.io/integrations/googlecloud) in your Adapty Dashboard, then

   1. Open the **Events** tab to export Adapty subscription events 
   2. Open the **Paywall visits** tab to export Adapty paywall views.
2. In the **Manual file export** section, click the date interval below the section name and choose the period you need events or paywall views for. The specified date range will be used to export the events or paywall views created from Date A 00:00:00 UTC up to Date B 23:59:59 UTC.


<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/4abf58f-google_cloud_adapty_manual_export.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>





3. Click the **Apply** button to save the changes. 

   
<div style={{ textAlign: 'center' }}>
  <img 
    src="https://files.readme.io/b360a6b-google_cloud_adapty_export.png" 
    style={{ width: '700px', border: '1px solid grey' }}
  />
</div>



4. Click the **Export to Google Cloud Storage** button. The export will start within a few seconds but may take some time depending on the selected date range. If you do not see the files in the list, refresh the page.