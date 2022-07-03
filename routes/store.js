const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const User = require("../models/User")
const Store = require('../models/Store')

//@route GET api/posts
//@desc get post
//access: private
router.get('/', async (req, res) => {
    try {
        const store = await Store.find().populate('user', ['username'])
        res.json({ success: true, store })
    } catch (error) {
        res.status(400).json({ message: 'bad request' })
    }
})
// check store by id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const store = await Store.findOne({ _id: id }).populate('user', ['username'])
        res.json({ success: true, store })
    } catch (error) {
        res.status(400).json({ message: 'bad request' })
    }
})


//@route POST api/posts
//@desc Create post
//access: private

router.post('/', verifyToken, async (req, res) => {
    const { item, description, cost } = req.body
    // simple validation

    if (!item && !cost)
        return res.status(400).json({ success: false, message: "title and cost is required" })

    try {
        const newItem = new Store({
            item,
            description,
            cost,
            user: req.userId
        })

        await newItem.save()

        res.json({ success: true, message: 'Good', store: newItem })


    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

//@route PUT api/posts
//@desc Update post
//access: private 
router.put('/:id', verifyToken, async (req, res) => {
    const { item, description, cost } = req.body

    if (!item)
        return res.status(400).json({ success: false, message: "item is required" })

    try {
        let updatedStore = {
            item,
            description: description || '',
            cost,
        }
        const storeUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedStore = await Store.findOneAndUpdate(storeUpdateCondition, updatedStore, { new: true })
        // user not authorized to update post
        if (!updatedStore)
            return res.status(401).json({ success: false, message: 'Item not found or not authorized' })

        res.json({ success: true, message: "Gud", store: updatedStore })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

//@route DELETE api/posts
//@desc Delete post
//access: private 

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const itemDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedItem = await Store.findByIdAndDelete(itemDeleteCondition)

        // user not authorized
        if (!deletedItem) {
            return res.status(401).json({ success: false, message: 'Item not found or not authorized' })
        }

        res.json({ success: true, message: "Deleted", store: deletedItem })
    } catch (error) {

    }
})



module.exports = router