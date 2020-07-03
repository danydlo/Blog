import { Router } from 'express'
import * as comment from '../controllers/comment'

const router = Router()

router.post('/create', comment.comment_create)

router.get('/:postId', comment.comment_list)

export default router
