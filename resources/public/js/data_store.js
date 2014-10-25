var radar = radar || {};

radar.data_store = (function () {

    var data;

    var data_retrieved_callback;

    function start_retrieving_data() {
        var deferred = Q.defer();

        $.getJSON("http://localhost:8080/api/radar/1", "", function(response){
            data = response;
            data_retrieved_callback();
        });

        return deferred.promise;
    }

    function test_get_json() {
        start_retrieving_data().then(function(data){
            console.log(data);
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
        }
    }

})();
