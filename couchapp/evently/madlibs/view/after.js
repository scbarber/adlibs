function(data) {
    $('#tokens form').submit(function(){
		if ($(this).hasClass('hasErrors')) return(false);
		$(this).find('input[type="text"]').each(function(){
			var id = '#' + $(this).attr('name');
			$(id).html($(this).val());
		});
		$('#madlib').show();
		return(false);
    })
};