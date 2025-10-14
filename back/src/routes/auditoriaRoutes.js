import { Router } from 'express';
import auditoriaController from '../controllers/auditoriaController.js';

const router = Router();

/**
 * @route   GET /auditorias
 * @desc    Listar todos os auditorias com paginação
 * @access  Public
 * @params  ?page=1&limit=10&orderBy=id&order=asc
 */
router.get('/', auditoriaController.getAll);


/**
 * @route   GET /auditorias/:id
 * @desc    Buscar auditoria por ID
 * @access  Public
 */
router.get('/:id', auditoriaController.getById);

/**
 * @route   POST /auditorias
 * @desc    Criar novo auditoria
 * @access  Public
 */
router.post('/', auditoriaController.create);

/**
 * @route   PUT /auditorias/:id
 * @desc    Atualizar auditoria por ID
 * @access  Public
 */
router.put('/:id', auditoriaController.update);

/**
 * @route   DELETE /auditorias/:id
 * @desc    Deletar auditoria por ID
 * @access  Public
 */
router.delete('/:id', auditoriaController.delete);

export default router;