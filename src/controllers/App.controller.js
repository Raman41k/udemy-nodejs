const { renderHtml } = require('../helpers/utils')

const getHomePage = (req, res) => {
    renderHtml(res, 'shop')
};

const addProductPage = (req, res) => {
    renderHtml(res, 'add-product')
};

const addProduct = (req, res) => {
    console.log(req.body)
    res.redirect('/');
}

const get404Page = (req, res) => {
    renderHtml(res, '404')
};

module.exports = {
    getHomePage,
    addProductPage,
    addProduct,
    get404Page
}