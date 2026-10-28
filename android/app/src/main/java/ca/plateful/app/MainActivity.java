package ca.plateful.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

/**
 * The Plateful app. A link shared to Plateful (Share → Plateful in Chrome, TikTok, YouTube…) reloads the web app with
 * ?share_text=…, which the app reads once and opens on Add recipe; the page is then read on the phone itself.
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleShare(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleShare(intent);
    }

    private void handleShare(Intent intent) {
        if (intent == null || !Intent.ACTION_SEND.equals(intent.getAction())) return;
        String text = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (text == null || text.trim().isEmpty()) return;
        String subject = intent.getStringExtra(Intent.EXTRA_SUBJECT);
        String url = getBridge().getLocalUrl() + "/?share_text=" + Uri.encode(text)
            + (subject != null ? "&share_title=" + Uri.encode(subject) : "");
        intent.setAction(Intent.ACTION_MAIN); // handled once, not again on rotation
        WebView web = getBridge().getWebView();
        web.post(() -> web.loadUrl(url));
    }
}
