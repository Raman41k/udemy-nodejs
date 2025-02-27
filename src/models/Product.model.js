const { Cart } = require('../models/Cart.model');
const db = require('../util/database');
const defaultImageUrl = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D';

class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = defaultImageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        )
    }

    update() {
        return db.execute(
            'UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ?',
            [this.title, this.price, this.imageUrl, this.description, this.id]
        );
    }

    delete() {
        return db.execute(
            'DELETE FROM products WHERE id = ?',
            [this.id]
        )
    }

    static deleteById(id) {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static fetchById(id) {
        return db.execute('SELECT * FROM products where id = ' + id);
    }
}

module.exports = {
    Product
};