import mongoose, { Schema, Document } from 'mongoose';
import dateFormat from '../utils/dataFormat';

export interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
    get: (timestamp: Date) => dateFormat(timestamp),
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

export default reactionSchema;