import mongoose from "mongoose";

// interface of user properties
// that are required to create new user
interface UserAttrs {
  email: string;
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

const User = mongoose.model(
  'User', userSchema
)

// call this function (not default) to ensure type checking
const buildUser =( attrs: UserAttrs ) => {
  return new User(attrs);
}

export { User, buildUser }
