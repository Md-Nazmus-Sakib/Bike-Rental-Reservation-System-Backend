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
    message: 'Rental created successfully',
    data: result,
  });
});

const updateBookingInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingInfoIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});
const getBookingInfo = catchAsync(async (req, res) => {
  const userEmail = req.user.userEmail;
  const result = await BookingServices.getBookingInfoIntoDB(userEmail);

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  updateBookingInfo,
  getBookingInfo,
};
