import mongoose, { Schema, Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcrypt';

const { Types } = Schema;

const saltRounds = 12;

const UserSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  name: {
    type: Types.String,
  },
  email: {
    type: Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Types.String,
  },
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = genSaltSync(saltRounds);

    const hash = hashSync(user.password, salt);

    user.password = hash;

    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model('users', UserSchema);

UserModel.addUser = async ({ name, email, password }) => {
  const instance = UserModel({ name, email, password });

  try {
    return await instance.save();
  } catch (error) {
    throw error;
  }
}

UserModel.getUsers = async () => {
  return await UserModel.find();
}

export default UserModel;