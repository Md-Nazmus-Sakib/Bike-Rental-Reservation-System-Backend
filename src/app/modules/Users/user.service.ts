import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { TUser } from './user.interface';
import { User } from './user.model';
const getUserDataFromDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail }).select('+role');

  return result;
};
const updateUserDataIntoDB = async (
  userEmail: string,
  payload: Partial<TUser>,
) => {
  // Check if the payload contains the role field
  if ('role' in payload) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Role cannot be changed');
  }
  const result = await User.findOneAndUpdate(
    { email: userEmail },
    { $set: payload },
    { new: true, runValidators: true },
  ).select('-role');

  return result;
};
export const UserServices = {
  getUserDataFromDB,
  updateUserDataIntoDB,
};
