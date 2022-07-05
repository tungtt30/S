const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const User = require('../models/User')
const Cart = require('../models/Cart')

//get one user
router.get('/', verifyToken, async (req, res) => {
    try {
        // const user = await User.findOne({user})
        const cart = await Cart.find({ user: req.userId })
        res.status(200).json({ message: 'ok', cart })
    } catch (e) {
        res.status(500).json({ message: 'error' })
    }
})



// create new item 

router.post('/', verifyToken, async (req, res) => {
    const { item, quantity } = req.body

    if (!item && !quantity)
        return res.status(400).json({ success: false, message: "item and quantity required" })
    try {
        const newCart = new Cart({
            item,
            quantity,
            user: req.userId
        })

        await newCart.save()

        res.status(200).json({ message: 'success', newCart })
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})

router.put('/:cartId', verifyToken, async (req, res) => {
    const { item, quantity } = req.body
    try {
        let updatedCart = {
            item,
            quantity,
            user: req.userId
        }
        const cartUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedCart = await Cart.findOneAndUpdate(cartUpdateCondition, updatedCart, { new: true })
        if (!updatedCart) {
            return res.status(401).json({ success: false, message: 'Cart not found or not authorized' })
        }
        res.json({ success: true, message: "ok", updatedCart })
    } catch (error) {
        res.status(400).json({ message: 'bad request' })
    }
})

router.delete('/:cartId', verifyToken, async (req, res) => {
    try {
        const cartDeleteCondition = { _id: req.params.id, user: req.userId }

        const deletedCart = await Post.findByIdAndDelete(cartDeleteCondition)

        // user not authorized
        if (!deletedCart)
            return res.status(401).json({ success: false, message: 'Cart not found or not authorized' })

        res.json({ success: true, message: "Deleted", deletedCart })
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})

module.exports = router
