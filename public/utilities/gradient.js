/**
 * @name Gradient.js
 * @desc Builds canvas gradients, hurrah!
 */

Gradient = function(options) {
	var canvas = options.canvas || document.createElement( 'canvas' );
	var context = canvas.getContext( '2d' );

	canvas.width = options.width || 12;
	canvas.height = options.height || 12;

	var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

	_.each(options.colorStops, function(color, position) {
		gradient.addColorStop(parseFloat(position), color);
	});

	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

	return canvas;
};
 
