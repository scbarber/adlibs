function(doc) {
    if (doc.created_on && doc.type == 'adlib') {
        emit(doc.created_on, doc);
    }
}