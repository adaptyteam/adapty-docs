---
title: "Flutter – Install Adapty SDK"
description: ""
metadataTitle: ""
---

:::danger
Read checklist before releasing the app

Be sure to carefully read [Release Checklist](https://docs.adapty.io/docs/release-checklist) when releasing your app. It's critical to make things right from the first attempt!
:::

Add Adapty to your `pubspec.yaml` file:

```yaml title="title="pubspec.yaml""
dependencies:
  adapty_flutter: ^2.9.3
```

And then run:

```bash title="title="flutter pub get""
```

After that, you can import Adapty SDK in your application like this:

```dart title="title="import 'package:adapty_flutter/adapty_flutter.dart';""
```