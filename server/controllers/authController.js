import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/UserModel.js';

//login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  //check for existing user
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    throw new ErrorOutline('Please fill up all fields');
  }

  const userIfExist = await UserModel.findOne({ email });

  if (userIfExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    name,
    username,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: token(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};

export const getUserDetails = async (req, res) => {
  res.status(200).json(req.user);
};

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: '10d',
  });
};
