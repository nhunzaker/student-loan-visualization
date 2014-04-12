/**
 * @name Pinboard
 * @desc Connects coordinates in 3D space
 * @requires Cartographer, THREE
 */

Pinboard = Backbone.View.extend({
	radius: 500,

	initialize: function(options) {
		this.setupStats();

		this.listenTo(this.collection, 'sync', this.setup);
		this.listenTo(this.collection, 'sync', this.render);

		window.addEventListener('resize', function() {
			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.update();
		}.bind(this));
	},

	setup: function() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
		this.camera.position.z = 1500;

		this.renderer = new THREE.CanvasRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColorHex( 0x001115, 1);

		this.group = new THREE.Object3D();
		this.group.rotation.x = Math.PI * 1.2;
		this.group.rotation.y = Math.PI;
		this.group.rotation.z = Math.PI;

		this.particles = new ParticleMap({
			collection: this.collection,
			radius: this.radius
		});
		this.particles.rotate(0, Math.PI, 0);

		this.scene.add(this.particles.group);

		this.el.appendChild(this.renderer.domElement);
	},

	render: function() {
		var data = this.collection.toJSON();

		this.resetGroup();

		// var fallsChurch = this.createPin([38.8845,-77.1762]);

		_.each(data, function(p, i) {
			var origin = this.createPin([p.latitude, p.longitude], p.loans / 200);
			// this.connect(origin, fallsChurch);
		}, this);
	},

	connect: function(pin1, pin2) {
		var start = pin1.position;
		var end = pin2.position;

		var mid = Cartographer.midwayPoint(start, end, this.radius);

		var baseline = new THREE.SplineCurve3([start, mid, end ]);

		var baselineMaterial = new THREE.LineBasicMaterial({
			color: 0xffaa33,
			opacity: 0.2
		});

		var baselineGeo = new THREE.Geometry();
		baseline.getPoints(30).forEach(function(point) {
			baselineGeo.vertices.push(point);
		});

		var connector = new THREE.Line(baselineGeo, baselineMaterial);

		this.group.add(connector);

		mid = Cartographer.midwayPoint(start, end, this.radius + 5);

		var dotted = new THREE.SplineCurve3([start, mid, end ]);

		var dottedMaterial = new THREE.LineDashedMaterial({
			color: 0xffaa33,
			dashSize: 2,
			gapSize: 30
		});

		var dottedGeo = new THREE.Geometry();
		dotted.getPoints(40).forEach(function(point) {
			dottedGeo.vertices.push(point);
		});

		var dottedLine = new THREE.Line(dottedGeo, dottedMaterial);

		this.group.add(dottedLine);

	},

	connectPoints: function(a, b) {
		this.connect(a,b);
		this.createPin(a);
		this.createPin(b);
	},

	createPin: function(cartesian, height) {
		return new Pin({
			x: cartesian[0],
			y: cartesian[1],
			group: this.group,
			radius: this.radius,
			height: height
		}).particle;
	},

	resetGroup: function() {
		if (this.group) this.scene.remove(this.group);
		this.group = new THREE.Object3D();
		this.group.rotation = this.particles.getRotation();
		this.scene.add(this.group);
	},

	setupStats: function() {
		this.stats = new Stats();
		this.stats.setMode(0); // 0: fps, 1: ms

		// Align top-left
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '15px';
		this.stats.domElement.style.top = '15px';

		document.body.appendChild( this.stats.domElement );
	},

	animate: function () {
		this.stats.begin();
		requestAnimationFrame(this.animate.bind(this));
		this.update();
		this.stats.end();
	},

	update: function() {
		this.renderer.render(this.scene, this.camera);
	}
});
