import mongoose from 'mongoose';
import * as UserModel from './user.model';

const connectDB = async (host) => {
  try {
    await mongoose.connect(host, {
      useNewUrlParser: true,
    });

    console.log('Connect to DB success.');
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

export {
  connectDB,
  UserModel
}