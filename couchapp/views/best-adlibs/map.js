function(doc) {
    if (doc.votes && doc.type == 'adlib') {
        emit(doc.votes, doc);
    }
}