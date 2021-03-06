'use strict';

module.exports = {
	name: 'ember-cli-social-media-tags',

	contentFor: function(type, appConfig) {

		if(type === 'body') {
			return	"<script>\n" + 
					"window.fbAsyncInit = function() {\n " +
						"FB.init({\n " + 
						"appId		: " + appConfig.APP.FACEBOOK_APP_ID + ",\n " +
						"xfbml		: true,\n" +
						"version	: 'v2.2'\n" +
						"});\n " +
					"};\n\n " +

					"(function(d, s, id){\n " +
					"var js, fjs = d.getElementsByTagName(s)[0];\n " + 
					"if (d.getElementById(id)) {return;}\n " + 
					"js = d.createElement(s); js.id = id;\n " +
					"js.src = '//connect.facebook.net/en_US/sdk.js';\n " +
					"fjs.parentNode.insertBefore(js, fjs);\n " +
					"}(document, 'script', 'facebook-jssdk'));" +
					"</script>";
		}
	}
};
