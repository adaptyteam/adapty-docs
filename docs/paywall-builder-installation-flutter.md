---
title: "Flutter – Install AdaptyUI SDK"
description: ""
metadataTitle: ""
---

Begin configuring the Adapty paywall builder by installing the AdaptyUI SDK. Note that the AdaptyUI SDK is necessary only if you intend to use the paywalls created with the Paywall Builder.

Add AdaptyUI to your `pubspec.yaml` file:

```yaml title="pubspec.yaml"
dependencies:
  adapty_ui_flutter: ^2.1.1
```

And then run:

```bash title="Bash"
flutter pub get
```

After that, you can import Adapty SDK in your application like this:

```dart title="Dart"
import 'package:adapty_ui_flutter/adapty_ui_flutter.dart';
```

Please consult the compatibility table below to choose the correct pair of Adapty SDK and AdaptyUI SDK.

| Adapty SDK version | AdaptyUI SDK version |
| :----------------- | :------------------- |
| 2.9.3              | 2.1.0                |
| 2.10.0 or later    | 2.1.1                |