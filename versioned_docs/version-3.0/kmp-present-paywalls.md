---
title: "Present paywalls in Kotlin Multiplatform SDK"
description: "Learn how to present paywalls in your Kotlin Multiplatform app with Adapty."
metadataTitle: "Present Paywalls | Kotlin Multiplatform SDK | Adapty Docs"
displayed_sidebar: sdkkmp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page covers how to present paywalls in the Adapty Kotlin Multiplatform SDK.

## Presenting paywalls overview

There are several ways to present paywalls in your app:

- **Full-screen paywall** - Present as a new activity
- **Modal paywall** - Present as a dialog or bottom sheet
- **Inline paywall** - Embed within existing UI

## Present full-screen paywall

Present a paywall as a full-screen activity:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun presentFullScreenPaywall(placementId: String) {
    // Create intent to launch paywall activity
    val intent = Intent(this, PaywallActivity::class.java).apply {
        putExtra("placement_id", placementId)
    }
    
    // Start paywall activity
    startActivity(intent)
}

// In PaywallActivity
class PaywallActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_paywall)
        
        val placementId = intent.getStringExtra("placement_id") ?: "main"
        loadPaywall(placementId)
    }
    
    private fun loadPaywall(placementId: String) {
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    if (paywall.hasViewConfiguration) {
                        displayPaywallBuilderPaywall(paywall)
                    } else {
                        displayManualPaywall(paywall)
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void presentFullScreenPaywall(String placementId) {
    // Create intent to launch paywall activity
    Intent intent = new Intent(this, PaywallActivity.class);
    intent.putExtra("placement_id", placementId);
    
    // Start paywall activity
    startActivity(intent);
}

// In PaywallActivity
public class PaywallActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paywall);
        
        String placementId = getIntent().getStringExtra("placement_id");
        if (placementId == null) {
            placementId = "main";
        }
        loadPaywall(placementId);
    }
    
    private void loadPaywall(String placementId) {
        Adapty.getPaywall(placementId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                if (paywall.hasViewConfiguration()) {
                    displayPaywallBuilderPaywall(paywall);
                } else {
                    displayManualPaywall(paywall);
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Failed to load paywall: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Present modal paywall

Present a paywall as a modal dialog or bottom sheet:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun presentModalPaywall(placementId: String) {
    // Create paywall fragment
    val paywallFragment = PaywallFragment.newInstance(placementId)
    
    // Show as dialog
    paywallFragment.show(supportFragmentManager, "paywall_dialog")
}

// PaywallFragment
class PaywallFragment : DialogFragment() {
    private var placementId: String? = null
    
    companion object {
        fun newInstance(placementId: String): PaywallFragment {
            return PaywallFragment().apply {
                this.placementId = placementId
            }
        }
    }
    
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return Dialog(requireContext(), R.style.PaywallDialog).apply {
            setContentView(R.layout.fragment_paywall)
            
            // Load paywall
            loadPaywall(placementId ?: "main")
        }
    }
    
    private fun loadPaywall(placementId: String) {
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    if (paywall.hasViewConfiguration) {
                        displayPaywallBuilderPaywall(paywall)
                    } else {
                        displayManualPaywall(paywall)
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void presentModalPaywall(String placementId) {
    // Create paywall fragment
    PaywallFragment paywallFragment = PaywallFragment.newInstance(placementId);
    
    // Show as dialog
    paywallFragment.show(getSupportFragmentManager(), "paywall_dialog");
}

// PaywallFragment
public class PaywallFragment extends DialogFragment {
    private String placementId;
    
    public static PaywallFragment newInstance(String placementId) {
        PaywallFragment fragment = new PaywallFragment();
        fragment.placementId = placementId;
        return fragment;
    }
    
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = new Dialog(requireContext(), R.style.PaywallDialog);
        dialog.setContentView(R.layout.fragment_paywall);
        
        // Load paywall
        loadPaywall(placementId != null ? placementId : "main");
        
        return dialog;
    }
    
    private void loadPaywall(String placementId) {
        Adapty.getPaywall(placementId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                if (paywall.hasViewConfiguration()) {
                    displayPaywallBuilderPaywall(paywall);
                } else {
                    displayManualPaywall(paywall);
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Failed to load paywall: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Present inline paywall

Embed a paywall within your existing UI:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class MainActivity : AppCompatActivity() {
    private lateinit var paywallContainer: FrameLayout
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        paywallContainer = findViewById(R.id.paywall_container)
        
        // Load and display inline paywall
        loadInlinePaywall("main")
    }
    
    private fun loadInlinePaywall(placementId: String) {
        Adapty.getPaywall(placementId) { result ->
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    if (paywall.hasViewConfiguration) {
                        displayInlinePaywallBuilderPaywall(paywall)
                    } else {
                        displayInlineManualPaywall(paywall)
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage("Failed to load paywall: ${error.message}")
                }
            }
        }
    }
    
    private fun displayInlinePaywallBuilderPaywall(paywall: AdaptyPaywall) {
        AdaptyUI.getViewConfiguration(paywall) { configResult ->
            when (configResult) {
                is AdaptyResult.Success -> {
                    val viewConfiguration = configResult.value
                    
                    // Create paywall view
                    val paywallView = AdaptyUI.getPaywallView(
                        this,
                        viewConfiguration,
                        null, // products = null means auto-fetch
                        eventListener
                    )
                    
                    // Add to container
                    paywallContainer.removeAllViews()
                    paywallContainer.addView(paywallView)
                }
                is AdaptyResult.Error -> {
                    val error = configResult.error
                    showErrorMessage("Failed to get view configuration: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {
    private FrameLayout paywallContainer;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        paywallContainer = findViewById(R.id.paywall_container);
        
        // Load and display inline paywall
        loadInlinePaywall("main");
    }
    
    private void loadInlinePaywall(String placementId) {
        Adapty.getPaywall(placementId, result -> {
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                if (paywall.hasViewConfiguration()) {
                    displayInlinePaywallBuilderPaywall(paywall);
                } else {
                    displayInlineManualPaywall(paywall);
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage("Failed to load paywall: " + error.getMessage());
            }
        });
    }
    
    private void displayInlinePaywallBuilderPaywall(AdaptyPaywall paywall) {
        AdaptyUI.getViewConfiguration(paywall, configResult -> {
            if (configResult instanceof AdaptyResult.Success) {
                AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
                
                // Create paywall view
                AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                    this,
                    viewConfiguration,
                    null, // products = null means auto-fetch
                    eventListener
                );
                
                // Add to container
                paywallContainer.removeAllViews();
                paywallContainer.addView(paywallView);
            } else if (configResult instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) configResult).getError();
                showErrorMessage("Failed to get view configuration: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Present paywall with result

Present a paywall and handle the result:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class MainActivity : AppCompatActivity() {
    private val PAYWALL_REQUEST_CODE = 1001
    
    fun presentPaywallWithResult(placementId: String) {
        val intent = Intent(this, PaywallActivity::class.java).apply {
            putExtra("placement_id", placementId)
        }
        
        startActivityForResult(intent, PAYWALL_REQUEST_CODE)
    }
    
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        
        if (requestCode == PAYWALL_REQUEST_CODE) {
            when (resultCode) {
                Activity.RESULT_OK -> {
                    // Purchase was successful
                    val productId = data?.getStringExtra("product_id")
                    showSuccessMessage("Purchase successful: $productId")
                    
                    // Update UI
                    updateSubscriptionStatus()
                }
                Activity.RESULT_CANCELED -> {
                    // User cancelled
                    showMessage("Purchase cancelled")
                }
                else -> {
                    // Error occurred
                    val errorMessage = data?.getStringExtra("error_message")
                    showErrorMessage("Purchase failed: $errorMessage")
                }
            }
        }
    }
}

// In PaywallActivity
class PaywallActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_paywall)
        
        val placementId = intent.getStringExtra("placement_id") ?: "main"
        loadPaywall(placementId)
    }
    
    private fun handlePurchaseSuccess(productId: String) {
        val resultIntent = Intent().apply {
            putExtra("product_id", productId)
        }
        setResult(Activity.RESULT_OK, resultIntent)
        finish()
    }
    
    private fun handlePurchaseError(errorMessage: String) {
        val resultIntent = Intent().apply {
            putExtra("error_message", errorMessage)
        }
        setResult(Activity.RESULT_FIRST_USER, resultIntent)
        finish()
    }
    
    private fun handlePurchaseCancelled() {
        setResult(Activity.RESULT_CANCELED)
        finish()
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class MainActivity extends AppCompatActivity {
    private static final int PAYWALL_REQUEST_CODE = 1001;
    
    public void presentPaywallWithResult(String placementId) {
        Intent intent = new Intent(this, PaywallActivity.class);
        intent.putExtra("placement_id", placementId);
        
        startActivityForResult(intent, PAYWALL_REQUEST_CODE);
    }
    
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        
        if (requestCode == PAYWALL_REQUEST_CODE) {
            switch (resultCode) {
                case Activity.RESULT_OK:
                    // Purchase was successful
                    String productId = data != null ? data.getStringExtra("product_id") : null;
                    showSuccessMessage("Purchase successful: " + productId);
                    
                    // Update UI
                    updateSubscriptionStatus();
                    break;
                case Activity.RESULT_CANCELED:
                    // User cancelled
                    showMessage("Purchase cancelled");
                    break;
                default:
                    // Error occurred
                    String errorMessage = data != null ? data.getStringExtra("error_message") : null;
                    showErrorMessage("Purchase failed: " + errorMessage);
                    break;
            }
        }
    }
}

// In PaywallActivity
public class PaywallActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_paywall);
        
        String placementId = getIntent().getStringExtra("placement_id");
        if (placementId == null) {
            placementId = "main";
        }
        loadPaywall(placementId);
    }
    
    private void handlePurchaseSuccess(String productId) {
        Intent resultIntent = new Intent();
        resultIntent.putExtra("product_id", productId);
        setResult(Activity.RESULT_OK, resultIntent);
        finish();
    }
    
    private void handlePurchaseError(String errorMessage) {
        Intent resultIntent = new Intent();
        resultIntent.putExtra("error_message", errorMessage);
        setResult(Activity.RESULT_FIRST_USER, resultIntent);
        finish();
    }
    
    private void handlePurchaseCancelled() {
        setResult(Activity.RESULT_CANCELED);
        finish();
    }
}
```
</TabItem>
</Tabs>

## Present paywall conditionally

Present a paywall based on subscription status:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
fun presentPaywallIfNeeded(placementId: String) {
    // First check current subscription status
    Adapty.getProfile { result ->
        when (result) {
            is AdaptyResult.Success -> {
                val profile = result.value
                
                // Check if user has active subscription
                val hasActiveSubscription = profile.accessLevels.values.any { it.isActive }
                
                if (hasActiveSubscription) {
                    // User has subscription - don't show paywall
                    showMessage("You already have an active subscription")
                } else {
                    // User doesn't have subscription - show paywall
                    presentPaywall(placementId)
                }
            }
            is AdaptyResult.Error -> {
                val error = result.error
                showErrorMessage("Failed to check subscription status: ${error.message}")
            }
        }
    }
}

private fun presentPaywall(placementId: String) {
    val intent = Intent(this, PaywallActivity::class.java).apply {
        putExtra("placement_id", placementId)
    }
    startActivity(intent)
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public void presentPaywallIfNeeded(String placementId) {
    // First check current subscription status
    Adapty.getProfile(result -> {
        if (result instanceof AdaptyResult.Success) {
            AdaptyProfile profile = ((AdaptyResult.Success<AdaptyProfile>) result).getValue();
            
            // Check if user has active subscription
            boolean hasActiveSubscription = profile.getAccessLevels().values().stream()
                .anyMatch(AdaptyAccessLevel::isActive);
            
            if (hasActiveSubscription) {
                // User has subscription - don't show paywall
                showMessage("You already have an active subscription");
            } else {
                // User doesn't have subscription - show paywall
                presentPaywall(placementId);
            }
        } else if (result instanceof AdaptyResult.Error) {
            AdaptyError error = ((AdaptyResult.Error) result).getError();
            showErrorMessage("Failed to check subscription status: " + error.getMessage());
        }
    });
}

private void presentPaywall(String placementId) {
    Intent intent = new Intent(this, PaywallActivity.class);
    intent.putExtra("placement_id", placementId);
    startActivity(intent);
}
```
</TabItem>
</Tabs>

## Present paywall with loading state

Present a paywall with proper loading states:

<Tabs groupId="current-os" queryString>

<TabItem value="kotlin" label="Kotlin" default>

```kotlin showLineNumbers
class PaywallPresenter {
    private var loadingDialog: AlertDialog? = null
    
    fun presentPaywallWithLoading(activity: Activity, placementId: String) {
        // Show loading dialog
        showLoadingDialog(activity)
        
        // Load paywall
        Adapty.getPaywall(placementId) { result ->
            // Hide loading dialog
            hideLoadingDialog()
            
            when (result) {
                is AdaptyResult.Success -> {
                    val paywall = result.value
                    
                    // Present paywall
                    if (paywall.hasViewConfiguration) {
                        presentPaywallBuilderPaywall(activity, paywall)
                    } else {
                        presentManualPaywall(activity, paywall)
                    }
                }
                is AdaptyResult.Error -> {
                    val error = result.error
                    showErrorMessage(activity, "Failed to load paywall: ${error.message}")
                }
            }
        }
    }
    
    private fun showLoadingDialog(activity: Activity) {
        loadingDialog = AlertDialog.Builder(activity)
            .setView(R.layout.dialog_loading)
            .setCancelable(false)
            .create()
        loadingDialog?.show()
    }
    
    private fun hideLoadingDialog() {
        loadingDialog?.dismiss()
        loadingDialog = null
    }
    
    private fun presentPaywallBuilderPaywall(activity: Activity, paywall: AdaptyPaywall) {
        AdaptyUI.getViewConfiguration(paywall) { configResult ->
            when (configResult) {
                is AdaptyResult.Success -> {
                    val viewConfiguration = configResult.value
                    
                    // Create paywall view
                    val paywallView = AdaptyUI.getPaywallView(
                        activity,
                        viewConfiguration,
                        null,
                        createEventListener()
                    )
                    
                    // Present in new activity
                    val intent = Intent(activity, PaywallActivity::class.java)
                    activity.startActivity(intent)
                }
                is AdaptyResult.Error -> {
                    val error = configResult.error
                    showErrorMessage(activity, "Failed to get view configuration: ${error.message}")
                }
            }
        }
    }
}
```
</TabItem>
<TabItem value="java" label="Java" default>

```java showLineNumbers
public class PaywallPresenter {
    private AlertDialog loadingDialog;
    
    public void presentPaywallWithLoading(Activity activity, String placementId) {
        // Show loading dialog
        showLoadingDialog(activity);
        
        // Load paywall
        Adapty.getPaywall(placementId, result -> {
            // Hide loading dialog
            hideLoadingDialog();
            
            if (result instanceof AdaptyResult.Success) {
                AdaptyPaywall paywall = ((AdaptyResult.Success<AdaptyPaywall>) result).getValue();
                
                // Present paywall
                if (paywall.hasViewConfiguration()) {
                    presentPaywallBuilderPaywall(activity, paywall);
                } else {
                    presentManualPaywall(activity, paywall);
                }
            } else if (result instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) result).getError();
                showErrorMessage(activity, "Failed to load paywall: " + error.getMessage());
            }
        });
    }
    
    private void showLoadingDialog(Activity activity) {
        loadingDialog = new AlertDialog.Builder(activity)
            .setView(R.layout.dialog_loading)
            .setCancelable(false)
            .create();
        loadingDialog.show();
    }
    
    private void hideLoadingDialog() {
        if (loadingDialog != null) {
            loadingDialog.dismiss();
            loadingDialog = null;
        }
    }
    
    private void presentPaywallBuilderPaywall(Activity activity, AdaptyPaywall paywall) {
        AdaptyUI.getViewConfiguration(paywall, configResult -> {
            if (configResult instanceof AdaptyResult.Success) {
                AdaptyUI.LocalizedViewConfiguration viewConfiguration = 
                    ((AdaptyResult.Success<AdaptyUI.LocalizedViewConfiguration>) configResult).getValue();
                
                // Create paywall view
                AdaptyPaywallView paywallView = AdaptyUI.getPaywallView(
                    activity,
                    viewConfiguration,
                    null,
                    createEventListener()
                );
                
                // Present in new activity
                Intent intent = new Intent(activity, PaywallActivity.class);
                activity.startActivity(intent);
            } else if (configResult instanceof AdaptyResult.Error) {
                AdaptyError error = ((AdaptyResult.Error) configResult).getError();
                showErrorMessage(activity, "Failed to get view configuration: " + error.getMessage());
            }
        });
    }
}
```
</TabItem>
</Tabs>

## Next steps

- [Paywalls overview](kmp-paywalls.md) - Learn about different paywall approaches
- [Get Paywall Builder paywalls](kmp-get-pb-paywalls.md) - Learn about getting Paywall Builder paywalls
- [Handle paywall actions](kmp-handle-paywall-actions.md) - Learn about handling paywall actions
