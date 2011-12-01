# capture-echo

A small library for simplifying integration between Echo Comments and Janrain Capture. This library includes support for Janrain Capture authentication and SSO integration.

## Example Usage

    <script type="text/javascript" src="http://cdn.echoenabled.com/clientapps/v2/jquery-pack.js"></script>
    <script type="text/javascript" src="capture-echo.js"></script>
    <script type="text/javascript">
      CAPTURE.ECHO.init({
        capture_addr: "", // YOUR CAPTURE APPLICATION DOMAIN
        capture_client_id: "", // YOU CAPTURE CLIENT ID
        serverBaseURL: "", // THE FULL ADDRESS TO YOUR BACKPLANE SERVER
        busName: "", // YOUR ECHO BUS NAME
        appkey: "" // YOUR ECHO APP KEY
      });
    </script>