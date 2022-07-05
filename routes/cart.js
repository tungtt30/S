const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Cart = require('../models/Cart')

//get one user

router.get('/', verifyToken, async (req, res) => {
    const userid = req.params.userid
    try {
        const cartInfo = await Cart.findOne({ userid }).populate(['item', 'user'], ['username'])
        res.status(200).json({ message: 'ok', cartInfo, req: req.userId })
    } catch (error) {
        res.json({ message: 'bad request' })
    }
})


// create new item 
router.post('/', verifyToken, async (req, res) => {
    const { item, quantity, user } = req.body
    try {
        const newItem = new Cart({
            item, // itemId
            quantity,
            user // userId
        })
        await newItem.save()
        res.status(200).json({ message: 'ok', newItem })

    } catch (error) {
        res.json({ message: 'bad request' })
    }
})
module.exports = router
