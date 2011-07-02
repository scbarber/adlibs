function(){
    $('#saved-results li a').fancybox();

        $('a.edit').fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'autoDimensions': false,
            'width': '55%',
            'height': 'auto',
            'onStart': function() { 
                var doc = $$('#adlibs').adlib;
                $('#add-edit-lib [name="title"]').val(doc.title);
                $('#add-edit-lib [name="adlib"]').val(doc.adlib);
                $('#add-edit-lib [name="tags"]').val(doc.tags.join(', '));
                $('#add-edit-lib [type="submit"]').val('Save');
                $('#add-edit-lib').append('<input type="hidden" name="_id" value="' + doc._id + '">');
            },
            'onClosed': function() {
                $('form#add-edit-lib')[0].reset();
                $('#add-edit-lib input[name="_id"]').remove();
                $('#add-edit-lib input[type="submit"]').val('Add');
            }
        })
}