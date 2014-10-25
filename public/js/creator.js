var radar = radar || {};

radar.creator = function() {

    return {
        apply_to_page: function() {
            $('.background_circle').on('click', function(event){
                var pos_x = $('.background_circle').offset().left,
                    pos_y = $('.background_circle').offset().top;

                radar.painter.add_blip_at(event.pageX - pos_x, event.pageY - pos_y)
            });
        }
    }

};

$(function(){
   radar.creator().apply_to_page();
});