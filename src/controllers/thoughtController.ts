import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Thought created, but found no user with that ID' });
    }
    res.json('Created the thought 🎉');
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Thought deleted but no user with this id!' });
    }
    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};