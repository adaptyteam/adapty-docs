---
title: "Run and stop A/B test (COPY for Liudmila)"
description: ""
metadataTitle: ""
---

Running A/B test in Adapty means adding it to a placement. In Adapty, you have two options to run an [A/B test](https://docs.adapty.io/docs/ab-test-copy): from the **Placement** page or the **A/B test** page.

## Run an A/B test from the list of A/B tests

In order to make your A/B test live for the selected audience and placement, you need to navigate to the A/B test list page and locate the A/B test you want to run. The **Run** button will only be displayed for A/B tests that are not in a live or completed state. Click on the Run button to make the test live for the selected audience and placement.


<img
  src={require('./img/641fe6d-Area.gif').default}
/>





After clicking the Run button, a modal will appear with dropdown options to select the audience and placement for your A/B test. 

1. The **audience** represents the segment of users you want to target for your A/B test. In the audience dropdown, you will see a list of segments available in your system. You can select multiple segments to target for the same A/B test.
2. The **placement** refers to the specific location within your app where the A/B test will be displayed for the selected audience. You can choose from the list of available placements within your app. Read more about the placements from our documentation.

It's important to note that each audience has a **priority** displayed in numbers (starting from 1) and can be customized. To adjust the priority of your selected audience targets, click on the edit icon next to the audience section from the A/B test list. You will be taken to a modal where the priority for the selected audience targets will be displayed. You can modify the priority by changing the priority values or by doing simple drag and drop to have the higher priority audiences at the top of the list

## Run A/B test from a placement


<img
  src={require('./img/fddf85a-Area.gif').default}
/>





The **Run A/B test** option allows you to show different paywalls to app users within a specific audience. By running an A/B test, you can compare different options and determine the most effective paywall for that audience segment. You can select an existing paywall bundle or create a new A/B test from scratch. The selected paywalls will be displayed on the placement detail page, with significant results highlighted in green. Running an A/B test helps you optimize conversions and find the best paywall option for your audience.

 You can refer to the [documentation](https://docs.adapty.io/docs/ab-tests#how-to-create-an-ab-test) on creating and running A/B tests for more detailed instructions. This documentation will provide step-by-step information on setting up A/B tests and leveraging them effectively within the Adapty dashboard.


<img
  src={require('./img/ce4946f-small-CleanShot_2023-04-25_at_20.46.282x.png').default}
/>





After selecting the audience and placement, click the **Run** button in the modal to make your A/B test live for the selected audience and placement in your app. From there, you can monitor the progress of your A/B test and check its metrics on the [A/B test metrics ](results-and-metrics)page. This will help you understand which variation performs better and make data-driven decisions to improve your app's performance. Learn more about Adapty A/B test metrics from this [documentation.](results-and-metrics)

## How to stop A/B test

When you choose to stop an A/B test, it means you have finished observing and analyzing the data. This step is essential for evaluating the test accurately and making informed decisions for future strategies. Stopping an A/B test is a crucial part of the testing process to optimize your outcomes effectively.

There are two options available to stop an A/B test: you can do so either from the A/B test list page or the placement detail page. Regardless of whether you are on the A/B test list page or the placement detail page, both paths lead to the same flow.


<img
  src={require('./img/5906809-CleanShot_2023-07-19_at_18.03.482x.png').default}
/>





Navigate to the A/B test list page and locate the A/B test you want to stop. Only tests that are currently running can be stopped and click on the Stop button associated with the A/B test.

When stopping an A/B test, you have two options:


<img
  src={require('./img/56385bf-CleanShot_2023-07-19_at_18.09.452x.png').default}
/>





### 1\. Stop the A/B test without creating a new test

This option will completely stop the A/B test. Variations will no longer be displayed to users, and the test will be terminated. The data collected during the test will still be available for analysis.

When choosing to** Stop A/B Test** you have two options:

- **Select winner paywall**: Based on the included paywall metrics such as revenue, Probability to be best, and Revenue per 1K users, you can choose the winning paywall. By selecting this option, after stopping the A/B test for the selected placement and audience, the winning paywall will be displayed in the app. This allows you to optimize your app's performance by showcasing the most effective paywall to your users.
- **No paywalls displayed**: The second option is to stop the A/B test without selecting a winner paywall. In this case, for the selected placement and audience, no paywalls from that A/B test will be displayed in the app. This option is useful if you want to pause the display of any paywalls for that specific combination of placement and audience.

By carefully considering the performance metrics and your overall objectives, you can make an informed decision on which option is most suitable for your A/B test.

### 2\. Stop the A/B test and create a new A/B test with existing data

Choosing this option allows you to create a new A/B test using the existing A/B test data. This option is useful if you want to continue testing with the collected data or make iterations based on the insights gained from the previous test. The existing data will be used as a starting point for the new A/B test. With this you have several options to consider, allowing you to leverage the existing data and optimize your testing strategies:


<img
  src={require('./img/f9f166d-CleanShot_2023-07-19_at_18.14.412x.png').default}
/>





- **Select existing paywall group:** You can choose an existing paywall group to replace the stopped A/B test. By selecting this option, the chosen paywall group will be displayed in place of the discontinued A/B test. This option is beneficial when you have identified a successful paywall configuration and want to continue showcasing it.
- **Create a new paywall group**: Alternatively, you can create a new paywall group to run in place of the stopped A/B test. This option enables you to iterate on the insights gained from the previous test and explore further variations or improvements in your paywall configurations.
- **Choose existing A/B test:** If you have other existing A/B tests that are ready to be displayed and run, you can select one of them to replace the stopped A/B test. This option allows you to seamlessly transition from one test to another, utilizing the insights and data collected from your prior experiments.

:::note
Once the A/B test is stopped, it will no longer be active, and the paywalls will no longer be displayed to users. However, you can still access the A/B test results and metrics on the A/B test metrics page to analyze the data collected during the test.

It's also important to note that stopping an A/B test is irreversible, and the test cannot be restarted once it has been stopped. Ensure that you have gathered sufficient data and insights before making the decision to stop an A/B test.
:::

So please consider your objectives and the stage of your testing process to decide which option is most appropriate for your needs.