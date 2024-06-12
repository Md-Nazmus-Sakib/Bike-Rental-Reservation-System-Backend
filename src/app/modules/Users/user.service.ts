import { TUser } from './user.interface';
import { User } from './user.model';
const getUserDataFromDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });

  return result;
};
const updateUserDataIntoDB = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });

  return result;
};
export const UserServices = {
  getUserDataFromDB,
  updateUserDataIntoDB,
};
