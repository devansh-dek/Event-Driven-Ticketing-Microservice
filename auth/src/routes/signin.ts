import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middleware/validate-request';
import { User  } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
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

  async (req: Request, res: Response)=> {

    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser){
      throw new BadRequestError('Invalid Credentails')
    }

    console.log('Exixiting user', existingUser)

    const passwordMatch = await Password.toCompare(
      existingUser.password, password
    );

    console.log(2, passwordMatch)

    if(!passwordMatch){
      throw new BadRequestError("Invalid Credentials")
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