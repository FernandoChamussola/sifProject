import { Router } from 'express';
import pagamentoController from '../controllers/pagamentoController.js';

const router = Router();

/**
 * @route   GET /pagamentos
 * @desc    Listar todos os pagamentos com paginação
 * @access  Public
 * @params  ?page=1&limit=10&orderBy=id&order=asc
 */
router.get('/', pagamentoController.getAll);


/**
 * @route   GET /pagamentos/usuario
 * @desc    Buscar pagamentos de um usuario
 * @access  Public
 */
router.get('/usuario', pagamentoController.getByUsurioId);

/**
 * @route   GET /pagamentos/:id
 * @desc    Buscar pagamento por ID
 * @access  Public
 */
router.get('/:id', pagamentoController.getById);

/**
 * @route   POST /pagamentos
 * @desc    Criar novo pagamento
 * @access  Public
 */
router.post('/', pagamentoController.create);

/**
 * @route   PUT /pagamentos/:id
 * @desc    Atualizar pagamento por ID
 * @access  Public
 */
router.put('/:id', pagamentoController.update);

/**
 * @route   DELETE /pagamentos/:id
 * @desc    Deletar pagamento por ID
 * @access  Public
 */
router.delete('/:id', pagamentoController.delete);


export default router;