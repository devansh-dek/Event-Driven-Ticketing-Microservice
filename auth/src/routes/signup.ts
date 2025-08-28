import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator';

import { validateRequest, BadRequestError } from '@adityat2810ticketing/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',

  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid! '),

    body('password')
      .trim()
      .isLength({min:4, max:20})
      .withMessage('Password must be within 4 & 20 chracters')
  ],

  validateRequest,

  async(req: Request, res: Response, next: NextFunction)=> {


  const { email, password } = req.body
  const existingUser = await User.findOne({ email })

  if(existingUser){
    return next(new BadRequestError('Email in use'))
  }

  const user = User.build({email, password})
  await user.save();

  /**
   * Genrate JWT
   * Store in session object
   */

  const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
  )

  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)

})

export { router as signupRouter }