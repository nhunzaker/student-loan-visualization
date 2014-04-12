/**
 * @name Scene
 * @desc The THREE.js scene for the globe visualization
 */

(function() {
	var pinboard = new Pinboard({
		collection: new Schools()
	});

	pinboard.collection.fetch();
	document.body.appendChild(pinboard.el);
	pinboard.animate();
}());
