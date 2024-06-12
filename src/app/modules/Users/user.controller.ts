import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { UserServices } from './user.service';

const getUserData = catchAsync(async (req, res) => {
  const userEmail = req.user.userEmail;
  const result = await UserServices.getUserDataFromDB(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserData = catchAsync(async (req, res) => {
  const updateData = req.body;
  const userEmail = req.user.userEmail;
  const result = await UserServices.updateUserDataIntoDB(userEmail, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
export const UserController = {
  getUserData,
  updateUserData,
};
