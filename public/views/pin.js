/**
 * @name Pin
 * @desc A single needle.
 * @requires THREE
 */

Pin = Backbone.View.extend({

	color: 0x77aaff,
	opacity: 0.5,
	linewidth: 1.5,

	initialize: function(options) {
		_.extend(this, options);
		this.height = this.radius + (this.height || 80);
		this.render();
	},

	render: function() {
		var start = Cartographer.geoToCartesian(this.x, this.y, this.radius);
		var end = start.clone().normalize().multiplyScalar(this.height);

		var particle = new Particle({
			x: this.x,
			y: this.y,
			radius: this.height, 
			material: Pin.material()
		});

		var geometry = new THREE.Geometry();
		geometry.vertices.push(start);
		geometry.vertices.push(end);

		var pin = new THREE.Line(geometry, new THREE.LineBasicMaterial({
			color: this.color,
			opacity: this.opacity,
			linewidth: this.linewidth
		}));

		this.group.add(pin);
		this.group.add(particle.el);

		this.pin = pin;
		this.particle = particle.el;
	}

});

Pin.material = _.once(function() {

	var gradient = Gradient({
		height: 24,
		width: 24,
		colorStops: {
			"0"  : 'rgba(255,255,255,1)',
			"0.2": 'rgba(0, 200, 100,1)',
			"0.4": 'rgba(0,0,64,1)',
			"1"  :'rgba(0,0,0,1)'
		}
	});

	return new THREE.ParticleBasicMaterial({ 
		map: new THREE.Texture(gradient),
		blending: THREE.AdditiveBlending
	});
});
