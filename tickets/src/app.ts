import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";


import { errorHandler, NotFoundError} from "@adityat2810ticketing/common";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)


app.all('*',async (req, res, next)=>{
  next(new NotFoundError())   // in case of async route
})

app.use(errorHandler)

export { app };
