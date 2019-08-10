import mongoose, { Schema, Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { sign } from '@utils/jwt';

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
}, {
  timestamps: true,
  versionKey: false,
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

export const addUser = async ({ name, email, password }) => {
  const instance = UserModel({ name, email, password });

  try {
    return await instance.save();
  } catch (error) {
    throw error;
  }
}

export const getUsers = async () => {
  return await UserModel.find();
}

export const login = async ({ email, password }) => {
  if (!email || !password) return {
    ...global.result,
    code: 400,
    error: 'Bad request.'
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) return {
      ...global.result,
      error: 'User not found.',
    };

    const isMatch = compareSync(password, user.password);

    if (!isMatch) return {
      ...global.result,
      error: 'Password is not match.',
    }
    
    const data = {...user}['_doc'];

    const token = sign(data);

    delete data.password

    return {
      ...global.result,
      data: { ...data, token },
    }
  } catch (error) {
    throw error;
  }
}

export default UserModel;