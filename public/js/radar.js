
var radar = radar || {};

radar.painter = function() {
    'use strict';

    function apply_to_page() {
        d3.select("svg")
            .selectAll("circle")
            .data(radar.tiers().get_all())
            .enter()
            .append("circle")
            .attr("cx", 400)
            .attr("cy", 400)
            .attr("r", function(tier) { return tier.radius;})
            .attr("fill", function(tier) { return tier.color;})
    }

     return {
        apply_to_page: apply_to_page
     };

};


$(function(){
   radar.painter().apply_to_page();
});