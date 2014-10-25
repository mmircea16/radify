
var radar = radar || {};

radar.painter = function() {

    'use strict';
    return {
        apply_to_page: function() {
            var svg = d3.select("svg");
            var circle = svg.selectAll("circle")
                .data([100])
                .enter()
                .append("circle")
                .attr("cx", 100)
                .attr("cy", 100)
                .attr("r", function(d) { return d;})
        }
    }

};


$(function(){
   radar.painter().apply_to_page();
});