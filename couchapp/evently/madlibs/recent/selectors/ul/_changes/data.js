function(data) {
  // $.log(data)
  var p;
  return {
    madlibs : data.rows.map(function(r) {
      p = (r.value && r.value.profile) || {};
      p.title = r.value && r.value.title;
      p.id = r.value && r.value._id;
      p.tags = r.value && r.value.tags;
      return p;
    })
  }
};