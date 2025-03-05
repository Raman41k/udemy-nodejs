const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    cart: {
        products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            }
        }]
    }
});

UserSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.products.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartProducts = [...this.cart.products];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.products[cartProductIndex].quantity + 1;
        updatedCartProducts[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartProducts.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    this.cart = {
        products: updatedCartProducts
    };
    return this.save();
};

UserSchema.methods.deleteItemFromCart = function (productId) {
    this.cart.products = this.cart.products.filter(product => {
        return product.productId.toString() !== productId.toString();
    });
    return this.save();
}

UserSchema.methods.clearCart = function () {
    this.cart = {
        products: []
    };
    return this.save();
}

module.exports = mongoose.model('User', UserSchema);

// const mongodb = require('mongodb');
//
// const {getDb} = require("../util/database");
//
// class User {
//     constructor(username, email, cart, id) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart; // {products: []}
//         this._id = id;
//     }
//
//     save() {
//         const db = getDb();
//         return db.collection("users").insertOne(this).catch((err) => {
//             console.log(err)
//         });
//     }
//
//     addToCart(product) {
    //     const cartProductIndex = this.cart.products.findIndex(cp => {
    //         return cp.productId.toString() === product._id.toString();
    //     });
    //     let newQuantity = 1;
    //     const updatedCartProducts = [...this.cart.products];
    //
    //     if (cartProductIndex >= 0) {
    //         newQuantity = this.cart.products[cartProductIndex].quantity + 1;
    //         updatedCartProducts[cartProductIndex].quantity = newQuantity;
    //     } else {
    //         updatedCartProducts.push({
    //             productId: new mongodb.ObjectId(product._id),
    //             quantity: newQuantity
    //         });
    //     }
    //     const updatedCart = {
    //         products: updatedCartProducts
    //     };
    //     const db = getDb();
    //     return db
    //         .collection('users')
    //         .updateOne(
    //             { _id: new mongodb.ObjectId(this._id) },
    //             { $set: { cart: updatedCart } }
    //         );
    // }
//
//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.products.map(product => {
//             return product.productId;
//         });
//         return db.collection("products").find({
//             _id: {
//                 $in: productIds,
//             }
//         }).toArray().then(products => {
//             return products.map(product => {
//                 return {
//                     ...product,
//                     quantity: this.cart.products.find(i => {
//                         return i.productId.toString() === product._id.toString();
//                     }).quantity
//                 }
//             })
//         })
//     }
//
//     deleteItemFromCart(productId) {
//         const updatedCartProducts = this.cart.products.filter(product => {
//             return product.productId.toString() !==productId.toString();
//         });
//
//         const db = getDb();
//         return db.collection("users").updateOne({
//            _id: new mongodb.ObjectId(this._id),
//         },
//         {  $set: {
//                 cart: {
//                     products: updatedCartProducts
//                 },
//             }
//         });
//     }
//
//     createOrder() {
//         const db = getDb();
//         return this.getCart().then(cartProducts => {
//             const order = {
//                 products: cartProducts,
//                 user: {
//                     _id: new mongodb.ObjectId(this._id),
//                     name: this.username,
//                     email: this.email
//                 }
//             }
//             return db.collection("orders").insertOne(order);
//         }).then(result => {
//             this.cart = {products: []};
//             return db.collection("users").updateOne({
//                 _id: new mongodb.ObjectId(this._id)
//             }, {
//                 $set: {
//                     cart: {
//                         products: []
//                     }
//                 }
//             })
//         })
//     }
//
//     getOrders() {
//         const db = getDb();
//         return db.collection("orders").find({
//             'user._id': new mongodb.ObjectId(this._id)
//         }).toArray();
//     }
//
//     static getById(userId) {
//         const db = getDb();
//         return db.collection("users").findOne({
//             _id: new mongodb.ObjectId(userId)
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }
//
// module.exports = User;