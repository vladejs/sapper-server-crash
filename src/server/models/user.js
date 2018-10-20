import mongoose from 'mongoose'
const Schema = mongoose.Schema
import passportLocalMongoose from 'passport-local-mongoose';

export const User = new Schema({
  firstName: String,
  lastName: String,
  addressLine1: String,
  addressState: String,
  addressCity: String,
  customer: String,
  role: String
});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', User)

export const initUser = () => UserModel;

export default UserModel
