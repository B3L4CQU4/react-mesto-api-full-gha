const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');
const {
  validateUpdateAvatar,
  validateUpdateProfile,
  validateUserId,
} = require('../validation/validation');

router.get('/users', userController.getUsers);
router.get('/users/me', userController.getUserInfo);

router.get('/users/:userId', validateUserId, userController.getUserById);

router.patch('/users/me', validateUpdateProfile, userController.updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, userController.updateAvatar);

module.exports = router;

module.exports = router;
