import { Router } from 'express';
import taxaController from '../controllers/taxaController.js';

const router = Router();

/**
 * @route   GET /taxas
 * @desc    Listar todos os taxas com paginação
 * @access  Public
 * @params  ?page=1&limit=10&orderBy=id&order=asc
 */
router.get('/', taxaController.getAll);


/**
 * @route   GET /taxas/reativar/:id
 * @desc    Reativar taxa por ID
 * @access  Public
 */
router.get('/reativar/:id', taxaController.reactivate);

/**
 * @route   GET /taxas/:id
 * @desc    Buscar taxa por ID
 * @access  Public
 */
router.get('/:id', taxaController.getById);

/**
 * @route   POST /taxas
 * @desc    Criar novo taxa
 * @access  Public
 */
router.post('/', taxaController.create);

/**
 * @route   PUT /taxas/:id
 * @desc    Atualizar taxa por ID
 * @access  Public
 */
router.put('/:id', taxaController.update);

/**
 * @route   DELETE /taxas/:id
 * @desc    Deletar taxa por ID
 * @access  Public
 */
router.delete('/:id', taxaController.delete);

export default router;