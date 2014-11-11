function _getTag(tagName, property, value) {
	var tags = document.head.getElementsByTagName(tagName),
		tag,
		i = tags.length;

	while(i--) {
		tag = tags[i];

		if(tag[property] && tag[property] === value) {
			return tag;
		}
	}
}

export default Ember.Object.extend({	
	title: null,
	description: null,

	// DOM elements
	_ogTitle: null,
	_description: null,
	_ogDescription: null,

	// defaults
	defaults: {
		title: null,
		description: null
	},

	summary: Ember.computed(function() {
		return "<title>" + this.get('title') + "</title>\n" +
			this.get('_ogTitle').outerHTML + "\n" +
			this.get('_description').outerHTML + "\n" +
			this.get('_ogDescription').outerHTML;
	}).property('_ogTitle', '_description', '_ogDescription'),

	// propagate changes to DOM elements
	titleChanged: function() {
		document.title = this.get('title');
		this.get('_ogTitle').setAttribute('content', this.get('title'));
		this.notifyPropertyChange('_ogTitle');
	}.observes('title'),

	descriptionChanged: Ember.observer(function() {
		this.get('_description').setAttribute('content', this.get('description'));
		this.get('_ogDescription').setAttribute('content', this.get('description'));
		this.notifyPropertyChange('_ogDescription');
	}, 'description'),

	init: function() {
		this._super();

		this.set('defaults.title', document.title);

		// setup meta object
		// are there any tags present yet? if not, create them
		// ogTitle
		var _ogTitle = _getTag('meta', 'property', 'og:title');
		if (!_ogTitle) {
			_ogTitle = document.createElement('meta');
			_ogTitle.setAttribute('property', 'og:title');
			document.head.appendChild(_ogTitle);
		}
		this.set('_ogTitle', _ogTitle);
		
		// description
		var _description = _getTag('meta', 'name', 'description');
		if (!_description) {
			_description = document.createElement('meta');
			_description.setAttribute('name', 'description');
			document.head.appendChild(_description);
		} else {
			this.set('defaults.description', _description.content);
		}
		this.set('_description', _description);
		
		// ogDescription
		var _ogDescription = _getTag('meta', 'property', 'og:description');
		if (!_ogDescription) {
			_ogDescription = document.createElement('meta');
			_ogDescription.setAttribute('property', 'og:description');
			document.head.appendChild(_ogDescription);
		} else {
			this.set('defaults.description', _ogDescription.content);
		}
		this.set('_ogDescription', _ogDescription);
	},

	setTags: function(tags) {
		this.setProperties(tags);
	}
});