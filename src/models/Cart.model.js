const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(dataPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err && fileContent) {
                cart = JSON.parse(fileContent);
            }

            cart.products = Array.isArray(cart.products) ? cart.products : [];
            cart.totalPrice = typeof cart.totalPrice === 'number' ? cart.totalPrice : 0;

            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products.push(updatedProduct);
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(dataPath, JSON.stringify(cart), err => {
                if (err) console.log(err);
            });
        });
    }

    static deleteProductFromCart(id, productPrice) {
        fs.readFile(dataPath, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(dataPath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(dataPath, (err, data) => {
            if (err) {
                cb([]);
            } else {
                cb(JSON.parse(data));
            }
        });
    }
}

module.exports = {
    Cart
};
