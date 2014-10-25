var radar = radar || {};

radar.data_store = function () {

    function get_data() {
        var deferred = Q.defer();

        $.getJSON("contract.json", "", function(data){
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
        }
    }

};
