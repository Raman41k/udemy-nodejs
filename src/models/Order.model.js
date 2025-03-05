const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            productData: {
                type: Object,
                required: true,
            },
            quantity: Number,
        }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }
});

module.exports = mongoose.model('Order', OrderSchema);