var width = 500,
    height = 500,
    chart_height = 250,
	chart_width = 250,
    g_speed = 3;

var value_dict = {
	volume: 3,
	speed: 3,
	mass: 3
};

//number of particles
var n = 30,
    //m = 1,
    p_size = 4;

var pause = false;
var h;

//instantiate array of particles with components
var particles = d3.range(n).map(function() {
  //random initial position
  var x = Math.random() * width,
      y = Math.random() * height;
  //random direction switches
  var lightswitch1 = Math.random() < 0.5 ? -1 : 1; 
  var lightswitch2 = Math.random() < 0.5 ? -1 : 1;
  //set x velocity
  var vx1 = Math.random() * g_speed * lightswitch1;
  //set y velocity to guarantee speed equal to the global speed
  var vy1 = Math.sqrt((g_speed * g_speed) - (vx1 * vx1)) * lightswitch2;
  return {
  	//particle velocity, x and y components
  	vx: vx1,
  	vy: vy1,
  	//set initial position
    path: d3.range(n).map(function() { return [x, y]; }),
  };
});



var svg = d3.select("#vol-viz").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "vol-canvas")
    .attr("class", "area");

var chart = d3.select("#vol-chart").append("svg")
		.attr("height", height)
		.attr("width", width/5)
		.attr("id", "vol-chart-canvas");

var rect = svg.append("rect")
			  .attr("x", 0)
			  .attr("y", 0)
			  .attr("width", width)
			  .attr("height", height)
			  .attr("fill", "#C6E2FF")
			  .attr("stroke", "black")
			  .attr("class", "area")
			  .attr("stroke-width", 5)
			  .attr("id", "vol-rect");

var chart_area = chart.append("rect")
						.attr("x", 0)
						.attr("y", 0)
						.attr("width", width/5)
						.attr("height", height/2 - 15)
						.attr("fill", "#C8C8C8")
						.attr("stroke", "black")
						.attr("stroke-width", 5)
						.attr("class", "chart")
						.attr("id", "vol-chart");


var g = svg.selectAll("g")
    .data(particles)
  	.enter().append("g");

var ball = g.append("ellipse")
    .attr("rx", p_size)
    .attr("ry", p_size);

var chart = d3.select("#vol-chart-div").append("svg")
		.attr("height", chart_height)
		.attr("width", chart_width)
		.attr("id", "vol-chart-canvas");

var chart_area = chart.append("rect")
						.attr("x", 0)
						.attr("y", 0)
						.attr("width", chart_width)
						.attr("height", chart_height)
						.attr("fill", "#C8C8C8")
						.attr("stroke", "black")
						.attr("stroke-width", 5)
						.attr("class", "chart")
						.attr("id", "vol-chart");

var line = d3.svg.line()
    			 .x(function(d) { return d[0]; })
    			 .y(function(d) { return d[1]; })
    			 .interpolate("basis");

var path = chart.append('path')
    			   .attr("d", line([[0,0],[0.20*chart_width, 0.80*chart_height],[chart_width, chart_height]]))
    			   .attr("stroke", "black")
    			   .attr("stroke-width", 2)
    			   .attr("fill", "none");

var path_node = path.node()
var path_length = path_node.getTotalLength();
var mark = chart.append("svg:circle")
				 .attr("cx", path_node.getPointAtLength(path_length/2).x)
				 .attr("cy", path_node.getPointAtLength(path_length/2).y)
				 .attr("r", 5)
				 .attr("fill", "grey")
				 .attr("stroke", "black")
				 .attr("id", "mark");

chart.append("text")
			  .attr("x", chart_width/2)
			  .attr("y", chart_height - 5)
			  .attr("font-family", "sans-serif")
			  .attr("font-size", 25)
			  .text("V");

chart.append("text")
			  .attr("x", 5)
			  .attr("y", chart_height/2)
			  .attr("font-family", "sans-serif")
			  .attr("font-size", 25)
			  .attr()
			  .text("P");

function change_speed(the_speed) {
	for (var part in particles) {
		var lightswitch3 = Math.random() < 0.5 ? -1 : 1;
		var lightswitch4 = Math.random() < 0.5 ? -1 : 1;
		particles[part].vx = Math.random() * the_speed * lightswitch3;
		particles[part].vy = Math.sqrt((the_speed * the_speed) - (particles[part].vx * particles[part].vx)) * lightswitch4;

	}
}

function change_volume(v) {
	var sides = [204, 408, 500, 577, 645]; //easier to just preset volume
	pause = true;
	var the_side = sides[v - 1];
	width = the_side;
	height = the_side;
	var area = d3.selectAll(".area")
				 .transition()
				 .duration(1000)
				 .attr("width", the_side)
				 .attr("height", the_side);

	change_mass(3);
	pause = false;

	var vols = [7.5,14.9,22.4,29.8,37.3];
	var mark_ratio = [1/6, 2/6, 3/6, 4/6, 5/6];
	var stop_point = path_length * mark_ratio[v-1];
	var x = path_node.getPointAtLength(stop_point).x;
	var y = path_node.getPointAtLength(stop_point).y;
	mark.attr("cx", x).attr("cy", y);
	var new_vol = "<b>Volume: " + vols[v-1] + " L</b>";
	$('#vol-val').html(new_vol);
	var new_press = "<b>Pressure: " + calc_pressure() + " atm</b>";
	$('#press-val').html(new_press);
}

//basically instantiate a new particle array
function change_mass(num) {
	
	n = num * 10;

	//pause the timer routine
	pause = true;

	svg.selectAll('g').remove();
    particles = d3.range(n).map(function() {
    var x1 = Math.random() * width,
   	    y1 = Math.random() * height;
    //set x velocity
    var lightswitch5 = Math.random() < 0.5 ? -1 : 1;
    var lightswitch6 = Math.random() < 0.5 ? -1 : 1;
    g_speed = 3;
    var vx2 = Math.random() * g_speed * lightswitch5
    //set y velocity to guarantee speed equal to the global speed
    var vy2 = Math.sqrt((g_speed * g_speed) - (vx2 * vx2)) * lightswitch6;
    return {
  	  	//particle velocity, x and y components
  	  	vx: vx2,
  	  	vy: vy2,
  	  	//initial position
    	path: d3.range(n).map(function() { return [x1, y1]; }),
      };
  	});
  	

  	h = svg.selectAll("g")
    .data(particles)
  	.enter().append("g");

	ball = h.append("ellipse")
    .attr("rx", p_size)
    .attr("ry", p_size);
    pause = false;

	
}

//loop through each particle, calculate its next position, move it there
d3.timer(function() {
	//if paused, don't run
	if (pause == false) {
	  for (var i = -1; ++i < n;) {
	    var particle = particles[i],
	    	//current position of selected particle, x and y component
	        path = particle.path,
	        //next values of particle path, x and y
	        dx = particle.vx,
	        dy = particle.vy,
	        x = path[0][0] += dx,
	        y = path[0][1] += dy;

	    // Bounce off the walls, play the sound
	    if (x < 0 || x > width) {
	    	particle.vx *= -1;
	    	if (isInView("#vol-rect")) {
		    	var v = document.getElementsByTagName("audio")[0];
				v.play();
			}
	    }
	    if (y < 0 || y > height) {
	    	particle.vy *= -1;
	    	if (isInView("#vol-rect")) {
		    	var v = document.getElementsByTagName("audio")[0];
				v.play();
			}
	    }
	  }

	  //move the particle
	  ball.attr("transform", ballTransform);
	}
});

function ballTransform(d) {
  return "translate(" + d.path[0] + ")";
}

function isInView(elem)
{
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function calc_pressure() {
	var temps = [91, 182, 273, 364, 455];
	var vols = [7.5,14.9,22.4,29.8,37.3];
	var masses = [0.5,1,1.5,2.0,2.5];
	
	var r = 0.0821;
	var t = temps[2]; console.log(t);
	var v = vols[$("#vol-volume").val()-1]; console.log(v);
	var n = masses[2]; console.log(n);

	var p = (n*r*t)/v;

	return(+p.toFixed(2));
}
