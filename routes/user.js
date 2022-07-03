const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

//get all user
router.get('/', verifyToken, async (req, res) => {
    try {
        const userInfo = await User.find().select("-password")
        res.json({ success: true, userInfo })
    } catch (error) {
        res.json({ message: "bad request" })
    }
})

//get one user

router.get('/:username', verifyToken, async (req, res) => {
    const username = req.params.username
    try {
        const userInfo = await User.findOne({ username }).select('-password')
        res.status(200).json({ message: 'ok', userInfo })
    } catch (error) {

    }
})



module.exports = router