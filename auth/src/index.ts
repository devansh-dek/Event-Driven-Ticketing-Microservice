import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";


const app = express();
app.use(json());

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*',async (req, res, next)=>{
  next(new NotFoundError())   // in case of async route
})

app.use(errorHandler)

const start = async () => {
  try{
    await mongoose.connect('mongodb://mongo-auth-srv:27017/auth')
    console.log('db connected')
  }catch(err){
    console.log(err)
  }

  app.listen(3000, ()=>{
    start()
    console.log(`litening on 3000!!!!!!!!!`)
  })
}

start();

