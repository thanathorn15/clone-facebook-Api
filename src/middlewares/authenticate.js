const createError = require('../utils/createError')
const tokenService = require('../services/tokenService')
const userService = require('../services/userService')

module.exports = async (req,res,next) => {
try {
    const authorization = req.headers.authorization
if (!authorization || !authorization.startsWith('Bearer ')) {
    createError('unauthorized',401)
}
const token = authorization.split(' ')[1]
if (!token) {
    createError('unauthorized',401)
}
const payload = tokenService.verify(token)
const user = await userService.getUserById(payload.id)
if (!user) {
    createError('unauthorized',401)
}
req.user = user
next()
}catch(err){
    next(err)
}
}