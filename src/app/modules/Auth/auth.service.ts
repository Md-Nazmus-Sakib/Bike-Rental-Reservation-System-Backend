import config from '../../config';
import { TUser } from '../Users/user.interface';
import { User } from '../Users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

const createUserIntoDB = async (userData: TUser) => {
  const createdUser = await User.create(userData);
  const result = await User.findById(createdUser._id).select('-role');
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // Ensure both passwords are defined before comparison
  if (!payload?.password || !user?.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password not provided!!');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password!');
  }
  if (!user.email || !user.role) {
    throw new AppError(httpStatus.NOT_FOUND, 'Email or Role not Found.');
  }

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,

    config.jwt_refresh_expires_in as string,
  );
  const responseUserData = await User.findById(user._id).select('-role');

  return {
    accessToken,
    responseUserData,
  };
};
export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
