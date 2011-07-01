function(data, req) {
    $$(this).tag = req.tag;
    return {tag : req.tag};
}