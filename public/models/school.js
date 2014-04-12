/**
 * @name School
 */

var School = Backbone.Model.extend({
	parse: function(data) {
		return {
			loans     : data.loans,
			latitude  : data.zipcode.latitude,
			longitude : data.zipcode.longitude
		};
	}
});
