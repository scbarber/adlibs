function(doc) {
  if(doc.type == "adlib" && doc.tags && doc.tags.length) {
    for(var idx in doc.tags) {
      if (doc.tags[idx]){ 
        emit(doc.tags[idx].toLowerCase(), doc);
      }
    }
  }
}
