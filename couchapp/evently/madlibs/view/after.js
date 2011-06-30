function(data) {
    $('#tokens').formation();

	$('#madlib span').each(function(){
		var name = $(this).attr('id');
		var placeholder = name.replace(/[-_]/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		$.formation.addInput({required:true,name:name,placeholderValue:placeholder});
	});

	$.formation.addButton({type:"submit",value:"Lib it!"});
	
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