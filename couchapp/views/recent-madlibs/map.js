function(doc) {
    if (doc.created_on && doc.type == 'madlib') {
        emit(doc.created_on, doc);
    }
}