/**
 * @name Schools
 */

var Schools = Backbone.Collection.extend({
	url: '/schools',
	model: School,

	parse: function(data) {
		return _.filter(data, function(d) {
			return !!d.zipcode;
		});
	}
});
