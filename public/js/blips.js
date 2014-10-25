var radar = radar || {};

radar.blips = function() {

    function get_coordinates_for_tier(blip_name, tier, segment) {
        var radius = tier.radius - Math.floor(radar.utils.hash_string_to_int(blip_name) * tier.tickness);

        var delta_angle = segment.end_angle - segment.start_angle;

        var angle = radar.utils.hash_string_to_int(blip_name) * delta_angle + segment.start_angle;

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
               var segment = radar.segments().get_by_id(blip.segment);
               var coordinates = get_coordinates_for_tier(blip.name, tier, segment);
               return {
                  blip_data: blip,
                  x: coordinates.x,
                  y: coordinates.y,
                  tier: tier,
                  segment: segment
              }
           });

           return blip_view_models;
        }
    };

};