import { Router } from 'express'
import * as post from '../controllers/post'

const router = Router()

router.post('/get', post.post_create_get)

router.put('/update/:id', post.post_update)

router.delete('/delete/:id', post.post_delete)

router.get('/:id', post.post_edit)

router.post('/', post.post_create_post)

export default router
