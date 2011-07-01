function(data) {
    var madlib = $$('#madlibs').madlib;
    var db = $$(this).app.db;
    var profile = $$("#profile").profile;

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
	
    if (profile) {
        // Add ability to save the results
        $('#madlib').append('<div class="save"><input type="button" id="save" value="Save my result"><span></span></div>');
        $('input#save').click(function(data) {
            if (!profile) return(false); // Safeguard

            // Save the tokens
            var fdoc = {}
            fdoc.tokens = $('#tokens form').serializeObject();
            fdoc.created_on = new Date();
            fdoc.profile = profile;
            fdoc.html = $('#madlib article').html();
            
            db.openDoc(madlib._id, {
                success: function(doc) {
                    doc.results.push(fdoc);
                    db.saveDoc(doc, {
                        success: function(doc) {
                            madlib = doc;
                            $('input#save').attr('disabled', 'disabled');
                            $('div.save span').html("Saved!");
                        }
                    });
                }
            });
        });
        
        // Add ability to upvote a lib
        if (madlib.voters && jQuery.inArray(profile.name, madlib.voters) > -1) {
            $('#madlib').prepend('<div class="vote">+1</div>');
        } else {
            $('#madlib').prepend('<div class="vote"><input type="button" id="vote" value="+1"></div>');
            $('input#vote').click(function(data) {
                if (!profile) return(false); // Safeguard

                db.openDoc(madlib._id, {
                    success: function(doc) {
                        if (!doc.voters) doc.voters = [];
                        doc.voters.push(profile.name);
                        doc.votes++;
                        db.saveDoc(doc, {
                            success: function(doc) {
                                madlib = doc;
                                $('div.vote').html("+1");
                            }
                        });
                    }
                });

            });
        }
    }
	
	return(false);
};