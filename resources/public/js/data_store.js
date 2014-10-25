var radar = radar || {};

radar.data_store = (function () {

    function get_data() {
        var deferred = Q.defer();

        $.getJSON("http://localhost:8080/api/radar/1", "", function(data){
            deferred.resolve(data);
        });

        return deferred.promise;
    }

    function test_get_json() {
        get_data().then(function(data){
            console.log(data);
        });
    }

    function get_dummy_data() {
        return data;
    }

    return {
        get_tiers: function(){
            return get_dummy_data().template.tiers;
        },

        get_segments: function(){
            return get_dummy_data().template.segments;
        },

        get_blips: function() {
            return get_dummy_data().blips;
        }
    }

})();
