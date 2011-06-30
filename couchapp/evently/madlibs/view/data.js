function(data, req) {
    var doc = {};
    var db = $$(this).app.db;

    db.openDoc(req.id, {
        success: function(d) {
            doc = d;
        }
    }, {async: false});
    
    // doc.html = doc.madlib.replace(/\{\{[\w-_\d]+\}\}/g, function(id){return '<span id="' + id.replace('{{', '').replace('}}', '') + '">&nbsp;</span>';});
    doc.html = doc.madlib;
    
    var tokens = doc.madlib.match(/\{\{[\w-_\d]+\}\}/g);
    
    if (tokens.length > 0) {
        doc.tokens = '';
        for (i in tokens) {
            var t = tokens[i];
            var name = t.replace('{{' , '').replace('}}', '');
            var placeholder = name.replace(/[-_]/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    		
            doc.html = doc.html.replace(t, '<span id="' + name + '"></span>');
            doc.tokens += '<input type="text" name="' + name + '" placeholder="' + placeholder + '">';
        }
    }
    
    return doc;
};