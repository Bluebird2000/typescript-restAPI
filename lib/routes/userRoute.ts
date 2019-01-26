import * as express from 'express';
import UserController from '../controllers/userController';
const router = express.Router();

router.post('/users', UserController.createUser);

export default router;