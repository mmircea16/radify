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


    var RADIX = [75, 150, 225, 300];
    var PREVIOUS_RADIX = [0, 75, 150, 225];
    var COLORS = ['red', 'blue', 'yellow', 'green'];

    var tiers = radar.data_store.get_tiers();

    function index_of_tier(tier_id){
        var pos = -1;
        var i = 0;
        while (i < get_all().length) {
            if (get_all()[i].tier_data.id === tier_id){
                pos = i;
            }
            i++;
        }
        return pos;
    }

    return {
        get_all: get_all,

        get_by_id: function (id) {
            return get_all().filter(function(tier) {
                return (tier.tier_data.id === id)
            })[0]
        },

        get_tier_at_coordinates: function(x,y) {
            var radius = Math.sqrt(x*x + y*y);
            return get_all().filter(function(tier) {
                return (tier.radius > radius) && ((tier.radius - radius) < tier.tickness)
            })[0]
        },

        next_tier: function(tier_id){
            var pos = index_of_tier(tier_id);
            var next_pos = (pos < (get_all().length - 1) ) ? (pos + 1): pos;
            return get_all()[next_pos];
        },

        previous_tier: function(tier_id){
            var pos = index_of_tier(tier_id);
            var prev_pos = (pos > 0 ) ? (pos - 1): pos;
            return get_all()[prev_pos]
        }

    }
};