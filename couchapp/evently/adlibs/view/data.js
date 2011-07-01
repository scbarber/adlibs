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
    
    return doc;
};