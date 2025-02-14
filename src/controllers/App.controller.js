const { renderHtml } = require('../helpers/utils')

const getHomePage = (req, res, next) => {
    renderHtml(res, 'shop')
};

const addProductPage = (req, res, next) => {
    renderHtml(res, 'add-product')
};

const addProduct = (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
}

const get404Page = (req, res, next) => {
    renderHtml(res, '404')
};

module.exports = {
    getHomePage,
    addProductPage,
    addProduct,
    get404Page
}