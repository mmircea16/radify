var radar = radar || {};

radar.more_info = function () {
    var modal = radar.modal('#more_info');

    modal.content().find('.fa-caret-left').click(function () {
        var tier_id =  modal.content().find('#tier').data('tier-id');
        var new_tier = radar.tiers().previous_tier(tier_id);
        modal.content().find('#tier').text(new_tier.tier_data.name);
        modal.content().find('#tier').data('tier-id', new_tier.tier_data.id);
        console.log('left');
    });

    modal.content().find('.fa-caret-right').click(function () {
        var tier_id =  modal.content().find('#tier').data('tier-id');
        var new_tier = radar.tiers().next_tier(tier_id);
        modal.content().find('#tier').text(new_tier.tier_data.name);
        modal.content().find('#tier').data('tier-id', new_tier.tier_data.id);
        console.log('right');
    });


    modal.show_for_blip = function (blip) {
        modal.content().find('#name').text(blip.blip_data.name);
        modal.content().find('#description').text(blip.blip_data.description);
        modal.content().find('#tier').text(blip.tier.tier_data.name);
        modal.content().find('#tier').data('tier-id',blip.tier.tier_data.id);
    };

    modal.get_data = function () {
        return {
            name: modal.content().find('#name').text(),
            description: modal.content().find('#description').text(),
            tier_id: modal.content().find('#tier').data('tier-id')
        }
    };

    return modal;
};