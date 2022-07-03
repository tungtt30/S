const mongoose = require('mongoose');
const Schema = mongoose.Schema


const CartSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'store'
    },
    quantity: {
        type: Number,
        required: true
    }
})


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [
        CartSchema
    ],
    store: [{
        type: Schema.Types.ObjectId,
        ref: 'store'
    }]
})

module.exports = mongoose.model('users', UserSchema)