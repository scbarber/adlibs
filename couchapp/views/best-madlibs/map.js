function(doc) {
    if (doc.votes && doc.type == 'madlib') {
        emit(doc.votes, doc);
    }
}