import { Router } from 'express';
import { USER_ROLE } from '../Users/user.constant';
import auth from '../../middlewares/auth';
import { BookingValidationSchema } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BookingValidationSchema.createBookingValidationSchema),
  BookingController.createBooking,
);

export const BookingRoutes = router;
