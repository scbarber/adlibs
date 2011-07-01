function(data) {
    var adlib = $$('#adlibs').adlib;
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
	    $('#adlib').show();
	    
	    // Asynchronously update the number of times this has been used
        db.openDoc(adlib._id, {
            success: function(doc) {
        	    doc.lib_count++;
        	    adlib.lib_count = doc.lib_count;
                db.saveDoc(doc, {});
            }
        });
	}
	
    if (profile) {
        // Add ability to save the results
        $('#adlib div.save').html('<input type="button" id="save" value="Save my result"><span></span>');
        $('input#save').click(function(data) {
            if (!profile) return(false); // Safeguard

            // Save the tokens
            var fdoc = {}
            fdoc.tokens = $('#tokens form').serializeObject();
            fdoc.created_on = new Date();
            fdoc.profile = profile;
            fdoc.html = $('#adlib article').html();
            
            db.openDoc(adlib._id, {
                success: function(doc) {
                    doc.results.push(fdoc);
                    db.saveDoc(doc, {
                        success: function(doc) {
                            adlib = doc;
                            $('input#save').attr('disabled', 'disabled');
                            $('div.save span').html("Saved!");
                        }
                    });
                }
            });
        });
        
        // Add ability to upvote a lib
        if (adlib.voters && jQuery.inArray(profile.name, adlib.voters) > -1) {
            $('#adlib div.vote').html('+1');
        } else {
            $('#adlib div.vote').html('<input type="button" id="vote" value="+1">');
            $('input#vote').click(function(data) {
                if (!profile) return(false); // Safeguard

                db.openDoc(adlib._id, {
                    success: function(doc) {
                        if (!doc.voters) doc.voters = [];
                        doc.voters.push(profile.name);
                        doc.votes++;
                        db.saveDoc(doc, {
                            success: function(doc) {
                                adlib = doc;
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