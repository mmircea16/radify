var radar = radar || {};

radar.creator = (function() {

    return {
        apply_to_page: function() {
            $('.background_circle').on('click', function(event){
                var pos_x = $('.background_circle').offset().left,
                    pos_y = $('.background_circle').offset().top;

                var radius = radar.painter.radius();

                var x = event.pageX - pos_x - radius;
                var y = event.pageY - pos_y - radius;
                radar.painter.add_blip_at(x, y)
            });
        }
    }

})();
