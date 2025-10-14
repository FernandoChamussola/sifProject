import usuarioService from '../services/usuarioService.js';
import chalk from 'chalk';

class UsuarioController {

  async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
        orderBy: req.query.orderBy,
        order: req.query.order
      };

      const result = await usuarioService.getAll(options);
      
      console.log(chalk.green(`✅ Listagem de usuarios solicitada - Total: ${result.pagination.total}`));
      
      res.json({
        success: true,
        ...result
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao listar usuarios:`), error.message);
      
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.getById(parseInt(id));
      
      console.log(chalk.green(`✅ Usuario encontrado - ID: ${id}`));
      
      res.json({
        success: true,
        data: usuario
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao buscar usuario:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async create(req, res) {
    try {
      const usuario = await usuarioService.create(req.body);
      
      console.log(chalk.green(`✅ Usuario criado com sucesso - ID: ${usuario.id}`));
      
      res.status(201).json({
        success: true,
        data: usuario,
        message: 'Usuario criado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao criar usuario:`), error.message);
      
      // Erro de validação do Prisma
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          message: 'Dados duplicados. Verifique campos únicos.'
        });
      }

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.update(parseInt(id), req.body);
      
      console.log(chalk.green(`✅ Usuario atualizado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        data: usuario,
        message: 'Usuario atualizado com sucesso'
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao atualizar usuario:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 400;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await usuarioService.delete(parseInt(id));
      
      console.log(chalk.green(`✅ Usuario deletado com sucesso - ID: ${id}`));
      
      res.json({
        success: true,
        message: result.message
      });

    } catch (error) {
      console.error(chalk.red(`❌ Erro ao deletar usuario:`), error.message);
      
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message
      });
    }
  }

  
}

export default new UsuarioController();