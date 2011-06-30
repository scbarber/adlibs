function() {
  var form = $(this);
  var fdoc = form.serializeObject();
  fdoc.created_on = new Date();
  fdoc.results = [];
  fdoc.lib_count = 0;
  fdoc.votes = 0;
  fdoc.type = 'madlib';
  fdoc.tags = fdoc.tags.split(/,\s*/);
  fdoc.profile = $$("#profile").profile;
  $$(this).app.db.saveDoc(fdoc, {
    success : function() {
      form[0].reset();
      $(form[0]).hide()
    }
  });
  return false;
};
