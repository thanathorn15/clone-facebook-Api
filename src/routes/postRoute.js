const express = require('express')
const postController = require('../controllers/postController')
const upload = require('../middlewares/upload')

const router = express.Router()

router.post('/',upload.single('image'),postController.createPost)
router.get('/friends',postController.getAllPostIncludeFriend)
router.post('/:postId/like',postController.toggleLike)

module.exports = router