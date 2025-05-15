---
title: "Display onboardings"
metadataTitle: "Display Onboardings in Adapty | Adapty Docs"
---
import Collapse from '@site/src/components/Collapse';

If you've designed an [onboarding](onboardings.md) using the no-code builder, you don’t need to worry about rendering it in your app’s code. The onboarding itself handles what to display, how to display it, and how to process user actions like quiz answers or manual inputs. Additionally, it automatically logs the onboarding view event, so you don’t need to ensure analytics receives the data.

However, some coding is still required. You'll need to:

1. [Retrieve the onboarding.](get-onboardings.md)
2. Display it within your app.
3. Respond to the events it generates.

Before you start, ensure that:

1. You have installed [Adapty SDK](installation-of-adapty-sdks.md) 3.8.0 or later.
2. You have [created an onboarding](create-onboarding.md).
3. You have added the onboarding to a [placement](placements.md).