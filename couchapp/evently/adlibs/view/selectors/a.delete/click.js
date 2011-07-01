function(){
    var doc = $$('#adlibs').adlib;

    var remove_doc = confirm('Delete "' + doc.title + '"?');
    if (remove_doc) {
        $$(this).app.db.removeDoc({_id: doc._id, _rev: doc._rev});
        $('#adlibs *').fadeOut();
    }
    
    return false;
}