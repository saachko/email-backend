import mongoose from 'mongoose';

const { Schema } = mongoose;
const messageScheme = new Schema(
  {
    subject: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderName: {
      type: String,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverName: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Message', messageScheme);
