var CAPTURE = {

  ECHO: {

    defaults: {
      capture_width: 666,
      capture_height: 666,
      xd_receiver: null,
      rpx_app_id: null
    },
    scripts: [
      "http://cdn.echoenabled.com/clientapps/v2/backplane.js",
      "http://cdn.echoenabled.com/clientapps/v2/stream.js",
      "http://cdn.echoenabled.com/clientapps/v2/counter.js",
      "http://cdn.echoenabled.com/clientapps/v2/submit.js",
      "http://cdn.echoenabled.com/clientapps/v2/plugins/reply.js",
      "http://cdn.echoenabled.com/clientapps/v2/plugins/like.js",
      "http://cdn.echoenabled.com/clientapps/v2/plugins/community-flag.js",
      "http://cdn.echoenabled.com/clientapps/v2/plugins/form-auth.js",
      "http://cdn.echoenabled.com/clientapps/v2/plugins/janrain-sharing.js"
    ],

    init: function(options) {
      this.options = options;
      if (this.gup("xdcomm") == "true") {
        this.xdcommInit();
      } else {
        this.loadEchoJs();
      }
    },

    loadEchoJs: function() {
      var callback = CAPTURE.ECHO.mainInit;
      if(CAPTURE.ECHO.scripts.length > 1)
        callback = CAPTURE.ECHO.loadEchoJs;
      jQuery.getScript(CAPTURE.ECHO.scripts.splice(0, 1), callback);
    },

    xdcommInit: function() {
      var jsHost = (("https:" == document.location.protocol) ? "https://" : "http://static.");
      jQuery.getScript(jsHost + 'janraincapture.com/js/lib/xdcomm.js');
    },

    mainInit: function() {
      CAPTURE.ECHO.options = jQuery.extend(CAPTURE.ECHO.defaults, CAPTURE.ECHO.options);

      CAPTURE.ECHO.currentUrl = window.location.href;
      CAPTURE.ECHO.currentUrl = CAPTURE.ECHO.currentUrl.replace(/\#.+/, '').replace(/\?.+/, '');

      CAPTURE.ECHO.options.xd_receiver = (CAPTURE.ECHO.options.xd_receiver === null)
        ? CAPTURE.ECHO.currentUrl + "?xdcomm=true"
        : CAPTURE.ECHO.options.xd_receiver;
      CAPTURE.ECHO.options.xd_receiver = encodeURIComponent(CAPTURE.ECHO.options.xd_receiver);

      CAPTURE.ECHO.options.captureUrl = "https://" + CAPTURE.ECHO.options.capture_addr
        + "/oauth/signin?response_type=code&flags=stay_in_window&client_id="
        + CAPTURE.ECHO.options.capture_client_id + "&xd_receiver=" + CAPTURE.ECHO.options.xd_receiver
        + "&redirect_uri=http%3A%2F%2Fjs-kit.com%2Fapps%2Fjanrain%2Fwaiting.html&bp_channel=";

      Backplane.init({
        "serverBaseURL": CAPTURE.ECHO.options.serverBaseURL,
        "busName": CAPTURE.ECHO.options.busName
      });

      jQuery(".ecComments").each(CAPTURE.ECHO.comments);
    },

    comments: function(index, elem) {
      var counter = jQuery("<div>", {
        id: "echo-counter-echo2-" + index,
        class: "echo-counter-echo2 counter"
      });
      var counterLabel = jQuery("<div>", {
        id: "echo-counter-label-" + index,
        class: "echo-counter-label",
        html: "&nbsp;Comments"
      });
      var submitForm = jQuery("<div>", {
        id: "echo-submit-form-echo2-" + index,
        class: "echo-submit-form-echo2"
      });
      var stream = jQuery("<div>", {
        id: "echo-stream-echo2-" + index,
        class: "echo-stream-echo2"
      });
      var targetURL = jQuery(elem).attr('rel');

      jQuery(elem).append(
        counter,
        counterLabel,
        submitForm,
        stream
      );

      if (!targetURL)
        targetURL = CAPTURE.ECHO.currentUrl;
      
      var counter_opts = {
        "target": counter,
        "appkey": CAPTURE.ECHO.options.appkey,
        "query": "childrenof:" + targetURL
      };
      var stream_opts = {
        "target": stream,
        "appkey": CAPTURE.ECHO.options.appkey,
        "query": "childrenof:" + targetURL,
        "plugins": [
          {"name": "Reply"},
          {"name": "Like"},
          {"name": "CommunityFlag"}
        ]
      };
      var submit_opts = {
        "target": submitForm,
        "appkey": CAPTURE.ECHO.options.appkey,
        "targetURL": targetURL,
        "plugins": [
          {
            "name": "FormAuth",
            "identityManagerLogin": {
              "width": CAPTURE.ECHO.options.capture_width,
              "height": CAPTURE.ECHO.options.capture_height,
              "url": CAPTURE.ECHO.options.captureUrl
            },
            "identityManagerSignup": {
              "width": CAPTURE.ECHO.options.capture_width,
              "height": CAPTURE.ECHO.options.capture_height,
              "url": CAPTURE.ECHO.options.captureUrl
            },
            "identityManagerEdit": {
              "width": CAPTURE.ECHO.options.capture_width,
              "height": CAPTURE.ECHO.options.capture_height,
              "url": CAPTURE.ECHO.options.captureUrl
            },
            "submitPermissions": "forceLogin"
          }
        ]
      };
      
      if (CAPTURE.ECHO.options.rpx_app_id) {
        submit_opts.plugins.push({
          "name": "JanrainSharing",
          "appId": CAPTURE.ECHO.options.rpx_app_id,
          "xdReceiver": CAPTURE.ECHO.options.xd_receiver,
          "activity": {
            "sharePrompt": "Share your comment:",
            "shareContent": "I just commented '{content}' on {domain}",
            "itemURL": CAPTURE.ECHO.currentUrl
          }
        });
      }

      new Echo.Counter(counter_opts);
      new Echo.Stream(stream_opts);
      new Echo.Submit(submit_opts);
    },

    gup: function(name) {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.href);
      if (results == null)
        return "";
      else
        return results[1];
    }
  },

  resize: function(jargs) {
    args = jQuery.parseJSON(jargs);
    jQuery("#fancybox-inner, #fancybox-wrap, #fancybox-content, #fancybox-frame")
      .css({
        width: args.w, 
        height: args.h
      });
    jQuery.fancybox.center();
  }

};