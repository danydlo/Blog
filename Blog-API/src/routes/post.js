import { Router } from 'express'
import * as post from '../controllers/post'

const router = Router()

router.get('/:id', post.post_detail)

router.get('/', post.post_list)

export default router
