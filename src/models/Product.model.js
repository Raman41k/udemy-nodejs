const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(dataPath, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
};

class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile( (products) => {
            products.push(this);
            fs.writeFile(dataPath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}

module.exports = {
    Product
};