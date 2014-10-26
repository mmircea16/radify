var radar = radar || {};

radar.blips = function() {

    function get_coordinates_for_tier(blip_name, tier, segment) {
        var radius = tier.radius - Math.floor(radar.utils.hash_string_to_0_1(blip_name) * tier.tickness);

        var delta_angle = segment.end_angle - segment.start_angle;

        var angle = radar.utils.hash_string_to_0_1(blip_name) * delta_angle + segment.start_angle;

        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        }
    }

    function get_all() {

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
    }

    function get_blip_by_id(id) {
        console.log(get_all());
        return get_all().filter(function(blip) {
            return (blip.blip_data.id.toString() === id)
        })[0]
    }

    return {
        get_all: get_all,
        get_blip_by_id: get_blip_by_id,

        create_blip: function(blip_name, blip_description, tier_id, segment_id){
            var id = radar.utils.hash_string_to_int(blip_name + blip_description);

            console.log(id);
            var blip = {
                name: blip_name,
                id: id,
                description: blip_description,
                tier: tier_id,
                segment: segment_id
            };

            radar.data_store.add_blip(blip);
            radar.data_store.save_data();
        }
    };

};