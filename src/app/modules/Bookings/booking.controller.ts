import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { BookingServices } from './booking.service';

//Create Booking Controller
const createBooking = catchAsync(async (req, res, next) => {
  const bookingData = req.body;
  const userEmail = req.user.userEmail;
  const result = await BookingServices.createBookingIntoDB(
    userEmail,
    bookingData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Booked successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
