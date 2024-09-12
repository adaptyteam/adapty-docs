---
title: "Troubleshoot Amazon S3 integration"
description: "Find solutions to common problems that can cause Adapty's automatic export of events or paywall views to Amazon S3 to stop working, including bucket deletion, revoked access keys, and expired Amazon licenses"
metadataTitle: "Troubleshoot Adapty Integration Issues with Amazon S3"
---

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

While configuring the automatic export of Adapty events or paywall views, Adapty validates every step to prevent invalid setups. If you encounter an error message, follow its instructions to resolve the issue.

However, previously working integrations can sometimes stop functioning. Here are some possible reasons and solutions:

| Reason                               | Solution                                                                                                                                                                                                                                                                             |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The S3 Backet was deleted            | Create it again or [reconfigure the integration](set-up-amazon-s3#set-up-amazon-s3-integration-in-the-adapty-dashboard) to use another bucket.                                                                                                                                   |
| The Access key was revoked           | 1. Create a new access key as described in the [Create IAM user](set-up-amazon-s3#step-2-create-iam-user) section.  2. [Reconfigure the integration](set-up-amazon-s3#set-up-amazon-s3-integration-in-the-adapty-dashboard) to use the new access key and secret access key. |
| Amazon license was canceled/ expired | Purchase a new Amazon license.                                                                                                                                                                                                                                                       |