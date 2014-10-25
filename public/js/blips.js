var radar = radar || {};

radar.blips = function() {

    function get_coordinates_for_tier(tier, blip_name) {
        var radius = tier.radius - Math.floor(radar.utils.hash_string_to_int(blip_name) * tier.tickness);
        var angle = radar.utils.hash_string_to_int(blip_name) * Math.PI * 2;

        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        }
    }

    return {
        get_all: function () {

           var blips = radar.data_store().get_blips();

           var blip_view_models = blips.map(function(blip) {
               var tier = radar.tiers().get_by_id(blip.tier);
               var coordinates = get_coordinates_for_tier(tier, blip.name);
               return {
                  blip_data: blip,
                  x: coordinates.x,
                  y: coordinates.y,
                  tier: tier
              }
           });

           return blip_view_models;
        }
    };

};