var radar = radar || {};

radar.data_store = (function () {

    var data;

    var data_retrieved_callback;

    function get_radar_id () {
        return location.href.split('id=')[1]
    }

    function start_retrieving_data() {
        $.getJSON("/api/radar/"+get_radar_id(), "", function(response){
            data = response;
            data_retrieved_callback();
        });
    }

    function get_data() {
        return data;
    }

    return {
        once_retrieved: function (callback) {
            data_retrieved_callback = callback;
        },

        start_retrieving_data: start_retrieving_data,

        get_tiers: function(){
            return get_data().template.tiers;
        },

        get_segments: function(){
            return get_data().template.segments;
        },

        get_blips: function() {
            return get_data().blips;
        },

        add_blip: function(blip) {
            data.blips.push(blip);
        },

        save_data: function(){
            console.log(data);
        }
    }

})();
