import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Ember.Object.create({ 
			title: 'An article',
			description: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum.',
			image: 'http://www.fillmurray.com/200/300'
		});
	},

	afterModel: function(model, transition) {
		this.metaTags.setTags({
			title: model.get('title'),
			description: model.get('description')
		});
	}
});