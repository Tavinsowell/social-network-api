import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/socialNetworkDB');

export default mongoose.connection;