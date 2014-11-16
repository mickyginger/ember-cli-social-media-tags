import ENV from 'dummy/config/environment';

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

function _createTag(tagName, property, value) {
	var tag = document.createElement('meta');
	tag.setAttribute(property, value);
	document.head.appendChild(tag);

	return tag;
}

export default Ember.Object.extend({
	site_name: null,
	title: null,
	description: null,
	type: null,
	image: null,
	tags: null,
	url: null,

	// DOM elements
	_ogSiteName: null,
	_ogTitle: null,
	_twTitle: null,
	_description: null,
	_ogDescription: null,
	_twDescription: null,
	_ogType: null,
	_ogImage: null,
	_twImage: null,
	_ogTag: null,
	_ogUrl: null,
	_twUrl: null,

	// propagate changes to DOM elements
	siteNameChanged: function() {
		this.get('_ogSiteName').setAttribute('content', this.get('site_name'));
		this.notifyPropertyChange('_ogSiteName');
	}.observes('site_name'),

	titleChanged: function() {
		document.title = this.get('title');
		this.get('_ogTitle').setAttribute('content', this.get('title'));
		this.get('_twTitle').setAttribute('content', this.get('title'));
		this.notifyPropertyChange('_ogTitle');
		this.notifyPropertyChange('_twTitle');
	}.observes('title'),

	descriptionChanged: function() {
		this.get('_description').setAttribute('content', this.get('description'));
		this.get('_ogDescription').setAttribute('content', this.get('description'));
		this.get('_twDescription').setAttribute('content', this.get('description'));
		this.notifyPropertyChange('_ogDescription');
		this.notifyPropertyChange('_twDescription');
	}.observes('description'),

	typeChanged: function() {
		this.get('_ogType').setAttribute('content', this.get('type'));
		this.notifyPropertyChange('_ogType');
	}.observes('type'),

	imageChanged: function() {
		this.get('_ogImage').setAttribute('content', this.get('image'));
		this.get('_twImage').setAttribute('content', this.get('image'));
		this.notifyPropertyChange('_ogImage');
		this.notifyPropertyChange('_twImage');
	}.observes('image'),

	tagsChanged: function() {
		this.get('_ogTag').setAttribute('content', this.get('tags'));
		this.notifyPropertyChange('_ogTag');
	}.observes('tags'),

	urlChanged: function() {
		this.get('_ogUrl').setAttribute('content', this.get('url'));
		this.get('_twUrl').setAttribute('content', this.get('url'));
		this.notifyPropertyChange('_ogUrl');
		this.notifyPropertyChange('_twUrl');
	}.observes('url'),

	setUpMetaTags: function() {
		var _fbAppId = _createTag('meta', 'property', 'fb:app_id');
		_fbAppId.setAttribute('content', ENV.APP.FACEBOOK_APP_ID);

		var _twCard = _createTag('meta', 'name', 'twitter:card');
		_twCard.setAttribute('content', 'summary');

		// ogSiteName
		var _ogSiteName = _getTag('meta', 'property', 'og:site_name');
		if (!_ogSiteName) {
			_ogSiteName = _createTag('meta', 'property', 'og:site_name');
		}
		this.set('_ogSiteName', _ogSiteName);

		// ogTitle
		var _ogTitle = _getTag('meta', 'property', 'og:title');
		if (!_ogTitle) {
			_ogTitle = _createTag('meta', 'property', 'og:title');
		}
		this.set('_ogTitle', _ogTitle);

		// twitterTitle
		var _twTitle = _getTag('meta', 'name', 'twitter:title');
		if(!_twTitle) {
			_twTitle = _createTag('meta', 'name', 'twitter:title');
		}
		this.set('_twTitle', _twTitle);
		
		// description
		var _description = _getTag('meta', 'name', 'description');
		if (!_description) {
			_description = _createTag('meta', 'name', 'description');
		}
		this.set('_description', _description);
		
		// ogDescription
		var _ogDescription = _getTag('meta', 'property', 'og:description');
		if (!_ogDescription) {
			_ogDescription = _createTag('meta', 'property', 'og:description');
		}
		this.set('_ogDescription', _ogDescription);
		
		// twitterDescription
		var _twDescription = _getTag('meta', 'name', 'twitter:description');
		if (!_twDescription) {
			_twDescription = _createTag('meta', 'name', 'twitter:description');
		}
		this.set('_twDescription', _twDescription);

		// ogType
		var _ogType = _getTag('meta', 'property', 'og:type');
		if (!_ogType) {
			_ogType = _createTag('meta', 'property', 'og:type');
		}
		this.set('_ogType', _ogType);

		// ogImage
		var _ogImage = _getTag('meta', 'property', 'og:image');
		if (!_ogImage) {
			_ogImage = _createTag('meta', 'property', 'og:image');
		}
		this.set('_ogImage', _ogImage);

		// ogImage
		var _twImage = _getTag('meta', 'name', 'twitter:image');
		if (!_twImage) {
			_twImage = _createTag('meta', 'name', 'twitter:image');
		}
		this.set('_twImage', _twImage);

		// ogImage
		var _ogTag = _getTag('meta', 'property', 'og:tag');
		if (!_ogTag) {
			_ogTag = _createTag('meta', 'property', 'og:tag');
		}
		this.set('_ogTag', _ogTag);

		// ogUrl
		var _ogUrl = _getTag('meta', 'property', 'og:url');
		if (!_ogUrl) {
			_ogUrl = _createTag('meta', 'property', 'og:url');
		}
		this.set('_ogUrl', _ogUrl);

		// ogUrl
		var _twUrl = _getTag('meta', 'name', 'twitter:url');
		if (!_twUrl) {
			_twUrl = _createTag('meta', 'name', 'twitter:url');
		}
		this.set('_twUrl', _twUrl);
	}.on('init'),

	setTags: function(tags) {
		this.setProperties(tags);
	}
});