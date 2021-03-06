var radar = radar || {};

radar.painter = (function () {
    'use strict';

    var circle_x = 400;
    var circle_y = 400;
    var circle_radius = 400;

    var more_info;

    function draw_background_circle(circle_radius) {
        d3.select('svg')
            .append('circle')
            .attr('class', 'background_circle')
            .attr('cx', circle_x)
            .attr('cy', circle_y)
            .attr('r', circle_radius)
            .attr('fill-opacity', 0.2)
            .attr('fill', "grey");
    }

    var lineFunction = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("linear");

    function draw_x_axis(axis_length) {
        var start_x = (circle_x - axis_length / 2);
        var fin_x = (circle_x + axis_length / 2);

        d3.select('svg')
            .append('path')
            .attr('d', lineFunction([
                {"x": start_x, "y": circle_y},
                {"x": fin_x, "y": circle_y}
            ]))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
    }

    function draw_y_axis(axis_length) {
        var start_y = (circle_y - axis_length / 2);
        var fin_y = (circle_y + axis_length / 2);

        d3.select('svg')
            .append('path')
            .attr('d', lineFunction([
                {"x": circle_x, "y": start_y},
                {"x": circle_x, "y": fin_y}
            ]))
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
    }

    function draw_tiers(tiers) {
        d3.select("svg")
            .selectAll("circle")
            .data(tiers)
            .enter()
            .append("circle")
            .attr("cx", circle_x)
            .attr("cy", circle_y)
            .attr("r", function (tier) {
                return tier.radius;
            })
            .attr("fill-opacity", 0)
            .attr("stroke", function (tier) {
                return tier.color;
            })
            .attr("stroke-width", 3);
    }

    function draw_blips(blips) {
        d3.select("svg")
            .selectAll("circle .blip")
            .data(blips)
            .enter()
            .append("circle")
            .attr('class', 'blip')
            .attr('id', function (blip) {
                return blip.blip_data.id
            })
            .attr("cx", function (blip) {
                return circle_x + blip.x;
            })
            .attr("cy", function (blip) {
                return circle_y + blip.y;
            })
            .attr("r", 5)
            .attr("fill", 'green');
    }

    function draw_temp_blip_at(x, y) {
        d3.select("svg")
            .append("circle")
            .attr('class', 'new-blip')
            .attr("cx", circle_x + x)
            .attr("cy", circle_y + y)
            .attr("r", 5)
            .attr("fill", 'red');
    }

    function apply_to_page() {

        more_info = radar.more_info();

        var tiers = radar.tiers().get_all();
        var segments = radar.segments().get_all();
        circle_radius = tiers[0].radius;
        circle_x = circle_radius;
        circle_y = circle_radius;
        var axis_length = circle_radius * 2 + 30;

        draw_segment_labels(segments);
        enable_label_editing(segments)
        draw_tiers(tiers);
        draw_background_circle(circle_radius);
        draw_x_axis(axis_length);
        draw_y_axis(axis_length);
        paint_blips();
    }

    function draw_segment_labels(segments){
        d3.zip(segments, ['.bottom_and_right', '.bottom_and_left', '.top_and_left', '.top_and_right']).forEach(function(pair){
            $(pair[1]).text(pair[0].segment_data.name);
        });

        $('.radar_title').text(radar.data_store.get_title());
    }

    function enable_label_editing(segments){
        $('#update_segment_labels').click(function(){
            console.log('update segm labels');
            d3.zip(segments, ['.bottom_and_right', '.bottom_and_left', '.top_and_left', '.top_and_right']).forEach(function(pair){
                pair[0].segment_data.name = $(pair[1]).text();
            });
            var new_segments = segments.map(function (segment) {
                return segment.segment_data
            });
            radar.segments().update_with(new_segments);
            radar.data_store.update_title($('.radar_title').text());
            radar.data_store.save_data();
        });
    }

    function paint_blips() {
        $('.blip').remove();
        $('.new-blip').remove();
        var blips = radar.blips().get_all();
        draw_blips(blips);
        add_more_info_to_blips();
    }

    var modalShowing = false;

    function add_more_info_to_blips() {
        $('.blip').mouseenter(
            function (event) {
                var blipDomElement = $(this);
                blipDomElement.attr('fill', 'red');

                var id = blipDomElement.attr('id');
                var blip = radar.blips().get_blip_by_id(id);

                var hoverText = blip.blip_data.description;
                var hoverTitle = blip.blip_data.name;

                $('body').prepend('<div id="blip_hover_description"> <h4 id="hover_title">' + hoverTitle + '</h4><p>' + hoverText + '</p></div>')
                $('#blip_hover_description').css({top:(event.pageY-115), left: event.pageX-100}).fadeIn('slow');


            });

        $('.blip').mouseleave(
            function (event) {
                $('#blip_hover_description').remove();
                if(!modalShowing){
                    $(this).attr('fill', 'green');
                }
            });

        $('.blip').on('click', function (event) {
            var blipDomElement = $(this);
            $('#blip_hover_description').remove();
            modalShowing = true;
            more_info.show();

            var id = $(event.target).attr('id');
            var blip = radar.blips().get_blip_by_id(id);

            console.log(blip);
            more_info.show_for_blip(blip);

            var reset_blip_colour = function(){
                blipDomElement.attr('fill', 'green');
                modalShowing = false;
                paint_blips();
            }

            more_info.on_accept(function () {
                blip.blip_data.name = more_info.get_data().name;
                blip.blip_data.description = more_info.get_data().description;
                blip.blip_data.tier = more_info.get_data().tier_id;
                blip.tier_data = radar.tiers().get_by_id(more_info.get_data().tier_id);
                radar.data_store.save_data();
                reset_blip_colour();
            });
            more_info.on_cancel(function () {
                reset_blip_colour();
            });
        });
    }

    return {
        apply_to_page: apply_to_page,
        paint_blips: paint_blips,
        add_temp_blip_at: draw_temp_blip_at,
        radius: function () {
            return circle_radius;
        }
    };

})();
