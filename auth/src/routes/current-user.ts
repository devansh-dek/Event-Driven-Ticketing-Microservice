import { currentUser } from '@adityat2810ticketing/common';
import express, {Request, Response, NextFunction} from 'express';


const router = express.Router();

router.get('/api/users/currentuser',currentUser , async (req: Request, res: Response, next: NextFunction)=> {
  res.send({currentUser:req.currentUser || null});
})

export { router as currentUserRouter }