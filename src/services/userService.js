const userRepository = require('../repositories/userRepository')

exports.checkEmailorMobileExist = async emailorMobile => {
const existUser = await userRepository.getUserByEmailorMobile(emailorMobile)
return !!existUser
}

exports.createUser = user => userRepository.createUser(user)

exports.getUserByEmailorMobile = async (emailorMobile) => {
   const user = await userRepository.getUserByEmailorMobile(emailorMobile)
   return user
}

exports.getUserById = id => userRepository.getUserById(id)