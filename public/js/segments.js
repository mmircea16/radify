var radar = radar || {};
radar.segments = function () {

    function get_all() {
        var segments = radar.data_store.get_segments();

        var delta_angle = Math.PI * 2 / segments.length;
        var start_angles = d3.range(0, Math.PI*2, delta_angle);
        var end_angles = d3.range(delta_angle, Math.PI*2 + delta_angle, delta_angle);

        var segment_view_models = d3.zip(segments, start_angles, end_angles).map(function (segment_start_end_angles_array) {
            return {
                segment_data: segment_start_end_angles_array[0],
                start_angle: segment_start_end_angles_array[1],
                end_angle: segment_start_end_angles_array[2]
            }
        });
        return segment_view_models;
    }

    return {
        get_all: get_all,

        get_by_id: function (id) {
            return get_all().filter(function (segment) {
                return (segment.segment_data.id === id)
            })[0]

        },

        update_with: function(segments){
          radar.data_store.update_segments(segments);
          radar.data_store.save_data();
        },

        get_segment_at_coordinates: function(x,y) {
            var angle = Math.PI/2 - Math.atan2(x,y);
            angle = (angle < 0) ? (angle + 2*Math.PI) : angle;
            return get_all().filter(function(segment) {
                return (segment.end_angle > angle) && (segment.start_angle < angle)
            })[0]
        }

    };
};
