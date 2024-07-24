---
title: "Maths behind the A/B tests"
description: ""
metadataTitle: ""
---

A/B testing is a powerful technique used to compare the performance of two different versions of a paywall. The ultimate goal is to determine which version is more effective based on the average revenue per user over a 12-month period. However, waiting for a full year to collect data and make decisions is impractical. Therefore, a 2-week revenue per user is used as a proxy metric, chosen based on historical data analysis to approximate the target metric. To achieve accurate and reliable results, it is crucial to employ a robust statistical method capable of handling diverse data types. Bayesian statistics, a popular approach in modern data analysis, provides a flexible and intuitive framework for A/B testing. By incorporating prior knowledge and updating it with new data, Bayesian methods allow for better decision-making under uncertainty. This document provides a comprehensive guide to the mathematical analysis employed by Adapty in evaluating A/B test results and providing valuable insights for data-driven decision-making.

## Adapty's approach to statistical analysis

Adapty employs a comprehensive approach to statistical analysis in order to evaluate the performance of A/B tests and provide accurate and reliable insights. Our methodology consists of the following key steps:

1. **Metric definition:** To conduct an AB test successfully, you need to identify and define the key metric that aligns with the specific goals and objectives of the analysis. Adapty leveraged a huge amount of historical subscription app data to determine which fits the role of a proxy metric for the long-term goal of average revenue after 1 year - and it is ARPU after 14 days.
2. **Hypothesis formulation:** We create two hypotheses for the A/B test. The null hypothesis (H0) assumes that there is no significant difference between the control group (A) and the test group (B). The alternative hypothesis (H1) suggests that there is a significant difference between the two or more groups.
3. ** Distribution selection: ** We choose the best distribution family based on the data characteristics and the metric we observe. The most frequent choice here is log-normal distribution (taking into account zero values).
4. **Probability-to-be-best calculation:** Utilising the Bayesian approach to A/B testing, we calculate the probability to be the best option for every paywall variant participating in the test. This value is surely connected to the p-values we used before, but it is essentially a different approach, more robust, and easier to understand.
5. **Results interpretation:** Probability to be best is exactly how it sounds. The larger the probability is, the higher the likelihood of a specific option being the best choice for the task. You need to determine the threshold for decision-making yourself, it should depend on many other factors of your specific situation, but a common probability choice is 95%.
6. **Prediction intervals:** Adapty calculates prediction intervals for the performance metrics of each group, providing a range of values within which the true population parameter is likely to fall. This helps quantify the uncertainty associated with the estimated performance metrics.

## Sample size determination

Determining an appropriate sample size is crucial for reliable and conclusive A/B test results. Adapty considers factors such as the statistical power and expected effect size, which continue to be important even under the Bayesian approach, to ensure an adequate sample size. The methods for estimating the required sample size, specific to the Bayesian approach we now employ, ensure the reliability of the analysis.

To learn more about the functionality of A/B tests, we recommend referring to our documentation on [creating](https://docs.adapty.io/docs/ab-test-copy) and [running A/B tests](https://docs.adapty.io/docs/audiences), as well as understanding the various [A/B test metrics and results.](https://docs.adapty.io/docs/results-and-metrics).

Adapty's analytical framework for A/B tests now employs a Bayesian approach, but the focus remains on the definition of metrics, formulation of hypotheses, and the selection of distributions. However, instead of determining p-values, we now compute the posterior distributions and calculate the probability of each variant being the best. We also determine the prediction intervals now. This revised approach, while still comprehensive and even more robust, is designed to provide insights that are more intuitive and easier to interpret. The goal remains to empower businesses to optimize their strategies, improve performance, and drive growth based on a robust statistical analysis of their A/B tests.