
var radar = radar || {};

radar.painter = function() {
    'use strict';

    var circle_x = 400;
    var circle_y = 400;

    function draw_background_circle(circle_radius) {
        d3.select('svg')
            .append('circle')
            .attr('cx',circle_x)
            .attr('cy',circle_y)
            .attr('r', circle_radius)
            .attr('fill-opacity', 0.2)
            .attr('fill', "grey");
    }

    var lineFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .interpolate("linear");

    function draw_x_axis(axis_length){
        var start_x = (circle_x - axis_length/2);
        var fin_x = (circle_x + axis_length/2);

        d3.select('svg')
          .append('path')
          .attr('d', lineFunction([{"x": start_x, "y": circle_y}, {"x": fin_x, "y": circle_y}]))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
    }

    function draw_y_axis(axis_length){
        var start_y = (circle_y - axis_length/2);
        var fin_y = (circle_y + axis_length/2);

        d3.select('svg')
          .append('path')
          .attr('d', lineFunction([{"x": circle_x, "y": start_y}, {"x": circle_x, "y": fin_y}]))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
    }

    function draw_tiers(tiers) {
        d3.select("svg")
            .selectAll("circle")
            .data(tiers)
            .enter()
            .append("circle")
            .attr("cx", circle_x)
            .attr("cy", circle_y)
            .attr("r", function(tier) { return tier.radius;})
            .attr("fill-opacity", 0)
            .attr("stroke", function(tier) { return tier.color;})
            .attr("stroke-width", 3 );
    }

    function draw_blips(blips) {
        d3.select("svg")
            .selectAll("circle .blip")
            .data(blips)
            .enter()
            .append("circle")
            .attr("cx", function (blip) { return circle_x + blip.x;})
            .attr("cy", function (blip) { return circle_y + blip.y;})
            .attr("r", 5)
            .attr("fill", 'green');
    }

    function apply_to_page() {
        var tiers = radar.tiers().get_all();
        var blips = radar.blips().get_all();

        var circle_radius = tiers[0].radius;
        var axis_length = circle_radius * 2 + 30;

        draw_tiers(tiers);
        draw_background_circle(circle_radius);
        draw_x_axis(axis_length);
        draw_y_axis(axis_length);
        draw_blips(blips);
    }

     return {
        apply_to_page: apply_to_page
     };

};


$(function(){
   radar.painter().apply_to_page();
});