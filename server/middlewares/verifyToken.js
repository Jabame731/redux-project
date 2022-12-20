import jwt from 'jsonwebtoken';

import { createError } from './error.js';

//middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(404, 'Sorry Not Authenticated'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is not Valid'));

    req.user = user;
    next();
  });
};

//verifyUser
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, 'Not Authorized'));
    }
  });
};
