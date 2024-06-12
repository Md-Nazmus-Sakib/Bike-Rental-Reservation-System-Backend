import { Router } from 'express';
import { UserController } from './user.controller';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUserData,
);
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.updateUserData,
);

export const UserRoutes = router;
