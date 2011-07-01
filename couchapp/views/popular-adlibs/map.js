function(doc) {
  if (doc.lib_count)
      emit(doc.lib_count, doc);
}