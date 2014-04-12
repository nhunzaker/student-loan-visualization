/**
 * @name Particle Map
 */

ParticleMap = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options);
		this.group = new THREE.Object3D();
		this.collection.each(this.makePoint, this);
	},

	makePoint: function(point) {
		var p = point.toJSON();

		var particle = new Particle({
			x: p.latitude,
			y: p.longitude,
			radius: this.radius + (p.loans / 200)
		});

		this.group.add(particle.el);
	},

	getRotation: function() {
		return this.group.rotation.clone();
	},

	rotate: function(x, y, z) {
		this.group.rotation.x += x || 0;
		this.group.rotation.y += y || 0;
		this.group.rotation.z += z || 0;
	},

	generateParticleMap: function(points) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');
		var sprite = this.generateBaseSprite();

		canvas.width = 2048;
		canvas.height = 4096;

		points.forEach(function(point) {
			var x = (canvas.width / 2) + ((canvas.width / 2) * (point[0] / 90));
			var y = (canvas.height / 2) + ((canvas.height / 2) * (point[1] / 180));
			ctx.drawImage(sprite, x, y);
		});

		var texture = document.createElement("canvas");
		texture.height = 2048;
		texture.width = 4096;

		var txt = texture.getContext('2d');
		txt.rotate(-90 * (Math.PI / 180));
		txt.drawImage(canvas, -canvas.width, 0);

		return texture;
	}
});
