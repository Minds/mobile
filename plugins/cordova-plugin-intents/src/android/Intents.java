package org.minds.intents;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.graphics.Rect;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;

import android.util.Log;
import android.content.Intent;

public class Intents extends CordovaPlugin{

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("onIntent")) {
            
            Intent intent = cordova.getActivity().getIntent();
            String intentAction = intent.getAction();
            String intentType = intent.getType();
            Log.w("Intents", "initialized..");

            if (Intent.ACTION_SEND.equals(intentAction) && intentType != null) {
                if ("text/plain".equals(intentType)) {
                    String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
                    JSONObject params = new JSONObject();
                    params.put("type", "text");
                    params.put("data", sharedText);
                    callbackContext.success(params);
                } else if (intentType.startsWith("image/")) {
    //                handleSendImage(intent); // Handle single image being sent
                }
            }


            return true;
        }
        return false;  // Returning false results in a "MethodNotFound" error.
    }
}
