/**
 * @name Cartographer
 * @desc A collection of math helpers for plotting 3D coordinates.
 * @requires THREE
 */

window.Cartographer =  {

	midwayPoint: function (start, end, radius) {

		var mid = new THREE.Vector3( 
			(end.x + start.x) / 2, 
			(end.y + start.y) / 2,
			(end.z + start.z) / 2
		);

		var distance = start.distanceTo(end);

		var index = radius + Math.log( Math.pow(distance, 18) );

		return mid.normalize().multiplyScalar(index);

	},


	geoToCartesian: function(lat, lon, radius) {
		lat *= Math.PI / 180;
		lon *= Math.PI / 180;

		var x = -radius * Math.cos(lat) * Math.cos(lon);
		var y = radius * Math.sin(lat);
		var z = radius * Math.cos(lat) * Math.sin(lon);

		return new THREE.Vector3(x, y, z);
	}

};

