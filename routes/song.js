const express = require('express')
const router = express.Router()

const Song = require('../models/Song')


//Get api

router.get('/', async (req, res) => {
    try {
        const song = await Song.find()
        res.json({ success: true, song })
    } catch (error) {

    }
})

router.post('/', async (req, res) => {
    const { name, singer, url, image } = req.body
    if (!name)
        return res.status(400).json({ success: false, message: "name is required" })
    try {
        const newSong = new Song({
            name,
            singer,
            url,
            image
        })
        await newSong.save()

        res.json({ success: true, message: 'upload done :)', song: newSong })
    } catch (error) {
        res.status(500).json({ success: false, message: 'server eroor' })
    }
})

router.put('/:id', async (req, res) => {
    const { name, singer, url, image } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: 'title is require' })
    try {
        let updatedSong = {
            name,
            singer,
            url,
            image
        }
        const songUpdateCondition = { _id: req.params.id }
        updatedSong = await Song.findOneAndUpdate(songUpdateCondition, updatedSong, { new: true })
        if (!updatedSong)
            return res.status(401).json({ success: false, message: 'song not found or not update' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'sserver eooro' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const songDeleteCondition = { _id: req.params.id }
        const deleteSong = await Song.findByIdAndDelete(songDeleteCondition)
        res.json({ success: true, message: 'delete done !' })
    } catch (error) {
        return error
    }
})



module.exports = router