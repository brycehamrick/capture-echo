# capture-echo

A small library for simplifying integration between Echo Comments and Janrain Capture. This library includes support for Janrain Capture authentication and SSO integration.

## Example Usage

    <script type="text/javascript" src="http://cdn.echoenabled.com/clientapps/v2/jquery-pack.js"></script>
    <script type="text/javascript" src="capture-echo.js"></script>
    <script type="text/javascript">
      CAPTURE.ECHO.init({
        capture_addr: "",
        capture_client_id: "",
        serverBaseURL: "",
        busName: "",
        appkey: ""
      });
    </script>

- capture_addr: *Required*. This is your Capture domain.
- capture_client_id: *Required*. This is your Capture Client ID.
- serverBaseURL: *Required*. This is the full address to your Backplane server.
- busName: *Required*. This is your Echo bus name.
- appkey: *Required*. This is your Echo app key.
- xd_receiver: *Optional*. Set a valid xdcomm.html page if you are able to host it on the same domain. By default it will use the current page.
- sso_check: *Optional*. A URL to launch in an iframe to check for an active SSO session. Use this OR sso_server.
- sso_server: *Optional*. The domain of your SSO server. Use this OR sso_check.
- rpx_app_id: *Optional*. Your Janrain Engage application id. This will enable social sharing behavior.
