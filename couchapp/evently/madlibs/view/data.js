function(data, req) {
    var madlib = {};
    var db = $$(this).app.db;

    db.openDoc(req.id, {
        success: function(doc) {
            madlib = doc;
        }
    }, {async: false});
    return madlib;
};