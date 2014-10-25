
var radar = radar || {};

radar.painter = function() {
    'use strict';

     var tiers = [
         {
             radius: 100,
             color: 'red'
         },
         {
             radius: 200,
             color: 'blue'
         },
         {
             radius: 300,
             color: 'yellow'
         },
         {
             radius: 400,
             color: 'green'
         }
     ];

     function sort_tiers_in_order_of_radius(tiers) {
         return tiers.sort(function(a_tier, another_tier){
             return another_tier.radius - a_tier.radius;
         })
     }

     return {
        apply_to_page: function() {
            var svg = d3.select("svg");
            var circle = svg.selectAll("circle")
                .data(sort_tiers_in_order_of_radius(tiers))
                .enter()
                .append("circle")
                .attr("cx", 400)
                .attr("cy", 400)
                .attr("r", function(tier) { return tier.radius;})
                .attr("fill", function(tier) { return tier.color;})
        }
    }

};


$(function(){
   radar.painter().apply_to_page();
});