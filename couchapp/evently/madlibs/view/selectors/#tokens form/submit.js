function(data) {
    var madlib = $$('#madlibs').madlib;

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
	    madlib.lib_count++;
	    
        $$(this).app.db.saveDoc(madlib, {});
	}
	return(false);
};