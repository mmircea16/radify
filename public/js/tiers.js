var radar = radar || {};
radar.tiers = function () {

    function get_all() {
        var tiers_view_model = d3.zip(RADIX, PREVIOUS_RADIX, COLORS, tiers).map(create_from_array);
        return sort_tiers_in_order_of_radius(tiers_view_model);
    }

    function sort_tiers_in_order_of_radius(tiers) {
        return tiers.sort(function(a_tier, another_tier){
            return another_tier.radius - a_tier.radius;
        })
    }

    function create_from_array(radius_color_data_array) {
        return {
            radius: radius_color_data_array[0],
            tickness: radius_color_data_array[0] - radius_color_data_array[1],
            color: radius_color_data_array[2],
            tier_data: radius_color_data_array[3]
        }
    }


    var RADIX = [100, 200, 300, 400];
    var PREVIOUS_RADIX = [0, 100, 200, 300];
    var COLORS = ['red', 'blue', 'yellow', 'green'];

    var tiers = radar.data_store().get_tiers();

    return {
        get_all: get_all,

        get_by_id: function (id) {
            return get_all().filter(function(tier) {
                return (tier.tier_data.id === id)
            })[0]
        }
      }
};