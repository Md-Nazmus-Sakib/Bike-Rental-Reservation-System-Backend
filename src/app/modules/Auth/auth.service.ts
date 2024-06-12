import { TUser } from '../Users/user.interface';
import { User } from '../Users/user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};
