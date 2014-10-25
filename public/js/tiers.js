var radar = radar || {};
radar.tiers = function () {

    function sort_tiers_in_order_of_radius(tiers) {
        return tiers.sort(function(a_tier, another_tier){
            return another_tier.radius - a_tier.radius;
        })
    }

    function create_from_array(radius_color_data_array) {
        return {
            radius: radius_color_data_array[0],
            color: radius_color_data_array[1],
            tier_data: radius_color_data_array[2]
        }
    }


    var RADIX = [100, 200, 300, 400];
    var COLORS = ['red', 'blue', 'yellow', 'green'];


    return {
        get_all: function () {
            var tiers = radar.data_store().get_tiers();
            var tiers_view_model = d3.zip(RADIX, COLORS, tiers).map(create_from_array);
            return sort_tiers_in_order_of_radius(tiers_view_model);
        }
      }
};