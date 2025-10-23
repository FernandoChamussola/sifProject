import { Router } from 'express';
import relatorioController from '../controllers/relatorio.js';
const router = Router();


/** * @route   GET /relatorios/usuarios-pagamentos
 * @desc    Gerar relatório de usuários com seus pagamentos
 * @access  Public
 */
router.get('/', relatorioController.getRelatorio);

export default router;