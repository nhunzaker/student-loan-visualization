var width      = window.innerWidth;
var height     = window.innerHeight;
var projection = d3.geo.albersUsa().translate([width / 2, height / 2]).scale(1500);
var path       = d3.geo.path().projection(projection);

d3.json("us-states.json", function(json) {
	var svg = d3.select('body').append('svg').attr({
		height : height,
		width  : width
	});

	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr({
			class : 'state',
			d     : path
		});

	d3.json("schools", function(data) {
		data = data.sort(function(a, b) {
			return a.loan_value < b.loan_value;
		});

		var loans = data.map(function(d) { return d.loan_value; });
		var color = d3.scale.linear().domain([d3.min(loans), d3.max(loans)]).range(["#fe3","#c33"]);
		var radiusScale = d3.scale.linear()
			    .domain([d3.min(loans), d3.max(loans)])
			    .range([5, 100]);

		svg.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr({
				cx : function(d) {
					return projection([d.zipcode.longitude, d.zipcode.latitude])[0];
				},
				cy : function(d) {
					return projection([d.zipcode.longitude, d.zipcode.latitude])[1];
				},
				r: 1
			})
			.style({
				fill : function(d) { return color(d.loan_value); },
				stroke : function(d) { return d3.rgb(color(d.loan_value)).brighter(0.5); },
				opacity : 0.75
			})
			.on("mouseover", function(d) {
				var x =  projection([d.zipcode.longitude, d.zipcode.latitude])[0];
				var y =  projection([d.zipcode.longitude, d.zipcode.latitude])[1];

				var tooltip = d3.select("#tooltip");

				tooltip.style({
					left: x + 'px',
					top: y + 'px'
				});

				tooltip.select("#tooltip-heading").text(d.name.toLowerCase());
				tooltip.select("#tooltip-value").text("$" + d.loan_value);

				d3.select("#tooltip").classed("hidden", false);
			})
			.transition()
			.delay(function(d, i) { return (i % 40) * 20; })
			.duration(500)
			.attr('r', function(d) {
				return radiusScale(d.loan_value);
			});
	});
});
