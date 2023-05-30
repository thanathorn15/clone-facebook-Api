const { Op } = require("sequelize");
const { User } = require("../models");

exports.getUserByEmailorMobile = (emailorMobile) => {
  return User.findOne({
    where: {
      [Op.or]: [{ email: emailorMobile }, { mobile: emailorMobile }],
    },
  });
};

exports.createUser = user => User.create(user)

exports.getUserById = id => User.findByPk(id)