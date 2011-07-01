function() {
  var form = $(this);
  var fdoc = form.serializeObject();
  fdoc.created_on = new Date();
  fdoc.results = [];
  fdoc.lib_count = 0;
  fdoc.votes = 0;
  fdoc.type = 'adlib';
  fdoc.tags = fdoc.tags.split(/,\s*/);
  fdoc.profile = $$("#profile").profile;

  fdoc.html = fdoc.adlib;
  
  var tokens = fdoc.adlib.match(/\{\{[\w-_\d]+\}\}/g);
  
  if (tokens.length > 0) {
      fdoc.tokens = '';
      for (i in tokens) {
          var t = tokens[i];
          var name = t.replace('{{' , '').replace('}}', '');
          var placeholder = name.replace(/[-_]/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  		
          fdoc.html = fdoc.html.replace(t, '<span id="' + name + '"></span>');
          fdoc.tokens += '<input type="text" name="' + name + '" placeholder="' + placeholder + '">';
      }
  }

  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
      $(form[0]).hide()
    }
  });
  return false;
};
