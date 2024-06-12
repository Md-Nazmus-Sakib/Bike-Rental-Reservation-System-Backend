import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import createBikeValidationSchema from './bike.validation';
import { BikeController } from './bike.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Users/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createBikeValidationSchema),
  BikeController.createBike,
);

export const BikeRoutes = router;
