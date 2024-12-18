import { Schema, model, Document } from 'mongoose';
import dateFormat from '../utils/dataFormat.js';
import reactionSchema, { IReaction } from './Reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;