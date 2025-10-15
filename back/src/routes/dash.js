import { Router } from 'express';
import dashController from '../controllers/dash.js';

const router = Router();

/**
 * @route   GET /dashboard
 * @desc    Buscar dados do dashboard
 * @access  Public
 */
router.get('/', dashController.getDashData);

export default router;