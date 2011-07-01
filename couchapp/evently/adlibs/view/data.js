function(data, req) {
    var doc = {};
    var db = $$(this).app.db;
    var profile = $$("#profile").profile;

    db.openDoc(req.id, {
        success: function(d) {
            doc = d;
        }
    }, {async: false});
    
    $$(this).adlib = doc;
    
    doc.saved_count = doc.results.length;

    if (profile && doc.profile.name == profile.name) {
        doc.can_edit = true;
        if (doc.saved_count == 0) {
            doc.can_delete = true;
        }
    }
    
    return doc;
};