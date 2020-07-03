import Post from '../models/post'
import Author from '../models/author'
import { postValidation, updateValidation } from '../validation'

// Display list of all Posts that are published
const post_list = (req, res, next) => {
  // find all the posts in the database
  Post.find({ publish: true })
    .populate('author') // fillout the author member
    .exec((err, list_posts) => {
      if (err) {
        return next(err)
      }
      res.json(list_posts)
    })
}

// Display a single post
const post_detail = (req, res, next) => {
  // find post by id
  Post.findById(req.params.id)
    .populate('author') // fillout the author member
    .exec((err, post) => {
      if (err) {
        return next(err)
      }
      if (post == null) {
        let err = new Error('Post not found')
        err.status = 404
        return next(err)
      }
      res.json(post)
    })
}

// get list of specific author
const post_edit = (req, res, next) => {
  Post.find({ author: req.params.id })
    .populate('author')
    .exec((err, list_posts) => {
      if (err) {
        return next(err)
      }
      res.json(list_posts)
    })
}

// Create a new post, but first request the author
const post_create_get = (req, res, next) => {
  Author.findById(req.body.id).exec((err, author) => {
    if (err) {
      return next(err)
    }
    res.json(author)
  })
}

// Now actually create post
const post_create_post = (req, res, next) => {
  // validate the post
  const { error } = postValidation(req.body)

  if (error) return res.status(400).json({ error: error.details[0].message })

  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    createdAt: new Date(),
    publish: req.body.publish,
  })

  post.save((err) => {
    if (err) {
      return next(err)
    }
    res.json(post)
  })
}

// update post
const post_update = (req, res, next) => {
  // validate the post
  const { error } = updateValidation(req.body)

  if (error) return res.status(400).json({ error: error.details[0].message })

  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      return next(err)
    }
    res.json(post)
  })
}

// delete post
const post_delete = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
}

export { post_list, post_detail, post_edit, post_create_get, post_create_post, post_update, post_delete }
