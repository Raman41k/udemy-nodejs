const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {
    static addProduct(id, productPrice) {
        // fs.readFile(dataPath, (err, data) => {
        //     let cart = {
        //         products: [],
        //         totalPrice: 0
        //     };
        //
        //     if (!err && data.length > 0) {
        //         try {
        //             cart = JSON.parse(data);
        //         } catch (parseError) {
        //             console.error('Error parsing JSON:', parseError);
        //         }
        //     }
        //
        //     const existingProductIndex = cart.products.findIndex(p => p.id === id);
        //     const existingProduct = cart.products[existingProductIndex];
        //     let updatedProduct;
        //     if (existingProduct) {
        //         updatedProduct = { ...existingProduct };
        //         updatedProduct.quantity = updatedProduct.quantity + 1;
        //         cart.products[existingProductIndex] = updatedProduct;
        //     } else {
        //         updatedProduct = {
        //             id,
        //             quantity: 1
        //         };
        //         cart.products.push(updatedProduct);
        //     }
        //     cart.totalPrice += parseInt(productPrice, 10);
        //
        //     fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        //         if (err) console.log('Error writing cart data to file:', err);
        //     });
        // });
    }
}

module.exports = {
    Cart
};
