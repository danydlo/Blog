import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express'
import postRouter from './routes/post'
import postCreateRouter from './routes/post-create'
import commentRouter from './routes/comment'
import authRouter from './routes/auth'
import { verifyToken } from './middleware/validate-token'

// Establish connection with MongoDb database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', () => {
  console.log('>error occurred from the database')
})
db.once('open', () => {
  console.log('>successfully opened the database')
})

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/posts/create', verifyToken, postCreateRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/user', authRouter)

app.listen(process.env.PORT, () => console.log(`>Blog API listening on port ${process.env.PORT}`))
