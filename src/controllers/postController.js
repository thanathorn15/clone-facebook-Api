const fs = require('fs')
const friendService = require('../services/friendService')
const createError = require('../utils/createError')
const {Post,User,Like} = require('../models')
const uploadService = require('../services/uploadService')

exports.createPost = async (req, res, next) => {
    try {
        if (!req.file && (!req.body.message || !req.body.message.trim())) {
          createError('message or image is required', 400);
        }
    
        const value = {
          userId: req.user.id
        };
    
        if (req.body.message && req.body.message.trim()) {
          value.message = req.body.message.trim();
        }
    
      if (req.file) {
        const result = await uploadService.upload(req.file.path);
        value.image = result.secure_url;
      }
  
      const post = await Post.create(value);
      res.status(201).json({ post: post });
    } catch (err) {
      next(err);
    } finally {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    }
  };
  

exports.getAllPostIncludeFriend = async (req,res,next) => {
    try {
const friendsId = await friendService.getFriendsIdUserId(req.user.id)
    const meIncludeFriendsId = [req.user.id, ...friendsId]
    const posts = await Post.findAll({where: {userId: meIncludeFriendsId},
    order: [ ['createdAt','DESC']],
    include : [
    {
        model :User
    },
    {
        model :Like,
        include: User
    },
]
    })
    
    res.status(200).json({posts})
    }catch(err) {
        next(err)
    }
}

exports.toggleLike = async (req,res,next) => {
    try {
const existLike = await Like.findOne ({
    where: {
        userId: req.user.id,
        postId: req.params.postId
    }
})
if (existLike) {
    await Like.destroy({
        where: {
            userId: req.user.id,
            postId: req.params.postId
        } 
    })
}
    await Like.create({userId: req.user.id, postId:req.params.postId})
    res.status(201).json({message: 'success like'})
    } catch (err) {
        next(err)
    }
}