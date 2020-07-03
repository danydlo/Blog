import Comment from '../models/comment'

// Display list of all comments
const comment_list = (req, res, next) => {
  Comment.find({ post: req.params.postId }).exec((err, comments) => {
    if (err) {
      return next(err)
    }
    res.json(comments)
  })
}

// Create new comment
const comment_create = (req, res, next) => {
  const comment = new Comment({
    user: req.body.user,
    text: req.body.text,
    post: req.body.post,
    createdAt: new Date(),
  })

  comment.save((err) => {
    if (err) {
      return next(err)
    }
    res.json(comment)
  })
}

export { comment_list, comment_create }
