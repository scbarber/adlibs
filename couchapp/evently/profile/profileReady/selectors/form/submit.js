function() {
  var form = $(this);
  var fdoc = form.serializeObject();
  var edit = false; // Simple flag to know if we are editing or not
  
  if (fdoc._id) {
      edit = true;
      var edits = form.serializeObject();
      $$(this).app.db.openDoc(edits._id, {
          success: function(d) {
              fdoc = d;
              fdoc.title = edits.title;
              fdoc.adlib = edits.adlib;
              fdoc.tags = edits.tags;
          }
      }, {async: false})
  } else {
      fdoc.created_on = new Date();
      fdoc.results = [];
      fdoc.lib_count = 0;
      fdoc.votes = 0;
      fdoc.type = 'adlib';
      fdoc.profile = $$("#profile").profile;
  }
  
  fdoc.tags = fdoc.tags.split(/,\s*/);

  fdoc.html = fdoc.adlib.replace(/<.*?>/g, '');
  
  var tokens = fdoc.adlib.match(/\{\{[\w-_\d]+\}\}/g);
  
  if (tokens.length > 0) {
      fdoc.tokens = '';
      for (i in tokens) {
          var t = tokens[i];
          var name = t.replace('{{' , '').replace('}}', '');
          var placeholder = name.replace(/[-_]/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  		
          fdoc.html = fdoc.html.replace(t, '<span id="' + name + '"></span>');
          fdoc.tokens += '<input type="text" name="' + name + '" required placeholder="' + placeholder + '">';
      }
  }

  var markdown = $$(this).app.require("vendor/couchapp/lib/markdown");
  fdoc.html = markdown.encode(fdoc.html);

  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
      $.fancybox.close();
      $('#add-edit-lib input[name="_id"]').remove();
      $('#add-edit-lib input[type="submit"]').val('Add');
      
      if (edit) {
          $('#adlibs h2').html(fdoc.title);
          $('#adlibs #tokens form').html(fdoc.tokens);
          $('#adlibs article').html(fdoc.html);
      }
    }
  });
  return false;
};
