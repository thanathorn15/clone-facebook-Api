const express = require('express')
const router = express.Router()
const friendController = require('../controllers/friendController')

router.post('/:receiver',friendController.addFriend)
router.patch('/:requesterId',friendController.confirmFriend)
router.delete('/:receiverId/cancel',friendController.cancelRequest)
router.delete('/:friendId/unfriend',friendController.unfriend)
router.delete('/:requesterId/reject',friendController.rejectRequest)

module.exports = router

