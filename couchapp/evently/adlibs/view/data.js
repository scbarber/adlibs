function(data, req) {
    var doc = {};
    var db = $$(this).app.db;

    db.openDoc(req.id, {
        success: function(d) {
            doc = d;
        }
    }, {async: false});
    
    $$(this).adlib = doc;
    
    doc.saved_count = doc.results.length;
    
    return doc;
};