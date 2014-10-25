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

           var blips = radar.data_store.get_blips();

           var blip_view_models = blips.map(function(blip_data) {
               var tier = radar.tiers().get_by_id(blip_data.tier);
               var segment = radar.segments().get_by_id(blip_data.segment);
               var coordinates = get_coordinates_for_tier(blip_data.name, tier, segment);
               return {
                  blip_data: blip_data,
                  x: coordinates.x,
                  y: coordinates.y,
                  tier: tier,
                  segment: segment
              }
           });

           return blip_view_models;
        },

        create_blip: function(blip_name, x, y , tier, segment){
            return {
                blip_data: {name: blip_name},
                x: x,
                y: y,
                tier: tier,
                segment: segment
            }
        }
    };

};