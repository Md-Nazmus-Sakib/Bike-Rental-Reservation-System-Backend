import httpStatus from 'http-status';
import AppError from '../../errors/AppErrors';
import { User } from '../Users/user.model';
import { TBooking } from './booking.interface';
import { Bike } from '../Bike/bike.model';
import mongoose from 'mongoose';
import { Booking } from './booking.model';

const createBookingIntoDB = async (
  userEmail: string,
  payload: Partial<TBooking>,
) => {
  const bookingData: Partial<TBooking> = {};

  //   checking if the user is valid
  const user = await User.findOne({ email: userEmail });
  //User is not found then throw error
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid User');
  }
  //set the userId
  bookingData.userId = user._id;

  // Find the bike by its ID
  const bike = await Bike.findById(payload?.bikeId);

  // Check if the bike is found
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  // Check if the bike is not available
  if (bike.isAvailable === false) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike is already unavailable');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // change bike available Status (transaction-1)
    const bikeBooking = await Bike.findByIdAndUpdate(
      bike._id,
      { isAvailable: false },
      { new: true, session },
    );

    if (!bikeBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Booking');
    }
    // create a Booking (transaction-2)
    bookingData.bikeId = bike._id;
    bookingData.startTime = payload?.startTime;
    const booking = await Booking.create([bookingData], { session });

    if (!booking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Booking');
    }

    await session.commitTransaction();
    await session.endSession();
    return booking;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const BookingServices = {
  createBookingIntoDB,
};
