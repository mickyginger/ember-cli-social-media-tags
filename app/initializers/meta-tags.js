export default {
	name: 'meta',
	initialize: function(container, app) {
		app.inject('route', 'metaTags', 'service:meta-tags');
	}
}