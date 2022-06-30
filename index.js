const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')





require('dotenv').config()



const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.pxtpz.mongodb.net/ChocoDB?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log('DB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.send(
    '<h1>Welcome to GodSeeker Server, this only server, Follow https://stupefied-neumann-58622d.netlify.app to visit app </h1>'
))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/song', songRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server run on port ${PORT}`))