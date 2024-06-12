import config from '../../config';
import { TUser } from '../Users/user.interface';
import { User } from '../Users/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new Error('This user is not found !');
  }

  // Ensure both passwords are defined before comparison
  if (!payload?.password || !user?.password) {
    throw new Error('Password not provided!');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password!');
  }

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role || 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,

    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
  };
};
export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
