/**
 * @name Particle
 * @desc A single needle.
 * @requires THREE
 */

Particle = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options);
		this.render();
	},

	render: function() {
		var vertex = Cartographer.geoToCartesian(this.x, this.y, this.radius);
		var el = this.el = new THREE.Particle(this.material || Particle.material());
		el.position = vertex.clone().normalize().multiplyScalar(this.radius);
	}
});

Particle.material = _.once(function() {

	var gradient = Gradient({
		height: 12,
		width: 12,
		colorStops: {
			"0"  : 'rgba(100,100,100,1)',
			"0.2": 'rgba(20,20,20,1)',
			"0.4": 'rgba(0,5,5,1)',
			"1"  : 'rgba(0,0,0,1)'
		}
	});

	return new THREE.ParticleBasicMaterial({
		map: new THREE.Texture(gradient),
		blending: THREE.AdditiveBlending
	});
});
