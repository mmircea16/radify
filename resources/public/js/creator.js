var radar = radar || {};

radar.creator = (function() {

    var tier, segment, add_blip_form;
    function save_button_clicked(){
        var blip_name = add_blip_form.find('#blip_name').val();
        var blip_description = add_blip_form.find('#blip_description').val();

        radar.blips().create_blip(blip_name, blip_description, tier.tier_data.id, segment.segment_data.id);

        radar.painter.paint_blips();
        hide_add_blip_modal();
    }

    function cancel_button_clicked(){
        radar.painter.paint_blips();
        hide_add_blip_modal();
    }

    function background_circle_clicked(event){
        var pos_x = $('.background_circle').offset().left,
            pos_y = $('.background_circle').offset().top;

        var radius = radar.painter.radius();

        var relative_to_center_x = event.pageX - pos_x - radius;
        var relative_to_center_y = event.pageY - pos_y - radius;

        tier = radar.tiers().get_tier_at_coordinates(relative_to_center_x, relative_to_center_y);
        segment = radar.segments().get_segment_at_coordinates(relative_to_center_x, relative_to_center_y);

        radar.painter.add_temp_blip_at(relative_to_center_x, relative_to_center_y);

        show_add_blip_modal();
    }

    function show_add_blip_modal(){
        add_blip_form.show();
        $('.cover').show();
    }

    function hide_add_blip_modal(){
        add_blip_form.hide();
        $('.cover').hide();
    }


    return {
        apply_to_page: function() {
            add_blip_form = $('#add_blip_form');

            add_blip_form.find('#save_button').on('click', save_button_clicked);
            add_blip_form.find('#cancel_button').on('click', cancel_button_clicked);

            $('.background_circle').on('click', background_circle_clicked);
        }
    }

})();
