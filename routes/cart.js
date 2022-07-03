const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

//get one user

router.get('/:username', verifyToken, async (req, res) => {
    const username = req.params.username
    try {
        const userInfo = await User.findOne({ username })
        res.status(200).json({ message: 'ok', userInfo })
    } catch (error) {
        res.json({ message: 'bad request' })
    }
})


router.post('/:username', verifyToken, async (req, res) => {
    const { item, quantity } = req.body
    const username = req.params.username
    try {
        const user = await User.findOne({ username })
        const newCart = {
            ...user,
            cart: [...{
                item,
                quantity
            }]
        }

        const update = await User.findOneAndUpdate({ username }, newCart)
        res.json({ update })
        console.log(newCart)
    } catch (error) {
        res.json({ message: 'bad request' })
    }
})
module.exports = router
