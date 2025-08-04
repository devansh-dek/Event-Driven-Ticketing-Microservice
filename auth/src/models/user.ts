import e from "express";
import mongoose, { Mongoose } from "mongoose";

// interface of user properties
// that are required to create new user
interface UserAttrs {
  email: string;
  password: string
}

// an interfce that describes the properties
// that use modal has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// an interface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document{
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    trpe: String,
    required: true
  }
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>(
  'User', userSchema
)

export { User }
