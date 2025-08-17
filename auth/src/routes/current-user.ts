import express, {Request, Response, NextFunction} from 'express';

import { currentUser } from '../middleware/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, async (req: Request, res: Response, next: NextFunction)=> {
  res.send({currentUser:req.currentUser || null});
})

export { router as currentUserRouter }