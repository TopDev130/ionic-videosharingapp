/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package com.guinatal.refreshgallery;

import java.io.File;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import org.apache.cordova.*;

/**
 * @author Guilherme Natal de Mello (guinatal.com)
 *
 */

public class PluginRefreshGallery extends CordovaPlugin {

  public CallbackContext callbackContext;
  /**
   * Executes the request and returns PluginResult.
   *
   * @param action            The action to execute.
   * @param args              JSONArry of arguments for the plugin.
   * @param callbackContext   The callback id used when calling back into JavaScript.
   * @return                  A PluginResult object with a status and message.
   */

  @Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {

    this.callbackContext = callbackContext;

		try {

			if (action.equals("refresh")) {

				String filePath = checkFilePath(args.getString(0));

				if (filePath.equals("")) {
          PluginResult r = new PluginResult(PluginResult.Status.ERROR);
          callbackContext.sendPluginResult(r);
					return true;
				}

				File file = new File(filePath);

				Intent scanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
				scanIntent.setData(Uri.fromFile(file));

				Context context = webView.getContext();
				context.sendBroadcast(scanIntent);
			}

      PluginResult r = new PluginResult(PluginResult.Status.OK);
      callbackContext.sendPluginResult(r);
      return true;

		} catch (JSONException e) {

      PluginResult r = new PluginResult(PluginResult.Status.JSON_EXCEPTION);
      callbackContext.sendPluginResult(r);
      return true;

		} catch (Exception e) {

      PluginResult r = new PluginResult(PluginResult.Status.ERROR);
      callbackContext.sendPluginResult(r);
      return true;
		}
	}

	private String checkFilePath(String filePath) {

		String return_value = "";

		try {

			return_value = filePath.replaceAll("^file://", "");

		} catch (Exception e) {

			System.out.println("Error with the filePath");
      
		}

		return return_value;
	}
}
