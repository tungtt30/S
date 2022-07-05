const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')



const authRouter = require('./routes/auth')
const storeRouter = require('./routes/store')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')





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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => res.send(
    '<h1>Welcome to GodSeeker Server</h1>'
))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/store', storeRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server run on port ${PORT}`))