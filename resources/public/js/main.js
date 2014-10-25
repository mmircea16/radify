var radar = radar || {};

$(function(){
    radar.data_store.once_retrieved(function(){
        radar.painter.apply_to_page();
        radar.creator.apply_to_page();
    });

    radar.data_store.start_retrieving_data();
});