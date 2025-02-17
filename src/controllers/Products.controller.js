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

module.exports = {
    getHomePage,
    addProductPage,
    addProduct,
    products,
}