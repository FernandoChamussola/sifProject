import { Router } from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = Router();

/**
 * @route   GET /usuarios
 * @desc    Listar todos os usuarios com paginação
 * @access  Public
 * @params  ?page=1&limit=10&orderBy=id&order=asc
 */
router.get('/', usuarioController.getAll);


/**
 * @route   GET /usuarios/:id
 * @desc    Buscar usuario por ID
 * @access  Public
 */
router.get('/:id', usuarioController.getById);

/**
 * @route   POST /usuarios
 * @desc    Criar novo usuario
 * @access  Public
 */
router.post('/', usuarioController.create);

/**
 * @route   PUT /usuarios/:id
 * @desc    Atualizar usuario por ID
 * @access  Public
 */
router.put('/:id', usuarioController.update);

/**
 * @route   DELETE /usuarios/:id
 * @desc    Deletar usuario por ID
 * @access  Public
 */
router.delete('/:id', usuarioController.delete);

export default router;