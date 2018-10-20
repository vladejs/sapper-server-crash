import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const Log = new Schema({
  type: String,
  date: Date,
  title: String,
  message: String,
  blob: String  // For example: Stripe.js error details
});

const LogModel = mongoose.model('Log', Log);

export const initLog = () => LogModel;

export default LogModel
