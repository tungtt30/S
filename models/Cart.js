const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CartSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    quantity: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

})




module.exports = mongoose.model('cart', CartSchema)