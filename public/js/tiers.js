var radar = radar || {};
radar.tiers = function () {

    function sort_tiers_in_order_of_radius(tiers) {
        return tiers.sort(function(a_tier, another_tier){
            return another_tier.radius - a_tier.radius;
        })
    }

    return {

        get_all: function () {
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

            return sort_tiers_in_order_of_radius(tiers);
        }
    }
};