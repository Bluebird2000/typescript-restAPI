import * as express from 'express';
import indexController from '../controllers/indexController';
const router = express.Router();

router.get('/', indexController.welcome);
export default router;
