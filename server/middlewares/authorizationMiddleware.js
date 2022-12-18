import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel.js';

const token = async (req, res, next) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      userToken = req.headers.authorization.split(' ')[1];

      const decodedToken = jwt.verify(token, process.env.JWT);

      req.user = await UserModel.findById(decodedToken.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      throw new Error('Not Authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No Token, sorry');
  }
};

export default token;
