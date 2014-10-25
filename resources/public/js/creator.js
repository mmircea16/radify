var radar = radar || {};

radar.creator = (function() {

    var tier, segment;

    return {
        apply_to_page: function() {
            var add_blip_form = $('#add_blip_form');
            add_blip_form.hide();

            add_blip_form.find('#save_button').on('click', function(){
                var blip_name = add_blip_form.find('#blip_name').val();
                var blip_description = add_blip_form.find('#blip_description').val();

                radar.blips().create_blip(blip_name, blip_description, tier.tier_data.id, segment.segment_data.id);

                radar.painter.paint_blips();

                add_blip_form.hide();
            });

            $('.background_circle').on('click', function(event){
                var pos_x = $('.background_circle').offset().left,
                    pos_y = $('.background_circle').offset().top;

                var radius = radar.painter.radius();

                var relative_to_center_x = event.pageX - pos_x - radius;
                var relative_to_center_y = event.pageY - pos_y - radius;

                tier = radar.tiers().get_tier_at_coordinates(relative_to_center_x, relative_to_center_y);
                segment = radar.segments().get_segment_at_coordinates(relative_to_center_x, relative_to_center_y);

                radar.painter.add_temp_blip_at(relative_to_center_x, relative_to_center_y);

                add_blip_form.show();
            });
        }
    }

})();
