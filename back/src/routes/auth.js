import express from 'express';
import AuthController from '../controllers/auth.js';
const router = express.Router();

router.use('/register', AuthController.register);
router.use('/login', AuthController.login);

export default router;