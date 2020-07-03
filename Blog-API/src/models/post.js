import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  createdAt: { type: Date },
  publish: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('Post', postSchema)
