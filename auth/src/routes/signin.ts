import express, {NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

import { User  } from '../models/user';
import { BadRequestError, validateRequest } from '@adityat2810ticketing/common';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
  [
    body("email")
      .isEmail()
      .withMessage('Email must be valid'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply the password  ')

  ],

  validateRequest,

  async (req: Request, res: Response, next: NextFunction)=> {

    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser){
      // throw new BadRequestError('Invalid Credentails')
      return next(new BadRequestError('Invalid Credentials'))  // since async request
    }

    const passwordMatch = await Password.toCompare(
      existingUser.password, password
    );

    if(!passwordMatch){
      return next(new BadRequestError("Invalid Credentials")) ;
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt
    }

    res.status(201).send(existingUser)
  }
)

export { router as signinRouter }