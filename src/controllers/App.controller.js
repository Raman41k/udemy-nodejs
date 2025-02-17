const get404Page = (req, res, next) => {
    const url = req.originalUrl;
    res.render('404', {
        documentTitle: '404 Not Found',
        url
    });
};

module.exports = {
    get404Page,
}