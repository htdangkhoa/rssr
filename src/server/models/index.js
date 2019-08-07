import mongoose from 'mongoose';
import UserModel from './user.model';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
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