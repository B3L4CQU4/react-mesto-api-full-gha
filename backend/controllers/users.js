const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/users');

const NotFound = require('../errors/notFound');
const AuthError = require('../errors/authError');

const OK_CODE = 200;
const CREATED_CODE = 201;

const { JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(OK_CODE).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFound('User not found');
    } else {
      res.status(OK_CODE).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    // Извлекаем _id из декодированного токена
    const userId = req.user._id;

    const user = await User.findById(userId);

    res.status(OK_CODE).json(user.toObject());
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password,
    });

    newUser.password = undefined;
    res.status(CREATED_CODE).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFound('User not found');
    } else {
      res.status(OK_CODE).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFound('User not found');
    } else {
      res.status(OK_CODE).json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      // res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      // res.status(OK_CODE).json({ message: 'Login successful', _id: user._id });
      res.status(OK_CODE).send({ token });
    } else {
      throw new AuthError('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateProfile,
  updateAvatar,
};
