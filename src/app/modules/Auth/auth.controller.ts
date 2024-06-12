//==========================================================

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AuthServices } from './auth.service';

//Create student Controller
const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await AuthServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//==============================================================

export const AuthController = {
  createUser,
};
