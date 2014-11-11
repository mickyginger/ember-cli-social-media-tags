# Ember CLI Social Media Tags

## An Ember addon.

The addon is based around iStefo's Ember-Meta module (https://gist.github.com/iStefo/5481507), which I have basically put into a service, injected into the App's routes, under the namespace metaTags.

The service exposes 1 method `setTags` which takes an object of meta tag key value pairs.

At the moment only title and description are handled, but there will be more to come.

The facebook SDK script is also appended to the body of index.html. You will need to set your facebook app id in an environment variable in your app

	// your-app/config/environment.js

	ENV.APP.FACEBOOK_APP_ID: 123456789