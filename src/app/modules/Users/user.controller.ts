import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { UserServices } from './user.service';

//==========================================================

//Create student Controller
const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Created Successfully',
    data: result,
  });
});

//==============================================================

export const UserController = {
  createUser,
};
