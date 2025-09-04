import express, {NextFunction, Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@adityat2810ticketing/common';

const router = express.Router()

router.get('/api/tickets/:id', async(
  req: Request, res: Response, next: NextFunction
)=>{
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket){
    return next(new NotFoundError())
  }

  res.status(200).send(ticket)

})

export { router as showTicketRouter }