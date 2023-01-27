import mongoose from 'mongoose';

const { Schema } = mongoose;
const userScheme = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model('User', userScheme);
