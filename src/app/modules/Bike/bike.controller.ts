import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { BikeServices } from './bike.service';

//Create User Controller
const createBike = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await BikeServices.createBikeIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
};
