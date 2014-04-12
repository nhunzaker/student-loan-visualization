// Global visualization
// Takes a huge list of lat/long values of cities and converts them
// into 3D coordinates, generating a globe.

// THREE.js boilerplate
var camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2500),
    scene    = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer({ antialias: true }),
    geometry = new THREE.Geometry(),
    mat      = new THREE.ParticleBasicMaterial({ color: 0x22aaff, size: 3 }),
    radius   = 900;

// Setup
camera.position.y = 200;
camera.position.z = 1800;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// Take geographic coordinates and convert them
// into cartesian coordinates (x,y,z)
var geoToCartesian = function(lat, lon, radius) {
	var x, y, z;
	lat *= Math.PI / 180;
	lon *= Math.PI / 180;
	x = -radius * Math.cos(lat) * Math.cos(lon);
	y = radius * Math.sin(lat);
	z = radius * Math.cos(lat) * Math.sin(lon);
	return new THREE.Vector3(x, y, z);
};

function reqListener () {
	var schools = JSON.parse(this.responseText);
	var highest = Math.max.apply(Math, schools.map(function(s) {
		return s.loan_value;
	}));

	schools.forEach(function(point) {
		var height = (radius + 100 * (point.loan_value / highest));

		if (point.zipcode) {
			var zip = point.zipcode;
			var vertex = geoToCartesian(zip.latitude, zip.longitude, radius);
			vertex.normalize().multiplyScalar(height);
			geometry.vertices.push(vertex);
		}
	});

	var particles = new THREE.ParticleSystem(geometry, mat);

	scene.add(particles);

	// So that the globe may rotate, setup an animation loop and incrementally rotate
	requestAnimationFrame(function update() {
		requestAnimationFrame(update);
		var time = Date.now() * 0.00005;
		var hue = ( 360 * ( 1.0 + time ) % 360 ) / 360;
		mat.color.setHSL(hue, 0.5, 0.5 );

		particles.rotation.y += 0.01;

		particles.geometry.verticesNeedUpdate = true;
		renderer.render(scene, camera);
	});
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "/schools", true);
oReq.send();
