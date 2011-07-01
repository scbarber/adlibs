function(e) {
    var index = $("li").index(this);
    var adlib = $$('#adlibs').adlib;
    var result = adlib.results[index];
    
    $.fancybox(
        '<div class="adlib"><article>' + result.html + '</article></div>',
        {
            'audoDimensions': false,
            'width': 252,
            'height': 'auto',
            'transitionIn': 'elastic',
            'transitionOut': 'elastic'
        }
    );
}