function(data, req) {
    var madlib = {};
    var db = $$(this).app.db;

    db.openDoc(req.id, {
        success: function(doc) {
            madlib = doc;
        }
    }, {async: false});
    
    madlib.html = madlib.madlib.replace(/\{\{[\w-_\d]+\}\}/g, function(id){return '<span id="' + id.replace('{{', '').replace('}}', '') + '"></span>';});
    
    return madlib;
};