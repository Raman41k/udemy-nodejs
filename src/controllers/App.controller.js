const products = [];

const getHomePage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('shop', {
        documentTitle: 'Shop',
        products,
        url
    });
};

const addProductPage = (req, res, next) => {
    const url = req.originalUrl;
    res.render('add-product', {
        documentTitle: 'Add product',
        url
    });
};

const addProduct = (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
}

const get404Page = (req, res, next) => {
    res.render('404', {
        documentTitle: '404 Not Found'
    });
};

module.exports = {
    getHomePage,
    addProductPage,
    addProduct,
    get404Page,
    products,
}