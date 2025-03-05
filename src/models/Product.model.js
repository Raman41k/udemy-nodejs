const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model('Product', ProductSchema);

// const mongodb = require('mongodb');
//
// const {getDb} = require("../util/database");
//
// class Product {
//     constructor(title, price, imageUrl, description, userId) {
//         this.title = title;
//         this.price = price;
//         this.imageUrl = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D';
//         this.description = description;
//         this.userId = userId ?? null;
//     }
//
//     save() {
//         const db = getDb();
//         return db.collection("products").insertOne(this)
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//
//     update(id) {
//         const db = getDb();
//         return db.collection("products").updateOne({
//                 _id: new mongodb.ObjectId(id)
//             },
//             {
//                 $set: this
//             }
//         ).catch(err => {
//             console.log(err);
//         })
//     }
//
//     delete(id) {
//         const db = getDb();
//         return db.collection("products").deleteOne({
//             _id: new mongodb.ObjectId(id)
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//
//     static getProducts() {
//         const db = getDb();
//         return db.collection("products").find().toArray()
//             .then(products => {
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
//
//     static getProductById(id) {
//         const db = getDb();
//         return db.collection("products").findOne({_id: new mongodb.ObjectId(id)})
//             .then(product => {
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }
//
// module.exports = Product;