function(data) {
    var madlib = $$('#madlibs').madlib;
    var db = $$(this).app.db;

    var errors = false;
	$(this).find('input[type="text"]').each(function(){
	    if (!$(this).val()) {
	        $(this).addClass('hasErrors');
	        errors = true;
	    } else {
    		var id = '#' + $(this).attr('name');
    		$(id).html($(this).val());
    		$(this).removeClass('hasErrors');
	    }
	});
	if (!errors) {
	    $('#madlib').show();
	    
	    // Asynchronously update the number of times this has been used
        db.openDoc(madlib._id, {
            success: function(doc) {
        	    doc.lib_count++;
        	    madlib.lib_count = doc.lib_count;
                db.saveDoc(doc, {});
            }
        });
	}
	return(false);
};