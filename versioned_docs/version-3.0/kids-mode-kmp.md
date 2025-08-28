---
title: "Kids Mode in Kotlin Multiplatform SDK"
description: "Learn how to implement kids mode functionality in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Kids Mode | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to implement kids mode functionality in the Adapty Kotlin Multiplatform SDK.

## Kids Mode overview

Kids mode is a special mode that provides a safe, child-friendly experience in your app. It typically includes:

- Simplified UI and navigation
- Restricted content and features
- Enhanced privacy protections
- Parental controls integration
- Age-appropriate content filtering

## Enable kids mode

Enable kids mode in your Kotlin Multiplatform app:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class KidsModeManager {
    private var isKidsModeEnabled = false
    
    fun enableKidsMode() {
        isKidsModeEnabled = true
        
        // Configure Adapty for kids mode
        configureAdaptyForKidsMode()
        
        // Update UI for kids mode
        updateUIForKidsMode()
        
        // Enable parental controls
        enableParentalControls()
        
        Log.d("KidsMode", "Kids mode enabled")
    }
    
    fun disableKidsMode() {
        isKidsModeEnabled = false
        
        // Restore normal Adapty configuration
        restoreNormalAdaptyConfiguration()
        
        // Update UI for normal mode
        updateUIForNormalMode()
        
        // Disable parental controls
        disableParentalControls()
        
        Log.d("KidsMode", "Kids mode disabled")
    }
    
    fun isKidsModeActive(): Boolean {
        return isKidsModeEnabled
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class KidsModeManager {
    private boolean isKidsModeEnabled = false;
    
    public void enableKidsMode() {
        isKidsModeEnabled = true;
        
        // Configure Adapty for kids mode
        configureAdaptyForKidsMode();
        
        // Update UI for kids mode
        updateUIForKidsMode();
        
        // Enable parental controls
        enableParentalControls();
        
        Log.d("KidsMode", "Kids mode enabled");
    }
    
    public void disableKidsMode() {
        isKidsModeEnabled = false;
        
        // Restore normal Adapty configuration
        restoreNormalAdaptyConfiguration();
        
        // Update UI for normal mode
        updateUIForNormalMode();
        
        // Disable parental controls
        disableParentalControls();
        
        Log.d("KidsMode", "Kids mode disabled");
    }
    
    public boolean isKidsModeActive() {
        return isKidsModeEnabled;
    }
}
```
</TabItem>
</Tabs>

## Configure Adapty for kids mode

Configure Adapty SDK settings for kids mode:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun configureAdaptyForKidsMode() {
    // Set user attributes for kids mode
    val userAttributes = mapOf(
        "kids_mode" to "true",
        "age_group" to "children",
        "content_filter" to "strict"
    )
    
    Adapty.setUserAttributes(userAttributes) { result ->
        when (result) {
            is AdaptyResult.Success -> {
                Log.d("KidsMode", "User attributes set for kids mode")
            }
            is AdaptyResult.Error -> {
                Log.e("KidsMode", "Failed to set user attributes: ${result.error.message}")
            }
        }
    }
    
    // Configure analytics for kids mode
    configureAnalyticsForKidsMode()
    
    // Set up restricted paywall access
    setupRestrictedPaywallAccess()
}

private fun configureAnalyticsForKidsMode() {
    // Disable or limit analytics tracking in kids mode
    val analyticsConfig = mapOf(
        "tracking_enabled" to "false",
        "personalized_ads" to "false",
        "data_collection" to "minimal"
    )
    
    // Apply analytics configuration
    applyAnalyticsConfiguration(analyticsConfig)
}

private fun setupRestrictedPaywallAccess() {
    // Only show age-appropriate paywalls in kids mode
    val allowedPaywallTypes = listOf(
        "educational_content",
        "safe_games",
        "parent_approved"
    )
    
    // Filter paywalls based on allowed types
    filterPaywallsByType(allowedPaywallTypes)
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void configureAdaptyForKidsMode() {
    // Set user attributes for kids mode
    Map<String, String> userAttributes = new HashMap<>();
    userAttributes.put("kids_mode", "true");
    userAttributes.put("age_group", "children");
    userAttributes.put("content_filter", "strict");
    
    Adapty.setUserAttributes(userAttributes, result -> {
        if (result instanceof AdaptyResult.Success) {
            Log.d("KidsMode", "User attributes set for kids mode");
        } else if (result instanceof AdaptyResult.Error) {
            Log.e("KidsMode", "Failed to set user attributes: " + ((AdaptyResult.Error) result).getError().getMessage());
        }
    });
    
    // Configure analytics for kids mode
    configureAnalyticsForKidsMode();
    
    // Set up restricted paywall access
    setupRestrictedPaywallAccess();
}

private void configureAnalyticsForKidsMode() {
    // Disable or limit analytics tracking in kids mode
    Map<String, String> analyticsConfig = new HashMap<>();
    analyticsConfig.put("tracking_enabled", "false");
    analyticsConfig.put("personalized_ads", "false");
    analyticsConfig.put("data_collection", "minimal");
    
    // Apply analytics configuration
    applyAnalyticsConfiguration(analyticsConfig);
}

private void setupRestrictedPaywallAccess() {
    // Only show age-appropriate paywalls in kids mode
    List<String> allowedPaywallTypes = Arrays.asList(
        "educational_content",
        "safe_games",
        "parent_approved"
    );
    
    // Filter paywalls based on allowed types
    filterPaywallsByType(allowedPaywallTypes);
}
```
</TabItem>
</Tabs>

## Update UI for kids mode

Update your app's UI to be child-friendly:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
private fun updateUIForKidsMode() {
    // Apply kid-friendly theme
    applyKidsTheme()
    
    // Simplify navigation
    simplifyNavigation()
    
    // Hide sensitive content
    hideSensitiveContent()
    
    // Show parental controls indicator
    showParentalControlsIndicator()
}

private fun applyKidsTheme() {
    // Apply bright, colorful theme
    val kidsTheme = KidsTheme(
        primaryColor = Color.parseColor("#FF6B6B"),
        secondaryColor = Color.parseColor("#4ECDC4"),
        backgroundColor = Color.parseColor("#F7F7F7"),
        textColor = Color.parseColor("#2C3E50")
    )
    
    applyTheme(kidsTheme)
}

private fun simplifyNavigation() {
    // Hide complex navigation elements
    hideComplexNavigation()
    
    // Show simplified menu
    showSimplifiedMenu()
    
    // Disable advanced features
    disableAdvancedFeatures()
}

private fun hideSensitiveContent() {
    // Hide adult content
    hideAdultContent()
    
    // Hide complex settings
    hideComplexSettings()
    
    // Hide analytics and tracking options
    hideTrackingOptions()
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
private void updateUIForKidsMode() {
    // Apply kid-friendly theme
    applyKidsTheme();
    
    // Simplify navigation
    simplifyNavigation();
    
    // Hide sensitive content
    hideSensitiveContent();
    
    // Show parental controls indicator
    showParentalControlsIndicator();
}

private void applyKidsTheme() {
    // Apply bright, colorful theme
    KidsTheme kidsTheme = new KidsTheme(
        Color.parseColor("#FF6B6B"),
        Color.parseColor("#4ECDC4"),
        Color.parseColor("#F7F7F7"),
        Color.parseColor("#2C3E50")
    );
    
    applyTheme(kidsTheme);
}

private void simplifyNavigation() {
    // Hide complex navigation elements
    hideComplexNavigation();
    
    // Show simplified menu
    showSimplifiedMenu();
    
    // Disable advanced features
    disableAdvancedFeatures();
}

private void hideSensitiveContent() {
    // Hide adult content
    hideAdultContent();
    
    // Hide complex settings
    hideComplexSettings();
    
    // Hide analytics and tracking options
    hideTrackingOptions();
}
```
</TabItem>
</Tabs>

## Parental controls

Implement parental controls for kids mode:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class ParentalControls {
    private var isParentalControlsEnabled = false
    private var parentPin: String? = null
    
    fun enableParentalControls(pin: String) {
        isParentalControlsEnabled = true
        parentPin = pin
        
        // Store PIN securely
        storePinSecurely(pin)
        
        // Set up PIN verification
        setupPinVerification()
        
        Log.d("ParentalControls", "Parental controls enabled")
    }
    
    fun disableParentalControls() {
        isParentalControlsEnabled = false
        parentPin = null
        
        // Clear stored PIN
        clearStoredPin()
        
        Log.d("ParentalControls", "Parental controls disabled")
    }
    
    fun verifyParentPin(inputPin: String, onResult: (Boolean) -> Unit) {
        if (parentPin == inputPin) {
            onResult(true)
            Log.d("ParentalControls", "Parent PIN verified successfully")
        } else {
            onResult(false)
            Log.d("ParentalControls", "Invalid parent PIN")
        }
    }
    
    fun exitKidsMode(onResult: (Boolean) -> Unit) {
        showPinPrompt { pin ->
            verifyParentPin(pin) { isValid ->
                if (isValid) {
                    // Exit kids mode
                    kidsModeManager.disableKidsMode()
                    onResult(true)
                } else {
                    // Show error message
                    showError("Invalid PIN")
                    onResult(false)
                }
            }
        }
    }
    
    private fun showPinPrompt(onPinEntered: (String) -> Unit) {
        // Show PIN input dialog
        val dialog = PinInputDialog(this)
        dialog.setOnPinEnteredListener { pin ->
            onPinEntered(pin)
        }
        dialog.show()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class ParentalControls {
    private boolean isParentalControlsEnabled = false;
    private String parentPin = null;
    
    public void enableParentalControls(String pin) {
        isParentalControlsEnabled = true;
        parentPin = pin;
        
        // Store PIN securely
        storePinSecurely(pin);
        
        // Set up PIN verification
        setupPinVerification();
        
        Log.d("ParentalControls", "Parental controls enabled");
    }
    
    public void disableParentalControls() {
        isParentalControlsEnabled = false;
        parentPin = null;
        
        // Clear stored PIN
        clearStoredPin();
        
        Log.d("ParentalControls", "Parental controls disabled");
    }
    
    public void verifyParentPin(String inputPin, OnResultListener<Boolean> onResult) {
        if (parentPin.equals(inputPin)) {
            onResult.onResult(true);
            Log.d("ParentalControls", "Parent PIN verified successfully");
        } else {
            onResult.onResult(false);
            Log.d("ParentalControls", "Invalid parent PIN");
        }
    }
    
    public void exitKidsMode(OnResultListener<Boolean> onResult) {
        showPinPrompt(pin -> {
            verifyParentPin(pin, isValid -> {
                if (isValid) {
                    // Exit kids mode
                    kidsModeManager.disableKidsMode();
                    onResult.onResult(true);
                } else {
                    // Show error message
                    showError("Invalid PIN");
                    onResult.onResult(false);
                }
            });
        });
    }
    
    private void showPinPrompt(OnPinEnteredListener onPinEntered) {
        // Show PIN input dialog
        PinInputDialog dialog = new PinInputDialog(this);
        dialog.setOnPinEnteredListener(pin -> {
            onPinEntered.onPinEntered(pin);
        });
        dialog.show();
    }
}
```
</TabItem>
</Tabs>

## Content filtering

Implement content filtering for kids mode:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class ContentFilter {
    private val blockedKeywords = listOf(
        "adult", "violence", "gambling", "alcohol", "tobacco",
        "drugs", "inappropriate", "mature", "explicit"
    )
    
    private val allowedCategories = listOf(
        "educational", "games", "books", "videos", "music",
        "art", "science", "math", "reading", "puzzles"
    )
    
    fun filterContent(content: String): Boolean {
        // Check for blocked keywords
        val hasBlockedKeywords = blockedKeywords.any { keyword ->
            content.contains(keyword, ignoreCase = true)
        }
        
        if (hasBlockedKeywords) {
            Log.d("ContentFilter", "Content blocked due to inappropriate keywords")
            return false
        }
        
        // Check if content is age-appropriate
        val isAgeAppropriate = checkAgeAppropriateness(content)
        
        if (!isAgeAppropriate) {
            Log.d("ContentFilter", "Content blocked due to age inappropriateness")
            return false
        }
        
        return true
    }
    
    fun filterPaywall(paywall: AdaptyPaywall): Boolean {
        // Check paywall category
        val category = paywall.developerId ?: ""
        
        if (!allowedCategories.any { allowed ->
            category.contains(allowed, ignoreCase = true)
        }) {
            Log.d("ContentFilter", "Paywall blocked: category not allowed")
            return false
        }
        
        // Check paywall content
        val content = paywall.name + " " + (paywall.description ?: "")
        
        return filterContent(content)
    }
    
    private fun checkAgeAppropriateness(content: String): Boolean {
        // Implement age appropriateness check
        // This could involve AI content analysis, manual review, etc.
        
        // For now, use a simple heuristic
        val inappropriateIndicators = listOf(
            "violence", "sexual", "profanity", "dangerous"
        )
        
        return !inappropriateIndicators.any { indicator ->
            content.contains(indicator, ignoreCase = true)
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class ContentFilter {
    private List<String> blockedKeywords = Arrays.asList(
        "adult", "violence", "gambling", "alcohol", "tobacco",
        "drugs", "inappropriate", "mature", "explicit"
    );
    
    private List<String> allowedCategories = Arrays.asList(
        "educational", "games", "books", "videos", "music",
        "art", "science", "math", "reading", "puzzles"
    );
    
    public boolean filterContent(String content) {
        // Check for blocked keywords
        boolean hasBlockedKeywords = blockedKeywords.stream()
            .anyMatch(keyword -> content.toLowerCase().contains(keyword.toLowerCase()));
        
        if (hasBlockedKeywords) {
            Log.d("ContentFilter", "Content blocked due to inappropriate keywords");
            return false;
        }
        
        // Check if content is age-appropriate
        boolean isAgeAppropriate = checkAgeAppropriateness(content);
        
        if (!isAgeAppropriate) {
            Log.d("ContentFilter", "Content blocked due to age inappropriateness");
            return false;
        }
        
        return true;
    }
    
    public boolean filterPaywall(AdaptyPaywall paywall) {
        // Check paywall category
        String category = paywall.getDeveloperId() != null ? paywall.getDeveloperId() : "";
        
        boolean isAllowedCategory = allowedCategories.stream()
            .anyMatch(allowed -> category.toLowerCase().contains(allowed.toLowerCase()));
        
        if (!isAllowedCategory) {
            Log.d("ContentFilter", "Paywall blocked: category not allowed");
            return false;
        }
        
        // Check paywall content
        String content = paywall.getName() + " " + (paywall.getDescription() != null ? paywall.getDescription() : "");
        
        return filterContent(content);
    }
    
    private boolean checkAgeAppropriateness(String content) {
        // Implement age appropriateness check
        // This could involve AI content analysis, manual review, etc.
        
        // For now, use a simple heuristic
        List<String> inappropriateIndicators = Arrays.asList(
            "violence", "sexual", "profanity", "dangerous"
        );
        
        return !inappropriateIndicators.stream()
            .anyMatch(indicator -> content.toLowerCase().contains(indicator.toLowerCase()));
    }
}
```
</TabItem>
</Tabs>

## Complete kids mode implementation

Here's a complete example of kids mode implementation:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class KidsModeApp {
    private lateinit var kidsModeManager: KidsModeManager
    private lateinit var parentalControls: ParentalControls
    private lateinit var contentFilter: ContentFilter
    
    fun initialize() {
        kidsModeManager = KidsModeManager()
        parentalControls = ParentalControls()
        contentFilter = ContentFilter()
        
        // Check if kids mode should be enabled
        checkKidsModePreference()
    }
    
    private fun checkKidsModePreference() {
        val isKidsModePreferred = getKidsModePreference()
        
        if (isKidsModePreferred) {
            enableKidsModeWithParentalControls()
        }
    }
    
    private fun enableKidsModeWithParentalControls() {
        // Show parental setup dialog
        showParentalSetupDialog { pin ->
            // Enable parental controls
            parentalControls.enableParentalControls(pin)
            
            // Enable kids mode
            kidsModeManager.enableKidsMode()
            
            // Configure Adapty for kids mode
            configureAdaptyForKidsMode()
            
            Log.d("KidsModeApp", "Kids mode enabled with parental controls")
        }
    }
    
    private fun configureAdaptyForKidsMode() {
        // Set user attributes
        val userAttributes = mapOf(
            "kids_mode" to "true",
            "age_group" to "children",
            "parental_controls" to "enabled"
        )
        
        Adapty.setUserAttributes(userAttributes) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    Log.d("KidsModeApp", "Adapty configured for kids mode")
                    setupContentFiltering()
                }
                is AdaptyResult.Error -> {
                    Log.e("KidsModeApp", "Failed to configure Adapty: ${result.error.message}")
                }
            }
        }
    }
    
    private fun setupContentFiltering() {
        // Filter paywalls before showing them
        Adapty.getPaywalls { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywalls = result.value
                    val filteredPaywalls = paywalls.filter { paywall ->
                        contentFilter.filterPaywall(paywall)
                    }
                    
                    // Show only filtered paywalls
                    showFilteredPaywalls(filteredPaywalls)
                }
                is AdaptyResult.Error -> {
                    Log.e("KidsModeApp", "Failed to get paywalls: ${result.error.message}")
                }
            }
        }
    }
    
    private fun showFilteredPaywalls(paywalls: List<AdaptyPaywall>) {
        // Show only age-appropriate paywalls
        if (paywalls.isNotEmpty()) {
            // Present paywalls with kids-friendly UI
            presentKidsPaywalls(paywalls)
        } else {
            // Show message that no appropriate content is available
            showNoContentMessage()
        }
    }
    
    private fun presentKidsPaywalls(paywalls: List<AdaptyPaywall>) {
        // Create kids-friendly paywall presentation
        val kidsPaywallConfig = KidsPaywallConfig(
            backgroundColor = Color.parseColor("#FFE5E5"),
            textColor = Color.parseColor("#2C3E50"),
            buttonColor = Color.parseColor("#4ECDC4"),
            showParentalControls = true
        )
        
        // Present paywalls with kids configuration
        presentPaywalls(paywalls, kidsPaywallConfig)
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class KidsModeApp {
    private KidsModeManager kidsModeManager;
    private ParentalControls parentalControls;
    private ContentFilter contentFilter;
    
    public void initialize() {
        kidsModeManager = new KidsModeManager();
        parentalControls = new ParentalControls();
        contentFilter = new ContentFilter();
        
        // Check if kids mode should be enabled
        checkKidsModePreference();
    }
    
    private void checkKidsModePreference() {
        boolean isKidsModePreferred = getKidsModePreference();
        
        if (isKidsModePreferred) {
            enableKidsModeWithParentalControls();
        }
    }
    
    private void enableKidsModeWithParentalControls() {
        // Show parental setup dialog
        showParentalSetupDialog(pin -> {
            // Enable parental controls
            parentalControls.enableParentalControls(pin);
            
            // Enable kids mode
            kidsModeManager.enableKidsMode();
            
            // Configure Adapty for kids mode
            configureAdaptyForKidsMode();
            
            Log.d("KidsModeApp", "Kids mode enabled with parental controls");
        });
    }
    
    private void configureAdaptyForKidsMode() {
        // Set user attributes
        Map<String, String> userAttributes = new HashMap<>();
        userAttributes.put("kids_mode", "true");
        userAttributes.put("age_group", "children");
        userAttributes.put("parental_controls", "enabled");
        
        Adapty.setUserAttributes(userAttributes, result -> {
            if (result instanceof AdaptyResult.Success) {
                Log.d("KidsModeApp", "Adapty configured for kids mode");
                setupContentFiltering();
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("KidsModeApp", "Failed to configure Adapty: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void setupContentFiltering() {
        // Filter paywalls before showing them
        Adapty.getPaywalls(result -> {
            if (result instanceof AdaptyResult.Success) {
                List<AdaptyPaywall> paywalls = ((AdaptyResult.Success<List<AdaptyPaywall>>) result).getValue();
                List<AdaptyPaywall> filteredPaywalls = paywalls.stream()
                    .filter(paywall -> contentFilter.filterPaywall(paywall))
                    .collect(Collectors.toList());
                
                // Show only filtered paywalls
                showFilteredPaywalls(filteredPaywalls);
            } else if (result instanceof AdaptyResult.Error) {
                Log.e("KidsModeApp", "Failed to get paywalls: " + ((AdaptyResult.Error) result).getError().getMessage());
            }
        });
    }
    
    private void showFilteredPaywalls(List<AdaptyPaywall> paywalls) {
        // Show only age-appropriate paywalls
        if (!paywalls.isEmpty()) {
            // Present paywalls with kids-friendly UI
            presentKidsPaywalls(paywalls);
        } else {
            // Show message that no appropriate content is available
            showNoContentMessage();
        }
    }
    
    private void presentKidsPaywalls(List<AdaptyPaywall> paywalls) {
        // Create kids-friendly paywall presentation
        KidsPaywallConfig kidsPaywallConfig = new KidsPaywallConfig(
            Color.parseColor("#FFE5E5"),
            Color.parseColor("#2C3E50"),
            Color.parseColor("#4ECDC4"),
            true
        );
        
        // Present paywalls with kids configuration
        presentPaywalls(paywalls, kidsPaywallConfig);
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Handle errors](kmp-handle-errors.md) - Learn about error handling
- [Test integration](kmp-test.md) - Test your kids mode implementation
- [Privacy best practices](https://developer.apple.com/app-store/review/guidelines/#privacy) - Apple's privacy guidelines for kids apps
