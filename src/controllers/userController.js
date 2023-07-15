const fs = require("fs");
const createError = require("../services/uploadService");
const uploadService = require("../services/uploadService");
const { User } = require("../models");
const friendService = require("../services/friendService");

exports.uploadImage = async (req, res, next) => {
  try {
    console.log(req.files);
    if (!req.files.profileImage && !req.files.coverImage) {
      createError("profile image ro cover image is require");
    }
    const updateValue = {};
    if (req.files.profileImage) {
      const result = await uploadService.upload(req.files.profileImage[0].path);
      updateValue.profileImage = result.secure_url;
    }
    if (req.files.coverImage) {
      const result = await uploadService.upload(req.files.coverImage[0].path);
      updateValue.coverImage = result.secure_url;
    }
    await User.update(updateValue, { where: { id: req.user.id } });
    res.status(200).json(updateValue);
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlinkSync(req.files.profileImage[0].path);
    }
    if (req.files.coverImage) {
      fs.unlinkSync(req.files.coverImage[0].path);
    }
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    const friends = await friendService.getFriendsByUserId(req.params.id);
    const statusWithAuthenticateUser =
      await friendService.getStatusWithTargetUserByUserId(
        req.user.id,
        req.params.id
      );
    await res.status(200).json({ user, friends,statusWithAuthenticateUser });
  } catch (err) {
    next(err);
  }
};
