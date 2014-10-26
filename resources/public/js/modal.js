var radar = radar || {};

radar.modal = function (selector) {

    var $element = $(selector);
    var $cover = $('.cover');

    $element.find('.cancel_button').click(hide);

    function show(){
        $element.show();
        $cover.show();
        $('body').css({'overflow': 'hidden'})

    }

    function hide(){
        $element.hide();
        $cover.hide();
        $('body').css({'overflow': 'auto'})

    }


    return {
        show: show,
        hide: hide,
        content: function(){
            return $element;
        },
        on_accept: function (callback) {
            $element.find('.accept_button').off('click').click(function(){
                hide();
                callback();
            });
        },

        on_cancel: function (callback) {
            $element.find('.cancel_button').off('click').click(function(){
                hide();
                callback();
            });
        }
    }
};