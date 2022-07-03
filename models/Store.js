const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    cost: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('store', StoreSchema)